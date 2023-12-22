const mongoose = require('mongoose');
const Joi = require("joi");
// Define the product schema
const productSchema = new mongoose.Schema({
 productId:{
  type:String,
  required:true
 },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity:{
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  DateOfManufacturing: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
   
  },

  
});


const Product = mongoose.model('Product', productSchema);
const productValidationSchema = Joi.object({
  productId: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  category: Joi.string().required(),
  DateOfManufacturing: Joi.string().required(),
  imageUrl: Joi.string().required(),
});

// Validation function
const validateProduct = (product) => {
  return productValidationSchema.validate(product);
};


module.exports = {Product,validateProduct}
