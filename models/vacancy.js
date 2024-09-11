const mongoose = require("mongoose");

const vacancySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  requirements: { type: [String] },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: "Employer" },
  postedAt: { type: Date, default: Date.now },
  status: { type: String, default: "open" },
});

module.exports = mongoose.model("Vacancy", vacancySchema);