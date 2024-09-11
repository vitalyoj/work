const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = mongoose.model("Employer", employerSchema);