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

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


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
