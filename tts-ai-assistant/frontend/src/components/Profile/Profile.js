import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.js';
import axios from 'axios';
import '../../styles/Profile.css';

function Profile() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        company: user.company || 'ТрансТелеком'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.put('/api/users/profile', formData);
      updateUser(response.data.user);
      setMessage('✅ Профиль успешно обновлен');
      
      // Автоматически скрываем сообщение через 3 секунды
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || '❌ Ошибка обновления профиля');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return React.createElement('div', { className: 'profile-loading' },
      React.createElement('div', { className: 'loading' }),
      'Загрузка профиля...'
    );
  }

  return React.createElement('div', { className: 'profile-page' },
    React.createElement('div', { className: 'profile-header' },
      React.createElement('h1', null, '👤 Мой профиль'),
      React.createElement('p', { className: 'profile-description' }, 
        'Управление вашей учетной записью ТрансТелеком'
      )
    ),

    React.createElement('div', { className: 'profile-container' },
      // Карточка профиля
      React.createElement('div', { className: 'profile-card' },
        React.createElement('div', { className: 'profile-avatar-section' },
          React.createElement('div', { className: 'avatar-circle' },
            React.createElement('span', { className: 'avatar-icon' }, 
              user.role === 'admin' ? '👑' : '👤'
            )
          ),
          React.createElement('div', { className: 'profile-basic-info' },
            React.createElement('h2', { className: 'profile-name' }, user.fullName),
            React.createElement('div', { className: 'profile-badges' },
              React.createElement('span', { 
                className: `role-badge ${user.role === 'admin' ? 'admin-badge' : 'user-badge'}` 
              }, 
                user.role === 'admin' ? '👑 Администратор' : '👤 Сотрудник'
              ),
              React.createElement('span', { 
                className: `status-badge ${user.isActive ? 'active-badge' : 'inactive-badge'}` 
              }, 
                user.isActive ? '✅ Активен' : '⏸️ Неактивен'
              )
            )
          )
        ),

        message && React.createElement('div', { className: 'alert alert-success' }, message),
        error && React.createElement('div', { className: 'alert alert-error' }, error),

        React.createElement('form', { onSubmit: handleSubmit, className: 'profile-form' },
          React.createElement('div', { className: 'form-row' },
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { htmlFor: 'fullName', className: 'form-label' }, 'Полное имя'),
              React.createElement('input', {
                type: 'text',
                id: 'fullName',
                name: 'fullName',
                value: formData.fullName,
                onChange: handleChange,
                className: 'form-input',
                required: true,
                placeholder: 'Введите ваше полное имя'
              })
            ),

            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { htmlFor: 'email', className: 'form-label' }, 'Email адрес'),
              React.createElement('input', {
                type: 'email',
                id: 'email',
                name: 'email',
                value: formData.email,
                onChange: handleChange,
                className: 'form-input',
                required: true,
                placeholder: 'your.email@example.com'
              })
            )
          ),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { htmlFor: 'company', className: 'form-label' }, 'Компания'),
            React.createElement('input', {
              type: 'text',
              id: 'company',
              name: 'company',
              value: formData.company,
              onChange: handleChange,
              className: 'form-input',
              placeholder: 'ТрансТелеком'
            })
          ),

          React.createElement('button', {
            type: 'submit',
            className: 'btn btn-primary save-btn',
            disabled: loading
          }, 
            loading ? 
              React.createElement('div', null,
                React.createElement('div', { className: 'loading' }),
                ' Сохранение...'
              ) : 
              React.createElement('div', null,
                React.createElement('span', { className: 'btn-icon' }, '💾'),
                ' Сохранить изменения'
              )
          )
        )
      ),

      // Информация об аккаунте
      React.createElement('div', { className: 'profile-info-card' },
        React.createElement('h3', null, '📊 Информация об аккаунте'),
        React.createElement('div', { className: 'info-grid' },
          React.createElement('div', { className: 'info-item' },
            React.createElement('span', { className: 'info-label' }, 'ID пользователя:'),
            React.createElement('span', { className: 'info-value' }, user.id || user._id)
          ),
          React.createElement('div', { className: 'info-item' },
            React.createElement('span', { className: 'info-label' }, 'Дата регистрации:'),
            React.createElement('span', { className: 'info-value' }, 
              new Date(user.createdAt).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            )
          ),
          React.createElement('div', { className: 'info-item' },
            React.createElement('span', { className: 'info-label' }, 'Последнее обновление:'),
            React.createElement('span', { className: 'info-value' }, 
              new Date(user.updatedAt).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            )
          ),
          React.createElement('div', { className: 'info-item' },
            React.createElement('span', { className: 'info-label' }, 'Роль в системе:'),
            React.createElement('span', { className: 'info-value' }, 
              user.role === 'admin' ? 'Администратор' : 'Сотрудник'
            )
          )
        )
      )
    )
  );
}

export default Profile;