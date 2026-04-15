import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Ayuda.css';

function Ayuda() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="ayuda-container">
      <div className="ayuda-content">
        
        <div className="ayuda-header">
          <h1>{t('help.title')}</h1>
          <p>{t('help.subtitle')}</p>
        </div>

        {/* Inscripción */}
        <section className="ayuda-section">
          <h2>{t('help.section1Title')}</h2>
          <div className="ayuda-step">
            <h3>{t('help.createAccount')}</h3>
            <ol>
              <li>{t('help.step1')}</li>
              <li>{t('help.step2')}</li>
              <li>{t('help.step3')}</li>
              <li>{t('help.step4')}</li>
              <li>{t('help.step5')}</li>
            </ol>
            <div className="ayuda-tip">
              {t('help.tipGoogle')}
            </div>
          </div>
        </section>

        {/* Completar Perfil */}
        <section className="ayuda-section">
          <h2>{t('help.section2Title')}</h2>
          <div className="ayuda-step">
            <h3>{t('help.completeProfile')}</h3>
            <p>{t('help.profileTip')}</p>
            
            <div className="ayuda-field">
              <h4>{t('help.photoProfile')}</h4>
              <ul>
                <li>{t('help.selectImage')}</li>
                <li>{t('help.photoCompress')}</li>
              </ul>
            </div>

            <div className="ayuda-field">
              <h4>{t('help.fullName')}</h4>
              <ul>
                <li>{t('help.fullNameDesc')}</li>
              </ul>
            </div>

            <div className="ayuda-field">
              <h4>{t('help.username')}</h4>
              <ul>
                <li>{t('help.usernameRules')}</li>
                <li>{t('help.usernameChars')}</li>
                <li>{t('help.usernameLength')}</li>
                <li>{t('help.usernameCheck')}</li>
              </ul>
            </div>

            <div className="ayuda-field">
              <h4>{t('help.bioLocation')}</h4>
              <ul>
                <li>{t('help.bioDesc')}</li>
              </ul>
            </div>

            <div className="ayuda-field">
              <h4>{t('help.offerService')}</h4>
              <ul>
                <li>{t('help.offerExamples')}</li>
                <li>{t('help.offerExamples2')}</li>
              </ul>
            </div>

            <p className="ayuda-important">
              {t('help.saveProfileImportant')}
            </p>
          </div>

          {/* Galería */}
          <div className="ayuda-step">
            <h3>{t('help.addGallery')}</h3>
            <ol>
              <li>{t('help.galleryStep1')}</li>
              <li>{t('help.galleryStep2')}</li>
              <li>{t('help.galleryStep3')}</li>
              <li>{t('help.galleryLimit')}</li>
              <li>{t('help.galleryCompress')}</li>
            </ol>
            <div className="ayuda-tip">
              {t('help.galleryTip')}
            </div>
          </div>
        </section>

        {/* Explorar Usuarios */}
        <section className="ayuda-section">
          <h2>{t('help.section3Title')}</h2>
          <div className="ayuda-step">
            <h3>{t('help.exploreUsers')}</h3>
            <ul>
              <li>{t('help.homeSeeUsers')}</li>
              <li>{t('help.useSearch')}</li>
              <li>{t('help.searchMultiple')}</li>
              <li>{t('help.clickUser')}</li>
            </ul>
          </div>
        </section>

        {/* Mensajería */}
        <section className="ayuda-section">
          <h2>{t('help.section4Title')}</h2>
          
          <div className="ayuda-step">
            <h3>{t('help.sendMessages')}</h3>
            <ol>
              <li>{t('help.goToProfile')}</li>
              <li>{t('help.scrollToMessages')}</li>
              <li>{t('help.writeMessage')}</li>
              <li>{t('help.clickSend')}</li>
            </ol>
            <div className="ayuda-tip">
              {t('help.messageTip')}
            </div>
          </div>

          <div className="ayuda-step">
            <h3>{t('help.viewMessages')}</h3>
            <ol>
              <li>{t('help.goToMessages')}</li>
              <li>{t('help.conversationsOrdered')}</li>
              <li>{t('help.newMessagesIndicator')}</li>
              <li>{t('help.clickConversation')}</li>
            </ol>
          </div>

          <div className="ayuda-note">
            {t('help.messagesNote')}
          </div>
        </section>

        {/* Consejos Adicionales */}
        <section className="ayuda-section">
          <h2>{t('help.section5Title')}</h2>
          <div className="ayuda-tips-grid">
            <div className="ayuda-tip-card">
              <h4>{t('help.tipCompleteProfile')}</h4>
              <p>{t('help.tipCompleteDesc')}</p>
            </div>
            <div className="ayuda-tip-card">
              <h4>{t('help.tipBeSpecific')}</h4>
              <p>{t('help.tipSpecificDesc')}</p>
            </div>
            <div className="ayuda-tip-card">
              <h4>{t('help.tipProfessional')}</h4>
              <p>{t('help.tipProfessionalDesc')}</p>
            </div>
            <div className="ayuda-tip-card">
              <h4>{t('help.tipUpdate')}</h4>
              <p>{t('help.tipUpdateDesc')}</p>
            </div>
          </div>
        </section>

        {/* Seguridad */}
        <section className="ayuda-section">
          <h2>{t('help.section6Title')}</h2>
          <div className="ayuda-step">
            <ul>
              <li>{t('help.emailNotVisible')}</li>
              <li>{t('help.onlyRegistered')}</li>
              <li>{t('help.deleteAccount')}</li>
              <li>{t('help.deleteAllData')}</li>
              <li>{t('help.neverShareSensitive')}</li>
            </ul>
          </div>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="ayuda-section">
          <h2>{t('help.faqTitle')}</h2>
          
          <div className="ayuda-faq">
            <h4>{t('help.faqChangeUsername')}</h4>
            <p>{t('help.faqChangeUsernameAnswer')}</p>
          </div>

          <div className="ayuda-faq">
            <h4>{t('help.faqImageLimit')}</h4>
            <p>{t('help.faqImageLimitAnswer')}</p>
          </div>

          <div className="ayuda-faq">
            <h4>{t('help.faqProfileVisits')}</h4>
            <p>{t('help.faqProfileVisitsAnswer')}</p>
          </div>

          <div className="ayuda-faq">
            <h4>{t('help.faqDeleteImage')}</h4>
            <p>{t('help.faqDeleteImageAnswer')}</p>
          </div>

          <div className="ayuda-faq">
            <h4>{t('help.faqMessagesPrivate')}</h4>
            <p>{t('help.faqMessagesPrivateAnswer')}</p>
          </div>
        </section>

        {/* Contacto */}
        <section className="ayuda-section ayuda-contact">
          <h2>{t('help.contactTitle')}</h2>
          <p>{t('help.needMoreHelp')}</p>
          <ul>
            <li>🌐 {t('help.website')}: <a href="https://andesbit.com" target="_blank" rel="noreferrer">andesbit.com</a></li>
          </ul>
        </section>

        <div className="ayuda-actions">
          <button onClick={() => navigate('/')} className="btn-ayuda-home">
            {t('help.backHome')}
          </button>
          <button onClick={() => navigate('/login')} className="btn-ayuda-login">
            {t('help.startNow')}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Ayuda;