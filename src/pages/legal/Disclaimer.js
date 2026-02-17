import React from 'react';
import { Link } from 'react-router-dom';
import './Legal.css';

function Disclaimer() {
  const lastUpdate = new Date().toLocaleDateString('es-ES');

  return (
    <div className="legal-container">
      <h1>⚖️ Disclaimer Legal</h1>

      <div className="alert alert-warning">
        <strong>Importante:</strong> Lea atentamente este disclaimer antes de usar la plataforma.
      </div>

      <div className="legal-section">
        <h2>1. Limitación de Responsabilidad</h2>
        <p>
          Este software se proporciona "TAL CUAL" sin garantías de ningún tipo, ya sean expresas o implícitas,
          incluyendo, pero no limitado a, garantías implícitas de comerciabilidad, idoneidad para un propósito
          particular y no infracción.
        </p>
      </div>

      <div className="legal-section">
        <h2>2. Exención de Garantías</h2>
        <p>Los desarrolladores NO garantizan que:</p>
        <ul>
          <li>El servicio estará disponible sin interrupciones</li>
          <li>Los errores serán corregidos</li>
          <li>El servicio estará libre de virus o componentes dañinos</li>
          <li>Los resultados del uso del servicio serán precisos o confiables</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>3. Responsabilidades del Usuario</h2>
        <p>El usuario es el único responsable de:</p>
        <ul>
          <li>El uso que haga de la información proporcionada en la plataforma</li>
          <li>Cumplir con las leyes locales, estatales, nacionales e internacionales</li>
          <li>Obtener los consentimientos necesarios de terceros</li>
          <li>La seguridad de sus credenciales de acceso</li>
          <li>Las consecuencias de cualquier acción tomada basada en la información del servicio</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>4. Protección de Datos</h2>
        <p>
          El usuario declara ser consciente de sus obligaciones bajo las leyes de protección de datos aplicables
          (GDPR, CCPA, etc.) y se compromete a cumplir con todas las regulaciones pertinentes.
        </p>
      </div>

      <div className="legal-section">
        <h2>5. Indemnización</h2>
        <p>
          El usuario acuerda indemnizar, defender y eximir de responsabilidad a los desarrolladores de cualquier
          reclamo, pérdida, responsabilidad, daño, costo o gasto (incluyendo honorarios razonables de abogados)
          que surja del uso del servicio.
        </p>
      </div>

      <div className="legal-section">
        <h2>6. Sin Garantía de Disponibilidad</h2>
        <p>
          No garantizamos que el servicio esté disponible en todo momento. Podemos suspender, retirar, descontinuar
          o cambiar cualquier aspecto del servicio sin previo aviso.
        </p>
      </div>

      <div className="legal-section">
        <h2>7. Modificaciones</h2>
        <p>
          Nos reservamos el derecho de modificar estos términos en cualquier momento.
          El uso continuado del servicio constituye la aceptación de dichas modificaciones.
        </p>
      </div>

      <div className="legal-section">
        <h2>8. Jurisdicción</h2>
        <p>
          Estos términos se rigen por las leyes aplicables, sin tener en cuenta sus disposiciones
          sobre conflictos de leyes.
        </p>
      </div>

      <div className="alert alert-danger">
        <strong>⚠️ USO BAJO SU PROPIO RIESGO</strong><br />
        Al usar esta plataforma, usted acepta expresamente que el uso es bajo su propio riesgo.
      </div>

      <div className="legal-footer">
        <small>Última actualización: {lastUpdate}</small>
        <Link to="/" className="btn-back">Volver al inicio</Link>
      </div>
    </div>
  );
}

export default Disclaimer;