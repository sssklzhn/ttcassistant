// // components/Home.js
// import React from 'react';

// function Home() {
//   return React.createElement('div', { className: 'dashboard-welcome-content' },
//     React.createElement('div', { className: 'dashboard-welcome-header' },
//       React.createElement('h1', { className: 'dashboard-welcome-title' }, 'ТрансТелеком AI Ассистент'),
//       React.createElement('p', { className: 'dashboard-welcome-subtitle' }, 
//         'Интеллектуальная платформа для автоматизации бизнес-процессов и аналитики данных'
//       )
//     ),

//     React.createElement('div', { className: 'dashboard-stats-grid' },
//       React.createElement('div', { className: 'dashboard-stat-card' },
//         React.createElement('span', { className: 'dashboard-stat-icon' }, '🚀'),
//         React.createElement('span', { className: 'dashboard-stat-number' }, '95%'),
//         React.createElement('span', { className: 'dashboard-stat-label' }, 'Эффективность работы')
//       ),
//       React.createElement('div', { className: 'dashboard-stat-card' },
//         React.createElement('span', { className: 'dashboard-stat-icon' }, '⏱️'),
//         React.createElement('span', { className: 'dashboard-stat-number' }, '24/7'),
//         React.createElement('span', { className: 'dashboard-stat-label' }, 'Доступность системы')
//       ),
//       React.createElement('div', { className: 'dashboard-stat-card' },
//         React.createElement('span', { className: 'dashboard-stat-icon' }, '📊'),
//         React.createElement('span', { className: 'dashboard-stat-number' }, '1000+'),
//         React.createElement('span', { className: 'dashboard-stat-label' }, 'Обработанных запросов')
//       )
//     ),

//     React.createElement('div', { className: 'dashboard-features-section' },
//       React.createElement('h2', { className: 'dashboard-section-title' }, 'Ключевые возможности'),
//       React.createElement('div', { className: 'dashboard-features-grid-main' },
//         React.createElement('div', { className: 'dashboard-feature-card' },
//           React.createElement('span', { className: 'dashboard-feature-card-icon' }, '🤖'),
//           React.createElement('h3', { className: 'dashboard-feature-card-title' }, 'AI Чат-ассистент'),
//           React.createElement('p', { className: 'dashboard-feature-card-description' }, 
//             'Умный помощник для ответов на вопросы, анализа данных и решения бизнес-задач'
//           )
//         ),
//         React.createElement('div', { className: 'dashboard-feature-card' },
//           React.createElement('span', { className: 'dashboard-feature-card-icon' }, '📁'),
//           React.createElement('h3', { className: 'dashboard-feature-card-title' }, 'Умные документы'),
//           React.createElement('p', { className: 'dashboard-feature-card-description' }, 
//             'Автоматическая обработка и анализ документов с помощью искусственного интеллекта'
//           )
//         ),
//         React.createElement('div', { className: 'dashboard-feature-card' },
//           React.createElement('span', { className: 'dashboard-feature-card-icon' }, '🔍'),
//           React.createElement('h3', { className: 'dashboard-feature-card-title' }, 'Глубокая аналитика'),
//           React.createElement('p', { className: 'dashboard-feature-card-description' }, 
//             'Продвинутая аналитика данных с визуализацией и прогнозированием'
//           )
//         )
//       )
//     ),

//     React.createElement('div', { className: 'dashboard-cta-section' },
//       React.createElement('h2', { className: 'dashboard-cta-title' }, 'Готовы начать работу?'),
//       React.createElement('p', { className: 'dashboard-cta-description' }, 
//         'Начните общение с AI-ассистентом прямо сейчас и оптимизируйте ваши бизнес-процессы'
//       ),
//       React.createElement('button', {
//         className: 'dashboard-cta-button',
//         onClick: () => window.location.href = '/chat'
//       },
//         React.createElement('span', null, '💬'),
//         'Начать диалог с AI'
//       )
//     )
//   );
// }

// export default Home;

// components/Home.js
import React from 'react';

