// import express from 'express';
// import Chat from '../models/Chat.js';
// import Document from '../models/Document.js';
// import auth from '../middleware/auth.js';
// import axios from 'axios';

// const router = express.Router();


// // AI Response Generator (Llama API integration)
// async function generateAIResponse(userMessage, userId) {
//   try {
//     // Get all documents for context
//     const documents = await Document.find({ uploadedBy: userId });
//     const context = documents.map(doc => doc.content).join('\n\n');
    
//     const prompt = `Контекст из документов компании ТрансТелеком:
// ${context}

// Вопрос сотрудника: ${userMessage}

// Ответь как AI-ассистент компании ТрансТелеком. Будь полезным, профессиональным и отвечай на русском языке.
// Если в контексте нет информации для ответа, вежливо сообщи об этом.
// Ответ:`;

//     // Groq API call with updated model
//     const response = await axios.post(process.env.LLAMA_API_URL, {
//       messages: [
//         {
//           role: "system",
//           content: "Ты полезный AI-ассистент для сотрудников компании ТрансТелеком. Отвечай на русском языке профессионально и вежливо. Используй предоставленный контекст для точных ответов."
//         },
//         {
//           role: "user",
//           content: prompt
//         }
//       ],
//       model: "llama-3.1-8b-instant", // Обновленная модель
//       temperature: 0.7,
//       max_tokens: 1024,
//       top_p: 1,
//       stream: false
//     }, {
//       headers: {
//         'Authorization': `Bearer ${process.env.LLAMA_API_KEY}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error('Groq API Error:', error.response?.data || error.message);
//     return "Извините, в настоящее время я не могу обработать ваш запрос. Пожалуйста, попробуйте позже или обратитесь к администратору.";
//   }
// }

// // Create new chat
// router.post('/new', auth, async (req, res) => {
//   try {
//     const chat = new Chat({
//       userId: req.user._id,
//       title: 'Новый чат',
//       messages: []
//     });

//     await chat.save();
//     res.json(chat);
//   } catch (error) {
//     res.status(500).json({ message: 'Ошибка при создании чата' });
//   }
// });

// // Get all chats for user
// router.get('/', auth, async (req, res) => {
//   try {
//     const chats = await Chat.find({ userId: req.user._id })
//       .select('title createdAt updatedAt')
//       .sort({ updatedAt: -1 });
    
//     res.json(chats);
//   } catch (error) {
//     res.status(500).json({ message: 'Ошибка при получении чатов' });
//   }
// });

// // Get specific chat
// router.get('/:chatId', auth, async (req, res) => {
//   try {
//     const chat = await Chat.findOne({
//       _id: req.params.chatId,
//       userId: req.user._id
//     });

//     if (!chat) {
//       return res.status(404).json({ message: 'Чат не найден' });
//     }

//     res.json(chat);
//   } catch (error) {
//     res.status(500).json({ message: 'Ошибка при получении чата' });
//   }
// });

// // Send message
// router.post('/:chatId/message', auth, async (req, res) => {
//   try {
//     const { message } = req.body;
    
//     let chat = await Chat.findOne({
//       _id: req.params.chatId,
//       userId: req.user._id
//     });

//     if (!chat) {
//       return res.status(404).json({ message: 'Чат не найден' });
//     }

//     // Add user message
//     chat.messages.push({
//       role: 'user',
//       content: message
//     });

//     // Generate AI response
//     const aiResponse = await generateAIResponse(message, req.user._id);

//     // Add AI response
//     chat.messages.push({
//       role: 'assistant',
//       content: aiResponse
//     });

//     // Update chat title if it's the first message
//     if (chat.messages.length === 2) {
//       chat.title = message.substring(0, 50) + (message.length > 50 ? '...' : '');
//     }

//     await chat.save();

//     res.json({
//       userMessage: message,
//       aiResponse: aiResponse,
//       chat: chat
//     });
//   } catch (error) {
//     console.error('Send message error:', error);
//     res.status(500).json({ message: 'Ошибка при отправке сообщения' });
//   }
// });

