import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('🔐 Проверка аутентификации, токен:', token ? 'есть' : 'нет');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get('/api/auth/me');
      
      console.log('✅ Данные пользователя:', response.data);
      
      setUser(response.data.user);
      setError(null);
    } catch (error) {
      console.error('❌ Ошибка проверки аутентификации:', error);
      
      if (error.response && error.response.status === 401) {
        console.log('🚫 Неавторизован, очистка данных');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
      }
      setError(error.response?.data?.message || 'Ошибка проверки аутентификации');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('📤 Вход с email:', email);
      
      const response = await axios.post('/api/auth/login', { 
        email, 
        password 
      });
      
      console.log('✅ Ответ от сервера при входе:', response.data);
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setError(null);
      
      return response.data;
    } catch (error) {
      console.error('❌ Ошибка входа:', error);
      
      if (error.response) {
        console.error('📡 Ответ сервера:', error.response.data);
        const serverMessage = error.response.data?.message || 'Ошибка входа';
        setError(serverMessage);
        throw new Error(serverMessage);
      }
      
      setError('Ошибка подключения к серверу');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      console.log('📤 Отправка данных регистрации:', userData);
      
      // Проверяем обязательные поля
      if (!userData || !userData.fullName || !userData.email || !userData.password) {
        throw new Error('Необходимо заполнить все обязательные поля');
      }
      
      // Подготавливаем данные для отправки
      const registrationData = {
        fullName: userData.fullName.trim(),
        email: userData.email.trim().toLowerCase(),
        password: userData.password,
        confirmPassword: userData.confirmPassword || userData.password
      };
      
      console.log('📋 Данные для отправки на сервер:', registrationData);
      
      const response = await axios.post('/api/auth/register', registrationData);
      console.log('✅ Ответ от сервера:', response.data);
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setError(null);
      
      return response.data;
    } catch (error) {
      console.error('❌ Ошибка регистрации:', error);
      
      let errorMessage = 'Ошибка регистрации';
      
      if (error.response) {
        console.error('📡 Ответ сервера:', error.response.data);
        console.error('📡 Статус:', error.response.status);
        
        errorMessage = error.response.data?.message || 'Ошибка сервера';
        
        if (error.response.status === 400) {
          errorMessage = error.response.data?.message || 'Неверные данные';
        } else if (error.response.status === 409) {
          errorMessage = 'Пользователь с таким email уже существует';
        }
      } else if (error.request) {
        console.error('🌐 Нет ответа от сервера');
        errorMessage = 'Нет ответа от сервера. Проверьте подключение.';
      } else {
        console.error('⚙️ Ошибка настройки запроса:', error.message);
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    console.log('🚪 Выход из системы');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    error,
    clearError,
    checkAuth,
    // Функция для отладки
    debug: () => {
      console.log('🔍 Отладка AuthContext:');
      console.log('Токен в localStorage:', localStorage.getItem('token'));
      console.log('Пользователь в localStorage:', localStorage.getItem('user'));
      console.log('Пользователь в состоянии:', user);
      console.log('Заголовок Authorization:', axios.defaults.headers.common['Authorization']);
      console.log('Ошибка:', error);
      console.log('Загрузка:', loading);
    }
  };

  return React.createElement(AuthContext.Provider, { value }, children);
}