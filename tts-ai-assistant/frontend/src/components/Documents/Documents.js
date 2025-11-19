import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext.js';
import '../../styles/Documents.css';

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const response = await axios.get('/api/documents');
      setDocuments(response.data);
    } catch (error) {
      console.error('Error loading documents:', error);
      setError('Ошибка при загрузке документов');
    }
  };

  const handleFileUpload = async (e) => {
    if (!isAdmin) {
      setError('Только администраторы могут загружать документы');
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    // Проверка размера файла (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Файл слишком большой. Максимальный размер: 10MB');
      return;
    }

    // Проверка типа файла
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      setError('Неподдерживаемый формат файла. Используйте PDF, DOC или DOCX');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('document', file);

    try {
      await axios.post('/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccess('Документ успешно загружен!');
      loadDocuments();
      e.target.value = '';
      
      // Автоматически скрыть сообщение об успехе через 3 секунды
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Ошибка при загрузке файла');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = async (documentId) => {
    if (!isAdmin) {
      setError('Только администраторы могут удалять документы');
      return;
    }

    if (!confirm('Вы уверены, что хотите удалить этот документ?')) {
      return;
    }

    try {
      await axios.delete(`/api/documents/${documentId}`);
      setSuccess('Документ успешно удален!');
      loadDocuments();
      
      // Автоматически скрыть сообщение об успехе через 3 секунды
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Ошибка при удалении документа');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileIcon = (fileType) => {
    const icons = {
      'pdf': '📕',
      'docx': '📘', 
      'doc': '📗',
      'txt': '📝',
      'xlsx': '📊',
      'pptx': '📑'
    };
    return icons[fileType] || '📄';
  };

  const getFileType = (fileName) => {
    return fileName.split('.').pop().toLowerCase();
  };

  if (!isAdmin) {
    return React.createElement('div', { className: 'documents-container' },
      React.createElement('div', { className: 'access-denied glass-effect' },
        React.createElement('h1', null, '🔒 Доступ ограничен'),
        React.createElement('p', null, 'У вас нет прав для доступа к этому разделу'),
        React.createElement('p', null, 'Только администраторы могут управлять документами для обучения AI-ассистента')
      )
    );
  }

  return React.createElement('div', { className: 'documents-container' },
    React.createElement('div', { className: 'documents-header' },
      React.createElement('h1', null, '📚 База знаний'),
      React.createElement('p', null, 'Загружайте документы для обучения AI-ассистента. Система автоматически проанализирует содержимое и расширит базу знаний.')
    ),

    React.createElement('div', { className: 'upload-section' },
      React.createElement('label', {
        htmlFor: 'file-upload',
        className: `upload-btn ${uploading ? 'uploading' : ''} hover-lift`
      }, 
        uploading 
          ? React.createElement('div', { className: 'loading' })
          : React.createElement(React.Fragment, null,
              '📁 Выбрать файл для загрузки'
            )
      ),
      React.createElement('input', {
        id: 'file-upload',
        type: 'file',
        accept: '.pdf,.doc,.docx,.txt',
        onChange: handleFileUpload,
        disabled: uploading || !isAdmin
      }),
      React.createElement('p', { className: 'upload-hint' },
        'Поддерживаемые форматы: PDF, DOC, DOCX, TXT • Максимальный размер: 10MB'
      ),
      
      error && React.createElement('div', { className: 'upload-error' }, 
        React.createElement('span', { style: { marginRight: '8px' } }, '⚠️'),
        error
      ),
      
      success && React.createElement('div', { 
        className: 'upload-error',
        style: { 
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: '#86efac'
        } 
      }, 
        React.createElement('span', { style: { marginRight: '8px' } }, '✅'),
        success
      )
    ),

    React.createElement('div', { className: 'documents-list' },
      React.createElement('h2', null, 
        React.createElement('span', { style: { marginRight: '12px' } }, '📋'),
        `Загруженные документы (${documents.length})`
      ),
      
      documents.length === 0 
        ? React.createElement('div', { className: 'empty-state glass-effect' },
            React.createElement('p', null, '📭 База знаний пуста'),
            React.createElement('p', null, 'Загрузите первый документ, чтобы начать обучение AI-ассистента')
          )
        : React.createElement('div', { className: 'documents-grid' },
            documents.map((doc, index) =>
              React.createElement('div', { 
                key: doc._id, 
                className: 'document-card glass-effect hover-lift',
                style: { animationDelay: `${index * 0.1}s` }
              },
                React.createElement('div', { className: 'document-icon' },
                  getFileIcon(getFileType(doc.originalName))
                ),
                React.createElement('div', { className: 'document-info' },
                  React.createElement('h3', { className: 'document-name' }, doc.originalName),
                  React.createElement('p', { className: 'document-type' }, 
                    getFileType(doc.originalName).toUpperCase()
                  ),
                  React.createElement('p', { className: 'document-date' },
                    `Загружен ${formatDate(doc.createdAt)}`
                  ),
                  doc.uploadedBy && React.createElement('p', { className: 'document-uploader' },
                    `Автор загрузки: ${doc.uploadedBy.fullName}`
                  )
                ),
                React.createElement('button', {
                  className: 'delete-document-btn hover-lift',
                  onClick: () => handleDeleteDocument(doc._id),
                  title: 'Удалить документ из базы знаний'
                }, '🗑️')
              )
            )
          )
    )
  );
}

export default Documents;