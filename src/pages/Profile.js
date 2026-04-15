import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { uploadData, getUrl, remove } from 'aws-amplify/storage';
import { useTranslation } from 'react-i18next';
import { getClient } from '../utils/apiClient.js';
import imageCompression from 'browser-image-compression';
import './Profile.css';
import { deleteUser } from 'aws-amplify/auth';

function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    userName: '',
    bio: '',
    offer: '',
    profilePicture: ''
  });
  
  const [ubicacion, setUbicacion] = useState({
    pais: '',
    ciudad: '',
    frase: '',
    biografia: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [userNameAvailable, setUserNameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  useEffect(() => {
    if (profile.userName && profile.userName.length >= 3) {
      const timeoutId = setTimeout(() => {
        checkUsernameAvailability(profile.userName);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setUserNameAvailable(null);
    }
  }, [profile.userName]);

  async function checkUsernameAvailability(userName) {
    setCheckingUsername(true);
    const client = getClient('userPool');

    try {
      const { data } = await client.models.UserProfile.list({
        filter: { userName: { eq: userName } }
      });

      if (data && data.length > 0) {
        const isCurrentUser = data[0].userId === user?.userId;
        setUserNameAvailable(isCurrentUser ? true : false);
      } else {
        setUserNameAvailable(true);
      }
    } catch (error) {
      console.error('Error verificando userName:', error);
      setUserNameAvailable(null);
    } finally {
      setCheckingUsername(false);
    }
  }

  useEffect(() => {
    loadUserProfile();
  }, []);
  
  useEffect(() => {
    const { pais, ciudad, frase, biografia } = separarBio(profile.bio);
    setUbicacion({ pais, ciudad, frase, biografia });
  }, [profile.bio]);

  async function loadUserEmail() {
    try {
      const attributes = await fetchUserAttributes();
      setUserEmail(attributes.email || '');
    } catch (error) {
      console.error('Error cargando email:', error);
    }
  }

  async function loadUserProfile() {
    try {
      const client = getClient('userPool');
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      const { data: profiles } = await client.models.UserProfile.list({
        filter: { userId: { eq: currentUser.userId } }
      });

      if (profiles && profiles.length > 0) {
        const userProfile = profiles[0];
        setProfile({
          name: userProfile.name || '',
          userName: userProfile.userName || '',
          bio: userProfile.bio || '',
          offer: userProfile.offer || '',
          profilePicture: userProfile.profilePicture || ''
        });

        if (userProfile.profilePicture) {
          loadProfileImage(userProfile.profilePicture);
        }
      }
      await loadUserEmail();
    } catch (error) {
      console.log('Error cargando perfil:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }

  async function loadProfileImage(imagePath) {
    try {
      const result = await getUrl({ path: imagePath });
      setImagePreview(result.url.toString());
    } catch (error) {
      console.error('Error cargando imagen:', error);
    }
  }
  
  const separarBio = (bioTexto) => {
    if (bioTexto === undefined) bioTexto = "";
    const partes = bioTexto.trim().split('|');
    return {
      pais: partes[1] || '',
      ciudad: partes[2] || '',
      frase: partes[3] || '',
      biografia: partes[4] || ''
    };
  };

  function handleChange(e) {
    const { name, value } = e.target;
    
    if (['pais', 'ciudad', 'frase', 'biografia'].includes(name)) {
      setUbicacion(prev => ({ ...prev, [name]: value }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    setMessage(t('profile.processing'));

    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
        fileType: 'image/jpeg'
      };

      const compressedFile = await imageCompression(file, options);
      
      if (profile.profilePicture) {
        try {
          await remove({ path: profile.profilePicture });
        } catch (error) {
          console.log('Error eliminando imagen anterior:', error);
        }
      }

      const fileName = `profile-pictures/${user.userId}-${Date.now()}.jpg`;
      
      await uploadData({
        path: fileName,
        data: compressedFile,
        options: { contentType: 'image/jpeg' }
      }).result;

      setProfile(prev => ({ ...prev, profilePicture: fileName }));
      const previewUrl = URL.createObjectURL(compressedFile);
      setImagePreview(previewUrl);

      setMessage(t('profile.imageUploaded'));
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      setMessage(t('profile.imageError'));
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    
    if (!profile.userName || profile.userName.trim().length < 3) {
      setMessage(t('profile.usernameMinLength'));
      return;
    }

    if (userNameAvailable === false) {
      setMessage(t('profile.usernameTaken'));
      return;
    }

    setSaving(true);
    setMessage('');
    const client = getClient('userPool');

    try {
      const { data: existingProfiles } = await client.models.UserProfile.list({
        filter: { userId: { eq: user.userId } }
      });

      const id = Math.floor(100000 + Math.random() * 900000);
      const bioUnida = `${id}|${ubicacion.pais}|${ubicacion.ciudad}|${ubicacion.frase}|${ubicacion.biografia}`;

      if (existingProfiles && existingProfiles.length > 0) {
        await client.models.UserProfile.update({
          id: existingProfiles[0].id,
          userId: user.userId,
          name: profile.name,
          userName: profile.userName,
          bio: bioUnida,
          offer: profile.offer,
          profilePicture: profile.profilePicture
        });
        setMessage(t('profile.updated'));
      } else {
        await client.models.UserProfile.create({
          userId: user.userId,
          name: profile.name,
          userName: profile.userName,
          bio: bioUnida,
          offer: profile.offer,
          profilePicture: profile.profilePicture
        });
        setMessage(t('profile.created'));
      }
      
      setProfile(prev => ({ ...prev, bio: bioUnida }));
    } catch (error) {
      console.error('Error guardando perfil:', error);
      setMessage(t('profile.saveError'));
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    const client = getClient('userPool');

    try {
      // ... (todo el código de eliminación se mantiene igual)
      const { data: userProfiles } = await client.models.UserProfile.list({
        filter: { userId: { eq: user.userId } }
      });

      if (userProfiles && userProfiles.length > 0) {
        const userProfile = userProfiles[0];
        
        if (userProfile.profilePicture) {
          try { await remove({ path: userProfile.profilePicture }); } catch {}
        }

        const { data: userImages } = await client.models.UserImage.list({
          filter: { userId: { eq: user.userId } }
        });

        if (userImages && userImages.length > 0) {
          for (const image of userImages) {
            try {
              await remove({ path: image.imagePath });
              await client.models.UserImage.delete({ id: image.id });
            } catch {}
          }
        }

        // Eliminar mensajes enviados y recibidos (código igual)
        const { data: sentMessages } = await client.models.Message.list({ filter: { senderId: { eq: user.userId } } });
        if (sentMessages) for (const msg of sentMessages) await client.models.Message.delete({ id: msg.id });

        const { data: receivedMessages } = await client.models.Message.list({ filter: { receiverId: { eq: user.userId } } });
        if (receivedMessages) for (const msg of receivedMessages) await client.models.Message.delete({ id: msg.id });

        await client.models.UserProfile.delete({ id: userProfile.id });
      }

      await deleteUser();
      
      alert(t('profile.accountDeleted'));
      window.location.href = '/';
    } catch (error) {
      console.error('Error eliminando cuenta:', error);
      alert(t('profile.deleteError'));
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return <div className="loading">{t('common.loading')}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <h2>{t('profile.title')}</h2>
          <p>{t('profile.email')}: {userEmail || user?.signInDetails?.loginId || t('profile.notAvailable')}</p>
        </div>

        <form onSubmit={handleSave} className="profile-form">
          {/* Foto de perfil */}
          <div className="form-group-image">
            <label>{t('profile.photo')}</label>
            <div className="image-upload-container">
              <div className="image-preview">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" />
                ) : (
                  <div className="no-image">
                    📷
                    <p>{t('profile.noPhoto')}</p>
                  </div>
                )}
              </div>
              <div className="upload-controls">
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  style={{ display: 'none' }}
                />
                <label htmlFor="imageUpload" className={`btn-upload ${uploadingImage ? 'disabled' : ''}`}>
                  {uploadingImage ? t('profile.processing') : t('profile.selectImage')}
                </label>
                <p className="image-hint">
                  {t('profile.imageHint')}
                </p>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">{t('profile.name')}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder={t('profile.namePlaceholder')}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">{t('profile.username')}</label>
            <div className="username-input-wrapper">
              <input
                type="text"
                id="username"
                name="userName"
                value={profile.userName}
                onChange={handleChange}
                placeholder={t('profile.usernamePlaceholder')}
                required
                pattern="^[a-zA-Z0-9_]{3,20}$"
                title={t('profile.usernameHint')}
                className={
                  profile.userName.length >= 3 
                    ? userNameAvailable === true ? 'input-success' 
                    : userNameAvailable === false ? 'input-error' 
                    : ''
                    : ''
                }
              />
              {checkingUsername && <span className="username-status checking">{t('profile.checking')}</span>}
              {!checkingUsername && userNameAvailable === true && <span className="username-status available">{t('profile.available')}</span>}
              {!checkingUsername && userNameAvailable === false && <span className="username-status taken">{t('profile.taken')}</span>}
            </div>
            <small className="username-hint">{t('profile.usernameHint')}</small>
          </div>

          <div className="form-group">
            <label htmlFor="pais">{t('profile.country')}</label>
            <input
              type="text"
              id="pais"
              name="pais"
              value={ubicacion.pais}
              onChange={handleChange}
              placeholder={t('profile.countryPlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ciudad">{t('profile.city')}</label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              value={ubicacion.ciudad}
              onChange={handleChange}
              placeholder={t('profile.cityPlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="frase">{t('profile.slogan')}</label>
            <input
              type="text"
              id="frase"
              name="frase"
              value={ubicacion.frase}
              onChange={handleChange}
              placeholder={t('profile.sloganPlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="biografia">{t('profile.bio')}</label>
            <textarea
              id="biografia"
              name="biografia"
              value={ubicacion.biografia}
              onChange={handleChange}
              placeholder={t('profile.bioPlaceholder')}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="offer">{t('profile.offer')}</label>
            <textarea
              id="offer"
              name="offer"
              value={profile.offer}
              onChange={handleChange}
              placeholder={t('profile.offerPlaceholder')}
              rows="3"
            />
          </div>

          <center>
            <button type="submit" className="btn" disabled={saving || uploadingImage}>
              <span className="icon">💾</span>
              <span className="label">
                {saving ? t('profile.saving') : t('profile.save')}
              </span>
            </button>
          </center>

          {message && (
            <div className={`message ${message.includes('❌') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </form>

        <br />
        <button onClick={() => navigate('/')} className="btn-outline">
          {t('profile.backHome')}
        </button>

        <div className="delete-account-section">
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="btn-delete-account"
          >
            🗑️ {t('profile.deleteAccount')}
          </button>
        </div>

        {/* Modal de confirmación */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-container">
              <h2>⚠️ {t('profile.deleteAccount')}</h2>
              <p>{t('profile.deleteWarning')}</p>
              <ul>
                <li>✅ {t('profile.deleteItem1')}</li>
                <li>✅ {t('profile.deleteItem2')}</li>
                <li>✅ {t('profile.deleteItem3')}</li>
                <li>✅ {t('profile.deleteItem4')}</li>
              </ul>
              <p className="delete-confirm-text">{t('profile.deleteConfirm')}</p>
              <div className="modal-buttons">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="btn-cancel"
                  disabled={deleting}
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="btn-confirm-delete"
                  disabled={deleting}
                >
                  {deleting ? '⏳ ' + t('profile.deleting') : '🗑️ ' + t('profile.confirmDelete')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;