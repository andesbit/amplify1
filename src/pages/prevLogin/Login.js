import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <Authenticator>
        {({ signOut, user }) => (
          <div className="login-box">
            <h2>¡Bienvenido {user.signInDetails.loginId}!</h2>
            <p>Has iniciado sesión correctamente</p>
            <button onClick={signOut} className="btn-signout">
              Cerrar Sesión
            </button>
            <button onClick={() => navigate('/')} className="btn-home">
              Volver al Inicio
            </button>
          </div>
        )}
      </Authenticator>
    </div>
  );
}

export default Login;