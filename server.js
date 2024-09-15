const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const studentRoutes = require("./routes/students");
const employerRoutes = require("./routes/employers");
const vacancyRoutes = require("./routes/vacancies");

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/students", studentRoutes);
app.use("/api/employers", employerRoutes);
app.use("/api/vacancies", vacancyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});