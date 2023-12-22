
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
 quantity: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
