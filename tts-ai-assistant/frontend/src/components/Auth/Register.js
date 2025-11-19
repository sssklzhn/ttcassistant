import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import '../../styles/Auth.css';
import logo from '../../assets/ttc.png';

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
  
  const { register } = useAuth();
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
    
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }

    if (!agreeTerms) {
      setError('Необходимо согласиться с условиями использования');
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Ошибка при регистрации');
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
          React.createElement('p', { className: 'ttc-company-subtitle' }, 'AI Assistant')
        )
      ),

      // Правая колонка с формой
      React.createElement('div', { className: 'auth-form-section' },
        React.createElement('div', { className: 'auth-header' },
          React.createElement('h2', { className: 'auth-title' }, 'Create Account'),
          React.createElement('p', { className: 'auth-description' }, 'Join our AI Assistant platform today')
        ),

        error && React.createElement('div', { className: 'auth-error' },
          React.createElement('span', { className: 'error-icon' }, '⚠'),
          error
        ),

        React.createElement('form', { onSubmit: handleSubmit, className: 'auth-form' },
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { htmlFor: 'fullName', className: 'form-label' }, 'Full Name'),
            React.createElement('input', {
              type: 'text',
              id: 'fullName',
              name: 'fullName',
              value: formData.fullName,
              onChange: handleChange,
              className: 'form-input',
              placeholder: 'Enter your full name',
              required: true
            })
          ),

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

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { htmlFor: 'confirmPassword', className: 'form-label' }, 'Confirm Password'),
            React.createElement('input', {
              type: 'password',
              id: 'confirmPassword',
              name: 'confirmPassword',
              value: formData.confirmPassword,
              onChange: handleChange,
              className: 'form-input',
              placeholder: 'Confirm your password',
              required: true
            })
          ),

          React.createElement('div', { className: 'checkbox-group terms-group' },
            React.createElement('input', {
              type: 'checkbox',
              id: 'agreeTerms',
              checked: agreeTerms,
              onChange: (e) => setAgreeTerms(e.target.checked),
              className: 'checkbox-input',
              required: true
            }),
            React.createElement('label', { 
              htmlFor: 'agreeTerms', 
              className: 'checkbox-label' 
            }, 'I agree to the Terms and Conditions')
          ),

          React.createElement('button', { 
            type: 'submit', 
            className: `btn btn-primary ${loading ? 'loading' : ''}`,
            disabled: loading
          }, 
            loading 
              ? React.createElement('div', { className: 'btn-loading' }, 'Creating Account...')
              : 'Create Account'
          )
        ),

        React.createElement('div', { className: 'auth-footer' },
          React.createElement('p', { className: 'auth-footer-text' },
            'Already have an account? ',
            React.createElement(Link, { to: "/login", className: "auth-link" }, 'Sign in')
          )
        )
      )
    )
  );
}

export default Register;