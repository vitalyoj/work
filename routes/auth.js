const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    // Сохраняем данные пользователя в сессии
    req.session.user = { id: newUser._id, name: newUser.name, role: newUser.role };

    res.status(201).json({ message: 'Регистрация успешна' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Авторизация
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Пожалуйста, введите email и пароль' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Неправильные учетные данные' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неправильные учетные данные' });
    }

    // Сохраняем данные пользователя в сессии
    req.session.user = { id: user._id, name: user.name, role: user.role };

    res.json({ message: 'Авторизация успешна' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Выход из системы
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при выходе' });
    }
    res.clearCookie('connect.sid'); // Удаляем куки сессии
    res.json({ message: 'Вы вышли из системы' });
  });
});

module.exports = router;