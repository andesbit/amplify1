import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOut, fetchAuthSession } from 'aws-amplify/auth';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, [location]);

  async function checkAuthStatus() {
    try {
      const session = await fetchAuthSession();
      setIsAuthenticated(!!session.tokens);
    } catch (error) {
      setIsAuthenticated(false);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      setIsAuthenticated(false);
      window.location.href = '/';
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span>🚀</span>
          <h1>Mi Aplicación</h1>
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Inicio
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link 
                  to="/dashboard"
                  className={location.pathname === '/dashboard' ? 'active' : ''}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/inbox"
                  className={location.pathname === '/inbox' ? 'active' : ''}
                >
                  📬 Mensajes
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile"
                  className={location.pathname === '/profile' ? 'active' : ''}
                >
                  Perfil
                </Link>
              </li>
              <li>
                <Link 
                  to="/gallery"
                  className={location.pathname === '/gallery' ? 'active' : ''}
                >
                  Galería
                </Link>
              </li>
              <li>
                <Link 
                  to="/users"
                  className={location.pathname === '/users' ? 'active' : ''}
                >
                  Usuarios
                </Link>
              </li>
              <li>
                <button onClick={handleSignOut} className="logout-link">
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link 
                to="/login"
                className={`login-link ${location.pathname === '/login' ? 'active' : ''}`}
              >
                Iniciar Sesión
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
