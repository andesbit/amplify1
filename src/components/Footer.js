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
          <div className="footer-logo">
            <Link 
              to="/images/SKM_C654e25112616540.pdf" 
              download="InformeFinal.pdf" 
              className="footer-download" 
              title="Descargar informe"
            >
              📄
            </Link>
          </div>
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