import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Ayuda.css';

function Ayuda() {
  const navigate = useNavigate();

  return (
    <div className="ayuda-container">
      <div className="ayuda-content">
        
        <div className="ayuda-header">
          <h1>❓ Ayuda - Cómo usar Ofertio</h1>
          <p>Guía completa para aprovechar al máximo la plataforma</p>
        </div>

        {/* Inscripción */}
        <section className="ayuda-section">
          <h2>📝 1. Inscripción</h2>
          <div className="ayuda-step">
            <h3>Crear una cuenta</h3>
            <ol>
              <li>Haz clic en <strong>"Iniciar Sesión"</strong> en el menú superior</li>
              <li>Selecciona la pestaña <strong>"Crear cuenta"</strong></li>
              <li>Ingresa tu correo electrónico y crea una contraseña segura</li>
              <li>Confirma tu correo (recibirás un código de verificación)</li>
              <li>O usa el botón <strong>"Continuar con Google"</strong> para registrarte con tu cuenta de Google</li>
            </ol>
            <div className="ayuda-tip">
              <strong>💡 Consejo:</strong> Usar Google es más rápido y no necesitas recordar otra contraseña.
            </div>
          </div>
        </section>

        {/* Completar Perfil */}
        <section className="ayuda-section">
          <h2>👤 2. Completar tu Perfil</h2>
          <div className="ayuda-step">
            <h3>Configuración inicial</h3>
            <p>Una vez registrado, ve a <strong>"Perfil"</strong> en el menú y completa tu información:</p>
            
            <div className="ayuda-field">
              <h4>📷 Foto de Perfil</h4>
              <ul>
                <li>Haz clic en <strong>"Seleccionar Imagen"</strong></li>
                <li>Elige una foto de tu dispositivo</li>
                <li>La imagen se comprimirá automáticamente (máximo 500KB)</li>
              </ul>
            </div>

            <div className="ayuda-field">
              <h4>✏️ Nombre Completo</h4>
              <ul>
                <li>Ingresa tu nombre real para que otros usuarios te reconozcan</li>
              </ul>
            </div>

            <div className="ayuda-field">
              <h4>🆔 Nombre de Usuario (único)</h4>
              <ul>
                <li>Crea un nombre de usuario único (sin espacios)</li>
                <li>Solo letras, números y guión bajo (_)</li>
                <li>Mínimo 3 caracteres, máximo 20</li>
                <li>Verás ✅ si está disponible o ❌ si ya está en uso</li>
              </ul>
            </div>

            <div className="ayuda-field">
              <h4>📖 Biografía</h4>
              <ul>
                <li>Cuéntanos sobre ti, tus intereses o experiencia</li>
                <li>Este campo es opcional pero ayuda a otros a conocerte mejor</li>
              </ul>
            </div>

            <div className="ayuda-field">
              <h4>💼 Oferta/Servicio</h4>
              <ul>
                <li>Describe qué servicios ofreces o qué estás buscando</li>
                <li>Ejemplos: "Clases de programación", "Diseño gráfico", "Asesoría legal"</li>
              </ul>
            </div>

            <p className="ayuda-important">
              <strong>⚠️ Importante:</strong> Haz clic en <strong>"Guardar Perfil"</strong> después de llenar la información.
            </p>
          </div>

          {/* Galería */}
          <div className="ayuda-step">
            <h3>🖼️ Agregar imágenes a tu Galería</h3>
            <ol>
              <li>Ve a <strong>"Galería"</strong> en el menú</li>
              <li>Haz clic en <strong>"Seleccionar Imagen"</strong></li>
              <li>Puedes agregar una descripción opcional para cada imagen</li>
              <li>Máximo <strong>6 imágenes</strong> por usuario</li>
              <li>Las imágenes se comprimen automáticamente</li>
            </ol>
            <div className="ayuda-tip">
              <strong>💡 Consejo:</strong> Usa imágenes que muestren tus servicios o trabajos realizados.
            </div>
          </div>
        </section>

        {/* Explorar Usuarios */}
        <section className="ayuda-section">
          <h2>🔍 3. Explorar Usuarios</h2>
          <div className="ayuda-step">
            <h3>Buscar y descubrir</h3>
            <ul>
              <li>En <strong>"Inicio"</strong> verás todos los usuarios registrados</li>
              <li>Usa el <strong>buscador</strong> para encontrar por nombre, usuario, biografía u oferta</li>
              <li>Puedes buscar con <strong>múltiples palabras</strong> (ej: "diseño gráfico")</li>
              <li>Haz clic en cualquier usuario para ver su perfil completo</li>
            </ul>
          </div>
        </section>

        {/* Mensajería */}
        <section className="ayuda-section">
          <h2>💬 4. Enviar y Recibir Mensajes</h2>
          
          <div className="ayuda-step">
            <h3>Enviar un mensaje</h3>
            <ol>
              <li>Entra al perfil del usuario que te interesa (haz clic en su tarjeta)</li>
              <li>Desplázate hasta la sección <strong>"💬 Mensajes"</strong></li>
              <li>Escribe tu mensaje en el cuadro de texto</li>
              <li>Haz clic en <strong>"📤 Enviar Mensaje"</strong></li>
            </ol>
            <div className="ayuda-tip">
              <strong>💡 Consejo:</strong> Sé claro y respetuoso en tus mensajes. Menciona qué servicio te interesa.
            </div>
          </div>

          <div className="ayuda-step">
            <h3>Ver tus mensajes</h3>
            <ol>
              <li>Haz clic en <strong>"📬 Mensajes"</strong> en el menú</li>
              <li>Verás todas tus conversaciones ordenadas por fecha</li>
              <li>Las conversaciones con mensajes nuevos mostrarán un número rojo</li>
              <li>Haz clic en una conversación para verla completa y responder</li>
            </ol>
          </div>

          <div className="ayuda-note">
            <strong>📌 Nota:</strong> Los mensajes se marcan como leídos automáticamente cuando abres la conversación.
          </div>
        </section>

        {/* Consejos Adicionales */}
        <section className="ayuda-section">
          <h2>🎯 5. Consejos para Aprovechar Ofertio</h2>
          <div className="ayuda-tips-grid">
            <div className="ayuda-tip-card">
              <h4>✨ Completa tu perfil</h4>
              <p>Los usuarios con perfiles completos y fotos reciben más mensajes.</p>
            </div>
            <div className="ayuda-tip-card">
              <h4>📝 Sé específico</h4>
              <p>Describe claramente qué ofreces o qué buscas para atraer a las personas correctas.</p>
            </div>
            <div className="ayuda-tip-card">
              <h4>🤝 Sé profesional</h4>
              <p>Responde los mensajes de manera oportuna y mantén una comunicación respetuosa.</p>
            </div>
            <div className="ayuda-tip-card">
              <h4>🔄 Actualiza tu perfil</h4>
              <p>Mantén tu información actualizada, especialmente tus servicios u ofertas.</p>
            </div>
          </div>
        </section>

        {/* Seguridad */}
        <section className="ayuda-section">
          <h2>🔒 6. Seguridad y Privacidad</h2>
          <div className="ayuda-step">
            <ul>
              <li>Tu correo electrónico <strong>NO es visible</strong> para otros usuarios</li>
              <li>Solo los usuarios registrados pueden enviarte mensajes</li>
              <li>Puedes <strong>eliminar tu cuenta</strong> en cualquier momento desde tu Perfil</li>
              <li>Al eliminar tu cuenta se borran todos tus datos, imágenes y mensajes</li>
              <li>Nunca compartas información sensible (números de cuenta, contraseñas) por mensajes</li>
            </ul>
          </div>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="ayuda-section">
          <h2>❔ Preguntas Frecuentes</h2>
          
          <div className="ayuda-faq">
            <h4>¿Puedo cambiar mi nombre de usuario?</h4>
            <p>Sí, ve a tu Perfil, cambia el nombre de usuario y haz clic en "Guardar Perfil".</p>
          </div>

          <div className="ayuda-faq">
            <h4>¿Cuántas imágenes puedo subir?</h4>
            <p>Puedes subir hasta 6 imágenes en tu Galería.</p>
          </div>

          <div className="ayuda-faq">
            <h4>¿Puedo ver quién visitó mi perfil?</h4>
            <p>Actualmente esta función no está disponible.</p>
          </div>

          <div className="ayuda-faq">
            <h4>¿Cómo elimino una imagen de mi galería?</h4>
            <p>Ve a Galería, haz clic en el botón 🗑️ en la imagen que quieres eliminar.</p>
          </div>

          <div className="ayuda-faq">
            <h4>¿Los mensajes son privados?</h4>
            <p>Sí, solo tú y el destinatario pueden ver la conversación.</p>
          </div>
        </section>

        {/* Contacto */}
        <section className="ayuda-section ayuda-contact">
          <h2>📧 ¿Necesitas más ayuda?</h2>
          <p>Si tienes preguntas adicionales o problemas técnicos, contáctanos a través de:</p>
          <ul>
            <li>🌐 Sitio web: <a href="https://andesbit.com" target="_blank" rel="noreferrer">andesbit.com</a></li>
            {/*<li>💝 Apoya el proyecto con una <a href="https://www.paypal.com/donate/?business=LNJF5ZCQMVBTE&no_recurring=0&currency_code=USD" target="_blank" rel="noreferrer">donación</a></li>*/}
          </ul>
        </section>

        <div className="ayuda-actions">
          <button onClick={() => navigate('/')} className="btn-ayuda-home">
            ← Volver al Inicio
          </button>
          <button onClick={() => navigate('/login')} className="btn-ayuda-login">
            Comenzar Ahora →
          </button>
        </div>

      </div>
    </div>
  );
}

export default Ayuda;