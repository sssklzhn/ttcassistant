import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import '../../styles/Dashboard.css';
import logo from '../../assets/logo.png';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'dashboard-nav-link active' : 'dashboard-nav-link';
  };

  const isAdmin = user && user.role === 'admin';

  return React.createElement('div', { className: 'dashboard-layout' },
    React.createElement('nav', { className: 'dashboard-sidebar' },
      React.createElement('div', { className: 'dashboard-sidebar-header' },
        React.createElement('div', { className: 'dashboard-logo-container' },
          React.createElement('img', { 
            src: logo, 
            alt: 'Transtelecom Logo',
            className: 'dashboard-logo-image'
          }),
          React.createElement('div', { className: 'dashboard-logo-text' },
            React.createElement('h1', { className: 'dashboard-sidebar-title' }, 'ТТС AI'),
            React.createElement('p', { className: 'dashboard-sidebar-subtitle' }, 'Интеллектуальный ассистент')
          )
        )
      ),

      React.createElement('div', { className: 'dashboard-nav-section' },
        React.createElement('button', {
          className: `${isActive('/')} dashboard-hover-lift`,
          onClick: () => navigate('/')
        }, 
          React.createElement('span', { className: 'dashboard-nav-icon' }, '🚀'),
          React.createElement('span', { className: 'dashboard-nav-text' }, 'Главная')
        ),
        
        React.createElement('button', {
          className: `${isActive('/chat')} dashboard-hover-lift`,
          onClick: () => navigate('/chat')
        }, 
          React.createElement('span', { className: 'dashboard-nav-icon' }, '🤖'),
          React.createElement('span', { className: 'dashboard-nav-text' }, 'AI Чат')
        ),
        
        isAdmin && React.createElement('button', {
          className: `${isActive('/documents')} dashboard-hover-lift`,
          onClick: () => navigate('/documents')
        }, 
          React.createElement('span', { className: 'dashboard-nav-icon' }, '📊'),
          React.createElement('span', { className: 'dashboard-nav-text' }, 'Документы')
        ),

        isAdmin && React.createElement('button', {
          className: `${isActive('/users')} dashboard-hover-lift`,
          onClick: () => navigate('/users')
        }, 
          React.createElement('span', { className: 'dashboard-nav-icon' }, '👥'),
          React.createElement('span', { className: 'dashboard-nav-text' }, 'Пользователи')
        ),

        React.createElement('button', {
          className: `${isActive('/profile')} dashboard-hover-lift`,
          onClick: () => navigate('/profile')
        }, 
          React.createElement('span', { className: 'dashboard-nav-icon' }, '⚡'),
          React.createElement('span', { className: 'dashboard-nav-text' }, 'Мой профиль')
        ),

        React.createElement('button', {
          className: `${isActive('/settings')} dashboard-hover-lift`,
          onClick: () => navigate('/settings')
        }, 
          React.createElement('span', { className: 'dashboard-nav-icon' }, '⚙️'),
          React.createElement('span', { className: 'dashboard-nav-text' }, 'Настройки')
        )
      ),

      React.createElement('div', { className: 'dashboard-ai-features' },
        React.createElement('h4', { className: 'dashboard-features-title' }, 'AI Возможности'),
        React.createElement('div', { className: 'dashboard-features-grid' },
          React.createElement('button', {
            className: 'dashboard-feature-btn',
            onClick: () => navigate('/chat?mode=creative')
          },
            React.createElement('span', { className: 'dashboard-feature-icon' }, '🎨'),
            React.createElement('span', { className: 'dashboard-feature-text' }, 'Креатив')
          ),
          React.createElement('button', {
            className: 'dashboard-feature-btn',
            onClick: () => navigate('/chat?mode=analytical')
          },
            React.createElement('span', { className: 'dashboard-feature-icon' }, '📈'),
            React.createElement('span', { className: 'dashboard-feature-text' }, 'Анализ')
          ),
          React.createElement('button', {
            className: 'dashboard-feature-btn',
            onClick: () => navigate('/chat?mode=technical')
          },
            React.createElement('span', { className: 'dashboard-feature-icon' }, '🔧'),
            React.createElement('span', { className: 'dashboard-feature-text' }, 'Технический')
          ),
          React.createElement('button', {
            className: 'dashboard-feature-btn',
            onClick: () => navigate('/chat?mode=research')
          },
            React.createElement('span', { className: 'dashboard-feature-icon' }, '🔍'),
            React.createElement('span', { className: 'dashboard-feature-text' }, 'Исследование')
          )
        )
      ),

      React.createElement('div', { className: 'dashboard-user-section' },
        React.createElement('div', { className: 'dashboard-user-card dashboard-glass-effect' },
          React.createElement('div', { className: 'dashboard-user-avatar' },
            React.createElement('span', { className: 'dashboard-avatar-icon' }, '👤')
          ),
          React.createElement('div', { className: 'dashboard-user-info' },
            React.createElement('div', { className: 'dashboard-user-name' }, user?.fullName || 'Пользователь'),
            React.createElement('div', { className: 'dashboard-user-email' }, user?.email),
            React.createElement('div', { 
              className: `dashboard-user-role ${isAdmin ? 'dashboard-admin-role' : 'dashboard-user-role-default'}` 
            }, 
              React.createElement('span', { className: 'dashboard-role-icon' }, isAdmin ? '👑' : '💎'),
              isAdmin ? 'Администратор' : 'Профессионал'
            )
          ),
          React.createElement('div', { className: 'dashboard-user-status' },
            React.createElement('div', { className: 'dashboard-status-indicator active' }),
            React.createElement('span', { className: 'dashboard-status-text' }, 'Online')
          )
        ),
        
        React.createElement('div', { className: 'dashboard-action-buttons' },
          React.createElement('button', {
            className: 'dashboard-support-btn',
            onClick: () => navigate('/support')
          },
            React.createElement('span', { className: 'dashboard-btn-icon' }, '💬'),
            'Поддержка'
          ),
          React.createElement('button', {
            className: 'dashboard-logout-btn dashboard-hover-lift',
            onClick: handleLogout
          }, 
            React.createElement('span', { className: 'dashboard-logout-icon' }, '🚀'),
            'Выйти'
          )
        )
      )
    ),

    React.createElement('main', { className: 'dashboard-main-content' },
      React.createElement('div', { className: 'dashboard-content-header' },
        React.createElement('div', { className: 'dashboard-header-content' },
          React.createElement('h1', { className: 'dashboard-page-title' }, getPageTitle(location.pathname)),
          React.createElement('p', { className: 'dashboard-page-description' }, getPageDescription(location.pathname))
        ),
        React.createElement('div', { className: 'dashboard-header-actions' },
          React.createElement('button', {
            className: 'dashboard-notification-btn',
            onClick: () => navigate('/notifications')
          },
            React.createElement('span', { className: 'dashboard-notification-icon' }, '🔔'),
            React.createElement('span', { className: 'dashboard-notification-badge' }, '3')
          ),
          React.createElement('button', {
            className: 'dashboard-quick-action-btn',
            onClick: () => navigate('/chat')
          },
            React.createElement('span', { className: 'dashboard-action-icon' }, '✨'),
            'Новый чат'
          )
        )
      ),

      React.createElement('div', { className: 'dashboard-content-wrapper' },
        React.createElement(Outlet)
      )
    )
  );
}

// Вспомогательные функции для заголовков страниц
function getPageTitle(pathname) {
  const titles = {
    '/': 'Главная панель',
    '/chat': 'AI Ассистент',
    '/documents': 'Аналитика данных',
    '/users': 'Управление командой',
    '/profile': 'Мой профиль',
    '/settings': 'Настройки системы'
  };
  return titles[pathname] || 'ТТС AI Панель';
}

function getPageDescription(pathname) {
  const descriptions = {
    '/': 'Обзор вашей активности и статистики',
    '/chat': 'Общайтесь с искусственным интеллектом компании',
    '/documents': 'Анализ данных и отчетность',
    '/users': 'Управление пользователями и доступом',
    '/profile': 'Настройки вашего профиля и предпочтений',
    '/settings': 'Конфигурация системы и параметров'
  };
  return descriptions[pathname] || 'Интеллектуальная платформа ТТС';
}

export default Dashboard;