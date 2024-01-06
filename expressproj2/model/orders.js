const mongoose=require('mongoose')
;l
const Joi=require('joi')
const Schema=mongoose.Schema

const orderSchema=new Schema({
  
     userId:{
      type:String,
      ref:'User',
      required:true,
      unique: true,
     },
     productId:[{
     type:String,
     ref: 'Product',
     required:true
     }],
     quantity:{
      type:Number,
      required:true
     },
     DateOfManufacturing:{
      type:Date,
      default:Date.now
     },
     
   
     address:{
      type:String,
      ref :"Address"
     }
})

const Order=mongoose.model("Order",orderSchema)

const validate = (order) => {
  const schema = Joi.object({
 
    userId: Joi.string().required(),
    productId: Joi.array().items(Joi.string()).required(),
    quantity: Joi.number().required(),
    DateOfManufacturing: Joi.date().required(),
  
    address:Joi.string().required(),
  });

  return schema.validate(order);
};

module.exports = { Order, validate };