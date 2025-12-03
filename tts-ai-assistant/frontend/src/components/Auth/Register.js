import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import '../../styles/Register.css';
import logo from '../../assets/ttc.png';

// Создаем недостающие иконки
function UserIcon(props) {
  const className = props.className || "";
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  }, [
    React.createElement('circle', {
      cx: "12",
      cy: "8",
      r: "4",
      stroke: "currentColor",
      strokeWidth: "2"
    }),
    React.createElement('path', {
      d: "M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    })
  ]);
}

function ShieldIcon(props) {
  const className = props.className || "";
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, [
    React.createElement('path', {
      d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    })
  ]);
}

function SparklesIcon(props) {
  const className = props.className || "";
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, [
    React.createElement('path', {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0L9.937 15.5z"
    }),
    React.createElement('path', {
      d: "M20 3v4M22 5h-4M4 17v2M5 18H3"
    })
  ]);
}

function LightningIcon(props) {
  const className = props.className || "";
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, [
    React.createElement('path', {
      d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z"
    })
  ]);
}

function GlobeIcon(props) {
  const className = props.className || "";
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, [
    React.createElement('circle', {
      cx: "12",
      cy: "12",
      r: "10"
    }),
    React.createElement('path', {
      d: "M2 12h20"
    }),
    React.createElement('path', {
      d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
    })
  ]);
}

function EmailIcon(props) {
  const className = props.className || "";
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, [
    React.createElement('path', {
      d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
    }),
    React.createElement('polyline', {
      points: "22,6 12,13 2,6"
    })
  ]);
}

function LockIcon(props) {
  const className = props.className || "";
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, [
    React.createElement('rect', {
      x: "3",
      y: "11",
      width: "18",
      height: "11",
      rx: "2",
      ry: "2"
    }),
    React.createElement('path', {
      d: "M7 11V7a5 5 0 0 1 10 0v4"
    })
  ]);
}

function EyeIcon(props) {
  const className = props.className || "";
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, [
    React.createElement('path', {
      d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
    }),
    React.createElement('circle', {
      cx: "12",
      cy: "12",
      r: "3"
    })
  ]);
}

function EyeOffIcon(props) {
  const className = props.className || "";
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, [
    React.createElement('path', {
      d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
    }),
    React.createElement('line', {
      x1: "1",
      y1: "1",
      x2: "23",
      y2: "23"
    })
  ]);
}

function CheckIcon(props) {
  const className = props.className || "";
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3"
  }, [
    React.createElement('polyline', {
      points: "20 6 9 17 4 12"
    })
  ]);
}

function AlertIcon(props) {
  const className = props.className || "";
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, [
    React.createElement('path', {
      d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
    }),
    React.createElement('line', {
      x1: "12",
      y1: "9",
      x2: "12",
      y2: "13"
    }),
    React.createElement('line', {
      x1: "12",
      y1: "17",
      x2: "12",
      y2: "17"
    })
  ]);
}

function CloseIcon(props) {
  const className = props.className || "";
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, [
    React.createElement('line', {
      x1: "18",
      y1: "6",
      x2: "6",
      y2: "18"
    }),
    React.createElement('line', {
      x1: "6",
      y1: "6",
      x2: "18",
      y2: "18"
    })
  ]);
}

