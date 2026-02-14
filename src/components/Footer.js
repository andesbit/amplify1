import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOut, fetchAuthSession } from 'aws-amplify/auth';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/*<Link to="/" className="navbar-logo">
          <span>🚀</span>
          <h1>Mi Aplicación</h1>
        </Link>
        */}    
        <div className="row">
            <div className="col-md-6">
                <p className="footer-copyright">
                    © 2025 Ofertio. Todos los derechos reservados.
                </p>
            </div>
            <div className="col-md-6">
                <ul className="footer-links">
                    <li><Link to="/terminos">Términos de Uso</Link></li>
                    <li><Link to="/privacidad">Política de Privacidad</Link></li>
                    <li><Link to="/disclaimer">Disclaimer</Link></li>
                </ul>
            </div>
        </div>
        
        <div className="row">
            <div className="col-12">
                <p className="footer-disclaimer">
                    Este servicio se proporciona "tal cual" sin garantías. 
                    El uso de esta plataforma es bajo su propio riesgo.
                </p>
            </div>
        </div>
        
        <div className="footer-bottom">
            <div className="footer-logo">
                {/*<img src="/images/mysqlite-logo.svg" alt="MySQL Logo" />
                */}
                <Link to="/images/SKM_C654e25112616540.pdf" 
                   download="InformeFinal.pdf" 
                   class="footer-download" 
                   title="Descargar informe">
                    📄
                </Link>
            </div>
            <div className="footer-credits">
                Desarrollado por <Link href = "https://andesbit.com/"><strong>Andesbit</strong></Link>
            </div>
        </div>        
      </div>
    </footer>
  );
}

export default Footer;
