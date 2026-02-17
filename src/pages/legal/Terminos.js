import React from 'react';
import { Link } from 'react-router-dom';
import './Legal.css';

function Terminos() {
  const lastUpdate = new Date().toLocaleDateString('es-ES');

  return (
    <div className="legal-container">
      <h1>📜 Términos de Uso</h1>

      <div className="alert alert-info">
        <strong>Bienvenido:</strong> Al utilizar esta plataforma, usted acepta los siguientes términos y condiciones.
      </div>

      <div className="legal-card">
        <h2>1. Aceptación de los Términos</h2>
        <p>
          Al acceder y utilizar este servicio, usted acepta estar sujeto a estos términos de uso y todas las
          leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, no utilice este servicio.
        </p>
      </div>

      <div className="legal-card">
        <h2>2. Uso del Servicio</h2>
        <p>Usted se compromete a:</p>
        <ul>
          <li>Proporcionar información veraz y actualizada</li>
          <li>No usar el servicio para fines ilegales o no autorizados</li>
          <li>No intentar acceder a cuentas de otros usuarios</li>
          <li>No transmitir virus, malware o código malicioso</li>
          <li>No acosar, abusar o dañar a otros usuarios</li>
        </ul>
      </div>

      <div className="legal-card">
        <h2>3. Cuenta de Usuario</h2>
        <p>
          Usted es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las
          actividades que ocurran bajo su cuenta. Debe notificar inmediatamente cualquier uso no autorizado.
        </p>
      </div>

      <div className="legal-card">
        <h2>4. Contenido del Usuario</h2>
        <p>
          Usted retiene todos los derechos sobre el contenido que publique. Sin embargo, al publicar contenido,
          nos otorga una licencia mundial, no exclusiva y libre de regalías para usar, reproducir y mostrar
          dicho contenido en relación con el servicio.
        </p>
      </div>

      <div className="legal-card">
        <h2>5. Terminación</h2>
        <p>
          Nos reservamos el derecho de suspender o terminar su acceso al servicio en cualquier momento,
          sin previo aviso, por conducta que consideremos inapropiada o por violación de estos términos.
        </p>
      </div>

      <div className="legal-card">
        <h2>6. Modificaciones</h2>
        <p>
          Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado
          del servicio después de dichas modificaciones constituye su aceptación de los nuevos términos.
        </p>
      </div>

      <div className="legal-card">
        <h2>7. Contacto</h2>
        <p>
          Si tiene preguntas sobre estos términos, puede contactarnos a través de los canales oficiales
          proporcionados en la plataforma.
        </p>
      </div>

      <div className="legal-footer">
        <small>Última actualización: {lastUpdate}</small>
        <Link to="/" className="btn-back">Volver al inicio</Link>
      </div>
    </div>
  );
}

export default Terminos;