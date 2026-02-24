import React, { useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from 'react-router-dom';
import { fetchAuthSession, signInWithRedirect } from 'aws-amplify/auth';
import './Login.css';

// Componente auxiliar para manejar la redirección
function RedirectToDashboard({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (user) {
    return (
      <div className="login-box">
        <p>Redirigiendo al dashboard...</p>
      </div>
    );
  }

  return null;
}

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  async function checkAuthStatus() {
    try {
      const session = await fetchAuthSession();
      if (session.tokens) {
        navigate('/dashboard');
      }
    } catch (error) {
      // Usuario no autenticado
    }
  }

  const formFields = {
    signIn: {
      username: {
        placeholder: 'Ingresa tu correo electrónico',
        label: 'Correo Electrónico',
      },
    },
    signUp: {
      email: {
        order: 1,
        placeholder: 'Ingresa tu correo electrónico',
        label: 'Correo Electrónico',
      },
      password: {
        order: 2,
        placeholder: 'Crea una contraseña',
        label: 'Contraseña',
      },
      confirm_password: {
        order: 3,
        placeholder: 'Confirma tu contraseña',
        label: 'Confirmar Contraseña',
      },
    },
  };

  const components = {
    Header() {
      return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h2>Bienvenido</h2>
          <p>Inicia sesión o crea tu cuenta</p>
        </div>
      );
    },
    Footer() {
      return (
        <div style={{ textAlign: 'center', padding: '20px 0 0 0' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            margin: '20px 0'
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
            <span style={{ color: '#666', fontSize: '0.9rem' }}>O continúa con</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
          </div>
          <button
            onClick={() => signInWithRedirect({ provider: 'Google' })}
            className="btn-google"
          >
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Continuar con Google
          </button>
        </div>
      );
    }
  };

  return (
    <div className="login-container">
      <Authenticator
        formFields={formFields}
        components={components}
      >
        {({ user }) => <RedirectToDashboard user={user} />}
      </Authenticator>
    </div>
  );
}

export default Login;