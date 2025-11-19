// import express from 'express';
// import multer from 'multer';
// import pdfParse from 'pdf-parse';
// import mammoth from 'mammoth';
// import fs from 'fs';
// import path from 'path';
// import Document from '../models/Document.js';
// import auth from '../middleware/auth.js';
// import adminAuth from '../middleware/adminAuth.js'; // Добавляем импорт

// const router = express.Router();

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadDir = 'uploads/documents';
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   fileFilter: function (req, file, cb) {
//     const allowedTypes = ['.pdf', '.docx', '.doc'];
//     const fileExt = path.extname(file.originalname).toLowerCase();
//     if (allowedTypes.includes(fileExt)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Разрешены только файлы PDF, DOC и DOCX'));
//     }
//   },
//   limits: {
//     fileSize: 10 * 1024 * 1024 // 10MB limit
//   }
// });
// // Upload document - ТОЛЬКО для администраторов
// router.post('/upload', auth, adminAuth, upload.single('document'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'Файл не загружен' });
//     }

//     let content = '';
//     const fileExt = path.extname(req.file.originalname).toLowerCase();

//     if (fileExt === '.pdf') {
//       const data = await pdfParse(fs.readFileSync(req.file.path));
//       content = data.text;
//     } else if (fileExt === '.docx' || fileExt === '.doc') {
//       const result = await mammoth.extractRawText({ path: req.file.path });
//       content = result.value;
//     }

//     const document = new Document({
//       filename: req.file.filename,
//       originalName: req.file.originalname,
//       fileType: fileExt.replace('.', ''),
//       content: content,
//       uploadedBy: req.user._id
//     });

//     await document.save();

//     // Clean up file after processing
//     fs.unlinkSync(req.file.path);

//     res.json({ 
//       message: 'Документ успешно загружен', 
//       document: {
//         id: document._id,
//         originalName: document.originalName,
//         fileType: document.fileType
//       }
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ message: 'Ошибка при обработке документа' });
//   }
// });

// // Get all documents - доступно всем авторизованным пользователям
// router.get('/', auth, async (req, res) => {
//   try {
//     const documents = await Document.find()
//       .sort({ createdAt: -1 })
//       .select('originalName fileType createdAt uploadedBy')
//       .populate('uploadedBy', 'fullName email');
    
//     res.json(documents);
//   } catch (error) {
//     res.status(500).json({ message: 'Ошибка при получении документов' });
//   }
// });

// // Delete document - ТОЛЬКО для администраторов
// router.delete('/:id', auth, adminAuth, async (req, res) => {
//   try {
//     const document = await Document.findById(req.params.id);
    
//     if (!document) {
//       return res.status(404).json({ message: 'Документ не найден' });
//     }

//     await Document.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Документ удален' });
//   } catch (error) {
//     res.status(500).json({ message: 'Ошибка при удалении документа' });
//   }
// });

// export default router;

import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';
import Document from '../models/Document.js';
import auth from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';
import logger from '../middleware/logger.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/documents';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['.pdf', '.docx', '.doc'];
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(new Error('Разрешены только файлы PDF, DOC и DOCX'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Функция для чанкования текста
function chunkText(text, chunkSize = 1000, overlap = 100) {
  const chunks = [];
  let start = 0;
  
  while (start < text.length) {
    let end = start + chunkSize;
    
    // Если это не первый чанк, добавляем overlap
    if (start > 0) {
      start = Math.max(0, start - overlap);
    }
    
    // Ищем хорошее место для разрыва (конец предложения)
    if (end < text.length) {
      const sentenceEndings = ['. ', '! ', '? ', '\n\n', '\n'];
      for (const ending of sentenceEndings) {
        const pos = text.lastIndexOf(ending, end);
        if (pos > start + chunkSize * 0.7) {
          end = pos + ending.length;
          break;
        }
      }
    }
    
    const chunk = text.substring(start, end).trim();
    if (chunk.length > 0) {
      chunks.push({
        content: chunk,
        startIndex: start,
        endIndex: end
      });
    }
    
    start = end;
  }
  
  return chunks;
}

// Функция для извлечения текста из PDF с чанкованием
async function extractTextFromPDF(filePath) {
  const startTime = Date.now();
  logger.info('Starting PDF extraction', { filePath });
  
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    
    const extractionTime = Date.now() - startTime;
    logger.info('PDF text extracted', { 
      filePath, 
      textLength: pdfData.text.length,
      pages: pdfData.numpages,
      extractionTime: `${extractionTime}ms`
    });
    
    // Чанкуем текст
    const chunks = chunkText(pdfData.text, 1500, 200);
    
    logger.info('PDF text chunked', {
      filePath,
      totalChunks: chunks.length,
      averageChunkSize: Math.round(pdfData.text.length / chunks.length)
    });
    
    return {
      fullText: pdfData.text,
      chunks: chunks,
      metadata: {
        pages: pdfData.numpages,
        info: pdfData.info
      }
    };
  } catch (error) {
    logger.error('PDF extraction failed', { filePath, error: error.message });
    throw error;
  }
}

// Функция для извлечения текста из DOCX
async function extractTextFromDOCX(filePath) {
  const startTime = Date.now();
  logger.info('Starting DOCX extraction', { filePath });
  
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    const extractionTime = Date.now() - startTime;
    
    logger.info('DOCX text extracted', {
      filePath,
      textLength: result.value.length,
      extractionTime: `${extractionTime}ms`
    });
    
    // Чанкуем текст
    const chunks = chunkText(result.value, 1500, 200);
    
    return {
      fullText: result.value,
      chunks: chunks,
      metadata: {
        warnings: result.messages
      }
    };
  } catch (error) {
    logger.error('DOCX extraction failed', { filePath, error: error.message });
    throw error;
  }
}

