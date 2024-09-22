const express = require('express');
const Application = require('../models/ApplicationModel'); 
const Vacancy = require('../models/vacancy'); 
const router = express.Router();

// Подача заявки на вакансию
router.post('/', async (req, res) => {
  try {
    const { studentName, studentEmail, vacancyId, resume, coverLetter } = req.body;

    if (!studentName || !studentEmail || !vacancyId || !resume) {
      return res.status(400).json({ message: 'Все обязательные поля должны быть заполнены.' });
    }

    // Проверяем существование вакансии
    const vacancy = await Vacancy.findById(vacancyId);
    if (!vacancy) {
      return res.status(404).json({ message: 'Вакансия не найдена.' });
    }

    // Создаем заявку
    const application = new Application({
      studentName,
      studentEmail,
      vacancyId,
      resume,
      coverLetter,
    });

    await application.save();

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при подаче заявки.' });
  }
});

// Получение всех заявок для вакансии
router.get('/:vacancyId', async (req, res) => {
  try {
    const { vacancyId } = req.params;
    
    const applications = await Application.find({ vacancyId }).populate('vacancyId');
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении заявок.' });
  }
});

module.exports = router;