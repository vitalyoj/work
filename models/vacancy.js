const mongoose = require('mongoose');

const VacancySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: [String], required: true },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, 
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vacancy', VacancySchema);