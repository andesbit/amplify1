import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        
        <div className="footer-row">
          <div className="footer-col">
            <h3>Ofertio</h3>
            <p>Conectando personas y oportunidades</p>
          </div>
        </div>

        <div className="footer-row">
          <div className="footer-col">
            <p className="footer-copyright">
              &copy; {currentYear} Ofertio. Todos los derechos reservados.
            </p>
          </div>
          <div className="footer-col">
            <ul className="footer-links">
              <li><Link to="/terminos">Términos de Uso</Link></li>
              <li><Link to="/privacidad">Política de Privacidad</Link></li>
              <li><Link to="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <p className="footer-disclaimer">
          Este servicio se proporciona "tal cual" sin garantías.
          El uso de esta plataforma es bajo su propio riesgo.
        </p>

        <div className="footer-bottom">
         {/* <div className="footer-logo">
            <a                    
              href="https://www.paypal.com/donate/?business=LNJF5ZCQMVBTE&no_recurring=0&currency_code=USD"
              target="_blank"
              rel="noreferrer"
              className="footer-donate"
              title="Apoyar con una donación"
            >
              💝 Donar
            </a>
          </div>
          */}
          <div className="footer-credits">
            Desarrollado por{' '}
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