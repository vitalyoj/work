const mongoose = require('mongoose');

const VacancySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: [String], required: true },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true }, // Добавлено поле
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Добавлено поле
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true }, // Добавлено поле
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vacancy', VacancySchema);