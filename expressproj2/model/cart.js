const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const cartItemSchema = new Schema({
  productId: {
    type: String,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const cartSchema = new Schema({
  userId: {
    type:String,
    ref: 'User',
    required: true,
  },
  items: [cartItemSchema],
  totalQuantity: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  
});

const Cart = mongoose.model('Cart', cartSchema);
// Validate product existence
const validateCartItem = (cartItem) => {
  const schema = Joi.object({
    userId: Joi.string().min(1).required(),
    items: Joi.array().items(
      Joi.object({
        productId: Joi.string().required(),  // Validate product ID existence here
        quantity: Joi.number().min(1).required(),
      })
    ).required(),
  });

  return schema.validate(cartItem);
};


module.exports = { Cart, validateCartItem };
