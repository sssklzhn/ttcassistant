import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import '../../styles/Auth.css';
import logo from '../../assets/ttc.png';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return React.createElement('div', { className: 'auth-container' },
    React.createElement('div', { className: 'auth-background' },
      React.createElement('div', { className: 'auth-background-pattern' })
    ),
    
    React.createElement('div', { className: 'auth-card' },
      // Левая колонка с логотипом
      React.createElement('div', { className: 'auth-logo-section' },
        React.createElement('div', { className: 'ttc-logo-container' },
          React.createElement('img', { 
            src: logo, 
            alt: 'Transtelecom Logo',
            className: 'ttc-logo-image'
          })
        ),
        React.createElement('div', { className: 'ttc-company-info' },
          React.createElement('h1', { className: 'ttc-company-name' }, 'Transtelecom'),
          React.createElement('p', { className: 'ttc-company-subtitle' }, 'AI Assistant Platform')
        )
      ),

      // Правая колонка с формой
      React.createElement('div', { className: 'auth-form-section' },
        React.createElement('div', { className: 'auth-header' },
          React.createElement('h2', { className: 'auth-title' }, 'Welcome Back'),
          React.createElement('p', { className: 'auth-description' }, 'Sign in to your account to continue')
        ),

        error && React.createElement('div', { className: 'auth-error' },
          React.createElement('span', { className: 'error-icon' }, '⚠'),
          error
        ),

        React.createElement('form', { onSubmit: handleSubmit, className: 'auth-form' },
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { htmlFor: 'email', className: 'form-label' }, 'Email Address'),
            React.createElement('input', {
              type: 'email',
              id: 'email',
              name: 'email',
              value: formData.email,
              onChange: handleChange,
              className: 'form-input',
              placeholder: 'Enter your email address',
              required: true
            })
          ),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { htmlFor: 'password', className: 'form-label' }, 'Password'),
            React.createElement('input', {
              type: 'password',
              id: 'password',
              name: 'password',
              value: formData.password,
              onChange: handleChange,
              className: 'form-input',
              placeholder: 'Enter your password',
              required: true
            })
          ),

          React.createElement('div', { className: 'form-options' },
            React.createElement('div', { className: 'checkbox-group' },
              React.createElement('input', {
                type: 'checkbox',
                id: 'rememberMe',
                checked: rememberMe,
                onChange: (e) => setRememberMe(e.target.checked),
                className: 'checkbox-input'
              }),
              React.createElement('label', { 
                htmlFor: 'rememberMe', 
                className: 'checkbox-label' 
              }, 'Remember me')
            ),
            React.createElement(Link, { 
              to: "/forgot-password", 
              className: "forgot-password" 
            }, 'Forgot password?')
          ),

          React.createElement('button', { 
            type: 'submit', 
            className: `btn btn-primary ${loading ? 'loading' : ''}`,
            disabled: loading
          }, 
            loading 
              ? React.createElement('div', { className: 'btn-loading' }, 'Signing In...')
              : 'Sign In'
          )
        ),

        React.createElement('div', { className: 'auth-footer' },
          React.createElement('p', { className: 'auth-footer-text' },
            "Don't have an account? ",
            React.createElement(Link, { to: "/register", className: "auth-link" }, 'Create account')
          )
        )
      )
    )
  );
}

export default Login;