// // Delete chat
// router.delete('/:chatId', auth, async (req, res) => {
//   try {
//     await Chat.findOneAndDelete({
//       _id: req.params.chatId,
//       userId: req.user._id
//     });

//     res.json({ message: 'Чат удален' });
//   } catch (error) {
//     res.status(500).json({ message: 'Ошибка при удалении чата' });
//   }
// });

// export default router;

import express from 'express';
import Chat from '../models/Chat.js';
import Document from '../models/Document.js';
import auth from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';
import axios from 'axios';
import logger from '../middleware/logger.js';

const router = express.Router();

// Функция для поиска релевантных чанков
async function findRelevantChunks(userMessage, userId) {
  const startTime = Date.now();
  
  try {
    // 🔍 ДИАГНОСТИКА: проверяем что вообще есть в базе
    const totalDocs = await Document.countDocuments();
    console.log('🔍 DEBUG: Total documents in system:', totalDocs);

    // Получаем все документы с чанками
    const documents = await Document.find().select('originalName chunks');
    
    // Детальная диагностика
    console.log('📋 DEBUG: Documents details:');
    let totalChunksInSystem = 0;
    documents.forEach((doc, index) => {
      console.log(`  ${index + 1}. "${doc.originalName}": ${doc.chunks.length} chunks`);
      totalChunksInSystem += doc.chunks.length;
      if (doc.chunks.length > 0) {
        console.log(`     First chunk preview: "${doc.chunks[0].content.substring(0, 100)}..."`);
      }
    });

    console.log(`🔢 DEBUG: Total chunks in system: ${totalChunksInSystem}`);

    let allChunks = [];
    documents.forEach(doc => {
      if (doc.chunks && doc.chunks.length > 0) {
        doc.chunks.forEach((chunk, index) => {
          allChunks.push({
            content: chunk.content,
            documentName: doc.originalName,
            chunkIndex: index,
            documentId: doc._id
          });
        });
      }
    });

    console.log(`📦 DEBUG: Total chunks collected for search: ${allChunks.length}`);

    // Если вообще нет чанков, сразу возвращаем пустой массив
    if (allChunks.length === 0) {
      console.log('❌ DEBUG: No chunks available in system');
      const searchTime = Date.now() - startTime;
      logger.debug('Chunk search completed - no chunks', {
        userId,
        searchTerms: [],
        totalChunks: 0,
        relevantChunks: 0,
        selectedChunks: 0,
        searchTime: `${searchTime}ms`
      });
      return [];
    }

    // Простой поиск по ключевым словам
    const searchTerms = userMessage.toLowerCase().split(/\s+/).filter(term => term.length > 2); // Уменьшил до 2 символов
    console.log(`🔎 DEBUG: Search terms:`, searchTerms);
    
    const relevantChunks = allChunks.filter(chunk => {
      const chunkText = chunk.content.toLowerCase();
      const found = searchTerms.some(term => chunkText.includes(term));
      if (found && searchTerms.length > 0) {
        console.log(`   ✅ Found "${searchTerms}" in chunk: ${chunkText.substring(0, 100)}...`);
      }
      return found;
    });

    console.log(`🎯 DEBUG: Relevant chunks found: ${relevantChunks.length}`);

    // Если не нашли по ключевым словам, берем случайные чанки для контекста
    const finalChunks = relevantChunks.length > 0 
      ? relevantChunks.slice(0, 5)
      : allChunks.slice(0, 3); // Берем первые 3 чанка для контекста

    console.log(`📤 DEBUG: Final chunks selected: ${finalChunks.length}`);

    const searchTime = Date.now() - startTime;
    logger.debug('Chunk search completed', {
      userId,
      searchTerms,
      totalChunks: allChunks.length,
      relevantChunks: relevantChunks.length,
      selectedChunks: finalChunks.length,
      searchTime: `${searchTime}ms`
    });

    return finalChunks;
  } catch (error) {
    console.error('❌ DEBUG: Chunk search error:', error);
    logger.error('Chunk search failed', { userId, error: error.message });
    return [];
  }
}

