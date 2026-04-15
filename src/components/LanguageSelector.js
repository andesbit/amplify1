import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSelector.css';

function LanguageSelector() {
  const { i18n } = useTranslation();

  function changeLanguage(lng) {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  }

  return (
    <div className="language-selector">
      <button
        onClick={() => changeLanguage('es')}
        className={i18n.language === 'es' ? 'active' : ''}
      >
        ES
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={i18n.language === 'en' ? 'active' : ''}
      >
        EN
      </button>
    </div>
  );
}

export default LanguageSelector;