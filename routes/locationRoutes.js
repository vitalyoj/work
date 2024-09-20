const express = require('express');
const router = express.Router();
const Location = require('../models/location'); // Модель местоположений

router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка загрузки местоположений' });
  }
});

module.exports = router;