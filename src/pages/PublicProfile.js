import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { getUrl } from 'aws-amplify/storage';
import './PublicProfile.css';
import { getClient } from '../utils/apiClient.js';
import { useTranslation } from 'react-i18next';

function PublicProfile() {
  const { userName } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [imageUrls, setImageUrls] = useState({});
  
  // Estados para mensajería
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messageStatus, setMessageStatus] = useState('');
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    if (!userName) {
      navigate('/');
      return;
    }
    checkAuthStatus();
    loadUserProfile();
  }, [userName]);

  useEffect(() => {
    if (user?.profilePicture) {
      loadProfileImage(user.profilePicture);
    }
  }, [user]);

  useEffect(() => {
    loadGalleryImages();
  }, [images]);

  useEffect(() => {
    if (currentUser && userId) {
      loadMessages();
    }
  }, [currentUser, userId]);

  async function checkAuthStatus() {
    try {
      const session = await fetchAuthSession();
      if (session.tokens) {
        const authUser = await getCurrentUser();
        setCurrentUser(authUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  }

  async function loadUserProfile() {
    const publicClient = getClient('apiKey');
    setLoading(true);
    
    try {
      const { data: profiles } = await publicClient.models.UserProfile.list({
        filter: { userName: { eq: userName } }
      });

      if (!profiles || profiles.length === 0) {
        setUser(null);
        setLoading(false);
        return;
      }

      const userProfile = profiles[0];
      setUser(userProfile);
      setUserId(userProfile.userId);
      await loadUserImages(userProfile.userId);
    } catch (error) {
      console.error('Error cargando perfil:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function loadUserImages(userId) {
    const publicClient = getClient('apiKey');
    try {
      const { data } = await publicClient.models.UserImage.list({
        filter: { userId: { eq: userId } }
      });
      
      const sortedImages = (data || []).sort((a, b) => {
        if (a.order !== null && b.order !== null) {
          return a.order - b.order;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      setImages(sortedImages);
    } catch (error) {
      console.error('Error cargando imágenes:', error);
    }
  }

  async function loadProfileImage(imagePath) {
    try {
      const result = await getUrl({
        path: imagePath,
        options: { validateObjectExistence: false }
      });
      setProfileImageUrl(result.url.toString());
    } catch (error) {
      console.error('Error cargando foto de perfil:', error);
    }
  }

  async function loadGalleryImages() {
    const urls = {};
    for (const image of images) {
      try {
        const result = await getUrl({ 
          path: image.imagePath,
          options: { validateObjectExistence: false }
        });
        urls[image.id] = result.url.toString();
      } catch (error) {
        console.error('Error cargando imagen de galería:', error);
      }
    }
    setImageUrls(urls);
  }

  async function loadMessages() {
    const authClient = getClient('userPool');
    setLoadingMessages(true);
    
    try {
      const { data: sent } = await authClient.models.Message.list({
        filter: {
          senderId: { eq: currentUser.userId },
          receiverId: { eq: userId }
        }
      });

      const { data: received } = await authClient.models.Message.list({
        filter: {
          senderId: { eq: userId },
          receiverId: { eq: currentUser.userId }
        }
      });

      const allMessages = [...(sent || []), ...(received || [])].sort((a, b) => 
        new Date(a.createdAt) - new Date(b.createdAt)
      );
      
      setMessages(allMessages);

      // Marcar como leídos
      for (const msg of received || []) {
        if (!msg.read) {
          await authClient.models.Message.update({
            id: msg.id,
            read: true
          });
        }
      }
    } catch (error) {
      console.error('Error cargando mensajes:', error);
    } finally {
      setLoadingMessages(false);
    }
  }

  async function handleSendMessage(e) {
    e.preventDefault();
    const authClient = getClient('userPool');    
    
    if (!newMessage.trim()) return;
    
    if (!isAuthenticated) {
      setMessageStatus(t('public.loginRequired'));
      return;
    }

    if (currentUser.userId === userId) {
      setMessageStatus(t('public.cannotSendToSelf'));
      return;
    }

    setSendingMessage(true);
    setMessageStatus('');

    try {
      await authClient.models.Message.create({
        senderId: currentUser.userId,
        receiverId: userId,
        content: newMessage.trim(),
        read: false
      });

      setMessageStatus(t('public.messageSent'));
      setNewMessage('');
      await loadMessages();
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      setMessageStatus(t('public.messageError'));
    } finally {
      setSendingMessage(false);
    }
  }

  if (loading) {
    return <div className="loading">{t('public.loading')}</div>;
  }

  if (!user) {
    return (
      <div className="public-profile-container">
        <div className="not-found">
          <h2>{t('public.notFound')}</h2>
          <p>{t('public.notFoundDesc')}</p>
          <button onClick={() => navigate('/')} className="btn-back-home">
            {t('public.backHome')}
          </button>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser && currentUser.userId === userId;

  return (
    <div className="public-profile-container">
      <div className="public-profile-content">
        {/* Header del perfil */}
        <div className="profile-header-public">
          <div className="profile-avatar-public">
            {profileImageUrl ? (
              <img src={profileImageUrl} alt={user.name || t('public.noName')} />
            ) : (
              <div className="avatar-placeholder">
                {user.name ? user.name.charAt(0).toUpperCase() : '👤'}
              </div>
            )}
          </div>
          <div className="profile-info-public">
            <h1>{user.name || t('public.noName')}</h1>
            <p className="user-username-public">@{user.userName}</p>
            {user.bio && <p className="user-bio-public">{user.bio}</p>}
          </div>
        </div>

        {/* Oferta/Servicio */}
        {user.offer && (
          <div className="offer-section">
            <h2>{t('public.offer')}</h2>
            <p>{user.offer}</p>
          </div>
        )}

        {/* Sección de Mensajes */}
        {!isOwnProfile && (
          <div className="messages-section">
            <h2>{t('public.messages')}</h2>
            
            {!isAuthenticated ? (
              <div className="login-required">
                <p>{t('public.loginRequired')}</p>
                <button onClick={() => navigate('/login')} className="btn-login-msg">
                  {t('public.loginButton')}
                </button>
              </div>
            ) : (
              <>
                {/* Historial de mensajes */}
                {messages.length > 0 && (
                  <div className="messages-history">
                    <h3>{t('public.conversation')}</h3>
                    <div className="messages-list">
                      {loadingMessages ? (
                        <p className="loading-msgs">{t('public.loadingMessages')}</p>
                      ) : (
                        messages.map((msg) => (
                          <div 
                            key={msg.id} 
                            className={`message-bubble ${msg.senderId === currentUser.userId ? 'sent' : 'received'}`}
                          >
                            <p>{msg.content}</p>
                            <span className="message-time">
                              {new Date(msg.createdAt).toLocaleString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Formulario de nuevo mensaje */}
                <form onSubmit={handleSendMessage} className="message-form">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={`${t('public.messagePlaceholder')} ${user.name || t('public.noName')}...`}
                    className="message-input"
                    rows="3"
                    disabled={sendingMessage}
                  />
                  <button 
                    type="submit" 
                    className="btn-send-message"
                    disabled={sendingMessage || !newMessage.trim()}
                  >
                    {sendingMessage ? t('public.sending') : t('public.send')}
                  </button>
                </form>

                {messageStatus && (
                  <div className={`message-status ${messageStatus.includes('✅') ? 'success' : messageStatus.includes('❌') ? 'error' : 'warning'}`}>
                    {messageStatus}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Galería de imágenes */}
        {images.length > 0 && (
          <div className="gallery-section-public">
            <h2>
              {t('public.gallery')} ({images.length} {images.length === 1 ? t('public.image') : t('public.images')})
            </h2>
            <div className="images-grid-public">
              {images.map((image) => (
                <div key={image.id} className="image-card-public">
                  <div className="image-wrapper-public">
                    {imageUrls[image.id] ? (
                      <img 
                        src={imageUrls[image.id]} 
                        alt={image.description || t('public.avatarAlt')} 
                      />
                    ) : (
                      <div className="image-loading">{t('public.loading')}</div>
                    )}
                  </div>
                  {image.description && (
                    <div className="image-description-public">
                      <p>{image.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {images.length === 0 && (
          <div className="no-gallery">
            <p>{t('public.noGallery')}</p>
          </div>
        )}

        <button onClick={() => navigate('/')} className="btn-back-home">
          {t('public.backHome')}
        </button>
      </div>
    </div>
  );
}

export default PublicProfile;