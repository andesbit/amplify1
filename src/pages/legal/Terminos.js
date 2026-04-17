import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Legal.css';

function Terminos() {
  const { t } = useTranslation();
  const lastUpdate = new Date().toLocaleDateString('es-ES');

  return (
    <div className="legal-container">
      <h1>{t('terms.title')}</h1>

      <div className="alert alert-info">
        <strong>{t('terms.welcome')}</strong> {t('terms.welcomeText')}
      </div>

      <div className="legal-card">
        <h2>{t('terms.section1Title')}</h2>
        <p>{t('terms.section1Text')}</p>
      </div>

      <div className="legal-card">
        <h2>{t('terms.section2Title')}</h2>
        <p>{t('terms.section2Intro')}</p>
        <ul>
          <li>{t('terms.section2Item1')}</li>
          <li>{t('terms.section2Item2')}</li>
          <li>{t('terms.section2Item3')}</li>
          <li>{t('terms.section2Item4')}</li>
          <li>{t('terms.section2Item5')}</li>
        </ul>
      </div>

      <div className="legal-card">
        <h2>{t('terms.section3Title')}</h2>
        <p>{t('terms.section3Text')}</p>
      </div>

      <div className="legal-card">
        <h2>{t('terms.section4Title')}</h2>
        <p>{t('terms.section4Text')}</p>
      </div>

      <div className="legal-card">
        <h2>{t('terms.section5Title')}</h2>
        <p>{t('terms.section5Text')}</p>
      </div>

      <div className="legal-card">
        <h2>{t('terms.section6Title')}</h2>
        <p>{t('terms.section6Text')}</p>
      </div>

      <div className="legal-card">
        <h2>{t('terms.section7Title')}</h2>
        <p>{t('terms.section7Text')}</p>
      </div>

      <div className="legal-footer">
        <small>{t('terms.lastUpdated')} {lastUpdate}</small>
        <Link to="/" className="btn-back">{t('terms.backToHome')}</Link>
      </div>
    </div>
  );
}

export default Terminos;