const mongoose = require('mongoose');
const Joi = require("joi");
// Define the product schema
const News = new mongoose.Schema({
 _id:{
    type: String,
    required: true,
 },
 name: {
    type: String,
    required: true,
  },
  
  description: {
    type: String,
    required: true,
  },

  images: [{
    type: String,
    required: true,
  }],

  
});


const New = mongoose.model('New', News);
const productValidationSchema = Joi.object({
    _id: Joi.string().required(),
 name: Joi.string().required(),
  

  description: Joi.string().required(),
  
  imageUrl: Joi.array().items(Joi.string()).required(),
});

// Validation function
const validateNews = (product) => {
  return productValidationSchema.validate(product);
};


module.exports = {New,validateNews}
