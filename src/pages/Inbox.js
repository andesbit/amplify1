import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';
import { getUrl } from 'aws-amplify/storage';
import './Inbox.css';
import { getClient } from '../utils/apiClient.js';

function Inbox() {
  const navigate = useNavigate();
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
      // Obtener todos los mensajes enviados y recibidos
      const { data: received } = await client.models.Message.list({
        filter: { receiverId: { eq: userId } }  // ← Cambié de toUserId a receiverId
      });

      const { data: sent } = await client.models.Message.list({
        filter: { senderId: { eq: userId } }  // ← Cambié de fromUserId a senderId
      });

      // Agrupar mensajes por usuario
      const conversationsMap = new Map();

      // Procesar mensajes recibidos
      for (const msg of received || []) {
        const otherUserId = msg.senderId;  // ← Cambié de fromUserId
        
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
        const otherUserId = msg.receiverId;  // ← Cambié de toUserId
        
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

      // Ordenar mensajes y obtener el último de cada conversación
      const conversationsList = [];
      
      for (const [userId, conv] of conversationsMap) {
        conv.messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        conv.lastMessage = conv.messages[0];
        
        // Obtener datos del usuario
        const { data: profiles } = await publicClient.models.UserProfile.list({
          filter: { userId: { eq: userId } }
        });

        if (profiles && profiles.length > 0) {
          conv.userProfile = profiles[0];
        }

        conversationsList.push(conv);
      }

      // Ordenar conversaciones por último mensaje
      conversationsList.sort((a, b) => 
        new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
      );

      setConversations(conversationsList);
      
      // Cargar imágenes de perfil
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
            options: {
              validateObjectExistence: false
            }
          });
          images[conv.userId] = result.url.toString();
        } catch (error) {
          console.error('Error cargando imagen:', error);
        }
      }
    }
    
    setProfileImages(images);
  }

  function handleConversationClick(userName) {  // ← Cambié parámetro a userName
    navigate(`/${userName}`);  // ← URL amigable
  }

  if (loading) {
    return <div className="loading">Cargando mensajes...</div>;
  }

  return (
    <div className="inbox-container">
      <div className="inbox-content">
        <div className="inbox-header">
          <h1>📬 Bandeja de Entrada</h1>
          <p>Tus conversaciones</p>
        </div>

        {conversations.length === 0 ? (
          <div className="no-conversations">
            <p>No tienes conversaciones todavía</p>
            <p className="hint">Visita el perfil de un usuario y envíale un mensaje</p>
            <button onClick={() => navigate('/')} className="btn-explore">
              Explorar Usuarios
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
                    <img src={profileImages[conv.userId]} alt={conv.userProfile?.name} />
                  ) : (
                    <div className="avatar-placeholder-inbox">
                      {conv.userProfile?.name ? conv.userProfile.name.charAt(0).toUpperCase() : '👤'}
                    </div>
                  )}
                </div>

                <div className="conversation-info">
                  <div className="conversation-header-row">
                    <h3>{conv.userProfile?.name || 'Usuario'}</h3>
                    <span className="username-inbox">@{conv.userProfile?.userName}</span> 
                    {conv.unreadCount > 0 && (
                      <span className="unread-badge">{conv.unreadCount}</span>
                    )}
                  </div>
                  
                  <p className="last-message">
                    {conv.lastMessage.senderId === currentUser.userId && (  // ← Cambié de fromUserId
                      <span className="you-prefix">Tú: </span>
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
          <button onClick={() => navigate('/dashboard')} className="btn-back-inbox">
            Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Inbox;