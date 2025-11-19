// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import authRoutes from './routes/auth.js';
// import chatRoutes from './routes/chat.js';
// import documentRoutes from './routes/documents.js';

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.static('uploads'));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/chat', chatRoutes);
// app.use('/api/documents', documentRoutes);

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import documentRoutes from './routes/documents.js';
import { requestLogger, errorLogger } from './middleware/logger.js';

// Импортируем usersRoutes как ES module
import usersRoutes from './routes/users.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Логирование всех запросов
app.use(requestLogger);

// Routes - используем ES modules импорты
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/users', usersRoutes); // Используем импортированный модуль

// Логирование ошибок (должен быть последним)
app.use(errorLogger);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});