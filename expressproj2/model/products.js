const mongoose = require('mongoose');
const Joi = require("joi");
// Define the product schema
const productSchema = new mongoose.Schema({
  _id: { type: String, required: true},
 prodname: {
    type: String,
    required: true,
  },
  userId:{
    type:String,
    ref: 'User'
  },
  prodseller:{
    type:String,
     ref: 'Seller'
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
  images: [{
    type: String,
    required: true,
  }],

  
});


const Product = mongoose.model('Product', productSchema);
const productValidationSchema = Joi.object({
 _id : Joi.string().required(),
 prodname: Joi.string().required(),
  
 userId:Joi.string().required(),
 prodseller:Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  category: Joi.string().required(),
  DateOfManufacturing: Joi.string().required(),
  imageUrl: Joi.array().items(Joi.string()).required(),
});

// Validation function
const validateProduct = (product) => {
  return productValidationSchema.validate(product);
};


module.exports = {Product,validateProduct}