// Бесплатные AI API провайдеры с приоритетом
const AI_PROVIDERS = [
  {
    name: 'HuggingFace',
    url: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
    method: 'POST',
    headers: () => ({
      'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      'Content-Type': 'application/json'
    }),
    body: (prompt) => ({
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        do_sample: true
      }
    }),
    extractResponse: (data) => data[0]?.generated_text || data
  },
  {
    name: 'Groq',
    url: process.env.LLAMA_API_URL || 'https://api.groq.com/openai/v1/chat/completions',
    method: 'POST',
    headers: () => ({
      'Authorization': `Bearer ${process.env.LLAMA_API_KEY}`,
      'Content-Type': 'application/json'
    }),
    body: (prompt) => ({
      messages: [
        {
          role: "system",
          content: "Ты полезный AI-ассистент для сотрудников компании ТрансТелеком. Отвечай на русском языке профессионально и вежливо. Используй предоставленный контекст для точных ответов. Учитывай историю диалога в чате."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false
    }),
    extractResponse: (data) => data.choices?.[0]?.message?.content || data
  }
];

// Фолбэк локальная модель
const FALLBACK_RESPONSES = {
  'привет': 'Здравствуйте! Я AI-ассистент компании ТрансТелеком. Чем могу помочь?',
  'документ': 'Информацию о документах вы можете найти в системе документооборота компании.',
  'помощь': 'Я могу помочь с вопросами о документах компании ТрансТелеком. Задайте ваш вопрос.',
  'демежан': 'Демежан - сотрудник компании ТрансТелеком. Более подробную информацию можно найти в документах компании.',
  'default': 'Спасибо за ваш вопрос! На основе доступных документов компании я могу предоставить вам информацию. Если нужны конкретные данные, уточните ваш запрос.'
};

function getFallbackResponse(message, chunksCount) {
  const lowerMessage = message.toLowerCase();
  
  if (chunksCount === 0) {
    return "В настоящее время в системе нет загруженных документов для поиска информации. Обратитесь к администратору для загрузки документов.";
  }
  
  for (const [key, response] of Object.entries(FALLBACK_RESPONSES)) {
    if (lowerMessage.includes(key) && key !== 'default') {
      return response;
    }
  }
  return FALLBACK_RESPONSES.default;
}

// AI Response Generator с учетом чанков И истории чата
async function generateAIResponse(userMessage, userId, chatHistory = []) {
  const startTime = Date.now();
  
  try {
    // Ищем релевантные чанки
    const relevantChunks = await findRelevantChunks(userMessage, userId);
    
    // Собираем контекст из чанков
    const context = relevantChunks.length > 0 
      ? relevantChunks.map(chunk => 
          `[Из документа "${chunk.documentName}", часть ${chunk.chunkIndex + 1}]:\n${chunk.content}`
        ).join('\n\n')
      : 'В системе нет загруженных документов для поиска информации.';

    // Формируем историю диалога (если есть)
    let conversationHistory = '';
    if (chatHistory && chatHistory.length > 0) {
      // Берем последние 5 сообщений для контекста
      const recentMessages = chatHistory.slice(-10); // Увеличил до 10 сообщений
      conversationHistory = 'История диалога:\n' + recentMessages.map(msg => 
        `${msg.role === 'user' ? 'Сотрудник' : 'Ассистент'}: ${msg.content}`
      ).join('\n') + '\n\n';
    }

    const prompt = `Контекст из документов компании ТрансТелеком:
${context}

${conversationHistory}Новый вопрос сотрудника: ${userMessage}

Ответь как AI-ассистент компании ТрансТелеком. Будь полезным, профессиональным и отвечай на русском языке.
Учитывай предыдущую историю диалога. Если в контексте нет информации для ответа, вежливо сообщи об этом.
Не повторяй приветствия если диалог уже начат.
Ответ:`;

    logger.debug('AI request prepared', {
      userId,
      contextChunks: relevantChunks.length,
      chatHistoryLength: chatHistory ? chatHistory.length : 0,
      promptLength: prompt.length
    });

    // Для Groq API нужно передавать всю историю сообщений в messages
    if (process.env.LLAMA_API_KEY) {
      try {
        // Формируем messages для Groq с историей
        const messages = [
          {
            role: "system",
            content: "Ты полезный AI-ассистент для сотрудников компании ТрансТелеком. Отвечай на русском языке профессионально и вежливо. Используй предоставленный контекст для точных ответов. Учитывай историю диалога."
          }
        ];

        // Добавляем историю чата (если есть)
        if (chatHistory && chatHistory.length > 0) {
          // Берем последние 15 сообщений (чтобы не превысить лимит токенов)
          const recentMessages = chatHistory.slice(-15);
          recentMessages.forEach(msg => {
            messages.push({
              role: msg.role,
              content: msg.content
            });
          });
        } else {
          // Если истории нет, добавляем только текущий вопрос
          messages.push({
            role: "user",
            content: prompt
          });
        }

        // Добавляем последнее сообщение отдельно, если его еще нет в истории
        if (chatHistory.length === 0 || chatHistory[chatHistory.length - 1].content !== userMessage) {
          messages.push({
            role: "user",
            content: userMessage
          });
        }

        console.log(`🤖 DEBUG: Groq messages count: ${messages.length}`);
        
        const response = await axios({
          method: 'POST',
          url: process.env.LLAMA_API_URL || 'https://api.groq.com/openai/v1/chat/completions',
          headers: {
            'Authorization': `Bearer ${process.env.LLAMA_API_KEY}`,
            'Content-Type': 'application/json'
          },
          data: {
            messages: messages,
            model: "llama-3.1-8b-instant",
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            stream: false
          },
          timeout: 15000
        });

        if (response.status === 200 || response.status === 201) {
          const aiResponse = response.data.choices?.[0]?.message?.content;
          
          if (aiResponse && aiResponse.trim().length > 0) {
            const totalTime = Date.now() - startTime;
            logger.info('AI response generated', {
              userId,
              provider: 'Groq',
              responseLength: aiResponse.length,
              chunksUsed: relevantChunks.length,
              chatHistoryUsed: chatHistory ? chatHistory.length : 0,
              totalTime: `${totalTime}ms`
            });
            
            return aiResponse;
          }
        }
      } catch (error) {
        console.log(`⚠️ DEBUG: Groq failed:`, error.message);
        logger.warn(`AI provider Groq failed`, {
          userId,
          error: error.message
        });
        // Продолжаем к следующему провайдеру
      }
    }

    // Пробуем другие провайдеры (только для промптов без сложной истории)
    for (const provider of AI_PROVIDERS) {
      if (provider.name === 'Groq') continue; // Уже пробовали
      
      try {
        // Пропускаем провайдера если нет API ключа
        if (provider.name === 'HuggingFace' && !process.env.HUGGINGFACE_API_KEY) continue;
        
        console.log(`🤖 DEBUG: Trying ${provider.name} API`);
        
        const response = await axios({
          method: provider.method,
          url: provider.url,
          headers: provider.headers(),
          data: provider.body(prompt),
          timeout: 15000
        });

        if (response.status === 200 || response.status === 201) {
          const aiResponse = provider.extractResponse(response.data);
          
          if (aiResponse && aiResponse.trim().length > 0) {
            const totalTime = Date.now() - startTime;
            logger.info('AI response generated', {
              userId,
              provider: provider.name,
              responseLength: aiResponse.length,
              chunksUsed: relevantChunks.length,
              chatHistoryUsed: chatHistory ? chatHistory.length : 0,
              totalTime: `${totalTime}ms`
            });
            
            return aiResponse;
          }
        }
      } catch (error) {
        console.log(`⚠️ DEBUG: ${provider.name} failed:`, error.message);
        logger.warn(`AI provider ${provider.name} failed`, {
          userId,
          error: error.message
        });
        continue;
      }
    }

    // Если все API недоступны, используем фолбэк
    console.log('🔄 DEBUG: All AI providers failed, using fallback');
    logger.warn('All AI providers failed, using fallback', { userId });
    return getFallbackResponse(userMessage, relevantChunks.length);

  } catch (error) {
    const totalTime = Date.now() - startTime;
    console.error('💥 DEBUG: AI generation error:', error);
    logger.error('AI generation failed', { 
      userId, 
      error: error.message,
      totalTime: `${totalTime}ms`
    });
    return "Извините, в настоящее время сервис временно недоступен. Пожалуйста, попробуйте позже или обратитесь к администратору.";
  }
}

// Get specific chat
router.get('/:chatId', auth, async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      userId: req.user._id
    });

    if (!chat) {
      logger.warn('Chat not found', { userId: req.user._id, chatId: req.params.chatId });
      return res.status(404).json({ message: 'Чат не найден' });
    }

    res.json(chat);
  } catch (error) {
    logger.error('Failed to retrieve chat', { 
      userId: req.user._id, 
      chatId: req.params.chatId,
      error: error.message 
    });
    res.status(500).json({ message: 'Ошибка при получении чата' });
  }
});

