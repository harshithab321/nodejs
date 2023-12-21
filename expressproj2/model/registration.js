const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const registerSchema = new Schema({
  
 firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
   token: {
    type: String,
   
  },
  
});
module.exports = mongoose.model("registraion", registerSchema);