function DocumentIcon(props) {
  const className = props.className || "";
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, [
    React.createElement('path', {
      d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
    }),
    React.createElement('polyline', {
      points: "14 2 14 8 20 8"
    }),
    React.createElement('line', {
      x1: "16",
      y1: "13",
      x2: "8",
      y2: "13"
    }),
    React.createElement('line', {
      x1: "16",
      y1: "17",
      x2: "8",
      y2: "17"
    }),
    React.createElement('polyline', {
      points: "10 9 9 9 8 9"
    })
  ]);
}

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [step, setStep] = useState(1);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = function(e) {
    const name = e.target.name;
    const value = e.target.value;
    
    setFormData(function(prev) {
      return {
        ...prev,
        [name]: value
      };
    });
    
    if (error) setError('');
    
    // Проверка силы пароля
    if (name === 'password') {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const calculatePasswordStrength = function(password) {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    return score;
  };

  const validateStep1 = function() {
    if (!formData.fullName.trim()) {
      setError('Please enter your full name');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const validateStep2 = function() {
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!agreeTerms) {
      setError('You must agree to the Terms and Conditions');
      return false;
    }
    return true;
  };

  const nextStep = function() {
    if (validateStep1()) {
      setStep(2);
      setError('');
    }
  };

  const prevStep = function() {
    setStep(1);
    setError('');
  };

  const handleSubmit = async function(e) {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setLoading(true);
    setError('');

    try {
      console.log('Отправка данных регистрации:', formData);
      
      await register(formData);
      console.log('Регистрация успешна!');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Registration error details:', error);
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEnterpriseDemo = function() {
    setFormData({
      fullName: 'Enterprise Demo',
      email: 'demo.enterprise@transtelecom.com',
      password: 'SecureDemo123!',
      confirmPassword: 'SecureDemo123!'
    });
    setAgreeTerms(true);
    setPasswordStrength(100);
  };

  // Проверяем требования пароля
  const passwordRequirements = [
    { 
      label: 'At least 8 characters', 
      met: formData.password.length >= 8 
    },
    { 
      label: 'One uppercase letter', 
      met: /[A-Z]/.test(formData.password) 
    },
    { 
      label: 'One number', 
      met: /[0-9]/.test(formData.password) 
    },
    { 
      label: 'One special character', 
      met: /[^A-Za-z0-9]/.test(formData.password) 
    }
  ];

  // Создаем частицы для фона
  const particles = [];
  for (let i = 0; i < 15; i++) {
    particles.push(React.createElement('div', {
      key: i,
      className: "particle",
      style: {
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        animationDelay: Math.random() * 3 + 's'
      }
    }));
  }

  // Создаем индикаторы силы пароля
  const strengthBars = [];
  for (let i = 1; i <= 4; i++) {
    strengthBars.push(React.createElement('div', {
      key: i,
      className: "strength-bar " + (passwordStrength >= i * 25 ? 'filled' : '')
    }));
  }

  // Создаем элементы требований к паролю
  const requirementsList = passwordRequirements.map(function(req, index) {
    return React.createElement('li', {
      key: index,
      className: req.met ? 'met' : ''
    }, [
      React.createElement(CheckIcon, { className: "requirement-icon", key: 'icon' }),
      req.label
    ]);
  });

  // Создаем элементы прогресса
  const stepIndicators = [
    React.createElement('div', {
      key: 1,
      className: "step-indicator " + (step >= 1 ? 'active' : '')
    }, [
      React.createElement('div', { key: 'num1', className: "step-number" }, '1'),
      React.createElement('span', { key: 'text1' }, 'Personal Info')
    ]),
    React.createElement('div', {
      key: 2,
      className: "step-indicator " + (step >= 2 ? 'active' : '')
    }, [
      React.createElement('div', { key: 'num2', className: "step-number" }, '2'),
      React.createElement('span', { key: 'text2' }, 'Security Setup')
    ])
  ];

  return React.createElement('div', { className: "auth-page register-page" }, [
    // Фон
    React.createElement('div', { key: 'background', className: "auth-background" }, [
      React.createElement('div', { key: 'gradient', className: "gradient-overlay" }),
      React.createElement('div', { key: 'circuit', className: "circuit-pattern" }),
      React.createElement('div', { key: 'particles', className: "particles-container" }, particles)
    ]),
    
    // Основной контейнер
    React.createElement('div', { key: 'container', className: "auth-container" },
      React.createElement('div', { className: "auth-card-glass register-card" }, [
        // Левая панель
        React.createElement('div', { key: 'brand', className: "auth-brand-section" }, [
          React.createElement('div', { key: 'brandContent', className: "brand-content" }, [
            React.createElement('div', { key: 'logo', className: "logo-glow-container" }, [
              React.createElement('img', {
                key: 'logoImg',
                src: logo,
                alt: "Transtelecom",
                className: "brand-logo-glow"
              }),
              React.createElement('div', { key: 'halo', className: "halo-effect" })
            ]),
            
            React.createElement('div', { key: 'info', className: "brand-info" }, [
              React.createElement('h1', { key: 'title', className: "company-title" },
                React.createElement('span', { key: 'span', className: "gradient-text" }, "Join Transtelecom AI")
              ),
              React.createElement('p', { key: 'subtitle', className: "company-subtitle" }, "Enterprise AI Platform"),
              React.createElement('div', { key: 'tagline', className: "tagline" }, [
                React.createElement(SparklesIcon, { key: 'sparkle', className: "sparkle-icon" }),
                React.createElement('span', { key: 'text' }, "Transform Your Business with AI")
              ])
            ]),
            
            // Прогресс регистрации
            React.createElement('div', { key: 'progress', className: "registration-progress" }, [
              React.createElement('div', { key: 'header', className: "progress-header" }, [
                React.createElement('h3', { key: 'title' }, "Enterprise Onboarding"),
                React.createElement('span', { key: 'step', className: "progress-step" }, "Step " + step + " of 2")
              ]),
              React.createElement('div', { key: 'bar', className: "progress-bar" },
                React.createElement('div', {
                  key: 'fill',
                  className: "progress-fill",
                  style: { width: step === 1 ? '50%' : '100%' }
                })
              ),
              React.createElement('div', { key: 'steps', className: "progress-steps" }, stepIndicators)
            ]),
            
            // Преимущества
            React.createElement('div', { key: 'benefits', className: "benefits-list" }, [
              React.createElement('h4', { key: 'title', className: "benefits-title" }, "Why Join Our Platform?"),
              React.createElement('div', { key: 'benefit1', className: "benefit-item" }, [
                React.createElement(ShieldIcon, { key: 'icon1', className: "benefit-icon" }),
                React.createElement('div', { key: 'content1', className: "benefit-content" }, [
                  React.createElement('h5', { key: 'title1' }, "Enterprise Security"),
                  React.createElement('p', { key: 'desc1' }, "SOC2 Type II & ISO 27001 Certified")
                ])
              ]),
              React.createElement('div', { key: 'benefit2', className: "benefit-item" }, [
                React.createElement(LightningIcon, { key: 'icon2', className: "benefit-icon" }),
                React.createElement('div', { key: 'content2', className: "benefit-content" }, [
                  React.createElement('h5', { key: 'title2' }, "High Performance AI"),
                  React.createElement('p', { key: 'desc2' }, "99.9% uptime guarantee")
                ])
              ]),
              React.createElement('div', { key: 'benefit3', className: "benefit-item" }, [
                React.createElement(GlobeIcon, { key: 'icon3', className: "benefit-icon" }),
                React.createElement('div', { key: 'content3', className: "benefit-content" }, [
                  React.createElement('h5', { key: 'title3' }, "Global Support"),
                  React.createElement('p', { key: 'desc3' }, "24/7 enterprise support team")
                ])
              ])
            ])
          ]),
          
          React.createElement('div', { key: 'footer', className: "brand-footer" }, [
            React.createElement('div', { key: 'badge', className: "security-badge" }, [
              React.createElement(ShieldIcon, { key: 'badgeIcon', className: "badge-icon" }),
              React.createElement('span', { key: 'badgeText' }, "Enterprise-Grade Security")
            ]),
            React.createElement('div', { key: 'copyright', className: "copyright" },
              "© " + new Date().getFullYear() + " Transtelecom AI Platform"
            )
          ])
        ]),
        
        // Правая панель
        React.createElement('div', { key: 'formSection', className: "auth-form-section" }, [
          React.createElement('div', { key: 'formHeader', className: "form-header" }, [
            React.createElement('div', { key: 'welcome', className: "welcome-message" }, [
              React.createElement('h2', { key: 'title' }, "Create Enterprise Account"),
              React.createElement('p', { key: 'subtitle', className: "welcome-subtitle" }, "Join our platform to access powerful AI tools")
            ]),
            
            React.createElement('button', {
              key: 'demoBtn',
              type: "button",
              onClick: handleEnterpriseDemo,
              className: "demo-enterprise-btn"
            }, [
              React.createElement(SparklesIcon, { key: 'demoIcon', className: "demo-icon" }),
              React.createElement('span', { key: 'demoText' }, "Try Enterprise Demo")
            ])
          ]),
          
          // Ошибки
          error && React.createElement('div', {
            key: 'error',
            className: "error-notification show"
          }, [
            React.createElement('div', { key: 'header', className: "error-header" }, [
              React.createElement(AlertIcon, { key: 'alert', className: "alert-icon" }),
              React.createElement('span', { key: 'title', className: "error-title" }, "Registration Error"),
              React.createElement('button', {
                key: 'close',
                className: "error-close-btn",
                onClick: function() { setError(''); }
              }, React.createElement(CloseIcon, { className: "close-icon" }))
            ]),
            React.createElement('p', { key: 'message', className: "error-message" }, error)
          ]),
          
          // Форма
          React.createElement('form', {
            key: 'form',
            onSubmit: handleSubmit,
            className: "auth-form"
          }, 
            // Шаг 1: Личная информация
            step === 1 && React.createElement('div', { key: 'step1', className: "form-step step-1" }, [
              React.createElement('div', { key: 'stepHeader1', className: "step-header" }, [
                React.createElement('h3', { key: 'title1' }, "Personal Information"),
                React.createElement('p', { key: 'desc1', className: "step-description" }, "Tell us about yourself")
              ]),
              
              // Поле Full Name
              React.createElement('div', { key: 'fullNameField', className: "input-field" }, [
                React.createElement('label', { key: 'label1', className: "field-label" }, [
                  React.createElement(UserIcon, { key: 'icon1', className: "label-icon" }),
                  React.createElement('span', { key: 'text1' }, "Full Name")
                ]),
                React.createElement('div', { key: 'container1', className: "input-container" }, [
                  React.createElement('input', {
                    key: 'input1',
                    type: "text",
                    name: "fullName",
                    value: formData.fullName,
                    onChange: handleChange,
                    className: "form-input",
                    placeholder: "John Doe",
                    required: true
                  }),
                  React.createElement('div', { key: 'border1', className: "input-border" })
                ]),
                React.createElement('p', { key: 'hint1', className: "input-hint" }, "Enter your first and last name")
              ]),
              
              // Поле Email
              React.createElement('div', { key: 'emailField', className: "input-field" }, [
                React.createElement('label', { key: 'label3', className: "field-label" }, [
                  React.createElement(EmailIcon, { key: 'icon3', className: "label-icon" }),
                  React.createElement('span', { key: 'text3' }, "Corporate Email")
                ]),
                React.createElement('div', { key: 'container3', className: "input-container" }, [
                  React.createElement('input', {
                    key: 'input3',
                    type: "email",
                    name: "email",
                    value: formData.email,
                    onChange: handleChange,
                    className: "form-input",
                    placeholder: "john.doe@yourcompany.com",
                    required: true
                  }),
                  React.createElement('div', { key: 'border3', className: "input-border" })
                ]),
                React.createElement('p', { key: 'hint2', className: "input-hint" }, "Use your corporate email address")
              ]),
              
              React.createElement('div', { key: 'actions1', className: "form-actions" },
                React.createElement('button', {
                  key: 'nextBtn',
                  type: "button",
                  onClick: nextStep,
                  className: "btn-next"
                }, [
                  "Continue to Security",
                  React.createElement('span', { key: 'arrow', className: "btn-arrow" }, "→")
                ])
              )
            ]),
            
            // Шаг 2: Безопасность
            step === 2 && React.createElement('div', { key: 'step2', className: "form-step step-2" }, [
              React.createElement('div', { key: 'stepHeader2', className: "step-header" }, [
                React.createElement('h3', { key: 'title2' }, "Security Setup"),
                React.createElement('p', { key: 'desc2', className: "step-description" }, "Secure your account")
              ]),
              
              React.createElement('div', { key: 'passwordField', className: "input-field" }, [
                React.createElement('label', { key: 'label6', className: "field-label" }, [
                  React.createElement(LockIcon, { key: 'icon6', className: "label-icon" }),
                  React.createElement('span', { key: 'text6' }, "Password"),
                  React.createElement('span', { key: 'strength', className: "password-strength-indicator" }, [
                    "Strength: ",
                    React.createElement('span', {
                      key: 'value',
                      className: "strength-value " + (passwordStrength >= 75 ? 'strong' : passwordStrength >= 50 ? 'medium' : 'weak')
                    }, passwordStrength >= 75 ? 'Strong' : passwordStrength >= 50 ? 'Medium' : 'Weak')
                  ])
                ]),
                React.createElement('div', { key: 'container6', className: "input-container" }, [
                  React.createElement('input', {
                    key: 'input6',
                    type: showPassword ? "text" : "password",
                    name: "password",
                    value: formData.password,
                    onChange: handleChange,
                    className: "form-input",
                    placeholder: "Create secure password",
                    required: true
                  }),
                  React.createElement('div', { key: 'border6', className: "input-border" }),
                  React.createElement('button', {
                    key: 'toggle1',
                    type: "button",
                    className: "password-toggle-btn",
                    onClick: function() { setShowPassword(!showPassword); }
                  }, showPassword ? 
                    React.createElement(EyeOffIcon, { key: 'eyeOff', className: "toggle-icon" }) :
                    React.createElement(EyeIcon, { key: 'eye', className: "toggle-icon" })
                  )
                ]),
                
                // Индикатор силы пароля
                React.createElement('div', { key: 'meter', className: "strength-meter" },
                  React.createElement('div', { key: 'bars', className: "strength-bars" }, strengthBars)
                ),
                
                // Требования к паролю
                React.createElement('div', { key: 'requirements', className: "password-requirements" }, [
                  React.createElement('h5', { key: 'reqTitle' }, "Password Requirements:"),
                  React.createElement('ul', { key: 'reqList', className: "requirements-list" }, requirementsList)
                ])
              ]),
              
              React.createElement('div', { key: 'confirmField', className: "input-field" }, [
                React.createElement('label', { key: 'label7', className: "field-label" }, [
                  React.createElement(LockIcon, { key: 'icon7', className: "label-icon" }),
                  React.createElement('span', { key: 'text7' }, "Confirm Password")
                ]),
                React.createElement('div', { key: 'container7', className: "input-container" }, [
                  React.createElement('input', {
                    key: 'input7',
                    type: showConfirmPassword ? "text" : "password",
                    name: "confirmPassword",
                    value: formData.confirmPassword,
                    onChange: handleChange,
                    className: "form-input",
                    placeholder: "Confirm your password",
                    required: true
                  }),
                  React.createElement('div', { key: 'border7', className: "input-border" }),
                  React.createElement('button', {
                    key: 'toggle2',
                    type: "button",
                    className: "password-toggle-btn",
                    onClick: function() { setShowConfirmPassword(!showConfirmPassword); }
                  }, showConfirmPassword ? 
                    React.createElement(EyeOffIcon, { key: 'eyeOff2', className: "toggle-icon" }) :
                    React.createElement(EyeIcon, { key: 'eye2', className: "toggle-icon" })
                  )
                ])
              ]),
              
              // Соглашение с условиями
              React.createElement('div', { key: 'terms', className: "terms-agreement" }, [
                React.createElement('label', { key: 'checkboxLabel', className: "terms-checkbox" }, [
                  React.createElement('input', {
                    key: 'checkbox',
                    type: "checkbox",
                    checked: agreeTerms,
                    onChange: function(e) { setAgreeTerms(e.target.checked); },
                    className: "checkbox-input"
                  }),
                  React.createElement('span', { key: 'customCheck', className: "custom-checkbox" },
                    agreeTerms && React.createElement(CheckIcon, { className: "check-icon" })
                  ),
                  React.createElement('span', { key: 'termsText', className: "terms-text" }, [
                    "I agree to the ",
                    React.createElement(Link, {
                      key: 'termsLink',
                      to: "/terms",
                      className: "terms-link"
                    }, " Terms of Service"),
                    ", ",
                    React.createElement(Link, {
                      key: 'privacyLink',
                      to: "/privacy",
                      className: "terms-link"
                    }, " Privacy Policy"),
                    ", and ",
                    React.createElement(Link, {
                      key: 'slaLink',
                      to: "/sla",
                      className: "terms-link"
                    }, " Service Level Agreement")
                  ])
                ]),
                
                React.createElement('div', { key: 'enterpriseAgree', className: "enterprise-agreement" }, [
                  React.createElement(DocumentIcon, { key: 'docIcon', className: "doc-icon" }),
                  React.createElement('div', { key: 'agreeContent', className: "agreement-content" }, [
                    React.createElement('h5', { key: 'agreeTitle' }, "Enterprise Agreement"),
                    React.createElement('p', { key: 'agreeText' }, "By registering, you agree to our enterprise terms including data processing and security policies.")
                  ])
                ])
              ]),
              
              React.createElement('div', { key: 'actions2', className: "form-actions" }, [
                React.createElement('button', {
                  key: 'backBtn',
                  type: "button",
                  onClick: prevStep,
                  className: "btn-back"
                }, "← Back"),
                
                React.createElement('button', {
                  key: 'registerBtn',
                  type: "submit",
                  className: "btn-register " + (loading ? 'loading' : ''),
                  disabled: loading || passwordStrength < 50
                }, loading ? [
                  React.createElement('div', { key: 'spinner', className: "spinner" }),
                  React.createElement('span', { key: 'loadingText' }, "Creating Account...")
                ] : [
                  React.createElement(ShieldIcon, { key: 'btnIcon', className: "btn-icon" }),
                  React.createElement('span', { key: 'btnText' }, "Create Secure Account")
                ])
              ])
            ])
          ),
          
          // Альтернативные варианты
          React.createElement('div', { key: 'altReg', className: "alternative-registration" }, [
            React.createElement('div', { key: 'divider', className: "divider" },
              React.createElement('span', { key: 'dividerText', className: "divider-text" }, "or register with")
            ),
            
            React.createElement('div', { key: 'providers', className: "alt-providers" }, [
              React.createElement('button', {
                key: 'google',
                type: "button",
                className: "provider-btn google"
              }, [
                React.createElement('svg', {
                  key: 'googleIcon',
                  className: "provider-icon",
                  viewBox: "0 0 24 24"
                }, [
                  React.createElement('path', {
                    key: 'p1',
                    d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                    fill: "#4285F4"
                  }),
                  React.createElement('path', {
                    key: 'p2',
                    d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                    fill: "#34A853"
                  }),
                  React.createElement('path', {
                    key: 'p3',
                    d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
                    fill: "#FBBC05"
                  }),
                  React.createElement('path', {
                    key: 'p4',
                    d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                    fill: "#EA4335"
                  })
                ]),
                React.createElement('span', { key: 'googleText' }, "Google Workspace")
              ]),
              
              React.createElement('button', {
                key: 'microsoft',
                type: "button",
                className: "provider-btn microsoft"
              }, [
                React.createElement('svg', {
                  key: 'msIcon',
                  className: "provider-icon",
                  viewBox: "0 0 23 23"
                }, [
                  React.createElement('path', {
                    key: 'm1',
                    fill: "#f35325",
                    d: "M1 1h10v10H1z"
                  }),
                  React.createElement('path', {
                    key: 'm2',
                    fill: "#81bc06",
                    d: "M12 1h10v10H12z"
                  }),
                  React.createElement('path', {
                    key: 'm3',
                    fill: "#05a6f0",
                    d: "M1 12h10v10H1z"
                  }),
                  React.createElement('path', {
                    key: 'm4',
                    fill: "#ffba08",
                    d: "M12 12h10v10H12z"
                  })
                ]),
                React.createElement('span', { key: 'msText' }, "Microsoft 365")
              ]),
              
              React.createElement('button', {
                key: 'sso',
                type: "button",
                className: "provider-btn sso"
              }, [
                React.createElement(ShieldIcon, { key: 'ssoIcon', className: "provider-icon" }),
                React.createElement('span', { key: 'ssoText' }, "Enterprise SSO")
              ])
            ])
          ]),
          
          // Футер формы
          React.createElement('div', { key: 'formFooter', className: "form-footer" }, [
            React.createElement('p', { key: 'footerText', className: "footer-text" }, [
              "Already have an account? ",
              React.createElement(Link, {
                key: 'loginLink',
                to: "/login",
                className: "login-link"
              }, [
                React.createElement(SparklesIcon, { key: 'linkIcon', className: "link-icon" }),
                "Sign In to Your Account"
              ])
            ]),
            
            React.createElement('div', { key: 'support', className: "support-info" },
              React.createElement('div', { key: 'supportItem', className: "support-item" }, [
                React.createElement(ShieldIcon, { key: 'supportIcon', className: "support-icon" }),
                React.createElement('span', { key: 'supportText' }, [
                  "Enterprise Support: ",
                  React.createElement('a', {
                    key: 'supportLink',
                    href: "mailto:onboarding@transtelecom.ai",
                    className: "support-link"
                  }, "onboarding@transtelecom.ai")
                ])
              ])
            )
          ])
        ])
      ])
    )
  ]);
}

export default Register;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext.js';
// import '../../styles/Auth.css';
// import logo from '../../assets/ttc.png';

// function Register() {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [agreeTerms, setAgreeTerms] = useState(false);
  
//   const { register } = useAuth();
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
    
//     if (formData.password !== formData.confirmPassword) {
//       setError('Пароли не совпадают');
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError('Пароль должен быть не менее 6 символов');
//       return;
//     }

//     if (!agreeTerms) {
//       setError('Необходимо согласиться с условиями использования');
//       return;
//     }

//     setLoading(true);

//     try {
//       await register(formData);
//       navigate('/');
//     } catch (error) {
//       setError(error.response?.data?.message || 'Ошибка при регистрации');
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
//           React.createElement('p', { className: 'ttc-company-subtitle' }, 'AI Assistant')
//         )
//       ),

//       // Правая колонка с формой
//       React.createElement('div', { className: 'auth-form-section' },
//         React.createElement('div', { className: 'auth-header' },
//           React.createElement('h2', { className: 'auth-title' }, 'Create Account'),
//           React.createElement('p', { className: 'auth-description' }, 'Join our AI Assistant platform today')
//         ),

//         error && React.createElement('div', { className: 'auth-error' },
//           React.createElement('span', { className: 'error-icon' }, '⚠'),
//           error
//         ),

//         React.createElement('form', { onSubmit: handleSubmit, className: 'auth-form' },
//           React.createElement('div', { className: 'form-group' },
//             React.createElement('label', { htmlFor: 'fullName', className: 'form-label' }, 'Full Name'),
//             React.createElement('input', {
//               type: 'text',
//               id: 'fullName',
//               name: 'fullName',
//               value: formData.fullName,
//               onChange: handleChange,
//               className: 'form-input',
//               placeholder: 'Enter your full name',
//               required: true
//             })
//           ),

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

//           React.createElement('div', { className: 'form-group' },
//             React.createElement('label', { htmlFor: 'confirmPassword', className: 'form-label' }, 'Confirm Password'),
//             React.createElement('input', {
//               type: 'password',
//               id: 'confirmPassword',
//               name: 'confirmPassword',
//               value: formData.confirmPassword,
//               onChange: handleChange,
//               className: 'form-input',
//               placeholder: 'Confirm your password',
//               required: true
//             })
//           ),

//           React.createElement('div', { className: 'checkbox-group terms-group' },
//             React.createElement('input', {
//               type: 'checkbox',
//               id: 'agreeTerms',
//               checked: agreeTerms,
//               onChange: (e) => setAgreeTerms(e.target.checked),
//               className: 'checkbox-input',
//               required: true
//             }),
//             React.createElement('label', { 
//               htmlFor: 'agreeTerms', 
//               className: 'checkbox-label' 
//             }, 'I agree to the Terms and Conditions')
//           ),

//           React.createElement('button', { 
//             type: 'submit', 
//             className: `btn btn-primary ${loading ? 'loading' : ''}`,
//             disabled: loading
//           }, 
//             loading 
//               ? React.createElement('div', { className: 'btn-loading' }, 'Creating Account...')
//               : 'Create Account'
//           )
//         ),

//         React.createElement('div', { className: 'auth-footer' },
//           React.createElement('p', { className: 'auth-footer-text' },
//             'Already have an account? ',
//             React.createElement(Link, { to: "/login", className: "auth-link" }, 'Sign in')
//           )
//         )
//       )
//     )
//   );
// }

// export default Register;

