const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Ваше подключение к базе данных

// Получение всех категорий
router.get('/', (req, res) => {
  const query = 'SELECT * FROM categories';
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка загрузки категорий', error: err });
    }
    res.json(results);
  });
});

module.exports = router;