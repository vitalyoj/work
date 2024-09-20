const Vacancy = require("../models/vacancy");

// Получить все вакансии
const getVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find();
    res.json(vacancies);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении вакансий' });
  }
};

// Создать новую вакансию
const createVacancy = async (req, res) => {
  const { title, description, requirements } = req.body;
  try {
    const vacancy = new Vacancy({ title, description, requirements });
    await vacancy.save();
    res.status(201).json(vacancy);
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при создании вакансии' });
  }
};

module.exports = { getVacancies, createVacancy };