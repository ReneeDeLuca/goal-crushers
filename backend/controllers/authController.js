import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import generateToken from '../utils/generateToken.js'


// @desc Auth login
// route POST /login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  
  const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
  
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  });

// @desc Logout User
// route POST /logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0)
    })
    res.status(200).json({message: 'User logged out'})
    //res.redirect("/");
});

// @desc Register a new user
// route POST /register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  
  const { name, email, password } = req.body;
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = await User.create({
      name,
      email,
      password,
    });
  
    if (user) {
      generateToken(res, user._id);
  
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
});

export { authUser,
    registerUser,
    logoutUser,
}