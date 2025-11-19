// import mongoose from 'mongoose';

// const documentSchema = new mongoose.Schema({
//   filename: {
//     type: String,
//     required: true
//   },
//   originalName: {
//     type: String,
//     required: true
//   },
//   fileType: {
//     type: String,
//     enum: ['pdf', 'docx', 'doc'],
//     required: true
//   },
//   content: {
//     type: String,
//     required: true
//   },
//   uploadedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   company: {
//     type: String,
//     default: "ТрансТелеком"
//   }
// }, {
//   timestamps: true
// });

// export default mongoose.model('Document', documentSchema);
import mongoose from 'mongoose';

const chunkSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  startIndex: {
    type: Number,
    required: true
  },
  endIndex: {
    type: Number,
    required: true
  },
  page: {
    type: Number,
    default: 1
  }
});

const documentSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    enum: ['pdf', 'docx', 'doc'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  chunks: [chunkSchema], // Добавляем чанки
  metadata: {
    type: Object,
    default: {}
  },
  chunkCount: {
    type: Number,
    default: 0
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: String,
    default: "ТрансТелеком"
  }
}, {
  timestamps: true
});

// Индекс для быстрого поиска
documentSchema.index({ uploadedBy: 1, createdAt: -1 });
documentSchema.index({ 'chunks.content': 'text' });

export default mongoose.model('Document', documentSchema);