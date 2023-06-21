const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
//JSON Web Tokens (JWTs) are the most common way of implementing authentication in Single-Page-Applications.
const jwt = require("jsonwebtoken");

const users = [
  {
    email: "hla@gmail.com",
    password: "323!!FGLLWW!",
    user_name: "Hla",
    study_field: "Computer Engineering",
    notes: [],
  },
  {
    email: "test@gmail.com",
    password: "323!!FGLLWW!",
    user_name: "Hla",
    study_field: "Computer Engineering ISE",
    notes: [],
  },
  {
    email: "test2@gmail.com",
    password: "323!!FGLLWW!",
    user_name: "Hla",
    study_field: "Master of Computer Engineering",
    notes: [],
  },
];

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password"); //exclude password :)
    res.json({ users });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Fetching users failed , please try again later ." });
  }
  res.json({ users: users.map(user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const { user_name, email, password, study_field } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Signup failed , please try later" });
  }

  if(existingUser.email) {
    return res
      .status(422) //422 is for invalid input
      .json({ message: "User exists alreay , please login instead " });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Could not create user , please try again" });
  }

  const createdUser = new User({
    user_name,
    email,
    password: hashedPassword,
    study_field,
  });

  try {
    await createdUser.save();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Signup failed ! , please try again " });
  }

  //create string token with userId , email with privatekey and experation time
  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "dont share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Signup failed ! , please try again " });
  }

  res
    .status(201) //201 is for created
    .json({ user: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Logging in failed , Please try again later" });
  }

  if (!existingUser) {
    return res
      .status(500)
      .json({ message: "Invalid Credentials , could not log you in ." });
  }

  let isVaildPassword = false;
  try {
    isVaildPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return res
      .status(500)
      .json({
        message: "Could not log you in  , Please check your credentials",
      });
  }

  if (!isVaildPassword) {
    return res
      .status(401) //401 is for unauthorized
      .json({ message: "Invalid credentials  , Could not log you in " });
  }

  //create string token with userId , email with privatekey and experation time
  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "dont share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Logging in failed ! , please try again " });
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

exports.login = login;
exports.signup = signup;
exports.getUsers = getUsers;
