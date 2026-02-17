import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';
import { uploadData, getUrl, remove } from 'aws-amplify/storage';
//import { generateClient } from 'aws-amplify/data';
import imageCompression from 'browser-image-compression';
import './Gallery.css';
import { getClient } from '../utils/apiClient.js';


//const client = generateClient();

function Gallery() {
  const navigate = useNavigate();
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
      
      // Ordenar por order o por fecha de creación
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

    if (!file.type.startsWith('image/')) {
      setMessage('❌ Por favor selecciona una imagen válida');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage('❌ La imagen debe ser menor a 10MB');
      return;
    }

    setUploading(true);
    setMessage('Comprimiendo imagen...');

    try {
      // Comprimir imagen
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
        fileType: 'image/jpeg',
      };

      const compressedFile = await imageCompression(file, options);
      
      console.log('Tamaño original:', (file.size / 1024 / 1024).toFixed(2), 'MB');
      console.log('Tamaño comprimido:', (compressedFile.size / 1024 / 1024).toFixed(2), 'MB');

      setMessage('Subiendo imagen...');

      // Generar nombre único
      const fileName = `gallery/${user.userId}-${Date.now()}.jpg`;

      // Subir a S3
      const result = await uploadData({
        path: fileName,
        data: compressedFile,
        options: {
          contentType: 'image/jpeg'
        }
      }).result;

      // Guardar en la base de datos
      const newOrder = images.length > 0 ? Math.max(...images.map(img => img.order || 0)) + 1 : 1;
      
      await client.models.UserImage.create({
        userId: user.userId,
        imagePath: result.path,
        description: newImageDescription || '',
        order: newOrder
      });

      setMessage('✅ Imagen subida correctamente');
      setNewImageDescription('');
      
      // Recargar galería
      await loadGallery(user.userId);
      
      // Limpiar input
      event.target.value = '';
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      setMessage('❌ Error al subir la imagen');
    } finally {
      setUploading(false);
    }
  }

  async function handleDeleteImage(imageId, imagePath) {
    const confirmed = window.confirm('¿Estás seguro de eliminar esta imagen?');
    const client = getClient('userPool'); 

    if (!confirmed) return;

    setDeletingId(imageId);
    try {
      // Eliminar de S3
      await remove({ path: imagePath });
      
      // Eliminar de la base de datos
      await client.models.UserImage.delete({ id: imageId });
      
      setMessage('✅ Imagen eliminada');
      
      // Actualizar lista local
      setImages(prev => prev.filter(img => img.id !== imageId));
    } catch (error) {
      console.error('Error eliminando imagen:', error);
      setMessage('❌ Error al eliminar la imagen');
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
      
      // Actualizar local
      setImages(prev => prev.map(img => 
        img.id === imageId ? { ...img, description: newDescription } : img
      ));
      
      setMessage('✅ Descripción actualizada');
    } catch (error) {
      console.error('Error actualizando descripción:', error);
      setMessage('❌ Error al actualizar');
    }
  }

  if (loading) {
    return <div className="loading">Cargando galería...</div>;
  }

  return (
    <div className="gallery-container">
      <div className="gallery-content">
        <div className="gallery-header">
          <h2>Mi Galería de Imágenes</h2>
          <p>Sube y gestiona tus imágenes</p>
        </div>

        {/* Subir nueva imagen */}
        <div className="upload-section">
          <h3>Agregar Nueva Imagen</h3>
          <div className="upload-form">
            <input
              type="text"
              placeholder="Descripción de la imagen (opcional)"
              value={newImageDescription}
              onChange={(e) => setNewImageDescription(e.target.value)}
              className="description-input"
              disabled={uploading}
            />
            <input
              type="file"
              id="galleryImageUpload"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              style={{ display: 'none' }}
            />
            <label 
              htmlFor="galleryImageUpload" 
              className={`btn-upload-gallery ${uploading ? 'disabled' : ''}`}
            >
              {uploading ? 'Subiendo...' : '📷 Seleccionar Imagen'}
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
          <h3>Mis Imágenes ({images.length})</h3>
          
          {images.length === 0 ? (
            <div className="no-images">
              <p>Aún no has subido ninguna imagen</p>
              <p className="hint">Comienza agregando tu primera imagen arriba</p>
            </div>
          ) : (
            <div className="images-grid">
              {images.map((image) => (
                <div key={image.id} className="image-card">
                  <div className="image-wrapper">
                    {imageUrls[image.id] ? (
                      <img 
                        src={imageUrls[image.id]} 
                        alt={image.description || 'Imagen de galería'} 
                      />
                    ) : (
                      <div className="image-loading">Cargando...</div>
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
                      placeholder="Agregar descripción..."
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
          <button onClick={() => navigate('/profile')} className="btn-back">
            Volver al Perfil
          </button>
          <button onClick={() => navigate('/dashboard')} className="btn-back">
            Ir al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
