import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';
//import { generateClient } from 'aws-amplify/data';
import './AddUser.css';
import { getClient } from '../utils/apiClient.js';

//const client = generateClient();

function AddUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    age: '',
    bio: '',
    offer: ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      await getCurrentUser();
    } catch (error) {
      navigate('/login');
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    const client = getClient('userPool');
    try {
      const currentUser = await getCurrentUser();
      const randomId = `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      await client.models.UserProfile.create({
        userId: randomId,
        name: form.name,
        age: form.age ? parseInt(form.age) : null,
        bio: form.bio,
        offer: form.offer
      });

      setMessage('✅ Usuario agregado correctamente');
      setForm({ name: '', age: '', bio: '', offer: '' });
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
            <label htmlFor="age">Edad</label>
            <input
              type="number"
              id="age"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Ej: 25"
              min="1"
              max="120"
            />
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

          <button type="submit" className="btn-save" disabled={saving}>
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
          <button onClick={() => navigate('/dashboard')} className="btn-back">
            Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
