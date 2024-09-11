const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resume: { type: String },
  skills: { type: [String] },
});

module.exports = mongoose.model("Student", studentSchema);