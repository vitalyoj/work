const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const express = require("express");

const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
dotenv.config();

const mysql = require('mysql2');

// Создание подключения с использованием Windows Authentication
const db = mysql.createConnection({
  host: 'DESKTOP-H7U8752\SQLEXPRESS', // Адрес хоста
  database: 'workplatform', // Название вашей базы данных
  socketPath: 'C:/path_to_socket/mysql.sock', // (если требуется, для локальной системы)
});

db.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к MySQL:', err);
    return;
  }
  console.log('Подключено к MySQL через Windows Authentication');
});

module.exports = db;
db.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к MySQL:', err);
    return;
  }
  console.log('Подключено к MySQL');
});

module.exports = db;


const studentRoutes = require("./routes/students");
const vacancyRoutes = require("./routes/vacancyRoutes");
const employerRoutes = require("./routes/employers");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/students", studentRoutes);
app.use("/api/employers", employerRoutes);
app.use("/api/vacancies", vacancyRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
