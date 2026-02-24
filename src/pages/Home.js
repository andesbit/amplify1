import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { getUrl } from 'aws-amplify/storage';
import './Home.css';
import { getClient } from '../utils/apiClient.js';

function Home() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextToken, setNextToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [userImages, setUserImages] = useState({});
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    checkUserRole();
    loadUsers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      const timeoutId = setTimeout(() => {
        searchUsers();
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      loadUsers();
    }
  }, [searchTerm]);

  useEffect(() => {
    loadUserImages();
  }, [users]);

  async function checkUserRole() {
    try {
      const session = await fetchAuthSession();
      if (session.tokens) {
        setIsAuthenticated(true);
        const currentUser = await getCurrentUser();
        const userEmail = currentUser.signInDetails?.loginId;
        
        if (userEmail === 'adocarpel@gmail.com') {
          setIsAdmin(true);
        }
      }
    } catch (error) {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }

  async function loadUserImages() {
    const images = {};
    for (const user of users) {
      if (user.profilePicture) {
        try {
          const result = await getUrl({ 
            path: user.profilePicture,
            options: {
              validateObjectExistence: false
            }
          });
          images[user.id] = result.url.toString();
        } catch (error) {
          console.error('Error cargando imagen:', error);
        }
      }
    }
    setUserImages(images);
  }

  async function loadUsers(token = null) {
    const isLoadingMore = !!token;
    const client = getClient();
    
    if (isLoadingMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setSearching(false);
    }

    try {
      const result = await client.models.UserProfile.list({
        limit: ITEMS_PER_PAGE,
        nextToken: token
      });

      if (isLoadingMore) {
        setUsers(prev => [...prev, ...(result.data || [])]);
      } else {
        setUsers(result.data || []);
      }

      setNextToken(result.nextToken);
      setHasMore(!!result.nextToken);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    } finally {
      if (isLoadingMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  }

  async function searchUsers() {
    setSearching(true);
    setLoading(true);
    setHasMore(false);
    const client = getClient();
    
    try {
      const term = searchTerm.trim();

      const filters = {
        or: [
          { name: { contains: term } },
          { userName: { contains: term } },  // ← NUEVO: buscar por userName
          { bio: { contains: term } },
          { offer: { contains: term } }
        ]
      };

      const result = await client.models.UserProfile.list({
        filter: filters,
        limit: 50
      });

      setUsers(result.data || []);
    } catch (error) {
      console.error('Error buscando usuarios:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  function handleLoadMore() {
    if (nextToken && !loadingMore && !searching) {
      loadUsers(nextToken);
    }
  }

  function clearSearch() {
    setSearchTerm('');
    setSearching(false);
    loadUsers();
  }

  function handleUserClick(userName) {  // ← Cambié parámetro a userName
    navigate(`/${userName}`);  // ← URL amigable
  }

  return (
    <div className="home-container">
      <div className="home-content">

        {isAdmin && (
          <div className="admin-panel">
            <button 
              onClick={() => navigate('/add-user')} 
              className="btn-admin"
            >
              🔧 Panel de Administrador
            </button>
          </div>
        )}

        <div className="users-section">
          <h2>Nuestros Usuarios y Ofertas</h2>
          
          <div className="search-container-home">
            <div className="search-box-home">
              <input
                type="text"
                placeholder="Buscar por nombre, usuario, biografía u oferta..."  
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input-home"
              />
              {searchTerm && (
                <button onClick={clearSearch} className="clear-btn-home">
                  ✕
                </button>
              )}
            </div>
            {searching && (
              <p className="search-results-text-home">
                {loading 
                  ? 'Buscando...' 
                  : `${users.length} resultado${users.length !== 1 ? 's' : ''} encontrado${users.length !== 1 ? 's' : ''}`
                }
              </p>
            )}
          </div>

          {loading ? (
            <div className="loading-users">
              {searching ? 'Buscando usuarios...' : 'Cargando usuarios...'}
            </div>
          ) : users.length === 0 ? (
            <div className="no-users-home">
              <p>
                {searching 
                  ? `No se encontraron usuarios con "${searchTerm}"`
                  : 'Aún no hay usuarios registrados'
                }
              </p>
            </div>
          ) : (
            <>
              <div className="users-grid-home">
                {users.map((user) => (
                  <div 
                    key={user.id} 
                    className="user-card-home clickable"
                    onClick={() => handleUserClick(user.userName)}  
                  >
                    <div className="user-avatar-home">
                      {userImages[user.id] ? (
                        <img src={userImages[user.id]} alt={user.name} />
                      ) : (
                        user.name ? user.name.charAt(0).toUpperCase() : '👤'
                      )}
                    </div>
                    <div className="user-info-home">
                      <h3>{user.name || 'Sin nombre'}</h3>
                      <p className="user-username-home">@{user.userName || 'usuario'}</p>  {/* ← NUEVO */}
                      {user.bio && <p className="user-bio-home">{user.bio}</p>}
                      {user.offer && (
                        <div className="user-offer-home">
                          <strong>Oferta:</strong> {user.offer}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {!searching && hasMore && (
                <div className="load-more-container-home">
                  <button 
                    onClick={handleLoadMore} 
                    className="btn-load-more-home"
                    disabled={loadingMore}
                  >
                    {loadingMore ? (
                      <>
                        <span className="spinner-home"></span>
                        Cargando...
                      </>
                    ) : (
                      'Ver más usuarios'
                    )}
                  </button>
                </div>
              )}

              {!searching && !hasMore && users.length > 0 && (
                <div className="end-message-home">
                  <p>✅ Mostrando todos los usuarios</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;