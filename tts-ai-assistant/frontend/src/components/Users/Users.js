import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext.js';
import '../../styles/Users.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
      if (error.response?.status === 404) {
        setError('API endpoint не найден. Пожалуйста, проверьте настройки сервера.');
      } else if (error.response?.status === 401) {
        setError('Недостаточно прав для просмотра пользователей');
      } else {
        setError('Ошибка загрузки пользователей: ' + (error.response?.data?.message || error.message));
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId, userName) => {
    if (!window.confirm(`Вы уверены, что хотите удалить пользователя ${userName}?`)) {
      return;
    }

    setActionLoading(userId);
    setError('');
    try {
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Ошибка удаления пользователя: ' + (error.response?.data?.message || error.message));
    } finally {
      setActionLoading(null);
    }
  };

  const toggleUserStatus = async (userId, currentStatus, userName) => {
    const newStatus = !currentStatus;
    const action = newStatus ? 'активировать' : 'деактивировать';
    
    if (!window.confirm(`Вы уверены, что хотите ${action} пользователя ${userName}?`)) {
      return;
    }

    setActionLoading(userId);
    setError('');
    try {
      const response = await axios.patch(`/api/users/${userId}/status`, {
        isActive: newStatus
      });
      setUsers(users.map(user => 
        user._id === userId ? response.data.user : user
      ));
    } catch (error) {
      console.error('Error toggling user status:', error);
      setError('Ошибка изменения статуса: ' + (error.response?.data?.message || error.message));
    } finally {
      setActionLoading(null);
    }
  };

  const changeUserRole = async (userId, newRole, userName) => {
    if (!window.confirm(`Вы уверены, что хотите сделать пользователя ${userName} ${newRole === 'admin' ? 'администратором' : 'сотрудником'}?`)) {
      return;
    }

    setActionLoading(userId);
    setError('');
    try {
      const response = await axios.patch(`/api/users/${userId}/role`, {
        role: newRole
      });
      setUsers(users.map(user => 
        user._id === userId ? response.data.user : user
      ));
    } catch (error) {
      console.error('Error changing user role:', error);
      setError('Ошибка изменения роли: ' + (error.response?.data?.message || error.message));
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return React.createElement('div', { className: 'users-loading' },
      React.createElement('div', { className: 'loading-spinner' }),
      'Загрузка пользователей...'
    );
  }

  return React.createElement('div', { className: 'users-page' },
    React.createElement('div', { className: 'users-header' },
      React.createElement('h1', null, '👥 Управление пользователями'),
      React.createElement('p', { className: 'users-description' }, 
        'Управление пользователями системы ТрансТелеком'
      ),
      React.createElement('button', {
        className: 'btn btn-primary refresh-btn',
        onClick: loadUsers,
        disabled: loading
      }, 
        loading ? 'Обновление...' : '🔄 Обновить'
      )
    ),

    error && React.createElement('div', { className: 'alert alert-error' }, 
      React.createElement('span', { className: 'error-icon' }, '⚠️'),
      error,
      React.createElement('button', {
        className: 'retry-btn',
        onClick: loadUsers
      }, 'Повторить')
    ),

    React.createElement('div', { className: 'users-container' },
      users.length === 0 && !loading ? (
        React.createElement('div', { className: 'empty-state' },
          React.createElement('div', { className: 'empty-icon' }, '👥'),
          React.createElement('h3', null, 'Пользователи не найдены'),
          React.createElement('p', null, 'В системе пока нет зарегистрированных пользователей'),
          React.createElement('button', {
            className: 'btn btn-primary',
            onClick: loadUsers
          }, '🔄 Загрузить снова')
        )
      ) : (
        React.createElement('div', { className: 'users-stats' },
          React.createElement('div', { className: 'stat-card' },
            React.createElement('div', { className: 'stat-number' }, users.length),
            React.createElement('div', { className: 'stat-label' }, 'Всего пользователей')
          ),
          React.createElement('div', { className: 'stat-card' },
            React.createElement('div', { className: 'stat-number' }, users.filter(u => u.role === 'admin').length),
            React.createElement('div', { className: 'stat-label' }, 'Администраторов')
          ),
          React.createElement('div', { className: 'stat-card' },
            React.createElement('div', { className: 'stat-number' }, users.filter(u => u.isActive).length),
            React.createElement('div', { className: 'stat-label' }, 'Активных')
          )
        ),

        React.createElement('div', { className: 'users-grid' },
          users.map(user => 
            React.createElement('div', { 
              key: user._id, 
              className: `user-card ${!user.isActive ? 'user-inactive' : ''} ${user._id === currentUser?._id ? 'current-user' : ''}` 
            },
              React.createElement('div', { className: 'user-header' },
                React.createElement('div', { className: 'user-avatar' },
                  React.createElement('span', { className: 'avatar-icon' }, user.role === 'admin' ? '👑' : '👤')
                ),
                React.createElement('div', { className: 'user-info' },
                  React.createElement('h3', { className: 'user-name' }, 
                    user.fullName,
                    user._id === currentUser?._id && 
                      React.createElement('span', { className: 'you-badge' }, ' (Вы)')
                  ),
                  React.createElement('p', { className: 'user-email' }, user.email),
                  React.createElement('div', { className: 'user-badges' },
                    React.createElement('span', { 
                      className: `user-role ${user.role === 'admin' ? 'admin-role' : 'user-role'}` 
                    }, 
                      user.role === 'admin' ? '👑 Администратор' : '👤 Сотрудник'
                    ),
                    React.createElement('span', { 
                      className: `user-status ${user.isActive ? 'active-status' : 'inactive-status'}` 
                    }, 
                      user.isActive ? '✅ Активен' : '⏸️ Неактивен'
                    )
                  )
                )
              ),
              
              React.createElement('div', { className: 'user-meta' },
                React.createElement('span', { className: 'user-date' }, 
                  `Зарегистрирован: ${formatDate(user.createdAt)}`
                ),
                user.lastLogin && React.createElement('span', { className: 'user-last-login' },
                  `Последний вход: ${formatDate(user.lastLogin)}`
                )
              ),

              React.createElement('div', { className: 'user-actions' },
                // Смена роли
                React.createElement('button', {
                  className: 'btn btn-outline btn-sm role-btn',
                  onClick: () => changeUserRole(
                    user._id, 
                    user.role === 'admin' ? 'user' : 'admin',
                    user.fullName
                  ),
                  disabled: actionLoading === user._id || user._id === currentUser?._id,
                  title: user._id === currentUser?._id ? 'Нельзя изменить свою роль' : `Сделать ${user.role === 'admin' ? 'сотрудником' : 'администратором'}`
                }, 
                  actionLoading === user._id ? 
                    React.createElement('div', { className: 'loading-sm' }) : 
                    (user.role === 'admin' ? '👤 Сотрудник' : '👑 Админ')
                ),

                // Активация/деактивация
                React.createElement('button', {
                  className: `btn btn-outline btn-sm status-btn ${user.isActive ? 'deactivate' : 'activate'}`,
                  onClick: () => toggleUserStatus(user._id, user.isActive, user.fullName),
                  disabled: actionLoading === user._id || user._id === currentUser?._id,
                  title: user._id === currentUser?._id ? 'Нельзя изменить свой статус' : (user.isActive ? 'Деактивировать' : 'Активировать')
                },
                  actionLoading === user._id ? 
                    React.createElement('div', { className: 'loading-sm' }) : 
                    (user.isActive ? '⏸️ Деактивировать' : '▶️ Активировать')
                ),

                // Удаление
                React.createElement('button', {
                  className: 'btn btn-danger btn-sm delete-btn',
                  onClick: () => deleteUser(user._id, user.fullName),
                  disabled: actionLoading === user._id || user._id === currentUser?._id,
                  title: user._id === currentUser?._id ? 'Нельзя удалить себя' : 'Удалить пользователя'
                },
                  actionLoading === user._id ? 
                    React.createElement('div', { className: 'loading-sm' }) : 
                    '🗑️ Удалить'
                )
              )
            )
          )
        )
      )
    )
  );
}

export default Users;