import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        
        <div className="footer-row">
          <div className="footer-col">
            <h3>Ofertio</h3>
            <p>{t('footer.tagline')}</p>
          </div>
        </div>

        <div className="footer-row">
          <div className="footer-col">
            <p className="footer-copyright">
              &copy; {currentYear} Ofertio. {t('footer.copyright')}
            </p>
          </div>
          <div className="footer-col">
            <ul className="footer-links">
              <li><Link to="/terminos">{t('footer.terms')}</Link></li>
              <li><Link to="/privacidad">{t('footer.privacy')}</Link></li>
              <li><Link to="/disclaimer">{t('footer.disclaimer')}</Link></li>
            </ul>
          </div>
        </div>

        <p className="footer-disclaimer">
          {t('footer.serviceDisclaimer')}
        </p>

        <div className="footer-bottom">
          {/* 
          <div className="footer-logo">
            <a                    
              href="https://www.paypal.com/donate/?business=LNJF5ZCQMVBTE&no_recurring=0&currency_code=USD"
              target="_blank"
              rel="noreferrer"
              className="footer-donate"
              title="Apoyar con una donación"
            >
              {t('footer.donate')}
            </a>
          </div>
          */}

          <div className="footer-credits">
            {t('footer.developedBy')}{' '}
            <a 
              href="https://andesbit.com/" 
              target="_blank" 
              rel="noreferrer"
            >
              <strong>Andesbit</strong>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;