// const JWT = require("jsonwebtoken");
// const User = require("../model/registration");

// const sendEmail = require("../emailsend");
// const crypto = require("crypto");
// const bcrypt = require("bcrypt");
// const tokens=require('../model/tokenschema');
// const users= require("../model/user");
// const registraion = require("../model/registration");
// const forgot_password = require("../model/forgot_password");

// const clientURL=process.env.CLIENT_URL



// const resetPasswordHandler = async (req, res) => {
//   try {
//     const schema = Joi.object({ password: Joi.string().required() });
//     const { error } = schema.validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const user = await User.findById(req.params.userId);
//     if (!user) return res.status(400).send("invalid link or expired");

//     const token = await Token.findOne({
//       userId: user._id,
//       token: req.params.token,
//     });
//     if (!token) return res.status(400).send("Invalid link or expired");

//     user.password = req.body.password;
//     await user.save();
//     await token.delete();

//     res.send("Password reset successfully.");
//   } catch (error) {
//     res.status(500).send("An error occurred");
//     console.error(error);
//   }
// };

//   // const email = 'harshitha.b225@gmail.com';
// //  const requestPasswordReset = async (email,req, res,password) => {
 
// //   // console.log(req.body)
// //     try {
        
// //         let user = await registraion.findOne(email)
// //           console.log(user)
// //         if (user && (await bcrypt.compare(password, user.password)))
// //         {
          
// //             let enc_password=await bcrypt.hash(password,10)

// //             let user=await forgot_password.create({
                
             
// //                 email:email,
// //                 password:enc_password,

// //            })
//             // let token = JWT.sign({ user_id:user._id, email},
//             //     process.env.TOKEN,
//             //      { expiresIn: "5h" });

                 
//             // user.token = token
//             // await user.save();
           
// //         }


// //         const token = await registraion.findOne({ userId: user._id });
// //         console.log('User ID:', user._id);
// //         console.log('Token:', token);
// //         if (token) {
// //           await token.deleteOne();
// //         }
    
// //         let resetToken = crypto.randomBytes(32).toString('hex');
// //         const hash = await bcrypt.hash(resetToken, Number(bcrypt));
    
// //         await new  tokens({
// //           userId: user._id,
// //           token: hash,
// //           createdAt: Date.now(),
// //         }).save();
    
// //         const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
// //         await sendEmail(
// //           user.email,
// //           'Password Reset Request',
// //           { name: user.name, link: link },
// //           './template/requestResetPassword.handlebars'
// //         );
  
// //         res.status(200).json({ message: 'Password reset link sent successfully.' });
// //       } catch (error) {
// //         console.error('Error sending email:', error);
      
// //         res.status(500).json({ error: 'Internal server error. Unable to send password reset email.' });
// //       }
// //     }
  
//     const requestPasswordReset = async (email) => {

//       const user = await User.findOne( email )
//     console.log(!user)
//       if (!user) throw new Error("User does not exist");

//       let Token = JWT.sign({ user_id:user._id, email},
//         process.env.TOKEN,
//          { expiresIn: "5h" });

//        console.log(user)  
//     user.token = Token
//     await user.save();

//       let token = await registraion.findOne({ userId: user._id });
//       console.log(User)
//       if (token) await token.deleteOne();
//       let resetToken = crypto.randomBytes(32).toString("hex");
//       const hash = await bcrypt.hash(resetToken, Number(bcrypt));
    
//       await new tokens({
//         userId: user._id,
//         token: hash,
//         createdAt: Date.now(),
//       }).save();
    
//       const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
      
//       sendEmail(
//         user.email,
//         "Password Reset Request",
//         {
//           name: user.firstName,
//           link: link,
//         },
//         "./template/requestResetPassword.handlebars"
//       );
      
      
      
//       return link;
//     };

// module.exports={resetPasswordHandler,requestPasswordReset}