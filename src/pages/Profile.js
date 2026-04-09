
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
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
  // Estado separado para los inputs temporales
  const [ubicacion, setUbicacion] = useState({
    pais: '',
    ciudad: '',
    frase: '',
    biografia: ''
  });

  // Estados para los tres campos
//  const [pais, setPais] = useState('');
//  const [ciudad, setCiudad] = useState('');
 // const [frase, setFrase] = useState('');
 // const [biografia, setBiografia] = useState('');

  // Estado para la cadena resultante
 // const [cadena, setCadena] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [userEmail, setUserEmail] = useState('');

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
   // separarCampos();
  }, []);
  
  // Cargar y separar la bio cuando se monta el componente o cambia profile.bio
  useEffect(() => {
    const { pais, ciudad, frase, biografia } = separarBio(profile.bio);
    setUbicacion({ pais, ciudad, frase, biografia });
  }, [profile.bio]);   // Solo se ejecuta cuando bio cambia

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
      await loadUserEmail();  // ← AGREGA ESTA LÍNEA AL FINAL
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
  
  
  //-------------------------------------------------------------------
  // Función para unir los campos
  /*const unirCampos = () => {
    //if (!pais && !ciudad && !frase && !biografia) {
    //  alert('Por favor ingresa al menos un campo');
    //  return;
    //}

    // Generar número identificatorio aleatorio de 6 dígitos
    const id = Math.floor(100000 + Math.random() * 900000);

    // Crear la cadena unida: ID|campo1|campo2|campo3
    const nuevaCadena = `${id}|${pais}|${ciudad}|${frase}|${biografia}`;

    setCadena(nuevaCadena);
    alert(`¡Campos unidos exitosamente!\nID generado: ${cadena}`);
  };
*/
  // Función para separar los campos
  /*
  const separarCampos = () => {

    setCadena(profile.bio);
    
    if (!cadena.trim()) {
//      alert('El campo de texto está vacío. Primero une los campos.');
      return;
    }

    const partes = cadena.trim().split('|');

    if (partes.length !== 4) {
      alert('Formato incorrecto.\nLa cadena debe tener el formato: ID|campo1|campo2|campo3');
      return;
    }

    const id = partes[0];
    const valor1 = partes[1] || '';
    const valor2 = partes[2] || '';
    const valor3 = partes[3] || '';
    const valor4 = partes[4] || '';

    // Actualizar los estados
    setPais(valor1);
    setCiudad(valor2);
    setFrase(valor3);
    setBiografia(valor4);

    alert(`¡Campos separados correctamente!\nID recuperado: ${id}`);
  };
  */
  // Función para separar bio en ciudad y pais
  const separarBio = (bioTexto) => {
    //if (!bioTexto || typeof bioTexto !== 'string') {
    //  return { ciudad: '', pais: '' };
    //}

    //const partes = bioTexto.split(',').map(part => part.trim());
    if (bioTexto === undefined)bioTexto="";
    const partes = bioTexto.trim().split('|');

    //if (partes.length !== 4) {
    //  alert('Formato incorrecto.\nLa cadena debe tener el formato: ID|campo1|campo2|campo3');
    //  return;
    //}

    const id = partes[0];
    const valor1 = partes[1] || '';
    const valor2 = partes[2] || '';
    const valor3 = partes[3] || '';
    const valor4 = partes[4] || '';
    
    return {
      	pais: valor1,
        ciudad: valor2,
        frase: valor3,
        biografia: valor4
      };
    
    /*

    if (partes.length >= 2) {
      return {
        ciudad: partes[0],
        pais: partes.slice(1).join(', ')  // por si el país tiene coma
      };
    } else {
      // Si no hay coma, asumimos que todo es ciudad
      return {
        ciudad: bioTexto.trim(),
        pais: ''
      };
    }
    */
  };
  //---------------------------------------------------------------------------

  
  
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

