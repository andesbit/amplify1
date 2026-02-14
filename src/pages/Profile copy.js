import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';
import { uploadData, getUrl, remove } from 'aws-amplify/storage';
import { generateClient } from 'aws-amplify/data';
import './Profile.css';

const client = generateClient();

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    bio: '',
    offer: '',
    profilePicture: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    loadUserProfile();
  }, []);

  async function loadUserProfile() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      const { data: profiles } = await client.models.UserProfile.list({
        filter: { userId: { eq: currentUser.userId } }
      });

      if (profiles && profiles.length > 0) {
        const userProfile = profiles[0];
        setProfile({
          name: userProfile.name || '',
          age: userProfile.age || '',
          bio: userProfile.bio || '',
          offer: userProfile.offer || '',
          profilePicture: userProfile.profilePicture || ''
        });

        // Cargar imagen si existe
        if (userProfile.profilePicture) {
          loadProfileImage(userProfile.profilePicture);
        }
      }
    } catch (error) {
      console.log('Error cargando perfil:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }

  async function loadProfileImage(imagePath) {
    try {
      const result = await getUrl({
        path: imagePath
      });
      setImagePreview(result.url.toString());
    } catch (error) {
      console.error('Error cargando imagen:', error);
    }
  }

  async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setMessage('❌ Por favor selecciona una imagen válida');
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage('❌ La imagen debe ser menor a 5MB');
      return;
    }

    setUploadingImage(true);
    setMessage('');

    try {
      // Generar nombre único para la imagen
      const fileExtension = file.name.split('.').pop();
      const fileName = `profile-pictures/${user.userId}-${Date.now()}.${fileExtension}`;

      // Eliminar imagen anterior si existe
      if (profile.profilePicture) {
        try {
          await remove({ path: profile.profilePicture });
        } catch (error) {
          console.log('No se pudo eliminar imagen anterior:', error);
        }
      }

      // Subir nueva imagen
      const result = await uploadData({
        path: fileName,
        data: file,
        options: {
          contentType: file.type
        }
      }).result;

      // Actualizar estado local
      setProfile(prev => ({
        ...prev,
        profilePicture: result.path
      }));

      // Crear preview local
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setMessage('✅ Imagen subida correctamente. No olvides guardar el perfil.');
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      setMessage('❌ Error al subir la imagen');
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const { data: existingProfiles } = await client.models.UserProfile.list({
        filter: { userId: { eq: user.userId } }
      });

      if (existingProfiles && existingProfiles.length > 0) {
        await client.models.UserProfile.update({
          id: existingProfiles[0].id,
          name: profile.name,
          age: profile.age ? parseInt(profile.age) : null,
          bio: profile.bio,
          offer: profile.offer,
          profilePicture: profile.profilePicture
        });
        setMessage('✅ Perfil actualizado correctamente');
      } else {
        await client.models.UserProfile.create({
          userId: user.userId,
          name: profile.name,
          age: profile.age ? parseInt(profile.age) : null,
          bio: profile.bio,
          offer: profile.offer,
          profilePicture: profile.profilePicture
        });
        setMessage('✅ Perfil creado correctamente');
      }
    } catch (error) {
      console.error('Error guardando perfil:', error);
      setMessage('❌ Error al guardar el perfil');
    } finally {
      setSaving(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  }

  if (loading) {
    return <div className="loading">Cargando perfil...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <h2>Mi Perfil</h2>
          <p>Email: {user?.signInDetails?.loginId}</p>
        </div>

        <form onSubmit={handleSave} className="profile-form">
          {/* Foto de perfil */}
          <div className="form-group-image">
            <label>Foto de Perfil</label>
            <div className="image-upload-container">
              <div className="image-preview">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" />
                ) : (
                  <div className="no-image">
                    📷
                    <p>Sin foto</p>
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
                <label htmlFor="imageUpload" className="btn-upload">
                  {uploadingImage ? 'Subiendo...' : 'Seleccionar Imagen'}
                </label>
                <p className="image-hint">JPG, PNG o GIF (máx. 5MB)</p>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Edad</label>
            <input
              type="number"
              id="age"
              name="age"
              value={profile.age}
              onChange={handleChange}
              placeholder="Ingresa tu edad"
              min="1"
              max="120"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Biografía</label>
            <textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              placeholder="Cuéntanos sobre ti..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="offer">Oferta/Servicio</label>
            <textarea
              id="offer"
              name="offer"
              value={profile.offer}
              onChange={handleChange}
              placeholder="¿Qué ofreces? Describe tus servicios o productos..."
              rows="3"
            />
          </div>

          <button type="submit" className="btn-save" disabled={saving || uploadingImage}>
            {saving ? 'Guardando...' : 'Guardar Perfil'}
          </button>

          {message && (
            <div className={`message ${message.includes('❌') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </form>

        <button onClick={() => navigate('/dashboard')} className="btn-back">
          Volver al Dashboard
        </button>
      </div>
    </div>
  );
}

export default Profile;
