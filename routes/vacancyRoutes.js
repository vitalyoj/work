const express = require('express');
const router = express.Router();
const Vacancy = require('../models/Vacancy');
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

// Добавить новую вакансию
router.post('/', async (req, res) => {
  const { title, description, requirements, locationId, categoryId, employerId } = req.body;

  if (!title || !description || !requirements || !locationId || !categoryId || !employerId) {
    return res.status(400).json({ message: 'Все поля обязательны.' });
  }

  const newVacancy = new Vacancy({
    title,
    description,
    requirements,
    locationId, 
    categoryId, 
    employerId, 
  });
  try {
    const savedVacancy = await newVacancy.save();
    res.status(201).json(savedVacancy);
  } catch (err) {
    console.error('Ошибка при добавлении вакансии:', err.message); // Вывод ошибки в консоль
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