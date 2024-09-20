const Employer = require("../models/employer");

exports.getEmployers = async (req, res) => {
  try {
    const employers = await Employer.find();
    res.json(employers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createEmployer = async (req, res) => {
  const { companyName, contactPerson, email, phone } = req.body;
  try {
    const newEmployer = new Employer({ companyName, contactPerson, email, phone });
    await newEmployer.save();
    res.status(201).json(newEmployer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};