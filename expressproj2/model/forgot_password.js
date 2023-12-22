const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const forgotSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    
    ref: "registraion",
  },
  email: {
    type: String,
    required: true,
  
  },
  password: {
    type: String,
    required: true,
    
  },
  token: {
    type: String,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600000,// this is the expiry time in seconds
  },
});
module.exports = mongoose.model("forgot", forgotSchema);