function Home() {
  return React.createElement('div', { className: 'dashboard-welcome-content' },
    React.createElement('div', { className: 'dashboard-welcome-header' },
      React.createElement('div', { className: 'welcome-header-content' },
        React.createElement('div', { className: 'welcome-icon-container' },
          React.createElement('div', { className: 'welcome-main-icon' }),
          React.createElement('div', { className: 'welcome-icon-glow' })
        ),
        React.createElement('div', { className: 'welcome-text-content' },
          React.createElement('h1', { className: 'dashboard-welcome-title' }, 'ТрансТелеком AI Ассистент'),
          React.createElement('p', { className: 'dashboard-welcome-subtitle' }, 
            'Интеллектуальная платформа для автоматизации бизнес-процессов и аналитики данных'
          ),
          React.createElement('div', { className: 'welcome-badges' },
            React.createElement('span', { className: 'welcome-badge' }, 'Инновации'),
            React.createElement('span', { className: 'welcome-badge' }, 'Безопасность'),
            React.createElement('span', { className: 'welcome-badge' }, 'Эффективность')
          )
        )
      )
    ),

    React.createElement('div', { className: 'dashboard-welcome-stats' },
      React.createElement('h2', { className: 'stats-section-title' }, 'Наши показатели'),
      React.createElement('div', { className: 'dashboard-stats-grid' },
        React.createElement('div', { className: 'dashboard-stat-card' },
          React.createElement('div', { className: 'stat-card-inner' },
            React.createElement('div', { className: 'stat-icon efficiency-icon' }),
            React.createElement('div', { className: 'stat-data' },
              React.createElement('span', { className: 'dashboard-stat-number' }, '98.7%'),
              React.createElement('span', { className: 'dashboard-stat-label' }, 'Точность обработки запросов')
            )
          ),
          React.createElement('p', { className: 'stat-description' }, 
            'Высокая точность понимания контекста и генерации релевантных ответов'
          )
        ),
        React.createElement('div', { className: 'dashboard-stat-card' },
          React.createElement('div', { className: 'stat-card-inner' },
            React.createElement('div', { className: 'stat-icon availability-icon' }),
            React.createElement('div', { className: 'stat-data' },
              React.createElement('span', { className: 'dashboard-stat-number' }, '99.9%'),
              React.createElement('span', { className: 'dashboard-stat-label' }, 'Доступность системы')
            )
          ),
          React.createElement('p', { className: 'stat-description' }, 
            'Круглосуточная работа без перерывов на техническое обслуживание'
          )
        ),
        React.createElement('div', { className: 'dashboard-stat-card' },
          React.createElement('div', { className: 'stat-card-inner' },
            React.createElement('div', { className: 'stat-icon performance-icon' }),
            React.createElement('div', { className: 'stat-data' },
              React.createElement('span', { className: 'dashboard-stat-number' }, '2,458'),
              React.createElement('span', { className: 'dashboard-stat-label' }, 'Обработано запросов сегодня')
            )
          ),
          React.createElement('p', { className: 'stat-description' }, 
            'Ежедневная обработка тысяч запросов от сотрудников компании'
          )
        )
      )
    ),

    React.createElement('div', { className: 'dashboard-features-section' },
      React.createElement('div', { className: 'section-header' },
        React.createElement('h2', { className: 'dashboard-section-title' }, 'Ключевые возможности платформы'),
        React.createElement('p', { className: 'section-subtitle' }, 
          'Комплексный набор инструментов для оптимизации бизнес-процессов'
        )
      ),
      React.createElement('div', { className: 'dashboard-features-grid-main' },
        React.createElement('div', { className: 'dashboard-feature-card' },
          React.createElement('div', { className: 'feature-card-header' },
            React.createElement('div', { className: 'feature-icon ai-assistant-icon' }),
            React.createElement('h3', { className: 'dashboard-feature-card-title' }, 'Интеллектуальный ассистент')
          ),
          React.createElement('p', { className: 'dashboard-feature-card-description' }, 
            'Продвинутый AI-помощник для обработки запросов, анализа данных и принятия решений на основе корпоративных знаний'
          ),
          React.createElement('div', { className: 'feature-tags' },
            React.createElement('span', { className: 'feature-tag' }, 'NLP'),
            React.createElement('span', { className: 'feature-tag' }, 'Контекст'),
            React.createElement('span', { className: 'feature-tag' }, 'Мультиязычность')
          )
        ),
        React.createElement('div', { className: 'dashboard-feature-card' },
          React.createElement('div', { className: 'feature-card-header' },
            React.createElement('div', { className: 'feature-icon documents-icon' }),
            React.createElement('h3', { className: 'dashboard-feature-card-title' }, 'Управление знаниями')
          ),
          React.createElement('p', { className: 'dashboard-feature-card-description' }, 
            'Централизованная база знаний с автоматической обработкой документов, семантическим поиском и классификацией'
          ),
          React.createElement('div', { className: 'feature-tags' },
            React.createElement('span', { className: 'feature-tag' }, 'PDF/DOCX'),
            React.createElement('span', { className: 'feature-tag' }, 'Поиск'),
            React.createElement('span', { className: 'feature-tag' }, 'Анализ')
          )
        ),
        React.createElement('div', { className: 'dashboard-feature-card' },
          React.createElement('div', { className: 'feature-card-header' },
            React.createElement('div', { className: 'feature-icon analytics-icon' }),
            React.createElement('h3', { className: 'dashboard-feature-card-title' }, 'Бизнес-аналитика')
          ),
          React.createElement('p', { className: 'dashboard-feature-card-description' }, 
            'Продвинутая аналитика с визуализацией данных, прогнозированием трендов и генерацией инсайтов'
          ),
          React.createElement('div', { className: 'feature-tags' },
            React.createElement('span', { className: 'feature-tag' }, 'Дашборды'),
            React.createElement('span', { className: 'feature-tag' }, 'Прогнозы'),
            React.createElement('span', { className: 'feature-tag' }, 'Отчеты')
          )
        )
      )
    ),

    React.createElement('div', { className: 'dashboard-platform-info' },
      React.createElement('div', { className: 'platform-info-grid' },
        React.createElement('div', { className: 'platform-info-card' },
          React.createElement('div', { className: 'info-icon security-icon' }),
          React.createElement('h4', null, 'Корпоративная безопасность'),
          React.createElement('p', null, 
            'Все данные обрабатываются на защищенных серверах с полным соответствием требованиям GDPR'
          )
        ),
        React.createElement('div', { className: 'platform-info-card' },
          React.createElement('div', { className: 'info-icon integration-icon' }),
          React.createElement('h4', null, 'Интеграции с системами'),
          React.createElement('p', null, 
            'Готовые интеграции с SAP, 1C, Microsoft Dynamics и другими корпоративными системами'
          )
        ),
        React.createElement('div', { className: 'platform-info-card' },
          React.createElement('div', { className: 'info-icon support-icon' }),
          React.createElement('h4', null, 'Техническая поддержка'),
          React.createElement('p', null, 
            'Круглосуточная поддержка от команды экспертов ТрансТелеком'
          )
        )
      )
    ),

    React.createElement('div', { className: 'dashboard-cta-section' },
      React.createElement('div', { className: 'cta-content' },
        React.createElement('div', { className: 'cta-icon-container' }),
        React.createElement('div', { className: 'cta-text' },
          React.createElement('h2', { className: 'dashboard-cta-title' }, 'Начните использовать AI сегодня'),
          React.createElement('p', { className: 'dashboard-cta-description' }, 
            'Подключитесь к интеллектуальной платформе и оптимизируйте рабочие процессы уже сегодня'
          )
        ),
        React.createElement('button', {
          className: 'dashboard-cta-button',
          onClick: function() { window.location.href = '/chat'; }
        },
          'Перейти к чат-ассистенту',
          React.createElement('div', { className: 'cta-button-icon' })
        )
      )
    ),

    React.createElement('div', { className: 'dashboard-recent-activity' },
      React.createElement('h3', null, 'Последние обновления платформы'),
      React.createElement('div', { className: 'activity-items' },
        React.createElement('div', { className: 'activity-item' },
          React.createElement('div', { className: 'activity-date' }, 'Сегодня'),
          React.createElement('p', null, 'Добавлена поддержка анализа Excel файлов в реальном времени')
        ),
        React.createElement('div', { className: 'activity-item' },
          React.createElement('div', { className: 'activity-date' }, 'Вчера'),
          React.createElement('p', null, 'Обновлена база знаний компании - добавлено 127 новых документов')
        ),
        React.createElement('div', { className: 'activity-item' },
          React.createElement('div', { className: 'activity-date' }, '2 дня назад'),
          React.createElement('p', null, 'Улучшена точность ответов в технической документации на 15%')
        )
      )
    )
  );
}

export default Home;