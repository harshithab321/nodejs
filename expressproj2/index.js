require("dotenv").config();
const express = require('express');
// const formidable = require('express-formidable');
const cors = require('cors'); // Add this line for CORS
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
const crypto = require('crypto');
const sendEmail = require('./emailsend');
require('./config/database').connect();

const Token = require('./model/tokenschema');
// const { resetPasswordRequestController, resetPasswordController } = require('./controllers/controlauth');
const verifyToken = require('./middleware/authentication');
const app = express();
const PORT = process.env.PORT || 8080; // Use process.env.PORT if available, otherwise use 8080

// const registraion = require('./model/registration');
// const login = require('./model/login');
// const products = require('./model/products');
// const forgot_password = require('./model/forgot_password');
// const tokens = require('./model/tokenschema');
const passwordReset = require("./routers/routerss");
// Import your router
const authRoutes = require('./routers/routerss');
const loginin=require('./sevice/login')
app.use(cors()); // Enable CORS
app.use(express.json());
// const loginuser=require('./sevice/login')
const product=require('./routers/productrouter')

// API routes
// app.use("/api", authRoutes);
app.use("/api/login",loginin)
app.use("/api/password-reset", passwordReset);
app.use("/products",product)

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});


