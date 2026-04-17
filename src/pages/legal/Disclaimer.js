import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Legal.css';

function Disclaimer() {
  const { t } = useTranslation();
  const lastUpdate = new Date().toLocaleDateString('es-ES');

  return (
    <div className="legal-container">
      <h1>{t('disclaimer.title')}</h1>

      <div className="alert alert-warning">
        <strong>{t('disclaimer.important')}</strong> {t('disclaimer.importantText')}
      </div>

      <div className="legal-section">
        <h2>{t('disclaimer.section1Title')}</h2>
        <p>{t('disclaimer.section1Text')}</p>
      </div>

      <div className="legal-section">
        <h2>{t('disclaimer.section2Title')}</h2>
        <p>{t('disclaimer.section2Intro')}</p>
        <ul>
          <li>{t('disclaimer.section2Item1')}</li>
          <li>{t('disclaimer.section2Item2')}</li>
          <li>{t('disclaimer.section2Item3')}</li>
          <li>{t('disclaimer.section2Item4')}</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>{t('disclaimer.section3Title')}</h2>
        <p>{t('disclaimer.section3Intro')}</p>
        <ul>
          <li>{t('disclaimer.section3Item1')}</li>
          <li>{t('disclaimer.section3Item2')}</li>
          <li>{t('disclaimer.section3Item3')}</li>
          <li>{t('disclaimer.section3Item4')}</li>
          <li>{t('disclaimer.section3Item5')}</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>{t('disclaimer.section4Title')}</h2>
        <p>{t('disclaimer.section4Text')}</p>
      </div>

      <div className="legal-section">
        <h2>{t('disclaimer.section5Title')}</h2>
        <p>{t('disclaimer.section5Text')}</p>
      </div>

      <div className="legal-section">
        <h2>{t('disclaimer.section6Title')}</h2>
        <p>{t('disclaimer.section6Text')}</p>
      </div>

      <div className="legal-section">
        <h2>{t('disclaimer.section7Title')}</h2>
        <p>{t('disclaimer.section7Text')}</p>
      </div>

      <div className="legal-section">
        <h2>{t('disclaimer.section8Title')}</h2>
        <p>{t('disclaimer.section8Text')}</p>
      </div>

      <div className="alert alert-danger">
        <strong>{t('disclaimer.riskWarning')}</strong><br />
        {t('disclaimer.riskText')}
      </div>

      <div className="legal-footer">
        <small>{t('disclaimer.lastUpdated')} {lastUpdate}</small>
        <Link to="/" className="btn-back">{t('disclaimer.backToHome')}</Link>
      </div>
    </div>
  );
}

export default Disclaimer;