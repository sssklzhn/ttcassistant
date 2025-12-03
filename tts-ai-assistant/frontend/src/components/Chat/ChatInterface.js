import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../styles/Chat.css';

function ChatInterface() {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChats = async () => {
    try {
      const response = await axios.get('/api/chat');
      setChats(response.data);
      
      if (response.data.length > 0 && !currentChat) {
        loadChat(response.data[0]._id);
      }
    } catch (error) {
      console.error('Error loading chats:', error);
    }
  };

  const loadChat = async (chatId) => {
    try {
      const response = await axios.get(`/api/chat/${chatId}`);
      setCurrentChat(response.data);
    } catch (error) {
      console.error('Error loading chat:', error);
    }
  };

  const createNewChat = async () => {
    try {
      const response = await axios.post('/api/chat/new');
      const newChat = response.data;
      setChats(prev => [newChat, ...prev]);
      setCurrentChat(newChat);
      setMessage('');
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    setLoading(true);
    try {
      const response = await axios.post(`/api/chat/${currentChat._id}/message`, {
        message: message.trim()
      });

      setCurrentChat(response.data.chat);
      setMessage('');
      
      if (currentChat.messages.length === 0) {
        loadChats();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteChat = async (chatId, e) => {
    e.stopPropagation();
    try {
      await axios.delete(`/api/chat/${chatId}`);
      setChats(prev => prev.filter(chat => chat._id !== chatId));
      
      if (currentChat && currentChat._id === chatId) {
        if (chats.length > 1) {
          const otherChat = chats.find(chat => chat._id !== chatId);
          if (otherChat) {
            loadChat(otherChat._id);
          } else {
            setCurrentChat(null);
          }
        } else {
          setCurrentChat(null);
        }
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Если нет активного чата
  if (!currentChat) {
    return React.createElement('div', { className: 'chat-fullscreen' },
      React.createElement('div', { className: 'chat-container' },
        React.createElement('div', { className: 'chat-sidebar' },
          React.createElement('div', { className: 'sidebar-header' },
            React.createElement('h3', null, 'ТТС AI Чат'),
            React.createElement('button', {
              className: 'toggle-sidebar-btn',
              onClick: toggleSidebar,
              title: sidebarCollapsed ? 'Развернуть боковую панель' : 'Свернуть боковую панель'
            }, sidebarCollapsed ? '→' : '←')
          ),
          
          !sidebarCollapsed && React.createElement('div', { className: 'sidebar-content' },
            React.createElement('button', {
              className: 'new-chat-btn primary',
              onClick: createNewChat
            },
              React.createElement('span', { className: 'btn-icon' }, '➕'),
              'Новый чат'
            ),
            
            React.createElement('div', { className: 'chats-section' },
              React.createElement('h4', { className: 'section-title' }, 'История чатов'),
              React.createElement('div', { className: 'chats-list' },
                chats.length > 0 ? (
                  chats.map(chat => 
                    React.createElement('div', {
                      key: chat._id,
                      className: 'chat-item',
                      onClick: () => loadChat(chat._id)
                    },
                      React.createElement('span', { className: 'chat-icon' }, '💭'),
                      React.createElement('span', { className: 'chat-item-title' }, chat.title),
                      React.createElement('button', {
                        className: 'delete-chat-btn',
                        onClick: (e) => deleteChat(chat._id, e),
                        title: 'Удалить чат'
                      }, '×')
                    )
                  )
                ) : (
                  React.createElement('div', { className: 'empty-state' },
                    'Нет сохраненных чатов'
                  )
                )
              )
            )
          )
        ),

        React.createElement('div', { className: 'chat-main empty' },
          React.createElement('div', { className: 'welcome-content' },
            React.createElement('div', { className: 'welcome-icon' }, '🤖'),
            React.createElement('h1', { className: 'welcome-title' }, 'ТТС AI Ассистент'),
            React.createElement('p', { className: 'welcome-description' }, 
              'Ваш личный помощник по всем вопросам компании. Начните новый чат или выберите из истории.'
            ),
            React.createElement('button', {
              className: 'btn btn-primary start-chat-btn',
              onClick: createNewChat
            },
              React.createElement('span', { className: 'btn-icon' }, '💬'),
              'Начать новый чат'
            )
          )
        )
      )
    );
  }

  // Полноэкранный интерфейс чата
  return React.createElement('div', { className: 'chat-fullscreen' },
    React.createElement('div', { className: 'chat-container' },
      React.createElement('div', { className: `chat-sidebar ${sidebarCollapsed ? 'collapsed' : ''}` },
        React.createElement('div', { className: 'sidebar-header' },
          React.createElement('h3', null, 'ТТС AI Чат'),
          React.createElement('button', {
            className: 'toggle-sidebar-btn',
            onClick: toggleSidebar,
            title: sidebarCollapsed ? 'Развернуть боковую панель' : 'Свернуть боковую панель'
          }, sidebarCollapsed ? '→' : '←')
        ),
        
        !sidebarCollapsed && React.createElement('div', { className: 'sidebar-content' },
          React.createElement('button', {
            className: 'new-chat-btn primary',
            onClick: createNewChat
          },
            React.createElement('span', { className: 'btn-icon' }, '➕'),
            'Новый чат'
          ),
          
          React.createElement('div', { className: 'chats-section' },
            React.createElement('h4', { className: 'section-title' }, 'История чатов'),
            React.createElement('div', { className: 'chats-list' },
              chats.map(chat => 
                React.createElement('div', {
                  key: chat._id,
                  className: `chat-item ${currentChat?._id === chat._id ? 'active' : ''}`,
                  onClick: () => loadChat(chat._id)
                },
                  React.createElement('span', { className: 'chat-icon' }, '💭'),
                  React.createElement('span', { className: 'chat-item-title' }, chat.title),
                  React.createElement('button', {
                    className: 'delete-chat-btn',
                    onClick: (e) => deleteChat(chat._id, e),
                    title: 'Удалить чат'
                  }, '×')
                )
              )
            )
          )
        )
      ),

      React.createElement('div', { className: 'chat-main' },
        React.createElement('div', { className: 'chat-header' },
          React.createElement('div', { className: 'chat-title' },
            React.createElement('span', { className: 'header-icon' }, '💬'),
            React.createElement('h2', null, currentChat.title)
          ),
          React.createElement('button', {
            className: 'new-chat-header-btn',
            onClick: createNewChat
          },
            React.createElement('span', { className: 'btn-icon' }, '➕'),
            'Новый чат'
          )
        ),

        React.createElement('div', { className: 'chat-messages' },
          currentChat.messages.length > 0 ? (
            currentChat.messages.map((msg, index) =>
              React.createElement('div', {
                key: index,
                className: `message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`
              },
                React.createElement('div', { className: 'message-avatar' },
                  msg.role === 'user' ? '👤' : '🤖'
                ),
                React.createElement('div', { className: 'message-content' }, msg.content)
              )
            )
          ) : (
            React.createElement('div', { className: 'empty-chat' },
              React.createElement('div', { className: 'empty-icon' }, '💬'),
              React.createElement('h3', null, 'Чат начат'),
              React.createElement('p', null, 'Задайте первый вопрос AI-ассистенту')
            )
          ),
          
          loading && React.createElement('div', { className: 'message ai-message' },
            React.createElement('div', { className: 'message-avatar' }, '🤖'),
            React.createElement('div', { className: 'message-content loading-dots' }, 'AI думает...')
          ),
          React.createElement('div', { ref: messagesEndRef })
        ),

        React.createElement('form', { onSubmit: sendMessage, className: 'chat-input-form' },
          React.createElement('div', { className: 'input-container' },
            React.createElement('input', {
              type: 'text',
              value: message,
              onChange: (e) => setMessage(e.target.value),
              placeholder: 'Задайте вопрос AI-ассистенту ТТС...',
              className: 'chat-input',
              disabled: loading
            }),
            React.createElement('button', {
              type: 'submit',
              className: `send-btn ${loading ? 'loading' : ''}`,
              disabled: !message.trim() || loading
            }, loading ? '⏳' : '➤')
          )
        )
      )
    )
  );
}

export default ChatInterface;
