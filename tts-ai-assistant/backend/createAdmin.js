import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Проверяем нет ли уже администратора
    const existingAdmin = await User.findOne({ email: 'admin@ttc.com' });
    if (existingAdmin) {
      console.log('Администратор уже существует');
      process.exit(0);
    }

    // Создаем администратора
    const admin = new User({
      fullName: 'Администратор ТТС',
      email: 'admin@ttc.com',
      password: 'admin123', // Смените этот пароль!
      role: 'admin',
      company: 'ТрансТелеком'
    });

    await admin.save();
    console.log('Администратор создан:');
    console.log('Email: admin@ttc.com');
    console.log('Пароль: admin123');
    console.log('⚠️ Смените пароль после первого входа!');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();