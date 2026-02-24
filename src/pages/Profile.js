
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';
import { uploadData, getUrl, remove } from 'aws-amplify/storage';
//import { generateClient } from 'aws-amplify/data';
import { getClient } from '../utils/apiClient.js';
import imageCompression from 'browser-image-compression';
import './Profile.css';

//const client = generateClient();
import { deleteUser } from 'aws-amplify/auth';



function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    userName: '',
    bio: '',
    offer: '',
    profilePicture: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  // Estado para el modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [userNameAvailable, setUserNameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  // Debounce para no hacer queries a cada tecla
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

      // Si encuentra resultados y NO es el usuario actual
      if (data && data.length > 0) {
        const isCurrentUser = data[0].userId === user.userId;
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

    // Validar tamaño (máximo 10MB antes de comprimir)
    if (file.size > 10 * 1024 * 1024) {
      setMessage('❌ La imagen debe ser menor a 10MB');
      return;
    }

    setUploadingImage(true);
    setMessage('Comprimiendo imagen...');

    try {
      // Opciones de compresión
      const options = {
        maxSizeMB: 0.5,              // Tamaño máximo: 500KB
        maxWidthOrHeight: 800,        // Dimensión máxima: 800px
        useWebWorker: true,
        fileType: 'image/jpeg',       // Convertir a JPEG (más eficiente)
      };

      // Comprimir imagen
      const compressedFile = await imageCompression(file, options);
      
      console.log('Tamaño original:', (file.size / 1024 / 1024).toFixed(2), 'MB');
      console.log('Tamaño comprimido:', (compressedFile.size / 1024 / 1024).toFixed(2), 'MB');

      setMessage('Subiendo imagen...');

      // Generar nombre único para la imagen
      const fileExtension = 'jpg'; // Siempre guardar como JPG
      const fileName = `profile-pictures/${user.userId}-${Date.now()}.${fileExtension}`;

      // Eliminar imagen anterior si existe
      if (profile.profilePicture) {
        try {
          await remove({ path: profile.profilePicture });
        } catch (error) {
          console.log('No se pudo eliminar imagen anterior:', error);
        }
      }

      // Subir nueva imagen comprimida
      const result = await uploadData({
        path: fileName,
        data: compressedFile,
        options: {
          contentType: 'image/jpeg'
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
      reader.readAsDataURL(compressedFile);

      setMessage('✅ Imagen subida correctamente. No olvides guardar el perfil.');
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      setMessage('❌ Error al subir la imagen');
    } finally {
      setUploadingImage(false);
    }
  }

async function handleSave(e) {
  console.log('🔥 handleSave ejecutado!', e);
  e.preventDefault();
  
  console.log('1. profile:', profile);
  console.log('2. profile.userName:', profile.userName);
  console.log('3. userName length:', profile.userName?.trim().length);
  
  // Validación: username no puede estar vacío
  if (!profile.userName || profile.userName.trim().length < 3) {
    console.log('❌ DETENIDO: Username inválido');
    setMessage('❌ El nombre de usuario debe tener al menos 3 caracteres');
    return;
  }
  
  console.log('4. userNameAvailable:', userNameAvailable);
  
  // Bloquear si username no está disponible
  if (userNameAvailable === false) {
    console.log('❌ DETENIDO: Username no disponible');
    setMessage('❌ Ese nombre de usuario ya está en uso. Elige otro.');
    return;
  }
  
  console.log('5. Pasó validaciones, iniciando guardado...');
  setSaving(true);
  setMessage('');
  const client = getClient('userPool');
  
  console.log('6. Cliente obtenido:', client);
  
  try {
    console.log('7. user.userId:', user.userId);
    console.log('7b. Buscando perfiles existentes...');
    
    const { data: existingProfiles } = await client.models.UserProfile.list({
      filter: { userId: { eq: user.userId } }
    });
    
    console.log('8. Perfiles encontrados:', existingProfiles);
    
    if (existingProfiles && existingProfiles.length > 0) {
      console.log('9. Actualizando perfil existente...');
      console.log('Datos a actualizar:', {
        id: existingProfiles[0].id,
        userId: user.userId,
        name: profile.name,
        userName: profile.userName,
        bio: profile.bio,
        offer: profile.offer,
        profilePicture: profile.profilePicture
      });
      
      const result = await client.models.UserProfile.update({
        id: existingProfiles[0].id,
        userId: user.userId,
        name: profile.name,
        userName: profile.userName,
        bio: profile.bio,
        offer: profile.offer,
        profilePicture: profile.profilePicture
      });
      
      console.log('✅ Resultado update:', result);
      setMessage('✅ Perfil actualizado correctamente');
      
    } else {
      console.log('10. Creando nuevo perfil...');
      console.log('Datos a crear:', {
        userId: user.userId,
        name: profile.name,
        userName: profile.userName,
        bio: profile.bio,
        offer: profile.offer,
        profilePicture: profile.profilePicture
      });
      
      const result = await client.models.UserProfile.create({
        userId: user.userId,
        name: profile.name,
        userName: profile.userName,
        bio: profile.bio,
        offer: profile.offer,
        profilePicture: profile.profilePicture
      });
      
      console.log('✅ Resultado create:', result);
      console.log('🔍 Errores detallados:', result.errors);  // ← AGREGA ESTA LÍNEA

      setMessage('✅ Perfil creado correctamente');
    }
    
  } catch (error) {
    console.error('❌ Error completo:', error);
    console.error('❌ Error.message:', error.message);
    console.error('❌ Error.errors:', error.errors);
    setMessage('❌ Error al guardar el perfil: ' + error.message);
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

  async function handleDeleteAccount() {
    setDeleting(true);
    try {
      const client = getClient('userPool');

      // 1. Elimina imágenes de S3
      const { data: images } = await client.models.UserImage.list({
        filter: { userId: { eq: user.userId } }
      });
      for (const image of images) {
        try {
          await remove({ path: image.imageKey });
        } catch (error) {
          console.error('Error eliminando imagen:', error);
        }
      }

      // 2. Elimina foto de perfil de S3
      if (profile.profilePicture) {
        try {
          await remove({ path: profile.profilePicture });
        } catch (error) {
          console.error('Error eliminando foto de perfil:', error);
        }
      }

      // 3. Elimina registros UserImage de DynamoDB
      for (const image of images) {
        await client.models.UserImage.delete({ id: image.id });
      }

      // 4. Elimina mensajes de DynamoDB
      const { data: sentMessages } = await client.models.Message.list({
        filter: { senderId: { eq: user.userId } }
      });
      for (const message of sentMessages) {
        await client.models.Message.delete({ id: message.id });
      }

      const { data: receivedMessages } = await client.models.Message.list({
        filter: { receiverId: { eq: user.userId } }
      });
      for (const message of receivedMessages) {
        await client.models.Message.delete({ id: message.id });
      }

      // 5. Elimina UserProfile de DynamoDB
      const { data: profiles } = await client.models.UserProfile.list({
        filter: { userId: { eq: user.userId } }
      });
      if (profiles && profiles.length > 0) {
        await client.models.UserProfile.delete({ id: profiles[0].id });
      }

      // 6. Elimina cuenta de Cognito (debe ser lo último)
      await deleteUser();

      // 7. Redirige al inicio
      navigate('/');

    } catch (error) {
      console.error('Error eliminando cuenta:', error);
      setMessage('❌ Error al eliminar la cuenta. Intenta de nuevo.');
      setDeleting(false);
    }
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
                <label htmlFor="imageUpload" className={`btn-upload ${uploadingImage ? 'disabled' : ''}`}>
                  {uploadingImage ? 'Procesando...' : 'Seleccionar Imagen'}
                </label>
                <p className="image-hint">
                  JPG, PNG o GIF (se comprimirá a 500KB max)
                </p>
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

          {/*<div className="form-group">
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
          */}
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario (único) *</label>
            <div className="username-input-wrapper">
              <input
                type="text"
                id="username"
                name="userName"
                value={profile.userName}
                onChange={handleChange}
                placeholder="usuario_unico"
                required
                pattern="^[a-zA-Z0-9_]{3,20}$"
                title="Solo letras, números y guión bajo. Entre 3 y 20 caracteres."
                className={
                  profile.userName.length >= 3 
                    ? userNameAvailable === true 
                      ? 'input-success' 
                      : userNameAvailable === false 
                      ? 'input-error' 
                      : ''
                    : ''
                }
              />
              {checkingUsername && (
                <span className="username-status checking">⏳ Verificando...</span>
              )}
              {!checkingUsername && userNameAvailable === true && (
                <span className="username-status available">✅ Disponible</span>
              )}
              {!checkingUsername && userNameAvailable === false && (
                <span className="username-status taken">❌ Ya está en uso</span>
              )}
            </div>
            <small className="username-hint">
              Solo letras, números y guión bajo (_). Mínimo 3 caracteres.
            </small>
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
            <div className={`message ${message.includes('❌') ? 'error' : message.includes('...') ? 'info' : 'success'}`}>
              {message}
            </div>
          )}
        </form>
        
        <button onClick={() => navigate('/dashboard')} className="btn-back">
          Volver al Dashboard
        </button>



  {/* Botón eliminar cuenta */}
        <div className="delete-account-section">
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="btn-delete-account"
          >
            🗑️ Eliminar mi cuenta
          </button>
        </div>

        {/* Modal de confirmación */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-container">
              <h2>⚠️ Eliminar cuenta</h2>
              <p>Esta acción es <strong>irreversible</strong>. Se eliminarán:</p>
              <ul>
                <li>✅ Tu cuenta de acceso</li>
                <li>✅ Tu perfil y datos</li>
                <li>✅ Todas tus imágenes</li>
                <li>✅ Todos tus mensajes</li>
              </ul>
              <p>¿Estás seguro de que deseas eliminar tu cuenta?</p>
              <div className="modal-buttons">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="btn-cancel"
                  disabled={deleting}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="btn-confirm-delete"
                  disabled={deleting}
                >
                  {deleting ? '⏳ Eliminando...' : '🗑️ Sí, eliminar mi cuenta'}
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
