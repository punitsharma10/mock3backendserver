const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authController = require('./controllers/authController');
const employeeController = require('./controllers/employeeController');
const authMiddleware = require('./utils/auth');
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

mongoose

 .connect(

  `mongodb+srv://ppcommercial31:punit12@cluster0.ogkgxal.mongodb.net/mernstack?retryWrites=true&w=majority&appName=AtlasApp`,

  { useNewUrlParser: true, useUnifiedTopology: true }

 )

 .then(() => {

  console.log("Connected");

 })

 .catch((error) => {

  console.error("Error: ", error);

 });

app.post('/signup', authController.signup);
app.post('/login', authController.login);
app.post('/emp/create', authMiddleware, employeeController.createEmp);
app.get('/employees', authMiddleware, employeeController.getEmp);
app.put('/emp/edit/:employeeId', authMiddleware, employeeController.editEmp);
app.delete('/emp/delete/:employeeId', authMiddleware, employeeController.deleteEmp);



const PORT = process.env.PORT || 8080;

app.listen(PORT);

