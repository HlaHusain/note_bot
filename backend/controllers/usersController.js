const userModel = require('../model/userModel')
//middleware

const users = [
    {
      email: "hla@gmail.com",
      password: "323!!FGLLWW!",
      user_name: "Hla",
      study_field: "Computer Engineering",
    },
    {
      email: "test@gmail.com",
      password: "323!!FGLLWW!",
      user_name: "Hla",
      study_field: "Computer Engineering ISE",
    },
    {
      email: "test2@gmail.com",
      password: "323!!FGLLWW!",
      user_name: "Hla",
      study_field: "Master of Computer Engineering",
    },
  ];

  
const getUsers =(req,res,next) =>{
    res.json({users})
}

const signup async =(req,res,next) =>{
    const {user_name , email, password,study_field} = req.body;

const createUser ={
    is :uuid(),
    user_name,
    email,
    password
}
await userModel.insertMany(createUser)

}

const login =(req,res,next) =>{
    const {email,password} = req.body
}

exports.login=login
exports.signup=signup
exports.getUsers=getUsers