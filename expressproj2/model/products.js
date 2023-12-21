const mongoose = require('mongoose');


const products = new mongoose.Schema({
   item_name: { type: String, default: '' },
    decsription: { type: String, default: '' },
    item_quantity: { type: String, default: '' },
    cost: { type: String, default: '' },
    token: { type: String, default: '' }
  });  

  module.exports = mongoose.model("product", products)


  