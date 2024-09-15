const express = require("express");
const router = express.Router();
const { getVacancies, createVacancy } = require("../controllers/vacancyController");

router.get("/", getVacancies);
router.post("/", createVacancy);

module.exports = router;