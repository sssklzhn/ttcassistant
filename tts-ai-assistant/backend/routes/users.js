// routes/users.js
import express from 'express';
import User from '../models/User.js'; // Убедитесь, что путь правильный

const router = express.Router();

// Получить всех пользователей
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Error loading users:', error);
    res.status(500).json({ message: 'Ошибка загрузки пользователей' });
  }
});

// Изменить статус пользователя
router.patch('/:id/status', async (req, res) => {
  try {
    const { isActive } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    
    res.json({ user });
  } catch (error) {
    console.error('Error toggling user status:', error);
    res.status(500).json({ message: 'Ошибка изменения статуса' });
  }
});

// Изменить роль пользователя
router.patch('/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    
    // Валидация роли
    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ message: 'Неверная роль' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    
    res.json({ user });
  } catch (error) {
    console.error('Error changing user role:', error);
    res.status(500).json({ message: 'Ошибка изменения роли' });
  }
});

// Удалить пользователя
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    
    res.json({ message: 'Пользователь удален' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Ошибка удаления пользователя' });
  }
});

// Получить пользователя по ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ message: 'Ошибка загрузки пользователя' });
  }
});

export default router;