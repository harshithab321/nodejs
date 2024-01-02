const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../model/user');
const { Login, validateLogin } = require('../model/login');


const loginUser = async (req, res) => {
  const { email, password } = req.body; 

  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email });


    console.log(user)
    if (user && (await bcrypt.compare(password, user.password))) {
      
      let enc_password = await bcrypt.hash(password, 10);
      
     
      let newUser = await Login.create({
        
        email: user.email,
        password: enc_password,
      });

    
      let token = jwt.sign(
        { user_id: newUser._id, email },
        process.env.TOKEN,
        { expiresIn: '5h' }
      );

      
      newUser.token = token;
      await newUser.save();

     
      res.json(newUser);
    } else {

      res.status(403).json('user not  present !!');
    }
  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = loginUser;
