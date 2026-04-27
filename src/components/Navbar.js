import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOut, fetchAuthSession } from 'aws-amplify/auth';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector.js';
import DarkModeToggle from './DarkModeToggle.js';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const { t } = useTranslation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, [location]);

  // Cerrar menú automáticamente al cambiar de página
  useEffect(() => {
    setMenuOpen(false);
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
      console.error('Error al cerrar sesión:', error);
    }
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className="navbar">
      {/* Language Selector */}
      <div id="spetialLS">
        <LanguageSelector />
        <DarkModeToggle />  {/* ← NUEVO */}
      </div>

      <div className="navbar-container">
        
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="o">&nbsp;O</span>
          <span className="fertio">fertio</span>
        </Link>

        {/* Botón hamburguesa */}
        <button 
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menú */}
        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              {t('nav.home')}
            </Link>
          </li>

          <li>
            <Link 
              to="/ayuda"
              className={location.pathname === '/ayuda' ? 'active' : ''}
            >
              {t('nav.help')}
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link 
                  to="/inbox"
                  className={location.pathname === '/inbox' ? 'active' : ''}
                >
                  {t('nav.messages')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile"
                  className={location.pathname === '/profile' ? 'active' : ''}
                >
                  {t('nav.profile')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/gallery"
                  className={location.pathname === '/gallery' ? 'active' : ''}
                >
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/users"
                  className={location.pathname === '/users' ? 'active' : ''}
                >
                  {t('nav.users')}
                </Link>
              </li>
              <li>
                <button 
                  onClick={handleSignOut} 
                  className="logout-link"
                >
                  {t('nav.logout')}
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link 
                to="/login"
                className={`login-link ${location.pathname === '/login' ? 'active' : ''}`}
              >
                {t('nav.login')}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;