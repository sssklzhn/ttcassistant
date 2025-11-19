import User from '../models/User.js';

const adminAuth = async (req, res, next) => {
  try {
    // Проверяем что пользователь авторизован
    if (!req.user) {
      return res.status(401).json({ message: 'Необходима авторизация' });
    }

    // Проверяем что пользователь - администратор
    const user = await User.findById(req.user._id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещен. Требуются права администратора' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export default adminAuth;