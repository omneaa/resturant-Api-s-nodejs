const userModel = require("../Models/user");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
const jwtSecretKey = process.env.SECRET;

const Signin = async (req, res)=>{
  try { 
    const { Email, Password, Name } = req.body;
    const f = await userModel.findOne({ Email: Email });
    
    if (f !== null) {
      return res.status(400).json({ "message": "user found already" });
    }

  const hashedPassword = await bcrypt.hash(Password, 10);
  const newUser={
      Email:Email,
      Password:hashedPassword,
      Name:Name,
  }
  const result = await userModel.create(newUser);
  data = {
    id:result._id,
    Email:result.Email
};
const token = jwt.sign(data, jwtSecretKey);
  return res.status(200).json({"message":"signed up successfully","data":result,"token":token});
  }
  
  catch (err) {
    console.log(err);
     return res
       .status(500)
       .json({ message: err.message });
  }
}
const Login = async (req, res) => {
 try {
   let data;
   let result = await userModel.find(
     { Email: req.params.Email }
    //  ,
    //  { _id: 1, Password:1 }
   );
   const found = JSON.stringify(result);
   if (found === "[]") {
     return res.status(400).json({ message: "this email not found" });
   }
  //console.log(result);

   for (const [key, value] of Object.entries(result)) {
     let password = value.Password;
     let ID = value._id;
     let isPasswordValid = await bcrypt.compareSync(
       req.params.Password,
       password
     );
     if (isPasswordValid) {
       data = {
         id: result._id,
         Email: result.Email,
       };
       const token = jwt.sign(data, jwtSecretKey);
       return res
         .status(200)
         .json({ message: "ok", JWT: token, "Client data": result });
     } else {
       return res.status(400).json({ message: "the password is wrong " });
     }
   }
 } catch (e) {
  //  console.log(e);
   res.status(400).json({ error: e.error });
 }
}
module.exports = {
  Signin,Login
};
