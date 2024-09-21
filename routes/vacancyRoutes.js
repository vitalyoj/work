const express = require('express');
const router = express.Router();
const Vacancy = require('../models/vacancy');
const Category = require('../models/Category');

// Получить все вакансии
router.get('/', async (req, res) => {
  try {
    const vacancies = await Vacancy.find();
    res.json(vacancies);
  } catch (err) {
    console.error('Ошибка при получении вакансий:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Маршрут для поиска вакансий по названию
router.get('/search', async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ message: 'Title parameter is required.' });
    }

    const vacancies = await Vacancy.find({ title: { $regex: title, $options: 'i' } });
    
    res.json(vacancies);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при поиске вакансий.' });
  }
});


// Добавить новую вакансию
router.post('/', async (req, res) => {
  const { title, description, requirements } = req.body;

  if (!title || !description || !requirements ) {
    return res.status(400).json({ message: 'Все поля обязательны.' });
  }

  const newVacancy = new Vacancy({
    title,
    description,
    requirements,
    //locationId, 
   // categoryId, 
    //employerId, 
  });
  try {
    const savedVacancy = await newVacancy.save();
    res.status(201).json(savedVacancy);
  } catch (err) {
    console.error('Ошибка при добавлении вакансии:', err.message);
    res.status(400).json({ message: 'Ошибка при добавлении вакансии', error: err.message });
  }
});

// Удалить вакансию 
router.delete('/:id', async (req, res) => {
  try {
    await Vacancy.findByIdAndDelete(req.params.id);
    res.status(204).send(); 
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при удалении вакансии' });
  }
});

module.exports = router;