const mongoose = require('mongoose');

const VacancySchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  description: { type: String, required: true }, 
  requirements: { type: [String], required: true }, 
 // locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: false }, 
  //categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false }, 
  //createdAt: { type: Date, default: Date.now, required: false },
 // employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: false },
});
const Vacancy = mongoose.model('Vacancy', VacancySchema);

module.exports = Vacancy;