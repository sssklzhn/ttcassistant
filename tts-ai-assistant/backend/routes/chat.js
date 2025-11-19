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
    // Получаем все документы
    const documents = await Document.find();
    
    let allChunks = [];
    documents.forEach(doc => {
      doc.chunks.forEach((chunk, index) => {
        allChunks.push({
          content: chunk.content,
          documentName: doc.originalName,
          chunkIndex: index,
          documentId: doc._id
        });
      });
    });

    // Простой поиск по ключевым словам (можно улучшить с помощью векторного поиска)
    const searchTerms = userMessage.toLowerCase().split(/\s+/).filter(term => term.length > 3);
    
    const relevantChunks = allChunks.filter(chunk => {
      const chunkText = chunk.content.toLowerCase();
      return searchTerms.some(term => chunkText.includes(term));
    });

    // Если не нашли по ключевым словам, берем первые чанки из каждого документа
    const finalChunks = relevantChunks.length > 0 
      ? relevantChunks.slice(0, 5) // Берем топ-5 релевантных чанков
      : allChunks.slice(0, 3); // Или первые 3 чанка

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
    logger.error('Chunk search failed', { userId, error: error.message });
    return [];
  }
}

// AI Response Generator с учетом чанков
async function generateAIResponse(userMessage, userId) {
  const startTime = Date.now();
  
  try {
    // Ищем релевантные чанки
    const relevantChunks = await findRelevantChunks(userMessage, userId);
    
    // Собираем контекст из чанков
    const context = relevantChunks.map(chunk => 
      `[Из документа "${chunk.documentName}", часть ${chunk.chunkIndex + 1}]:\n${chunk.content}`
    ).join('\n\n');

    const prompt = `Контекст из документов компании ТрансТелеком:
${context}

Вопрос сотрудника: ${userMessage}

Ответь как AI-ассистент компании ТрансТелеком. Будь полезным, профессиональным и отвечай на русском языке.
Если в контексте нет информации для ответа, вежливо сообщи об этом.
Ответ:`;

    logger.debug('AI request prepared', {
      userId,
      contextChunks: relevantChunks.length,
      promptLength: prompt.length
    });

    // Groq API call
    const response = await axios.post(process.env.LLAMA_API_URL, {
      messages: [
        {
          role: "system",
          content: "Ты полезный AI-ассистент для сотрудников компании ТрансТелеком. Отвечай на русском языке профессионально и вежливо. Используй предоставленный контекст для точных ответов."
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
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.LLAMA_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const aiResponse = response.data.choices[0].message.content;
    const totalTime = Date.now() - startTime;

    logger.info('AI response generated', {
      userId,
      responseLength: aiResponse.length,
      chunksUsed: relevantChunks.length,
      totalTime: `${totalTime}ms`
    });

    return aiResponse;
  } catch (error) {
    const totalTime = Date.now() - startTime;
    logger.error('AI API Error', { 
      userId, 
      error: error.response?.data || error.message,
      totalTime: `${totalTime}ms`
    });
    return "Извините, в настоящее время я не могу обработать ваш запрос. Пожалуйста, попробуйте позже или обратитесь к администратору.";
  }
}

// ... остальные маршруты остаются без изменений ...

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

// Send message
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

    // Add user message
    chat.messages.push({
      role: 'user',
      content: message
    });

    // Generate AI response
    const aiResponse = await generateAIResponse(message, req.user._id);

    // Add AI response
    chat.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    // Update chat title if it's the first message
    if (chat.messages.length === 2) {
      chat.title = message.substring(0, 50) + (message.length > 50 ? '...' : '');
    }

    await chat.save();

    const totalTime = Date.now() - startTime;
    logger.info('Message processed', {
      userId: req.user._id,
      chatId: chat._id,
      messageLength: message.length,
      responseLength: aiResponse.length,
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