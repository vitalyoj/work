const User = require('../models/user');
const bcrypt = require('bcrypt');

// Регистрация
exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const user = new User({ username, email, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Логин
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Найти пользователя
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Проверить пароль
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Вернуть данные о пользователе
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};