/*
  function handleBio(e) {
    const { name, value } = e.target;
    unirCampos();
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  }
  */
  function handleChange(e) {
    const { name, value } = e.target;
    // Si el cambio viene de los inputs de ubicación
    if (name === 'ciudad' || name === 'pais' || name === 'frase' || name === 'biografia') {
      setUbicacion(prev => {
        const nuevoUbicacion = {
          ...prev,
          [name]: value
        };

        // Construimos la bio automáticamente
        if(nuevoUbicacion.pais === undefined)nuevoUbicacion.pais = "";
        if(nuevoUbicacion.ciudad === undefined)nuevoUbicacion.ciudad = "";
        if(nuevoUbicacion.frase === undefined)nuevoUbicacion.frase = "";
        if(nuevoUbicacion.biografia === undefined)nuevoUbicacion.biografia = "";
        const pais = nuevoUbicacion.pais.trim();
        const ciudad = nuevoUbicacion.ciudad.trim();
        const frase = nuevoUbicacion.frase.trim();
        const biografia = nuevoUbicacion.biografia.trim();

        let nuevaBio = '';
        
         // Generar número identificatorio aleatorio de 6 dígitos
    	const id = Math.floor(100000 + Math.random() * 900000);

    // Crear la cadena unida: ID|campo1|campo2|campo3
    	 nuevaBio = `${id}|${pais}|${ciudad}|${frase}|${biografia}`;
    
//        if (ciudad && pais) {
 //         nuevaBio = `${ciudad}, ${pais}`;
  //      } else if (ciudad) {
   //       nuevaBio = ciudad;
    //    } else if (pais) {
     //     nuevaBio = pais;
      //  }

        // Actualizamos profile.bio
        setProfile(prevProfile => ({
          ...prevProfile,
          bio: nuevaBio
        }));

        return nuevoUbicacion;
      });
    } 
    // Para los demás campos del profile
    else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
    //setProfile(prev => ({
    //  ...prev,
    //  [name]: value
    //}));
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
          <p>Email: {userEmail || user?.signInDetails?.loginId || 'No disponible'}</p>
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
            <label htmlFor="pais">País</label>            
            <input
              type="text"
              id="pais"
              name="pais"
              value={ubicacion.pais}
              onChange={handleChange}
              placeholder="tu país..."                
            />
          </div>

          <div className="form-group">
            <label htmlFor="ciudad">Ciudad</label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              value={ubicacion.ciudad}
              onChange={handleChange}
              placeholder="tu ciudad..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Frase de propaganda</label>
            <input
              type="text"
              id="frase"
              name="frase"
              value={ubicacion.frase}
              onChange={handleChange}
              placeholder="Eslogan o lema..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="biografia">Biografía (opcional)</label>
            <textarea
              id="biografia"
              name="biografia"
              value={ubicacion.biografia}
              onChange={handleChange}
              placeholder="Cuéntanos sobre ti..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="offer">Oferta/Servicio/Especialidades</label>
            <textarea
              id="offer"
              name="offer"
              value={profile.offer}
              onChange={handleChange}
              placeholder="¿Qué ofreces? Describe tus servicios, especialidades o productos..."
              rows="3"
            />
          </div>
<center>
          <button type="submit" className="btn" disabled={saving || uploadingImage}>


  <span className="icon">
      
      <svg className="disk" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
        <polyline points="17 21 17 13 7 13 7 21"/>
        <polyline points="7 3 7 8 15 8"/>
      </svg>
      
      <span className="check">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </span>
    </span>
    <span className="label">
      {saving ? 'Guardando...' : 'Guardar Perfil'}
    </span>
    <span className="bar"></span>

          </button>
</center>
          {message && (
            <div className={`message ${message.includes('❌') ? 'error' : message.includes('...') ? 'info' : 'success'}`}>
              {message}
            </div>
          )}
        </form>
        <br />
        <button onClick={() => navigate('/')} className="btn-outline">
          <span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Volver al inicio
          </span>
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
