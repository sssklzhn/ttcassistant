// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext.js';
// import '../../styles/Auth.css';
// import logo from '../../assets/ttc.png';

// function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
  
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       await login(formData.email, formData.password);
//       navigate('/');
//     } catch (error) {
//       setError(error.response?.data?.message || 'Ошибка при входе');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return React.createElement('div', { className: 'auth-container' },
//     React.createElement('div', { className: 'auth-background' },
//       React.createElement('div', { className: 'auth-background-pattern' })
//     ),
    
//     React.createElement('div', { className: 'auth-card' },
//       // Левая колонка с логотипом
//       React.createElement('div', { className: 'auth-logo-section' },
//         React.createElement('div', { className: 'ttc-logo-container' },
//           React.createElement('img', { 
//             src: logo, 
//             alt: 'Transtelecom Logo',
//             className: 'ttc-logo-image'
//           })
//         ),
//         React.createElement('div', { className: 'ttc-company-info' },
//           React.createElement('h1', { className: 'ttc-company-name' }, 'Transtelecom'),
//           React.createElement('p', { className: 'ttc-company-subtitle' }, 'AI Assistant Platform')
//         )
//       ),

//       // Правая колонка с формой
//       React.createElement('div', { className: 'auth-form-section' },
//         React.createElement('div', { className: 'auth-header' },
//           React.createElement('h2', { className: 'auth-title' }, 'Welcome Back'),
//           React.createElement('p', { className: 'auth-description' }, 'Sign in to your account to continue')
//         ),

//         error && React.createElement('div', { className: 'auth-error' },
//           React.createElement('span', { className: 'error-icon' }, '⚠'),
//           error
//         ),

//         React.createElement('form', { onSubmit: handleSubmit, className: 'auth-form' },
//           React.createElement('div', { className: 'form-group' },
//             React.createElement('label', { htmlFor: 'email', className: 'form-label' }, 'Email Address'),
//             React.createElement('input', {
//               type: 'email',
//               id: 'email',
//               name: 'email',
//               value: formData.email,
//               onChange: handleChange,
//               className: 'form-input',
//               placeholder: 'Enter your email address',
//               required: true
//             })
//           ),

//           React.createElement('div', { className: 'form-group' },
//             React.createElement('label', { htmlFor: 'password', className: 'form-label' }, 'Password'),
//             React.createElement('input', {
//               type: 'password',
//               id: 'password',
//               name: 'password',
//               value: formData.password,
//               onChange: handleChange,
//               className: 'form-input',
//               placeholder: 'Enter your password',
//               required: true
//             })
//           ),

//           React.createElement('div', { className: 'form-options' },
//             React.createElement('div', { className: 'checkbox-group' },
//               React.createElement('input', {
//                 type: 'checkbox',
//                 id: 'rememberMe',
//                 checked: rememberMe,
//                 onChange: (e) => setRememberMe(e.target.checked),
//                 className: 'checkbox-input'
//               }),
//               React.createElement('label', { 
//                 htmlFor: 'rememberMe', 
//                 className: 'checkbox-label' 
//               }, 'Remember me')
//             ),
//             React.createElement(Link, { 
//               to: "/forgot-password", 
//               className: "forgot-password" 
//             }, 'Forgot password?')
//           ),

//           React.createElement('button', { 
//             type: 'submit', 
//             className: `btn btn-primary ${loading ? 'loading' : ''}`,
//             disabled: loading
//           }, 
//             loading 
//               ? React.createElement('div', { className: 'btn-loading' }, 'Signing In...')
//               : 'Sign In'
//           )
//         ),

//         React.createElement('div', { className: 'auth-footer' },
//           React.createElement('p', { className: 'auth-footer-text' },
//             "Don't have an account? ",
//             React.createElement(Link, { to: "/register", className: "auth-link" }, 'Create account')
//           )
//         )
//       )
//     )
//   );
// }

