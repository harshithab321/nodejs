const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const sellerSchema = new Schema({
  _id:{
    type: String,
    required: true,
  },
   usertype: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const Seller = mongoose.model("Seller", sellerSchema);

const validate = (seller) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    usertype: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(seller);
};

module.exports = { Seller, validate };
