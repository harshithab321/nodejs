const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  products:{
    type: String,
    required: true,
  }
});

const Customer = mongoose.model('Customer', sellerSchema);

module.exports = Customer;