// Upload document - ТОЛЬКО для администраторов
router.post('/upload', auth, adminAuth, upload.single('document'), async (req, res) => {
  const uploadStartTime = Date.now();
  
  try {
    if (!req.file) {
      logger.warn('Upload attempt without file', { userId: req.user._id });
      return res.status(400).json({ message: 'Файл не загружен' });
    }

    logger.info('File upload started', {
      userId: req.user._id,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      fileType: req.file.mimetype
    });

    let extractedData;
    const fileExt = path.extname(req.file.originalname).toLowerCase();

    if (fileExt === '.pdf') {
      extractedData = await extractTextFromPDF(req.file.path);
    } else if (fileExt === '.docx' || fileExt === '.doc') {
      extractedData = await extractTextFromDOCX(req.file.path);
    } else {
      throw new Error('Неподдерживаемый формат файла');
    }

    // Сохраняем документ с чанками
    const document = new Document({
      filename: req.file.filename,
      originalName: req.file.originalname,
      fileType: fileExt.replace('.', ''),
      content: extractedData.fullText,
      chunks: extractedData.chunks, // Сохраняем чанки
      metadata: extractedData.metadata,
      uploadedBy: req.user._id,
      chunkCount: extractedData.chunks.length
    });

    await document.save();

    // Clean up file after processing
    fs.unlinkSync(req.file.path);

    const totalTime = Date.now() - uploadStartTime;
    logger.info('Document uploaded successfully', {
      userId: req.user._id,
      documentId: document._id,
      fileName: req.file.originalname,
      chunkCount: extractedData.chunks.length,
      totalTime: `${totalTime}ms`
    });

    res.json({ 
      message: 'Документ успешно загружен', 
      document: {
        id: document._id,
        originalName: document.originalName,
        fileType: document.fileType,
        chunkCount: document.chunkCount,
        uploadTime: `${totalTime}ms`
      }
    });
  } catch (error) {
    const totalTime = Date.now() - uploadStartTime;
    logger.error('Document upload failed', {
      userId: req.user._id,
      fileName: req.file?.originalname,
      error: error.message,
      totalTime: `${totalTime}ms`
    });
    
    // Clean up file in case of error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ message: 'Ошибка при обработке документа: ' + error.message });
  }
});

// Get all documents
router.get('/', auth, async (req, res) => {
  try {
    const documents = await Document.find()
      .sort({ createdAt: -1 })
      .select('originalName fileType createdAt uploadedBy chunkCount')
      .populate('uploadedBy', 'fullName email');
    
    logger.debug('Documents list retrieved', { userId: req.user._id, count: documents.length });
    res.json(documents);
  } catch (error) {
    logger.error('Failed to retrieve documents', { userId: req.user._id, error: error.message });
    res.status(500).json({ message: 'Ошибка при получении документов' });
  }
});

// Get document chunks for specific document
router.get('/:id/chunks', auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id)
      .select('chunks originalName');
    
    if (!document) {
      return res.status(404).json({ message: 'Документ не найден' });
    }

    res.json({
      documentName: document.originalName,
      chunks: document.chunks,
      totalChunks: document.chunks.length
    });
  } catch (error) {
    logger.error('Failed to retrieve document chunks', { 
      userId: req.user._id, 
      documentId: req.params.id,
      error: error.message 
    });
    res.status(500).json({ message: 'Ошибка при получении чанков документа' });
  }
});

// Delete document - ТОЛЬКО для администраторов
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ message: 'Документ не найден' });
    }

    await Document.findByIdAndDelete(req.params.id);
    
    logger.info('Document deleted', {
      userId: req.user._id,
      documentId: req.params.id,
      documentName: document.originalName
    });
    
    res.json({ message: 'Документ удален' });
  } catch (error) {
    logger.error('Failed to delete document', {
      userId: req.user._id,
      documentId: req.params.id,
      error: error.message
    });
    res.status(500).json({ message: 'Ошибка при удалении документа' });
  }
});

export default router;