// export default Login;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import '../../styles/Login.css';
import logo from '../../assets/ttc.png';
// Импортируем SVG иконки
import { 
  ShieldIcon, 
  LightningIcon, 
  GlobeIcon,
  EmailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  RocketIcon,
  CheckIcon,
  AlertIcon,
  CloseIcon,
  UserCircleIcon,
  SparklesIcon
} from '../../assets/icons';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Email валидация
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);

    try {
      await login(formData.email, formData.password, rememberMe);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@transtelecom.com',
      password: 'demo123'
    });
    // Выполняем демо-логин напрямую, без имитации DOM-события
    (async () => {
      setLoading(true);
      try {
        await login('demo@transtelecom.com', 'demo123', true);
        navigate('/dashboard', { replace: true });
      } catch (err) {
        setError(err.response?.data?.message || 'Demo login failed');
      } finally {
        setLoading(false);
      }
    })();
  };

  const createElement = React.createElement;

  return createElement('div', { className: 'auth-page' },
    // Фон с градиентом и узорами
    createElement('div', { className: 'auth-background' },
      createElement('div', { className: 'gradient-overlay' }),
      createElement('div', { className: 'circuit-pattern' }),
      createElement('div', { className: 'particles-container' },
        Array.from({ length: 20 }, (_, i) =>
          createElement('div', {
            key: i,
            className: 'particle',
            style: {
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }
          })
        )
      )
    ),
    
    // Основной контейнер
    createElement('div', { className: 'auth-container' },
      createElement('div', { className: 'auth-card-glass' },
        // Левая панель с брендингом
        createElement('div', { className: 'auth-brand-section' },
          createElement('div', { className: 'brand-content' },
            createElement('div', { className: 'logo-glow-container' },
              createElement('img', {
                src: logo,
                alt: 'Transtelecom',
                className: 'brand-logo-glow'
              }),
              createElement('div', { className: 'halo-effect' })
            ),
            
            createElement('div', { className: 'brand-info' },
              createElement('h1', { className: 'company-title' },
                createElement('span', { className: 'gradient-text' }, 'Transtelecom')
              ),
              createElement('p', { className: 'company-subtitle' }, 'AI Assistant Platform'),
              createElement('div', { className: 'tagline' },
                createElement(SparklesIcon, { className: 'sparkle-icon' }),
                createElement('span', null, 'Enterprise Intelligence Suite')
              )
            ),
            
            createElement('div', { className: 'feature-list' },
              createElement('div', { className: 'feature-card' },
                createElement('div', { className: 'feature-icon-container' },
                  createElement(ShieldIcon, { className: 'feature-svg' })
                ),
                createElement('div', { className: 'feature-content' },
                  createElement('h4', null, 'Military-grade Security'),
                  createElement('p', null, 'End-to-end encryption & zero-trust architecture')
                )
              ),
              
              createElement('div', { className: 'feature-card performance-card' },
                createElement('div', { className: 'feature-card-inner' },
                  // Анимированный фон
                  createElement('div', { className: 'card-bg-glow' }),
                  createElement('div', { className: 'energy-pulse' }),
                  
                  // Иконка с анимацией
                  createElement('div', { className: 'feature-icon-wrapper' },
                    createElement('div', { className: 'icon-container' },
                      createElement(LightningIcon, { className: 'feature-icon' }),
                      createElement('div', { className: 'electric-arcs' },
                        [1, 2, 3].map(i =>
                          createElement('div', { key: i, className: `electric-arc arc-${i}` })
                        )
                      )
                    ),
                    createElement('div', { className: 'icon-halo' })
                  ),
                  
                  // Контент
                  createElement('div', { className: 'feature-content' },
                    createElement('div', { className: 'feature-header' },
                      createElement('h4', { className: 'feature-title' },
                        createElement('span', { className: 'title-text' }, 'Ultra Performance'),
                        createElement('span', { className: 'premium-badge' }, 'PREMIUM')
                      ),
                      createElement('div', { className: 'live-indicator' },
                        createElement('div', { className: 'live-dot' }),
                        createElement('span', null, 'LIVE')
                      )
                    ),
                    
                    createElement('p', { className: 'feature-description' },
                      'Enterprise-grade performance with guaranteed SLAs'
                    ),
                    
                    // Метрики в реальном времени
                    createElement('div', { className: 'performance-stats' },
                      createElement('div', { className: 'stat-item' },
                        createElement('div', { className: 'stat-header' },
                          createElement('span', { className: 'stat-icon' }, '⏱️'),
                          createElement('span', { className: 'stat-label' }, 'Response Time')
                        ),
                        createElement('div', { className: 'stat-value' },
                          createElement('span', { className: 'value-number' }, '0.8'),
                          createElement('span', { className: 'value-unit' }, 'ms'),
                          createElement('div', { className: 'trend-indicator positive' },
                            createElement('span', { className: 'trend-arrow' }, '↗'),
                            createElement('span', { className: 'trend-value' }, '12% faster')
                          )
                        ),
                        createElement('div', { className: 'stat-bar' },
                          createElement('div', { className: 'stat-fill', style: { width: '92%' } })
                        )
                      ),
                      
                      createElement('div', { className: 'stat-item' },
                        createElement('div', { className: 'stat-header' },
                          createElement('span', { className: 'stat-icon' }, '📈'),
                          createElement('span', { className: 'stat-label' }, 'Uptime')
                        ),
                        createElement('div', { className: 'stat-value' },
                          createElement('span', { className: 'value-number' }, '99.98'),
                          createElement('span', { className: 'value-unit' }, '%'),
                          createElement('div', { className: 'uptime-badge' },
                            createElement('span', { className: 'uptime-icon' }, '✅'),
                            createElement('span', null, 'This month')
                          )
                        ),
                        createElement('div', { className: 'uptime-timeline' },
                          Array.from({ length: 30 }, (_, i) =>
                            createElement('div', {
                              key: i,
                              className: `timeline-day ${i % 50 === 0 ? 'downtime' : 'uptime'}`,
                              title: `Day ${i + 1}: ${i % 50 === 0 ? 'Maintenance' : 'Operational'}`
                            })
                          )
                        )
                      )
                    ),
                    
                    // Технические детали
                    createElement('div', { className: 'tech-details' },
                      createElement('div', { className: 'detail-tag' },
                        createElement('span', { className: 'tag-icon' }, '⚡'),
                        createElement('span', null, 'Edge Computing')
                      ),
                      createElement('div', { className: 'detail-tag' },
                        createElement('span', { className: 'tag-icon' }, '🔗'),
                        createElement('span', null, 'Global CDN')
                      ),
                      createElement('div', { className: 'detail-tag' },
                        createElement('span', { className: 'tag-icon' }, '📊'),
                        createElement('span', null, 'Real-time Analytics')
                      )
                    ),
                    
                    // Мини-график производительности
                    createElement('div', { className: 'performance-chart' },
                      createElement('div', { className: 'chart-header' },
                        createElement('span', null, 'Last 24h Performance'),
                        createElement('span', { className: 'chart-legend' },
                          createElement('span', { className: 'legend-item latency' }, 'Latency'),
                          createElement('span', { className: 'legend-item throughput' }, 'Throughput')
                        )
                      ),
                      createElement('div', { className: 'chart-container' },
                        Array.from({ length: 24 }, (_, hour) =>
                          createElement('div', { key: hour, className: 'chart-column' },
                            createElement('div', {
                              className: 'chart-bar latency-bar',
                              style: { height: `${20 + Math.sin(hour) * 15}%` }
                            }),
                            createElement('div', {
                              className: 'chart-bar throughput-bar',
                              style: { height: `${30 + Math.cos(hour) * 20}%` }
                            }),
                            createElement('div', { className: 'chart-label' }, `${hour}h`)
                          )
                        )
                      )
                    ),
                    
                    // Статус системы
                    createElement('div', { className: 'system-status' },
                      createElement('div', { className: 'status-item healthy' },
                        createElement('div', { className: 'status-indicator' }),
                        createElement('span', null, 'All Systems Operational')
                      ),
                      createElement('button', { className: 'status-details-btn' }, 'View Detailed Report →')
                    )
                  )
                ),
                
                // Эффект свечения при наведении
                createElement('div', { className: 'card-hover-glow' })
              ),
              
              createElement('div', { className: 'feature-card' },
                createElement('div', { className: 'feature-icon-container' },
                  createElement(GlobeIcon, { className: 'feature-svg' })
                ),
                createElement('div', { className: 'feature-content' },
                  createElement('h4', null, 'Global Network'),
                  createElement('p', null, 'Access from 150+ locations worldwide')
                )
              )
            )
          ),
          
          createElement('div', { className: 'brand-footer' },
            createElement('div', { className: 'trust-badge' },
              createElement('div', { className: 'trust-icon' },
                createElement(ShieldIcon)
              ),
              createElement('span', null, 'ISO 27001 Certified')
            ),
            createElement('div', { className: 'copyright' },
              `© ${new Date().getFullYear()} Transtelecom AI Platform v2.0`
            )
          )
        ),
        
        // Правая панель с формой
        createElement('div', { className: 'auth-form-section' },
          createElement('div', { className: 'form-header' },
            createElement('div', { className: 'welcome-message' },
              createElement(UserCircleIcon, { className: 'user-icon' }),
              createElement('div', null,
                createElement('h2', null, 'Welcome Back'),
                createElement('p', { className: 'welcome-text' }, 'Sign in to your enterprise dashboard')
              )
            ),
            
            createElement('button', {
              type: 'button',
              onClick: handleDemoLogin,
              className: 'demo-access-btn',
              onMouseEnter: () => setIsHovered(true),
              onMouseLeave: () => setIsHovered(false)
            },
              createElement(RocketIcon, { className: 'rocket-icon' }),
              createElement('span', null, 'Quick Demo Access'),
              createElement('div', { className: 'demo-badge' }, 'VIP')
            )
          ),
          
          // Сообщение об ошибке
          error && createElement('div', { className: `error-notification ${error ? 'show' : ''}` },
            createElement('div', { className: 'error-header' },
              createElement(AlertIcon, { className: 'alert-icon' }),
              createElement('span', { className: 'error-title' }, 'Authentication Error'),
              createElement('button', {
                className: 'error-close-btn',
                onClick: () => setError(''),
                'aria-label': 'Close error'
              },
                createElement(CloseIcon, { className: 'close-icon' })
              )
            ),
            createElement('p', { className: 'error-message' }, error)
          ),
          
          // Форма входа
          createElement('form', { onSubmit: handleSubmit, className: 'auth-form' },
            createElement('div', { className: 'input-field' },
              createElement('label', { className: 'field-label' },
                createElement(EmailIcon, { className: 'label-icon' }),
                createElement('span', null, 'Corporate Email')
              ),
              createElement('div', { className: 'input-container' },
                createElement('input', {
                  type: 'email',
                  id: 'email',
                  name: 'email',
                  value: formData.email,
                  onChange: handleChange,
                  className: 'form-input',
                  placeholder: 'john.doe@transtelecom.com',
                  required: true,
                  autoComplete: 'email'
                }),
                createElement('div', { className: 'input-border' })
              )
            ),
            
            createElement('div', { className: 'input-field' },
              createElement('label', { className: 'field-label' },
                createElement(LockIcon, { className: 'label-icon' }),
                createElement('span', null, 'Password')
              ),
              createElement('div', { className: 'input-container' },
                createElement('input', {
                  type: showPassword ? 'text' : 'password',
                  id: 'password',
                  name: 'password',
                  value: formData.password,
                  onChange: handleChange,
                  className: 'form-input',
                  placeholder: '••••••••••',
                  required: true,
                  autoComplete: 'current-password'
                }),
                createElement('div', { className: 'input-border' }),
                createElement('button', {
                  type: 'button',
                  className: 'password-toggle-btn',
                  onClick: () => setShowPassword(!showPassword),
                  'aria-label': showPassword ? 'Hide password' : 'Show password'
                },
                  showPassword
                    ? createElement(EyeOffIcon, { className: 'toggle-icon' })
                    : createElement(EyeIcon, { className: 'toggle-icon' })
                )
              ),
              createElement('div', { className: 'password-strength' },
                createElement('div', { className: 'strength-bar' },
                  createElement('div', { className: 'strength-fill' })
                ),
                createElement('span', { className: 'strength-text' }, 'Password strength')
              )
            ),
            
            createElement('div', { className: 'form-actions' },
              createElement('label', { className: 'remember-checkbox' },
                createElement('input', {
                  type: 'checkbox',
                  id: 'rememberMe',
                  checked: rememberMe,
                  onChange: (e) => setRememberMe(e.target.checked),
                  className: 'checkbox-input'
                }),
                createElement('span', { className: 'custom-checkbox' },
                  createElement(CheckIcon, { className: 'check-icon' })
                ),
                createElement('span', { className: 'checkbox-text' }, 'Keep me signed in for 30 days')
              ),
              
              createElement(Link, { to: '/forgot-password', className: 'password-recovery-link' },
                createElement(LockIcon, { className: 'recovery-icon' }),
                'Recover Password'
              )
            ),
            
            createElement('button', {
              type: 'submit',
              className: `signin-btn ${loading ? 'loading' : ''}`,
              disabled: loading
            },
              loading
                ? [
                    createElement('div', { key: 'spinner', className: 'spinner' }),
                    createElement('span', { key: 'text' }, 'Authenticating...')
                  ]
                : [
                    createElement(LockIcon, { key: 'icon', className: 'btn-icon' }),
                    createElement('span', { key: 'text' }, 'Secure Sign In')
                  ],
              createElement('div', { className: 'btn-glow' })
            ),
            
            createElement('div', { className: 'divider' },
              createElement('span', { className: 'divider-text' }, 'or continue with')
            ),
            
            createElement('div', { className: 'alternative-auth' },
              createElement('button', { type: 'button', className: 'auth-provider-btn' },
                createElement('svg', { className: 'provider-icon', viewBox: '0 0 24 24' },
                  createElement('path', { d: 'M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' }),
                  createElement('path', { d: 'M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' }),
                  createElement('path', { d: 'M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' }),
                  createElement('path', { d: 'M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' })
                ),
                createElement('span', null, 'Google Workspace')
              ),
              
              createElement('button', { type: 'button', className: 'auth-provider-btn microsoft' },
                createElement('svg', { className: 'provider-icon', viewBox: '0 0 23 23' },
                  createElement('path', { fill: '#f35325', d: 'M1 1h10v10H1z' }),
                  createElement('path', { fill: '#81bc06', d: 'M12 1h10v10H12z' }),
                  createElement('path', { fill: '#05a6f0', d: 'M1 12h10v10H1z' }),
                  createElement('path', { fill: '#ffba08', d: 'M12 12h10v10H12z' })
                ),
                createElement('span', null, 'Microsoft 365')
              )
            )
          ),
          
          createElement('div', { className: 'form-footer' },
            createElement('p', { className: 'footer-text' },
              'New to Transtelecom AI? ',
              createElement(Link, { to: '/register', className: 'register-link' },
                createElement(SparklesIcon, { className: 'link-icon' }),
                'Request Enterprise Access'
              )
            ),
            createElement('div', { className: 'support-contact' },
              createElement(ShieldIcon, { className: 'support-icon' }),
              createElement('span', null,
                'Need help? Contact ',
                createElement('a', {
                  href: 'mailto:support@transtelecom.ai',
                  className: 'support-link'
                }, 'enterprise-support@transtelecom.ai')
              )
            )
          )
        )
      )
    )
  );
}

export default Login;