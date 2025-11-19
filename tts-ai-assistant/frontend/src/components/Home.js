// components/Home.js
import React from 'react';

function Home() {
  return React.createElement('div', { className: 'dashboard-welcome-content' },
    React.createElement('div', { className: 'dashboard-welcome-header' },
      React.createElement('h1', { className: 'dashboard-welcome-title' }, 'ТрансТелеком AI Ассистент'),
      React.createElement('p', { className: 'dashboard-welcome-subtitle' }, 
        'Интеллектуальная платформа для автоматизации бизнес-процессов и аналитики данных'
      )
    ),

    React.createElement('div', { className: 'dashboard-stats-grid' },
      React.createElement('div', { className: 'dashboard-stat-card' },
        React.createElement('span', { className: 'dashboard-stat-icon' }, '🚀'),
        React.createElement('span', { className: 'dashboard-stat-number' }, '95%'),
        React.createElement('span', { className: 'dashboard-stat-label' }, 'Эффективность работы')
      ),
      React.createElement('div', { className: 'dashboard-stat-card' },
        React.createElement('span', { className: 'dashboard-stat-icon' }, '⏱️'),
        React.createElement('span', { className: 'dashboard-stat-number' }, '24/7'),
        React.createElement('span', { className: 'dashboard-stat-label' }, 'Доступность системы')
      ),
      React.createElement('div', { className: 'dashboard-stat-card' },
        React.createElement('span', { className: 'dashboard-stat-icon' }, '📊'),
        React.createElement('span', { className: 'dashboard-stat-number' }, '1000+'),
        React.createElement('span', { className: 'dashboard-stat-label' }, 'Обработанных запросов')
      )
    ),

    React.createElement('div', { className: 'dashboard-features-section' },
      React.createElement('h2', { className: 'dashboard-section-title' }, 'Ключевые возможности'),
      React.createElement('div', { className: 'dashboard-features-grid-main' },
        React.createElement('div', { className: 'dashboard-feature-card' },
          React.createElement('span', { className: 'dashboard-feature-card-icon' }, '🤖'),
          React.createElement('h3', { className: 'dashboard-feature-card-title' }, 'AI Чат-ассистент'),
          React.createElement('p', { className: 'dashboard-feature-card-description' }, 
            'Умный помощник для ответов на вопросы, анализа данных и решения бизнес-задач'
          )
        ),
        React.createElement('div', { className: 'dashboard-feature-card' },
          React.createElement('span', { className: 'dashboard-feature-card-icon' }, '📁'),
          React.createElement('h3', { className: 'dashboard-feature-card-title' }, 'Умные документы'),
          React.createElement('p', { className: 'dashboard-feature-card-description' }, 
            'Автоматическая обработка и анализ документов с помощью искусственного интеллекта'
          )
        ),
        React.createElement('div', { className: 'dashboard-feature-card' },
          React.createElement('span', { className: 'dashboard-feature-card-icon' }, '🔍'),
          React.createElement('h3', { className: 'dashboard-feature-card-title' }, 'Глубокая аналитика'),
          React.createElement('p', { className: 'dashboard-feature-card-description' }, 
            'Продвинутая аналитика данных с визуализацией и прогнозированием'
          )
        )
      )
    ),

    React.createElement('div', { className: 'dashboard-cta-section' },
      React.createElement('h2', { className: 'dashboard-cta-title' }, 'Готовы начать работу?'),
      React.createElement('p', { className: 'dashboard-cta-description' }, 
        'Начните общение с AI-ассистентом прямо сейчас и оптимизируйте ваши бизнес-процессы'
      ),
      React.createElement('button', {
        className: 'dashboard-cta-button',
        onClick: () => window.location.href = '/chat'
      },
        React.createElement('span', null, '💬'),
        'Начать диалог с AI'
      )
    )
  );
}

export default Home;