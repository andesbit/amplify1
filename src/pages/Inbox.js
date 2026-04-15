import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';
import { getUrl } from 'aws-amplify/storage';
import './Inbox.css';
import { getClient } from '../utils/apiClient.js';
import { useTranslation } from 'react-i18next';

function Inbox() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [currentUser, setCurrentUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileImages, setProfileImages] = useState({});

  useEffect(() => {
    checkAuthAndLoadMessages();
  }, []);

  async function checkAuthAndLoadMessages() {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
      await loadConversations(user.userId);
    } catch (error) {
      console.log('No autenticado');
      navigate('/login');
    }
  }

  async function loadConversations(userId) {
    const client = getClient('userPool');
    const publicClient = getClient('apiKey');

    try {
      const { data: received } = await client.models.Message.list({
        filter: { receiverId: { eq: userId } }
      });

      const { data: sent } = await client.models.Message.list({
        filter: { senderId: { eq: userId } }
      });

      const conversationsMap = new Map();

      // Procesar mensajes recibidos
      for (const msg of received || []) {
        const otherUserId = msg.senderId;
        
        if (!conversationsMap.has(otherUserId)) {
          conversationsMap.set(otherUserId, {
            userId: otherUserId,
            messages: [],
            lastMessage: null,
            unreadCount: 0
          });
        }

        const conv = conversationsMap.get(otherUserId);
        conv.messages.push(msg);
        
        if (!msg.read) {
          conv.unreadCount++;
        }
      }

      // Procesar mensajes enviados
      for (const msg of sent || []) {
        const otherUserId = msg.receiverId;
        
        if (!conversationsMap.has(otherUserId)) {
          conversationsMap.set(otherUserId, {
            userId: otherUserId,
            messages: [],
            lastMessage: null,
            unreadCount: 0
          });
        }

        const conv = conversationsMap.get(otherUserId);
        conv.messages.push(msg);
      }

      const conversationsList = [];
      
      for (const [userId, conv] of conversationsMap) {
        conv.messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        conv.lastMessage = conv.messages[0];
        
        const { data: profiles } = await publicClient.models.UserProfile.list({
          filter: { userId: { eq: userId } }
        });

        if (profiles && profiles.length > 0) {
          conv.userProfile = profiles[0];
        }

        conversationsList.push(conv);
      }

      conversationsList.sort((a, b) => 
        new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
      );

      setConversations(conversationsList);
      await loadProfileImages(conversationsList);
    } catch (error) {
      console.error('Error cargando conversaciones:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadProfileImages(conversations) {
    const images = {};
    
    for (const conv of conversations) {
      if (conv.userProfile?.profilePicture) {
        try {
          const result = await getUrl({
            path: conv.userProfile.profilePicture,
            options: { validateObjectExistence: false }
          });
          images[conv.userId] = result.url.toString();
        } catch (error) {
          console.error('Error cargando imagen:', error);
        }
      }
    }
    
    setProfileImages(images);
  }

  function handleConversationClick(userName) {
    navigate(`/${userName}`);
  }

  if (loading) {
    return <div className="loading">{t('messages.loading')}</div>;
  }

  return (
    <div className="inbox-container">
      <div className="inbox-content">
        <div className="inbox-header">
          <h1>{t('messages.title')}</h1>
          <p>{t('messages.subtitle')}</p>
        </div>

        {conversations.length === 0 ? (
          <div className="no-conversations">
            <p>{t('messages.noConversations')}</p>
            <p className="hint">{t('messages.noConversationsHint')}</p>
            <button onClick={() => navigate('/')} className="btn-explore">
              {t('messages.exploreUsers')}
            </button>
          </div>
        ) : (
          <div className="conversations-list">
            {conversations.map((conv) => (
              <div 
                key={conv.userId} 
                className="conversation-item"
                onClick={() => handleConversationClick(conv.userProfile?.userName)} 
              >
                <div className="conversation-avatar">
                  {profileImages[conv.userId] ? (
                    <img 
                      src={profileImages[conv.userId]} 
                      alt={conv.userProfile?.name || t('messages.avatarAlt')} 
                    />
                  ) : (
                    <div className="avatar-placeholder-inbox">
                      {conv.userProfile?.name 
                        ? conv.userProfile.name.charAt(0).toUpperCase() 
                        : '👤'}
                    </div>
                  )}
                </div>

                <div className="conversation-info">
                  <div className="conversation-header-row">
                    <h3>{conv.userProfile?.name || t('messages.noName')}</h3>
                    <span className="username-inbox">
                      @{conv.userProfile?.userName}
                    </span> 
                    {conv.unreadCount > 0 && (
                      <span className="unread-badge">
                        {conv.unreadCount} {t('messages.unread')}
                      </span>
                    )}
                  </div>
                  
                  <p className="last-message">
                    {conv.lastMessage.senderId === currentUser?.userId && (
                      <span className="you-prefix">{t('messages.you')}</span>
                    )}
                    {conv.lastMessage.content.length > 60 
                      ? conv.lastMessage.content.substring(0, 60) + '...' 
                      : conv.lastMessage.content
                    }
                  </p>
                  
                  <span className="message-date">
                    {new Date(conv.lastMessage.createdAt).toLocaleString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                <div className="conversation-arrow">
                  →
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="inbox-actions">
          <button onClick={() => navigate('/')} className="btn-back-inbox">
            {t('messages.backToHome')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Inbox;