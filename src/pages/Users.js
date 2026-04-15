import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';
import { getUrl } from 'aws-amplify/storage';
import './Users.css';
import { getClient } from '../utils/apiClient.js';
import { useTranslation } from 'react-i18next';

function Users() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextToken, setNextToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userImages, setUserImages] = useState({});
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    checkAuthAndLoadUsers();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, users]);

  useEffect(() => {
    loadUserImages();
  }, [users]);

  async function checkAuthAndLoadUsers() {
    try {
      const currentUser = await getCurrentUser();
      const userEmail = currentUser.signInDetails?.loginId;
      
      if (userEmail === 'lupakiwe@gmail.com') {
        setIsAdmin(true);
      }
      
      await loadUsers();
    } catch (error) {
      console.log('No autenticado');
      navigate('/login');
    }
  }

  async function loadUsers(token = null) {
    const client = getClient();
    const isLoadingMore = !!token;
    
    if (isLoadingMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
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

  async function loadUserImages() {
    const images = {};
    for (const user of users) {
      if (user.profilePicture) {
        try {
          const result = await getUrl({ path: user.profilePicture });
          images[user.id] = result.url.toString();
        } catch (error) {
          console.error('Error cargando imagen:', error);
        }
      }
    }
    setUserImages(images);
  }

  function handleSearch() {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      setSearching(false);
      return;
    }

    setSearching(true);
    const term = searchTerm.toLowerCase();

    const results = users.filter(user => {
      const matchName = user.name?.toLowerCase().includes(term);
      const matchUsername = user.userName?.toLowerCase().includes(term);
      const matchBio = user.bio?.toLowerCase().includes(term);
      const matchOffer = user.offer?.toLowerCase().includes(term);
      return matchName || matchUsername || matchBio || matchOffer;
    });

    setFilteredUsers(results);
  }

  async function handleDelete(userId, userName) {
    const client = getClient();
    const confirmed = window.confirm(
      `${t('users.confirmDelete')} ${userName || t('users.noName')}?`
    );

    if (!confirmed) return;

    setDeletingId(userId);
    try {
      await client.models.UserProfile.delete({ id: userId });
      setUsers(prev => prev.filter(u => u.id !== userId));
      setFilteredUsers(prev => prev.filter(u => u.id !== userId));
      alert(t('users.userDeleted'));
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      alert(t('users.deleteError'));
    } finally {
      setDeletingId(null);
    }
  }

  function handleUserClick(userName) {
    navigate(`/${userName}`);
  }

  function handleLoadMore() {
    if (nextToken && !loadingMore) {
      loadUsers(nextToken);
    }
  }

  function clearSearch() {
    setSearchTerm('');
    setSearching(false);
  }

  const displayUsers = searchTerm ? filteredUsers : users;

  if (loading) {
    return <div className="loading">{t('common.loading')}</div>;
  }

  return (
    <div className="users-container">
      <div className="users-content">
        <div className="users-header">
          <h2>{t('users.title')}</h2>
          
          <div className="search-container">
            <div className="search-box">
              <input
                type="text"
                placeholder={t('users.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button onClick={clearSearch} className="clear-btn">
                  ✕
                </button>
              )}
            </div>
            {searching && (
              <p className="search-results-text">
                {filteredUsers.length} {filteredUsers.length === 1 
                  ? t('users.resultsFound') 
                  : t('users.resultsFoundPlural')} {t('users.found')}
              </p>
            )}
          </div>

          {!searching && (
            <p>
              {t('users.showing')} {users.length} {t('users.users')}
              {hasMore && ` ${t('users.hasMore')}`}
            </p>
          )}
        </div>

        {displayUsers.length === 0 ? (
          <div className="no-users">
            <p>
              {searching 
                ? `${t('users.noUsersFound')} "${searchTerm}"`
                : t('users.noUsersYet')
              }
            </p>
          </div>
        ) : (
          <>
            <div className="users-grid">
              {displayUsers.map((user) => (
                <div 
                  key={user.id} 
                  className="user-card"
                  onClick={() => !isAdmin && handleUserClick(user.userName)} 
                  style={{ cursor: !isAdmin ? 'pointer' : 'default' }}
                >
                  <div className="user-avatar">
                    {userImages[user.id] ? (
                      <img src={userImages[user.id]} alt={user.name || t('users.noName')} />
                    ) : (
                      user.name ? user.name.charAt(0).toUpperCase() : '👤'
                    )}
                  </div>
                  <div className="user-info">
                    <h3>{user.name || t('users.noName')}</h3>
                    <p className="user-username">@{user.userName || 'usuario'}</p>
                    {user.bio && <p className="user-bio">{user.bio}</p>}
                    {user.offer && (
                      <div className="user-offer">
                        <strong>{t('users.offer')}</strong> {user.offer}
                      </div>
                    )}
                  </div>
                  
                  {isAdmin && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(user.id, user.name);
                      }}
                      className="btn-delete"
                      disabled={deletingId === user.id}
                      title={t('users.deleteUser')}
                    >
                      {deletingId === user.id ? '⏳' : '🗑️'}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {!searching && hasMore && (
              <div className="load-more-container">
                <button 
                  onClick={handleLoadMore} 
                  className="btn-load-more"
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <>
                      <span className="spinner"></span>
                      {t('users.loadingMore')}
                    </>
                  ) : (
                    t('users.loadMoreWithCount', { count: ITEMS_PER_PAGE })
                  )}
                </button>
              </div>
            )}

            {!searching && !hasMore && users.length > 0 && (
              <div className="end-message">
                <p>{t('users.allLoaded')}</p>
              </div>
            )}
          </>
        )}

        <button onClick={() => navigate('/dashboard')} className="btn-back">
          {t('users.backToDashboard')}
        </button>
      </div>
    </div>
  );
}

export default Users;