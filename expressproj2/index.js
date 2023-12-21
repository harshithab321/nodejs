require("dotenv").config()
const express = require('express')
const formidable = require('express-formidable')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
let verifyToken = require('./middleware/authentication');
const nodemailer=require('nodemailer')
const crypto=require('crypto')
const sendEmail = require("./emailsend");
require('./config/database').connect()

const Token = require("./model/tokenschema");
// const sendEmail=require('./emailsend')


const router = require("express").Router();
const {
  
    resetPasswordRequestController,
    resetPasswordController,
  } = require("./controllers/controlauth");


const app=express()
const PORT=process.env.PORT



const registraion=require('./model/registration');
const login=require('./model/login');
const products=require('./model/products');
const forgot_password = require("./model/forgot_password");
const tokens=require('./model/tokenschema')


app.post('/register',formidable(),async function(req,res){
    let{firstName,lastName,email,password}=req.fields
    // console.log(req.fields)
    // console.log(user_table)
    if(!(firstName && lastName && email && password)){
        res.status(400).send("provide all the inputs")
    }
    else{
        if(await registraion.findOne({email})){
            res.send("user already exist")
            
        }
        else{
            let enc_password=await bcrypt.hash(password,10)

            let user=await registraion.create({
                 firstName:firstName,
                 lastName:lastName,
                 email:email,
                 password:enc_password
            })
            let token=jwt.sign({user_id:user._id,email},
                process.env.TOKEN,
                {expiresIn:'5h'})
                user.token=token
                await user.save();
                res.json(user)
        }
    }
    
})


app.post('/login', formidable(), async function (req, res){
    let { firstName,email, password} = req.fields
   // console.log(req.fields)
   
    if (! (email && password)){
        res.status(400).send('Provide all the inputs')
    }
    else{
        let user = await registraion.findOne({email})

        if (user && (await bcrypt.compare(password, user.password)))
        {
            let enc_password=await bcrypt.hash(password,10)

            let user=await login.create({
               
                firstName:firstName,
                email:email,
                password:enc_password,
               
           })
            let token = jwt.sign({ user_id:user._id, email},
                process.env.TOKEN,
                 { expiresIn: "5h" });

                 
               user.token = token
            await user.save();
            res.json(user)
        }
        else{
            res.status(403).send('Incorrect username or password!!')
        }
    }
})

app.get('/profile',verifyToken,function(req,res){
    res.send('hello welcome to profile page')
})

app.use(express.json());
app.post('/forgot_password', formidable(), resetPasswordRequestController)

app.post('/passwordReset', formidable(), resetPasswordController)







app.listen(PORT, ()=> console.log(`Project is running at ${PORT} port`))

