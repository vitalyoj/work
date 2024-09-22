const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const session = require('express-session');
const MongoStore = require('connect-mongo');

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


const studentRoutes = require("./routes/students");
const vacancyRoutes = require("./routes/vacancyRoutes");
const employerRoutes = require("./routes/employers");
const applicationRoutes = require("./routes/ApplicationRoutes");
const authRoutes = require('./routes/authRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/students", studentRoutes);
app.use("/api/employers", employerRoutes);
app.use("/api/vacancies", vacancyRoutes);
app.use("/api/applications", applicationRoutes);
app.use('/auth', authRoutes);
app.use(
  session({
    secret: 'secret_key',  // Секретный ключ 
    resave: false,              
    saveUninitialized: false,  
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/workplatform', 
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, 
    },
  })
);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
