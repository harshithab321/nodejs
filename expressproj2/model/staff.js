const mongoose = require('mongoose');
const Joi = require("joi");
const staffSchema = new mongoose.Schema({
  _id:{
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  
 
});

const Staff = mongoose.model('Staff', staffSchema);


const validate=(staff)=>{
  const schema = Joi.object({
    _id:Joi.string().required(),
    name:Joi.string().required(),
    email:Joi.string().required(),
  position:Joi.string().required(),
  });

  return schema.validate(staff);
}
module.exports = {Staff,validate}