// Delete chat
router.delete('/:chatId', auth, async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.chatId,
      userId: req.user._id
    });

    if (!chat) {
      return res.status(404).json({ message: 'Чат не найден' });
    }

    logger.info('Chat deleted', { userId: req.user._id, chatId: req.params.chatId });
    res.json({ message: 'Чат удален' });
  } catch (error) {
    logger.error('Failed to delete chat', {
      userId: req.user._id,
      chatId: req.params.chatId,
      error: error.message
    });
    res.status(500).json({ message: 'Ошибка при удалении чата' });
  }
});

// Create new chat
router.post('/new', auth, async (req, res) => {
  try {
    const chat = new Chat({
      userId: req.user._id,
      title: 'Новый чат',
      messages: []
    });

    await chat.save();
    
    logger.info('New chat created', { userId: req.user._id, chatId: chat._id });
    res.json(chat);
  } catch (error) {
    logger.error('Failed to create chat', { userId: req.user._id, error: error.message });
    res.status(500).json({ message: 'Ошибка при создании чата' });
  }
});

// Get all chats for user
router.get('/', auth, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id })
      .select('title createdAt updatedAt')
      .sort({ updatedAt: -1 });
    
    logger.debug('Chats retrieved', { userId: req.user._id, count: chats.length });
    res.json(chats);
  } catch (error) {
    logger.error('Failed to retrieve chats', { userId: req.user._id, error: error.message });
    res.status(500).json({ message: 'Ошибка при получении чатов' });
  }
});

