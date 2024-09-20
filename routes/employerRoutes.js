const express = require('express');
const router = express.Router();
const Employer = require('../models/employer'); 

router.get('/', async (req, res) => {
  try {
    const employers = await Employer.find();
    res.json(employers);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка загрузки работодателей' });
  }
});

module.exports = router;