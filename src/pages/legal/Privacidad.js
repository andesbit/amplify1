import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Legal.css';

function Privacidad() {
  const { t } = useTranslation();
  const lastUpdate = new Date().toLocaleDateString('es-ES');

  return (
    <div className="legal-container">
      <h1>{t('privacy.title')}</h1>

      <div className="alert alert-info">
        <strong>{t('privacy.welcome')}</strong> {t('privacy.welcomeText')}
      </div>

      <div className="legal-card">
        <h2>{t('privacy.section1Title')}</h2>
        <p>{t('privacy.section1Intro')}</p>
        <ul>
          <li><strong>{t('privacy.section1Account')}</strong></li>
          <li><strong>{t('privacy.section1Offers')}</strong></li>
          <li><strong>{t('privacy.section1Usage')}</strong></li>
          <li><strong>{t('privacy.section1Cookies')}</strong></li>
        </ul>
      </div>

      <div className="legal-card">
        <h2>{t('privacy.section2Title')}</h2>
        <p>{t('privacy.section2Intro')}</p>
        <ul>
          <li>{t('privacy.section2Item1')}</li>
          <li>{t('privacy.section2Item2')}</li>
          <li>{t('privacy.section2Item3')}</li>
          <li>{t('privacy.section2Item4')}</li>
          <li>{t('privacy.section2Item5')}</li>
          <li>{t('privacy.section2Item6')}</li>
        </ul>
      </div>

      <div className="legal-card">
        <h2>{t('privacy.section3Title')}</h2>
        <p>
          <strong>{t('privacy.section3NoSell')}</strong> {t('privacy.section3Intro')}
        </p>
        <ul>
          <li>{t('privacy.section3Item1')}</li>
          <li>{t('privacy.section3Item2')}</li>
          <li>{t('privacy.section3Item3')}</li>
          <li>{t('privacy.section3Item4')}</li>
        </ul>
      </div>

      <div className="legal-card">
        <h2>{t('privacy.section4Title')}</h2>
        <p>{t('privacy.section4Intro')}</p>
        <ul>
          <li>{t('privacy.section4Item1')}</li>
          <li>{t('privacy.section4Item2')}</li>
          <li>{t('privacy.section4Item3')}</li>
          <li>{t('privacy.section4Item4')}</li>
        </ul>
        <div className="alert alert-warning" style={{marginTop: '1rem', marginBottom: 0}}>
          <small>
            <strong>Nota:</strong> {t('privacy.section4Note')}
          </small>
        </div>
      </div>

      <div className="legal-card">
        <h2>{t('privacy.section5Title')}</h2>
        <p>{t('privacy.section5Intro')}</p>
        <ul>
          <li><strong>{t('privacy.section5Access')}</strong></li>
          <li><strong>{t('privacy.section5Correction')}</strong></li>
          <li><strong>{t('privacy.section5Deletion')}</strong></li>
          <li><strong>{t('privacy.section5Portability')}</strong></li>
          <li><strong>{t('privacy.section5Objection')}</strong></li>
        </ul>
        <p style={{marginTop: '0.5rem'}}>
          <small>{t('privacy.section5Contact')}</small>
        </p>
      </div>

      <div className="legal-card">
        <h2>{t('privacy.section6Title')}</h2>
        <p>{t('privacy.section6Text')}</p>
      </div>

      <div className="legal-card">
        <h2>{t('privacy.section7Title')}</h2>
        <p>{t('privacy.section7Text')}</p>
      </div>

      <div className="legal-card">
        <h2>{t('privacy.section8Title')}</h2>
        <p>{t('privacy.section8Text')}</p>
      </div>

      <div className="legal-card">
        <h2>{t('privacy.section9Title')}</h2>
        <p>{t('privacy.section9Text')}</p>
      </div>

      <div className="legal-footer">
        <small>{t('privacy.lastUpdated')} {lastUpdate}</small>
        <Link to="/" className="btn-back">{t('privacy.backToHome')}</Link>
      </div>
    </div>
  );
}

export default Privacidad;