// src/components/DarkModeToggle.js
import React, { useState, useEffect } from 'react';
import './DarkModeToggle.css';

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Cargar preferencia guardada
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    // Aplicar clase al body
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Guardar preferencia
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <button 
      onClick={toggleDarkMode} 
      className="dark-mode-toggle"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
}

export default DarkModeToggle;