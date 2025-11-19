import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Пароли не совпадают' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Пароль должен быть не менее 6 символов' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    const user = new User({
      fullName,
      email,
      password
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        company: user.company,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }

    const isMatch = await user.correctPassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }

    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        company: user.company,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Get current user with full data
router.get('/me', auth, async (req, res) => {
  console.log('📋 User data from DB:', {
    id: req.user._id,
    role: req.user.role,
    email: req.user.email,
    fullName: req.user.fullName
  });
  
  res.json({
    user: {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      company: req.user.company,
      role: req.user.role,
      isActive: req.user.isActive
    }
  });
});

// Debug route to check user data
router.get('/debug', auth, async (req, res) => {
  const userFromDB = await User.findById(req.user._id);
  
  res.json({
    fromReqUser: {
      _id: req.user._id,
      role: req.user.role,
      email: req.user.email,
      fullName: req.user.fullName
    },
    fromDatabase: {
      _id: userFromDB._id,
      role: userFromDB.role,
      email: userFromDB.email,
      fullName: userFromDB.fullName
    },
    isAdmin: userFromDB.role === 'admin',
    isAdminFromReq: req.user.role === 'admin'
  });
});

export default router;