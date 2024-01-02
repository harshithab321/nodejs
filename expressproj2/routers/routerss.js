const formidable = require("express-formidable")

const Token = require("../model/tokenschema");
const sendEmail = require("../emailsend");
const crypto = require("crypto");
const Joi = require("joi");
const router = require("express").Router();
const { User,validate} = require("../model/user");
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt hashing

// const {
    
//     resetPasswordRequestController,
//     resetPasswordController,
//   } = require("../controllers/controlauth");
  
//   const loginUser = require('../sevice/login'); 
// //   const  registerUser = require('../sevice/register');  
//  const resetPasswordHandler =require('../middleware/authservice')
 
 
// router.post('/login',loginUser);
router.post("/customertype", async (req, res) => {
    try {
        console.log("hello");
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        // Create a new user with the hashed password
        const user = new User({
            _id: req.body._id,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            // Add other fields as needed
        });

        // Save the user to the database
        const savedUser = await user.save();

        if (savedUser) {
            // User registration successful
            res.status(200).send(savedUser);
        } else {
            // User registration failed
            res.status(500).send("User registration failed");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.error(error);
    }
});





router.post("/", async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");
           console.log(Token)
        let token = await Token.findOne({ email: req.body.email  });
        
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }
          console.log(token)
        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

router.post("/:userId/:token", async (req, res) => {
    try {
        console.log("hello")
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.params.userId);
        console.log(user)
        if (!user) return res.status(400).send("invalid link or expired");
      

        const token = await Token.findOne({
          
            token: req.params.token,
        });
        console.log(token)
        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;
        await user.save();
        await token.deleteOne();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});


  module.exports = router;
  