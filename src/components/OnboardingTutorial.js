import React, { useState, useEffect } from 'react';
import './OnboardingTutorial.css';

function OnboardingTutorial({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si ya vio el tutorial
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setTimeout(() => setIsVisible(true), 500);
    }
  }, []);

  const steps = [
    {
      title: "¡Bienvenido a Ofertio! 🎉",
      description: "Te mostraremos cómo usar la plataforma en 3 pasos simples",
      animation: "welcome",
      icon: "👋"
    },
    {
      title: "1. Busca usuarios y servicios 🔍",
      description: "Usa el buscador para encontrar profesionales por nombre, servicio o ubicación",
      animation: "search",
      icon: "🔍"
    },
    {
      title: "2. Completa tu perfil ✏️",
      description: "Agrega tu foto, nombre de usuario, ubicación y servicios que ofreces",
      animation: "profile",
      icon: "👤"
    },
    {
      title: "3. Conecta y envía mensajes 💬",
      description: "Haz clic en cualquier perfil para ver detalles y enviar mensajes privados",
      animation: "message",
      icon: "💬"
    },
    {
      title: "¡Listo para comenzar! 🚀",
      description: "Explora la plataforma y conecta con profesionales",
      animation: "ready",
      icon: "✨"
    }
  ];

  function handleNext() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  }

  function handleSkip() {
    handleComplete();
  }

  function handleComplete() {
    localStorage.setItem('hasSeenTutorial', 'true');
    setIsVisible(false);
    if (onComplete) onComplete();
  }

  if (!isVisible) return null;

  const step = steps[currentStep];

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-container">
        <button className="tutorial-skip" onClick={handleSkip}>
          Saltar tutorial
        </button>

        <div className="tutorial-content">
          {/* Animación */}
          <div className={`tutorial-animation animation-${step.animation}`}>
            {step.animation === 'welcome' && (
              <div className="animation-welcome">
                <div className="logo-big">
                  <span className="o-big">O</span>
                  <span className="fertio-big">fertio</span>
                </div>
                <div className="welcome-waves">
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                </div>
              </div>
            )}

            {step.animation === 'search' && (
              <div className="animation-search">
                <div className="search-bar-demo">
                  <div className="search-icon">🔍</div>
                  <div className="search-text typing-text">
                    <span>programador</span>
                  </div>
                </div>
                <div className="search-results">
                  <div className="result-card card-1">
                    <div className="result-avatar">👨‍💻</div>
                    <div className="result-info">
                      <div className="result-name"></div>
                      <div className="result-role"></div>
                    </div>
                  </div>
                  <div className="result-card card-2">
                    <div className="result-avatar">👩‍💻</div>
                    <div className="result-info">
                      <div className="result-name"></div>
                      <div className="result-role"></div>
                    </div>
                  </div>
                  <div className="result-card card-3">
                    <div className="result-avatar">🧑‍💻</div>
                    <div className="result-info">
                      <div className="result-name"></div>
                      <div className="result-role"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step.animation === 'profile' && (
              <div className="animation-profile">
                <div className="profile-form-demo">
                  <div className="profile-photo-demo">
                    <div className="photo-placeholder">📷</div>
                  </div>
                  <div className="profile-fields">
                    <div className="field-demo field-1"></div>
                    <div className="field-demo field-2"></div>
                    <div className="field-demo field-3"></div>
                  </div>
                  <div className="save-button-demo">
                    <div className="checkmark">✓</div>
                  </div>
                </div>
              </div>
            )}

            {step.animation === 'message' && (
              <div className="animation-message">
                <div className="message-demo">
                  <div className="profile-card-demo">
                    <div className="profile-avatar-demo">👤</div>
                    <div className="profile-name-demo"></div>
                  </div>
                  <div className="message-bubbles">
                    <div className="bubble bubble-sent">Hola! 👋</div>
                    <div className="bubble bubble-received">¡Hola! ¿Cómo estás?</div>
                    <div className="bubble bubble-sent typing">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step.animation === 'ready' && (
              <div className="animation-ready">
                <div className="rocket">🚀</div>
                <div className="stars">
                  <div className="star">⭐</div>
                  <div className="star">⭐</div>
                  <div className="star">⭐</div>
                  <div className="star">⭐</div>
                  <div className="star">⭐</div>
                </div>
              </div>
            )}
          </div>

          {/* Texto */}
          <div className="tutorial-text">
            <div className="tutorial-icon">{step.icon}</div>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </div>

          {/* Navegación */}
          <div className="tutorial-navigation">
            <div className="tutorial-dots">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                />
              ))}
            </div>

            <button className="tutorial-next" onClick={handleNext}>
              {currentStep === steps.length - 1 ? '¡Comenzar! 🚀' : 'Siguiente →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingTutorial;