// import React from 'react';
// import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext.js';
// import '../../styles/Dashboard.css';
// import logo from '../../assets/logo.png';

// function Dashboard() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const isActive = (path) => {
//     return location.pathname === path ? 'dashboard-nav-link active' : 'dashboard-nav-link';
//   };

//   const isAdmin = user && user.role === 'admin';

//   return React.createElement('div', { className: 'dashboard-layout' },
//     React.createElement('nav', { className: 'dashboard-sidebar' },
//       React.createElement('div', { className: 'dashboard-sidebar-header' },
//         React.createElement('div', { className: 'dashboard-logo-container' },
//           React.createElement('img', { 
//             src: logo, 
//             alt: 'Transtelecom Logo',
//             className: 'dashboard-logo-image'
//           }),
//           React.createElement('div', { className: 'dashboard-logo-text' },
//             React.createElement('h1', { className: 'dashboard-sidebar-title' }, 'ТТС AI'),
//             React.createElement('p', { className: 'dashboard-sidebar-subtitle' }, 'Интеллектуальный ассистент')
//           )
//         )
//       ),

//       React.createElement('div', { className: 'dashboard-nav-section' },
//         React.createElement('button', {
//           className: `${isActive('/')} dashboard-hover-lift`,
//           onClick: () => navigate('/')
//         }, 
//           React.createElement('span', { className: 'dashboard-nav-icon' }, '🚀'),
//           React.createElement('span', { className: 'dashboard-nav-text' }, 'Главная')
//         ),
        
//         React.createElement('button', {
//           className: `${isActive('/chat')} dashboard-hover-lift`,
//           onClick: () => navigate('/chat')
//         }, 
//           React.createElement('span', { className: 'dashboard-nav-icon' }, '🤖'),
//           React.createElement('span', { className: 'dashboard-nav-text' }, 'AI Чат')
//         ),
        
//         isAdmin && React.createElement('button', {
//           className: `${isActive('/documents')} dashboard-hover-lift`,
//           onClick: () => navigate('/documents')
//         }, 
//           React.createElement('span', { className: 'dashboard-nav-icon' }, '📊'),
//           React.createElement('span', { className: 'dashboard-nav-text' }, 'Документы')
//         ),

//         isAdmin && React.createElement('button', {
//           className: `${isActive('/users')} dashboard-hover-lift`,
//           onClick: () => navigate('/users')
//         }, 
//           React.createElement('span', { className: 'dashboard-nav-icon' }, '👥'),
//           React.createElement('span', { className: 'dashboard-nav-text' }, 'Пользователи')
//         ),

//         React.createElement('button', {
//           className: `${isActive('/profile')} dashboard-hover-lift`,
//           onClick: () => navigate('/profile')
//         }, 
//           React.createElement('span', { className: 'dashboard-nav-icon' }, '⚡'),
//           React.createElement('span', { className: 'dashboard-nav-text' }, 'Мой профиль')
//         ),

//         React.createElement('button', {
//           className: `${isActive('/settings')} dashboard-hover-lift`,
//           onClick: () => navigate('/settings')
//         }, 
//           React.createElement('span', { className: 'dashboard-nav-icon' }, '⚙️'),
//           React.createElement('span', { className: 'dashboard-nav-text' }, 'Настройки')
//         )
//       ),

//       React.createElement('div', { className: 'dashboard-ai-features' },
//         React.createElement('h4', { className: 'dashboard-features-title' }, 'AI Возможности'),
//         React.createElement('div', { className: 'dashboard-features-grid' },
//           React.createElement('button', {
//             className: 'dashboard-feature-btn',
//             onClick: () => navigate('/chat?mode=creative')
//           },
//             React.createElement('span', { className: 'dashboard-feature-icon' }, '🎨'),
//             React.createElement('span', { className: 'dashboard-feature-text' }, 'Креатив')
//           ),
//           React.createElement('button', {
//             className: 'dashboard-feature-btn',
//             onClick: () => navigate('/chat?mode=analytical')
//           },
//             React.createElement('span', { className: 'dashboard-feature-icon' }, '📈'),
//             React.createElement('span', { className: 'dashboard-feature-text' }, 'Анализ')
//           ),
//           React.createElement('button', {
//             className: 'dashboard-feature-btn',
//             onClick: () => navigate('/chat?mode=technical')
//           },
//             React.createElement('span', { className: 'dashboard-feature-icon' }, '🔧'),
//             React.createElement('span', { className: 'dashboard-feature-text' }, 'Технический')
//           ),
//           React.createElement('button', {
//             className: 'dashboard-feature-btn',
//             onClick: () => navigate('/chat?mode=research')
//           },
//             React.createElement('span', { className: 'dashboard-feature-icon' }, '🔍'),
//             React.createElement('span', { className: 'dashboard-feature-text' }, 'Исследование')
//           )
//         )
//       ),

//       React.createElement('div', { className: 'dashboard-user-section' },
//         React.createElement('div', { className: 'dashboard-user-card dashboard-glass-effect' },
//           React.createElement('div', { className: 'dashboard-user-avatar' },
//             React.createElement('span', { className: 'dashboard-avatar-icon' }, '👤')
//           ),
//           React.createElement('div', { className: 'dashboard-user-info' },
//             React.createElement('div', { className: 'dashboard-user-name' }, user?.fullName || 'Пользователь'),
//             React.createElement('div', { className: 'dashboard-user-email' }, user?.email),
//             React.createElement('div', { 
//               className: `dashboard-user-role ${isAdmin ? 'dashboard-admin-role' : 'dashboard-user-role-default'}` 
//             }, 
//               React.createElement('span', { className: 'dashboard-role-icon' }, isAdmin ? '👑' : '💎'),
//               isAdmin ? 'Администратор' : 'Профессионал'
//             )
//           ),
//           React.createElement('div', { className: 'dashboard-user-status' },
//             React.createElement('div', { className: 'dashboard-status-indicator active' }),
//             React.createElement('span', { className: 'dashboard-status-text' }, 'Online')
//           )
//         ),
        
//         React.createElement('div', { className: 'dashboard-action-buttons' },
//           React.createElement('button', {
//             className: 'dashboard-support-btn',
//             onClick: () => navigate('/support')
//           },
//             React.createElement('span', { className: 'dashboard-btn-icon' }, '💬'),
//             'Поддержка'
//           ),
//           React.createElement('button', {
//             className: 'dashboard-logout-btn dashboard-hover-lift',
//             onClick: handleLogout
//           }, 
//             React.createElement('span', { className: 'dashboard-logout-icon' }, '🚀'),
//             'Выйти'
//           )
//         )
//       )
//     ),

//     React.createElement('main', { className: 'dashboard-main-content' },
//       React.createElement('div', { className: 'dashboard-content-header' },
//         React.createElement('div', { className: 'dashboard-header-content' },
//           React.createElement('h1', { className: 'dashboard-page-title' }, getPageTitle(location.pathname)),
//           React.createElement('p', { className: 'dashboard-page-description' }, getPageDescription(location.pathname))
//         ),
//         React.createElement('div', { className: 'dashboard-header-actions' },
//           React.createElement('button', {
//             className: 'dashboard-notification-btn',
//             onClick: () => navigate('/notifications')
//           },
//             React.createElement('span', { className: 'dashboard-notification-icon' }, '🔔'),
//             React.createElement('span', { className: 'dashboard-notification-badge' }, '3')
//           ),
//           React.createElement('button', {
//             className: 'dashboard-quick-action-btn',
//             onClick: () => navigate('/chat')
//           },
//             React.createElement('span', { className: 'dashboard-action-icon' }, '✨'),
//             'Новый чат'
//           )
//         )
//       ),

//       React.createElement('div', { className: 'dashboard-content-wrapper' },
//         React.createElement(Outlet)
//       )
//     )
//   );
// }

// // Вспомогательные функции для заголовков страниц
// function getPageTitle(pathname) {
//   const titles = {
//     '/': 'Главная панель',
//     '/chat': 'AI Ассистент',
//     '/documents': 'Аналитика данных',
//     '/users': 'Управление командой',
//     '/profile': 'Мой профиль',
//     '/settings': 'Настройки системы'
//   };
//   return titles[pathname] || 'ТТС AI Панель';
// }

// function getPageDescription(pathname) {
//   const descriptions = {
//     '/': 'Обзор вашей активности и статистики',
//     '/chat': 'Общайтесь с искусственным интеллектом компании',
//     '/documents': 'Анализ данных и отчетность',
//     '/users': 'Управление пользователями и доступом',
//     '/profile': 'Настройки вашего профиля и предпочтений',
//     '/settings': 'Конфигурация системы и параметров'
//   };
//   return descriptions[pathname] || 'Интеллектуальная платформа ТТС';
// }

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import '../../styles/Dashboard.css';
import logo from '../../assets/logo.png';

// Создаем простые иконки (замените на свои, если есть)
function createSimpleIcon(svgPath, props = {}) {
  return React.createElement('svg', {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props
  }, [
    React.createElement('path', { d: svgPath })
  ]);
}

// Определяем иконки
const iconPaths = {
  Rocket: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  Bot: "M18 8h1a4 4 0 010 8h-1 M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z M6 1v3 M10 1v3 M14 1v3",
  BarChart: "M12 20V10 M18 20V4 M6 20v-4",
  User: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 3a4 4 0 100 8 4 4 0 000-8z",
  Settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z",
  Palette: "M12 2a10 10 0 00-1 19.94V21h1a10 10 0 000-19z M2 12a10 10 0 0119.94-1H21v1a10 10 0 01-19.94 1H2v-1z",
  TrendingUp: "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  Search: "M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z M16 16l4.5 4.5",
  MessageSquare: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  LogOut: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
  Bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  Sparkles: "M12 3l1.912 5.813L20 9l-5.088 3.187L12 18l-1.912-5.813L4 9l5.088-3.187L12 3z",
  Shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  Home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  ChevronRight: "M9 18l6-6-6-6",
  Lightning: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  Globe: "M12 2a10 10 0 100 20 10 10 0 000-20z M2 12h20",
  Database: "M12 8c-5.5 0-10 2.24-10 5v4c0 2.76 4.5 5 10 5s10-2.24 10-5v-4c0-2.76-4.5-5-10-5z M12 8v10",
  Server: "M20 2H4a2 2 0 00-2 2v4a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2z M20 14H4a2 2 0 00-2 2v4a2 2 0 002 2h16a2 2 0 002-2v-4a2 2 0 00-2-2z M6 6h.01 M6 18h.01",
  Cpu: "M4 4h16v16H4z M9 9h6v6H9z M9 1v3 M15 1v3 M9 20v3 M15 20v3 M20 9h3 M20 14h3 M1 9h3 M1 14h3",
  Network: "M12 2a10 10 0 100 20 10 10 0 000-20z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  Lock: "M5 13a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6z M11 16a2 2 0 102-2 2 2 0 00-2 2z M8 13V7a4 4 0 018 0v6",
  Star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  Activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  Terminal: "M4 17l6-6-6-6 M12 19h8",
  Cloud: "M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z",
  Monitor: "M20 3H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2z M8 21h8 M12 17v4"
};

// Создаем компоненты иконок
const icons = {};
for (const [name, path] of Object.entries(iconPaths)) {
  icons[name] = (props) => createSimpleIcon(path, props);
}

// Псевдонимы для совместимости
const {
  Rocket: RocketIcon,
  Bot: BotIcon,
  BarChart: BarChartIcon,
  User: UserIcon,
  Settings: SettingsIcon,
  Palette: PaletteIcon,
  TrendingUp: TrendingUpIcon,
  Search: SearchIcon,
  MessageSquare: MessageSquareIcon,
  LogOut: LogOutIcon,
  Bell: BellIcon,
  Sparkles: SparklesIcon,
  Shield: ShieldIcon,
  Home: HomeIcon,
  ChevronRight: ChevronRightIcon,
  Lightning: LightningIcon,
  Globe: GlobeIcon,
  Database: DatabaseIcon,
  Server: ServerIcon,
  Cpu: CpuIcon,
  Network: NetworkIcon,
  Lock: LockIcon,
  Star: StarIcon,
  Activity: ActivityIcon,
  Terminal: TerminalIcon,
  Cloud: CloudIcon,
  Monitor: MonitorIcon
} = icons;