// Send message - ОБНОВЛЕННАЯ ВЕРСИЯ с передачей истории
router.post('/:chatId/message', auth, async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { message } = req.body;
    
    let chat = await Chat.findOne({
      _id: req.params.chatId,
      userId: req.user._id
    });

    if (!chat) {
      return res.status(404).json({ message: 'Чат не найден' });
    }

    // 🔴 ПРОБЛЕМА БЫЛА: ИИ не видел историю
    // 🟢 РЕШЕНИЕ: передаем ВСЮ историю чата в generateAIResponse
    const aiResponse = await generateAIResponse(
      message, 
      req.user._id, 
      chat.messages // Передаем все предыдущие сообщения
    );

    // Добавляем сообщение пользователя
    chat.messages.push({
      role: 'user',
      content: message
    });

    // Добавляем ответ ИИ
    chat.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    // Обновляем заголовок если это первое сообщение
    if (chat.messages.length === 2) {
      chat.title = message.substring(0, 50) + (message.length > 50 ? '...' : '');
    }

    chat.updatedAt = new Date();
    await chat.save();

    const totalTime = Date.now() - startTime;
    logger.info('Message processed', {
      userId: req.user._id,
      chatId: chat._id,
      messageLength: message.length,
      responseLength: aiResponse.length,
      totalMessages: chat.messages.length,
      totalTime: `${totalTime}ms`
    });

    res.json({
      userMessage: message,
      aiResponse: aiResponse,
      chat: chat
    });
  } catch (error) {
    const totalTime = Date.now() - startTime;
    logger.error('Failed to send message', {
      userId: req.user._id,
      chatId: req.params.chatId,
      error: error.message,
      totalTime: `${totalTime}ms`
    });
    res.status(500).json({ message: 'Ошибка при отправке сообщения' });
  }
});

export default router;