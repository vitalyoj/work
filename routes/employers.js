const express = require("express");
const router = express.Router();
const { getEmployers, createEmployer } = require("../controllers/employerController");

router.get("/", getEmployers);
router.post("/", createEmployer);

module.exports = router;