// Компонент AlertIcon
function AlertIcon(props) {
  return createSimpleIcon("M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01", props);
}

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'cascade-nav-link active' : 'cascade-nav-link';
  };

  const isAdmin = user && user.role === 'admin';

  // Вспомогательные функции для создания элементов
  const createElement = React.createElement;

  // Главный контент для дашборда
  const DashboardContent = () => {
    return createElement('div', { className: 'verdant-welcome fade-in-up' }, [
      // Hero Section
      createElement('div', { key: 'hero', className: 'cascade-hero-section' }, [
        createElement('h1', { key: 'title', className: 'verdant-hero-title' }, 'Welcome to TTC AI Platform'),
        createElement('p', { key: 'subtitle', className: 'cascade-hero-subtitle' }, 
          'Enterprise-grade artificial intelligence platform transforming business operations with cutting-edge AI solutions'
        ),
        createElement('div', { key: 'stats', className: 'sylph-stats-grid' }, [
          createElement('div', { key: 'stat1', className: 'verdant-stat-card' }, [
            createElement('span', { key: 'num1', className: 'glow-stat-number' }, '24.7k'),
            createElement('span', { key: 'label1', className: 'moss-stat-label' }, 'Active Sessions')
          ]),
          createElement('div', { key: 'stat2', className: 'verdant-stat-card' }, [
            createElement('span', { key: 'num2', className: 'glow-stat-number' }, '99.8%'),
            createElement('span', { key: 'label2', className: 'moss-stat-label' }, 'System Uptime')
          ]),
          createElement('div', { key: 'stat3', className: 'verdant-stat-card' }, [
            createElement('span', { key: 'num3', className: 'glow-stat-number' }, '1.2s'),
            createElement('span', { key: 'label3', className: 'moss-stat-label' }, 'Avg Response Time')
          ])
        ])
      ]),

      // Features Grid
      createElement('div', { key: 'features', className: 'emerald-features-grid' }, [
        createElement('div', { key: 'feature1', className: 'cascade-feature-card' }, [
          createElement(CpuIcon, { key: 'icon1', className: 'glow-feature-icon' }),
          createElement('h3', { key: 'title1', className: 'verdant-feature-title' }, 'AI Assistant'),
          createElement('p', { key: 'desc1', className: 'sage-feature-description' }, 
            'Intelligent conversation with enterprise-grade AI. Get instant answers, generate content, and analyze data.'
          ),
          createElement('span', { key: 'badge1', className: 'lime-feature-badge' }, 'New: GPT-4 Integration')
        ]),
        createElement('div', { key: 'feature2', className: 'cascade-feature-card' }, [
          createElement(DatabaseIcon, { key: 'icon2', className: 'glow-feature-icon' }),
          createElement('h3', { key: 'title2', className: 'verdant-feature-title' }, 'Data Analytics'),
          createElement('p', { key: 'desc2', className: 'sage-feature-description' }, 
            'Real-time analytics and business intelligence. Monitor KPIs, generate reports, and gain insights.'
          ),
          createElement('span', { key: 'badge2', className: 'lime-feature-badge' }, 'Live Dashboard')
        ]),
        createElement('div', { key: 'feature3', className: 'cascade-feature-card' }, [
          createElement(ShieldIcon, { key: 'icon3', className: 'glow-feature-icon' }),
          createElement('h3', { key: 'title3', className: 'verdant-feature-title' }, 'Enterprise Security'),
          createElement('p', { key: 'desc3', className: 'sage-feature-description' }, 
            'Military-grade encryption, zero-trust architecture, and compliance with ISO 27001 standards.'
          ),
          createElement('span', { key: 'badge3', className: 'lime-feature-badge' }, 'SOC2 Certified')
        ]),
        createElement('div', { key: 'feature4', className: 'cascade-feature-card' }, [
          createElement(NetworkIcon, { key: 'icon4', className: 'glow-feature-icon' }),
          createElement('h3', { key: 'title4', className: 'verdant-feature-title' }, 'Global Infrastructure'),
          createElement('p', { key: 'desc4', className: 'sage-feature-description' }, 
            'Powered by 150+ global edge locations. Low latency, high availability, and 99.9% uptime SLA.'
          ),
          createElement('span', { key: 'badge4', className: 'lime-feature-badge' }, 'Global CDN')
        ])
      ]),

      // Quick Actions
      createElement('div', { key: 'actions', className: 'verdant-quick-actions' }, [
        createElement('h2', { key: 'action-title', className: 'sylph-actions-title' }, [
          createElement(LightningIcon, { key: 'action-icon' }),
          'Quick Actions'
        ]),
        createElement('div', { key: 'actions-grid', className: 'cascade-actions-grid' }, [
          createElement('a', { 
            key: 'action1', 
            className: 'emerald-quick-action',
            onClick: () => navigate('/chat')
          }, [
            createElement(BotIcon, { key: 'icon1', className: 'glint-action-icon' }),
            createElement('span', { key: 'text1', className: 'sage-action-text' }, 'Start AI Chat'),
            createElement(ChevronRightIcon, { key: 'arrow1', className: 'gleam-action-arrow' })
          ]),
          createElement('a', { 
            key: 'action2', 
            className: 'emerald-quick-action',
            onClick: () => navigate('/documents')
          }, [
            createElement(BarChartIcon, { key: 'icon2', className: 'glint-action-icon' }),
            createElement('span', { key: 'text2', className: 'sage-action-text' }, 'View Analytics'),
            createElement(ChevronRightIcon, { key: 'arrow2', className: 'gleam-action-arrow' })
          ]),
          createElement('a', { 
            key: 'action3', 
            className: 'emerald-quick-action',
            onClick: () => navigate('/settings')
          }, [
            createElement(SettingsIcon, { key: 'icon3', className: 'glint-action-icon' }),
            createElement('span', { key: 'text3', className: 'sage-action-text' }, 'System Settings'),
            createElement(ChevronRightIcon, { key: 'arrow3', className: 'gleam-action-arrow' })
          ]),
          createElement('a', { 
            key: 'action4', 
            className: 'emerald-quick-action',
            onClick: () => navigate('/profile')
          }, [
            createElement(UserIcon, { key: 'icon4', className: 'glint-action-icon' }),
            createElement('span', { key: 'text4', className: 'sage-action-text' }, 'My Profile'),
            createElement(ChevronRightIcon, { key: 'arrow4', className: 'gleam-action-arrow' })
          ])
        ])
      ]),

      // Recent Activity
      createElement('div', { key: 'activity', className: 'verdant-recent-activity' }, [
        createElement('h2', { key: 'activity-title', className: 'sylph-activity-title' }, [
          createElement(ActivityIcon, { key: 'activity-icon' }),
          'Recent Activity'
        ]),
        createElement('div', { key: 'activity-list', className: 'cascade-activity-list' }, [
          createElement('div', { key: 'item1', className: 'emerald-activity-item' }, [
            createElement(SparklesIcon, { key: 'icon1', className: 'glow-activity-icon' }),
            createElement('div', { key: 'content1', className: 'sage-activity-content' }, [
              createElement('p', { key: 'text1', className: 'verdant-activity-text' }, 'AI model updated to GPT-4 Turbo'),
              createElement('span', { key: 'time1', className: 'moss-activity-time' }, '2 minutes ago')
            ]),
            createElement('span', { key: 'badge1', className: 'lime-activity-badge' }, 'System')
          ]),
          createElement('div', { key: 'item2', className: 'emerald-activity-item' }, [
            createElement(BotIcon, { key: 'icon2', className: 'glow-activity-icon' }),
            createElement('div', { key: 'content2', className: 'sage-activity-content' }, [
              createElement('p', { key: 'text2', className: 'verdant-activity-text' }, 'New analytics report generated'),
              createElement('span', { key: 'time2', className: 'moss-activity-time' }, '15 minutes ago')
            ]),
            createElement('span', { key: 'badge2', className: 'lime-activity-badge' }, 'Success')
          ]),
          createElement('div', { key: 'item3', className: 'emerald-activity-item' }, [
            createElement(ShieldIcon, { key: 'icon3', className: 'glow-activity-icon' }),
            createElement('div', { key: 'content3', className: 'sage-activity-content' }, [
              createElement('p', { key: 'text3', className: 'verdant-activity-text' }, 'Security audit completed successfully'),
              createElement('span', { key: 'time3', className: 'moss-activity-time' }, '1 hour ago')
            ]),
            createElement('span', { key: 'badge3', className: 'lime-activity-badge' }, 'Security')
          ])
        ])
      ])
    ]);
  };

  // Создание элементов сайдбара
  const sidebarLogo = createElement('div', { className: 'glow-orb-wrapper' }, [
    createElement('img', {
      src: logo,
      alt: 'Transtelecom',
      className: 'verdant-logo-image'
    }),
    createElement('div', { className: 'orb-aura' })
  ]);

  const logoText = createElement('div', { className: 'verdant-brand-text' }, [
    createElement('div', { className: 'phoenix-title-wrapper' }, [
      createElement('div', { className: 'sylvan-sidebar-title' }, [
        createElement('span', { className: 'cascade-gradient-text' }, 'TTC'),
        createElement('span', { className: 'emerald-badge' }, 'AI')
      ]),
      createElement(SparklesIcon, { className: 'gleam-decor' })
    ]),
    createElement('div', { className: 'sylvan-sidebar-subtitle' }, 'Enterprise Intelligence Platform')
  ]);

  const sidebarHeader = createElement('div', { className: 'sylvan-header' }, [
    createElement('div', { className: 'glow-orb-wrapper' }, [
      sidebarLogo,
      logoText
    ])
  ]);

  // Навигационные ссылки
  const navLinks = [
    { path: '/', icon: HomeIcon, text: 'Dashboard', extra: createElement(ChevronRightIcon, { className: 'nav-accent' }) },
    { path: '/chat', icon: BotIcon, text: 'AI Assistant', extra: createElement('div', { className: 'verdant-badge new' }, 'NEW') },
  ];

  if (isAdmin) {
    navLinks.push(
      { path: '/documents', icon: BarChartIcon, text: 'Analytics Hub' },
      { 
        path: '/users', 
        icon: UserIcon, 
        text: 'Team Management',
        extra: createElement('div', { className: 'verdant-badge admin' }, [
          createElement(ShieldIcon, { className: 'badge-spark' })
        ])
      }
    );
  }

  navLinks.push(
    { path: '/profile', icon: UserIcon, text: 'My Profile' },
    { path: '/settings', icon: SettingsIcon, text: 'System Settings' }
  );

  const navButtons = navLinks.map((link, index) => 
    createElement('button', {
      key: index,
      className: isActive(link.path) + ' cascade-hover-lift',
      onClick: () => navigate(link.path)
    }, [
      createElement('div', { className: 'grove-icon-container' }, [
        createElement(link.icon, { className: 'cascade-nav-icon' }),
        createElement('div', { className: 'icon-halo' })
      ]),
      createElement('span', { className: 'cascade-nav-text' }, link.text),
      link.extra
    ])
  );

  const navSection = createElement('div', { className: 'verdant-nav-section' }, [
    createElement('div', { className: 'grove-section-header' }, [
      createElement(LightningIcon, { className: 'section-spark' }),
      createElement('span', { className: 'grove-title' }, 'Navigation')
    ]),
    createElement('div', { className: 'emerald-nav-links' }, navButtons)
  ]);

  // AI Features
  const aiFeatures = [
    { 
      className: 'verdant-feature-btn creative',
      icon: PaletteIcon,
      text: 'Creative Mode',
      subtext: 'Art & Design',
      onClick: () => navigate('/chat?mode=creative')
    },
    { 
      className: 'verdant-feature-btn analytical',
      icon: TrendingUpIcon,
      text: 'Data Analysis',
      subtext: 'Business Insights',
      onClick: () => navigate('/chat?mode=analytical')
    },
    { 
      className: 'verdant-feature-btn technical',
      icon: TerminalIcon,
      text: 'Technical',
      subtext: 'Code & Systems',
      onClick: () => navigate('/chat?mode=technical')
    },
    { 
      className: 'verdant-feature-btn research',
      icon: SearchIcon,
      text: 'Research',
      subtext: 'Deep Analysis',
      onClick: () => navigate('/chat?mode=research')
    }
  ];

  const featureButtons = aiFeatures.map((feature, index) =>
    createElement('button', {
      key: index,
      className: feature.className,
      onClick: feature.onClick
    }, [
      createElement('div', { className: 'glimmer-icon-wrapper' }, [
        createElement(feature.icon, { className: 'cascade-feature-icon' }),
        createElement('div', { className: 'icon-aura' })
      ]),
      createElement('span', { className: 'verdant-feature-text' }, feature.text),
      createElement('span', { className: 'sage-subtext' }, feature.subtext)
    ])
  );

  const aiFeaturesSection = createElement('div', { className: 'verdant-ai-features' }, [
    createElement('div', { className: 'features-crown' }, [
      createElement(CpuIcon, { className: 'features-core' }),
      createElement('div', { className: 'cascade-features-title' }, 'AI Capabilities'),
      createElement('div', { className: 'signal-indicator active' }, [
        createElement('div', { className: 'status-beacon' }),
        createElement('span', null, 'Online')
      ])
    ]),
    createElement('div', { className: 'cascade-features-grid' }, featureButtons)
  ]);

  // User Section
  const userAvatar = user && user.avatar 
    ? createElement('img', {
        src: user.avatar,
        alt: user.fullName || 'User',
        className: 'verdant-avatar-image'
      })
    : createElement('div', { className: 'avatar-monogram' },
        (user?.fullName || 'EU').split(' ').map(n => n[0]).join('')
      );

  const userCard = createElement('div', { className: 'verdant-user-card sylph-glass-effect' }, [
    createElement('div', { className: 'user-orb-container' }, [
      createElement('div', { className: 'verdant-user-avatar' }, [
        userAvatar,
        createElement('div', { className: 'avatar-halo' })
      ]),
      createElement('div', { className: 'user-status' }, [
        createElement('div', { className: 'status-beacon active' })
      ])
    ]),
    createElement('div', { className: 'verdant-user-info' }, [
      createElement('div', { className: 'cascade-user-name' }, [
        (user?.fullName || 'Enterprise User'),
        createElement(StarIcon, { className: 'verdant-verified-icon' })
      ]),
      createElement('div', { className: 'sage-user-email' }, user?.email || 'user@company.com'),
      createElement('div', { className: `verdant-user-role ${isAdmin ? 'verdant-admin-role' : 'verdant-user-role-default'}` }, [
                createElement('div', { className: 'role-emblazon' }, [
          isAdmin ? [
            createElement(ShieldIcon, { key: 'icon', className: 'role-spark' }),
            createElement('span', { key: 'text' }, 'Administrator')
          ] : [
            createElement(UserIcon, { key: 'icon', className: 'role-spark' }),
            createElement('span', { key: 'text' }, 'Professional')
          ]
        ]),
        createElement('div', { className: 'usage-metrics' }, [
          createElement(ActivityIcon, { className: 'metrics-spark' }),
          createElement('span', null, '85% Active')
        ])
      ])
    ])
  ]);

  const actionButtons = createElement('div', { className: 'verdant-action-buttons' }, [
    createElement('button', {
      className: 'verdant-support-btn',
      onClick: () => navigate('/support')
    }, [
      createElement(MessageSquareIcon, { className: 'cascade-btn-icon' }),
      createElement('span', null, 'Support'),
      createElement('div', { className: 'support-beacon' }, [
        createElement(AlertIcon, { className: 'beacon-spark' })
      ])
    ]),
    createElement('button', {
      className: 'verdant-logout-btn cascade-hover-lift',
      onClick: handleLogout
    }, [
      createElement(LogOutIcon, { className: 'verdant-logout-icon' }),
      createElement('span', null, 'Sign Out'),
      createElement('div', { className: 'logout-aura' })
    ])
  ]);

  const userSection = createElement('div', { className: 'verdant-user-section' }, [
    userCard,
    actionButtons
  ]);

  // Main Content Header
  const pageTitle = getPageTitle(location.pathname);
  const pageDescription = getPageDescription(location.pathname);

  const headerTitle = createElement('div', { className: 'cascade-title-wrapper' }, [
    createElement('div', { className: 'verdant-page-title' }, [
      pageTitle,
      createElement('div', { className: 'title-gleam' })
    ]),
    createElement('div', { className: 'sage-page-description' }, pageDescription)
  ]);

  const quickStats = createElement('div', { className: 'emerald-quick-stats' }, [
    createElement('div', { className: 'verdant-stat-item' }, [
      createElement('div', { className: 'stat-orb-container' }, [
        createElement(RocketIcon, { className: 'stat-spark' })
      ]),
      createElement('div', { className: 'stat-essence' }, [
        createElement('span', { className: 'glow-stat-value' }, '24.7k'),
        createElement('span', { className: 'moss-stat-label' }, 'Sessions Today')
      ])
    ]),
    createElement('div', { className: 'verdant-stat-item' }, [
      createElement('div', { className: 'stat-orb-container' }, [
        createElement(BotIcon, { className: 'stat-spark' })
      ]),
      createElement('div', { className: 'stat-essence' }, [
        createElement('span', { className: 'glow-stat-value' }, '98.5%'),
        createElement('span', { className: 'moss-stat-label' }, 'AI Accuracy')
      ])
    ])
  ]);

  const headerContent = createElement('div', { className: 'verdant-header-content' }, [
    headerTitle,
    quickStats
  ]);

  const headerActions = createElement('div', { className: 'verdant-header-actions' }, [
    createElement('div', { className: 'emerald-search-container' }, [
      createElement(SearchIcon, { className: 'search-gleam' }),
      createElement('input', {
        type: 'text',
        placeholder: 'Search across platform...',
        className: 'verdant-global-search'
      })
    ]),
    createElement('button', {
      className: 'verdant-notification-btn',
      onClick: () => navigate('/notifications')
    }, [
      createElement(BellIcon, { className: 'verdant-notification-icon' }),
      createElement('span', { className: 'verdant-notification-beacon' }, '3'),
      // createElement('div', { className: 'notification-pulse' })
    ]),
    createElement('button', {
      className: 'verdant-quick-action-btn',
      onClick: () => navigate('/chat')
    }, [
      createElement(SparklesIcon, { className: 'verdant-action-spark' }),
      createElement('span', null, 'New AI Chat'),
      createElement('div', { className: 'action-aura' })
    ])
  ]);

  const contentHeader = createElement('div', { className: 'verdant-content-header' }, [
    headerContent,
    headerActions
  ]);

  // Footer
  const systemStatus = createElement('div', { className: 'sylph-system-status' }, [
    createElement('div', { className: 'verdant-status-item' }, [
      createElement(ServerIcon, { className: 'status-gleam' }),
      createElement('div', { className: 'status-essence' }, [
        createElement('span', { className: 'sage-status-label' }, 'System Status'),
        createElement('span', { className: 'status-value verdant-online' }, 'All Systems Operational')
      ])
    ]),
    createElement('div', { className: 'verdant-status-item' }, [
      createElement(NetworkIcon, { className: 'status-gleam' }),
      createElement('div', { className: 'status-essence' }, [
        createElement('span', { className: 'sage-status-label' }, 'Network Latency'),
        createElement('span', { className: 'status-value' }, '24ms')
      ])
    ]),
    createElement('div', { className: 'verdant-status-item' }, [
      createElement(CloudIcon, { className: 'status-gleam' }),
      createElement('div', { className: 'status-essence' }, [
        createElement('span', { className: 'sage-status-label' }, 'API Health'),
        createElement('span', { className: 'status-value verdant-healthy' }, '99.9% Uptime')
      ])
    ])
  ]);

  const footerInfo = createElement('div', { className: 'verdant-footer-info' }, [
    createElement('div', { className: 'version-essence' }, [
      createElement(MonitorIcon, { className: 'version-gleam' }),
      createElement('span', null, `TTC AI Platform v2.1.4 • Enterprise Edition • ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`)
    ]),
    createElement('div', { className: 'cascade-copyright' }, 
      `© ${new Date().getFullYear()} Transtelecom. All rights reserved.`
    )
  ]);

  const footer = createElement('div', { className: 'verdant-footer' }, [
    systemStatus,
    footerInfo
  ]);

  // Content wrapper - показываем либо DashboardContent, либо Outlet для других страниц
  const contentWrapper = createElement('div', { className: 'verdant-content-wrapper' }, 
    location.pathname === '/' ? DashboardContent() : createElement(Outlet)
  );

  // Main content area
  const mainContent = createElement('div', { className: 'verdant-main-content' }, [
    contentHeader,
    contentWrapper,
    footer
  ]);

  // Full dashboard layout
  return createElement('div', { className: 'dashboard-cascade-layout' }, [
    createElement('div', { className: 'verdant-sidebar' }, [
      sidebarHeader,
      navSection,
      aiFeaturesSection,
      userSection
    ]),
    mainContent
  ]);
}

// Вспомогательные функции для заголовков страниц
function getPageTitle(pathname) {
  const titles = {
    '/': 'Enterprise Dashboard',
    '/chat': 'AI Assistant Console',
    '/documents': 'Analytics Hub',
    '/users': 'Team Management',
    '/profile': 'My Profile',
    '/settings': 'System Configuration'
  };
  return titles[pathname] || 'TTC AI Platform';
}

function getPageDescription(pathname) {
  const descriptions = {
    '/': 'Real-time overview of enterprise performance and AI metrics',
    '/chat': 'Intelligent conversation with TTC Enterprise AI',
    '/documents': 'Advanced analytics and data visualization tools',
    '/users': 'Manage team access, permissions, and collaboration',
    '/profile': 'Personal settings and account preferences',
    '/settings': 'System configuration and integration settings'
  };
  return descriptions[pathname] || 'Enterprise AI Intelligence Platform';
}

export default Dashboard;