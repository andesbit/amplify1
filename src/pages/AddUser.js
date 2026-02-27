import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';
import './AddUser.css';
import { getClient } from '../utils/apiClient.js';

function AddUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    userName: '',
    bio: '',
    offer: ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  React.useEffect(() => {
    checkAuth();
  }, []);

  // Verificar disponibilidad del userName
  React.useEffect(() => {
    if (form.userName && form.userName.length >= 3) {
      const timeoutId = setTimeout(() => {
        checkUsernameAvailability(form.userName);
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setUsernameAvailable(null);
    }
  }, [form.userName]);

  async function checkAuth() {
    try {
      await getCurrentUser();
    } catch (error) {
      navigate('/login');
    }
  }

  async function checkUsernameAvailability(userName) {
    setCheckingUsername(true);
    const client = getClient('userPool');

    try {
      const { data } = await client.models.UserProfile.list({
        filter: { userName: { eq: userName } }
      });

      setUsernameAvailable(data && data.length === 0);
    } catch (error) {
      console.error('Error verificando userName:', error);
      setUsernameAvailable(null);
    } finally {
      setCheckingUsername(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validación: userName obligatorio
    if (!form.userName || form.userName.trim().length < 3) {
      setMessage('❌ El nombre de usuario debe tener al menos 3 caracteres');
      return;
    }

    // Validación: userName disponible
    if (usernameAvailable === false) {
      setMessage('❌ Ese nombre de usuario ya está en uso');
      return;
    }

    setSaving(true);
    setMessage('');
    const client = getClient('userPool');

    try {
      const currentUser = await getCurrentUser();
      const randomId = `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      await client.models.UserProfile.create({
        userId: randomId,
        name: form.name,
        userName: form.userName,
        bio: form.bio,
        offer: form.offer
      });

      setMessage('✅ Usuario agregado correctamente');
      setForm({ name: '', userName: '', bio: '', offer: '' });
      setUsernameAvailable(null);
    } catch (error) {
      console.error('Error agregando usuario:', error);
      setMessage('❌ Error al agregar usuario');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="add-user-container">
      <div className="add-user-content">
        <h2>Agregar Usuario de Prueba</h2>
        <p>Crea usuarios de prueba para probar la búsqueda</p>

        <form onSubmit={handleSubmit} className="add-user-form">
          <div className="form-group">
            <label htmlFor="name">Nombre *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ej: María González"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userName">Nombre de Usuario (único) *</label>
            <div className="username-input-wrapper">
              <input
                type="text"
                id="userName"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                placeholder="Ej: maria_gonzalez"
                required
                pattern="^[a-zA-Z0-9_]{3,20}$"
                title="Solo letras, números y guión bajo. Entre 3 y 20 caracteres."
                className={
                  form.userName.length >= 3 
                    ? usernameAvailable === true 
                      ? 'input-success' 
                      : usernameAvailable === false 
                      ? 'input-error' 
                      : ''
                    : ''
                }
              />
              {checkingUsername && (
                <span className="username-status checking">⏳ Verificando...</span>
              )}
              {!checkingUsername && usernameAvailable === true && (
                <span className="username-status available">✅ Disponible</span>
              )}
              {!checkingUsername && usernameAvailable === false && (
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
              value={form.bio}
              onChange={handleChange}
              placeholder="Ej: Desarrolladora web con 5 años de experiencia..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="offer">Oferta/Servicio</label>
            <textarea
              id="offer"
              name="offer"
              value={form.offer}
              onChange={handleChange}
              placeholder="Ej: Desarrollo web, consultoría..."
              rows="3"
            />
          </div>

          <button 
            type="submit" 
            className="btn-save" 
            disabled={saving || usernameAvailable === false}
          >
            {saving ? 'Agregando...' : 'Agregar Usuario'}
          </button>

          {message && (
            <div className={`message ${message.includes('❌') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </form>

        <div className="quick-actions">
          <button onClick={() => navigate('/users')} className="btn-view-users">
            Ver Usuarios
          </button>
          <button onClick={() => navigate('/')} className="btn-back">
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUser;