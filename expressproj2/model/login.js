const mongoose = require('mongoose');
const Joi = require('joi');

const loginSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

const Login = mongoose.model('login', loginSchema);

const validateLogin = (login) => {
  const schema = Joi.object({
   
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    token: Joi.string(),
  });

  return schema.validate(login);
};

module.exports = { Login, validateLogin };
