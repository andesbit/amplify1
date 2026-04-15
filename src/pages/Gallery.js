import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';
import { uploadData, getUrl, remove } from 'aws-amplify/storage';
import imageCompression from 'browser-image-compression';
import './Gallery.css';
import { getClient } from '../utils/apiClient.js';
import { useTranslation } from 'react-i18next';

function Gallery() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const MAX_IMAGES = 6;
  
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [newImageDescription, setNewImageDescription] = useState('');
  const [imageUrls, setImageUrls] = useState({});
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    checkAuthAndLoadGallery();
  }, []);

  useEffect(() => {
    loadImageUrls();
  }, [images]);

  async function checkAuthAndLoadGallery() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      await loadGallery(currentUser.userId);
    } catch (error) {
      console.log('No autenticado');
      navigate('/login');
    }
  }

  async function loadGallery(userId) {
    const client = getClient('userPool'); 
    try {
      const { data } = await client.models.UserImage.list({
        filter: { userId: { eq: userId } }
      });
      
      const sortedImages = (data || []).sort((a, b) => {
        if (a.order !== null && b.order !== null) {
          return a.order - b.order;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      setImages(sortedImages);
    } catch (error) {
      console.error('Error cargando galería:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadImageUrls() {
    const urls = {};
    for (const image of images) {
      try {
        const result = await getUrl({ path: image.imagePath });
        urls[image.id] = result.url.toString();
      } catch (error) {
        console.error('Error cargando imagen:', error);
      }
    }
    setImageUrls(urls);
  }

  async function handleImageUpload(event) {
    const file = event.target.files[0];
    const client = getClient('userPool'); 
    if (!file) return;

    if (images.length >= MAX_IMAGES) {
      setMessage(t('gallery.limitReached'));
      event.target.value = '';
      return;
    }

    if (!file.type.startsWith('image/')) {
      setMessage('❌ Por favor selecciona una imagen válida');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage('❌ La imagen debe ser menor a 10MB');
      return;
    }

    setUploading(true);
    setMessage(t('gallery.compressing'));

    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
        fileType: 'image/jpeg',
      };

      const compressedFile = await imageCompression(file, options);
      
      setMessage(t('gallery.uploadingImage'));

      const fileName = `gallery/${user.userId}-${Date.now()}.jpg`;

      const result = await uploadData({
        path: fileName,
        data: compressedFile,
        options: { contentType: 'image/jpeg' }
      }).result;

      const newOrder = images.length > 0 ? Math.max(...images.map(img => img.order || 0)) + 1 : 1;
      
      await client.models.UserImage.create({
        userId: user.userId,
        imagePath: result.path,
        description: newImageDescription || '',
        order: newOrder
      });

      setMessage(t('gallery.uploadSuccess'));
      setNewImageDescription('');
      
      await loadGallery(user.userId);
      event.target.value = '';
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      setMessage(t('gallery.uploadError'));
    } finally {
      setUploading(false);
    }
  }

  async function handleDeleteImage(imageId, imagePath) {
    const confirmed = window.confirm(t('gallery.deleteConfirm'));
    const client = getClient('userPool'); 

    if (!confirmed) return;

    setDeletingId(imageId);
    try {
      await remove({ path: imagePath });
      await client.models.UserImage.delete({ id: imageId });
      
      setMessage(t('gallery.deleteSuccess'));
      setImages(prev => prev.filter(img => img.id !== imageId));
    } catch (error) {
      console.error('Error eliminando imagen:', error);
      setMessage(t('gallery.deleteError'));
    } finally {
      setDeletingId(null);
    }
  }

  async function handleUpdateDescription(imageId, newDescription) {
    const client = getClient('userPool'); 
    try {
      await client.models.UserImage.update({
        id: imageId,
        description: newDescription
      });
      
      setImages(prev => prev.map(img => 
        img.id === imageId ? { ...img, description: newDescription } : img
      ));
      
      setMessage(t('gallery.updateSuccess'));
    } catch (error) {
      console.error('Error actualizando descripción:', error);
      setMessage(t('gallery.updateError'));
    }
  }

  if (loading) {
    return <div className="loading">{t('common.loading')}</div>;
  }

  return (
    <div className="gallery-container">
      <div className="gallery-content">
        <div className="gallery-header">
          <h2>{t('gallery.title')}</h2>
          <p>{t('gallery.subtitle')}</p>
        </div>

        {/* Subir nueva imagen */}
        <div className="upload-section">
          <h3>
            {t('gallery.addNewImage')} ({images.length}/{MAX_IMAGES})
          </h3>
  
          {images.length >= MAX_IMAGES && (
            <div className="alert alert-warning">
              {t('gallery.limitWarning', { max: MAX_IMAGES })}
            </div>
          )}
          
          <div className="upload-form">
            <input
              type="text"
              placeholder={t('gallery.descPlaceholder')}
              value={newImageDescription}
              onChange={(e) => setNewImageDescription(e.target.value)}
              className="description-input"
              disabled={uploading || images.length >= MAX_IMAGES}
            />
            <input
              type="file"
              id="galleryImageUpload"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading || images.length >= MAX_IMAGES}
              style={{ display: 'none' }}
            />
            <label 
              htmlFor="galleryImageUpload" 
              className={`btn-upload-gallery ${(uploading || images.length >= MAX_IMAGES) ? 'disabled' : ''}`}
            >
              {uploading 
                ? t('gallery.uploading') 
                : images.length >= MAX_IMAGES 
                  ? t('gallery.limitReachedButton') 
                  : t('gallery.select')}
            </label>
          </div>
          
          {message && (
            <div className={`message ${message.includes('❌') ? 'error' : message.includes('...') ? 'info' : 'success'}`}>
              {message}
            </div>
          )}
        </div>

        {/* Galería */}
        <div className="gallery-section">
          <h3>
            {t('gallery.imagesCount')} ({images.length})
          </h3>
          
          {images.length === 0 ? (
            <div className="no-images">
              <p>{t('gallery.noImages')}</p>
              <p className="hint">{t('gallery.noImagesHint')}</p>
            </div>
          ) : (
            <div className="images-grid">
              {images.map((image) => (
                <div key={image.id} className="image-card">
                  <div className="image-wrapper">
                    {imageUrls[image.id] ? (
                      <img 
                        src={imageUrls[image.id]} 
                        alt={image.description || t('gallery.imageAlt')} 
                      />
                    ) : (
                      <div className="image-loading">{t('gallery.loadingImage')}</div>
                    )}
                  </div>
                  
                  <div className="image-info">
                    <input
                      type="text"
                      value={image.description || ''}
                      onChange={(e) => {
                        const newDesc = e.target.value;
                        setImages(prev => prev.map(img => 
                          img.id === image.id ? { ...img, description: newDesc } : img
                        ));
                      }}
                      onBlur={(e) => handleUpdateDescription(image.id, e.target.value)}
                      placeholder={t('gallery.descPlaceholder')}
                      className="description-edit"
                    />
                    
                    <button
                      onClick={() => handleDeleteImage(image.id, image.imagePath)}
                      className="btn-delete-image"
                      disabled={deletingId === image.id}
                    >
                      {deletingId === image.id ? '⏳' : '🗑️'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="gallery-actions">
          <button onClick={() => navigate('/profile')} className="btn-outline">
            {t('gallery.backToProfile')}
          </button>
          <button onClick={() => navigate('/')} className="btn-outline">
            {t('gallery.goToHome')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gallery;