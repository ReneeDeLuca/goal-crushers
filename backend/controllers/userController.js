import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import cloudinary from '../middleware/cloudinary.js'
import express from "express";

const router = express.Router()

// @desc    Get all users for API
// @route   GET /api/users
const getAllUsers = asyncHandler(async (req, res) => {
  try{
    const users = await User.find({}).lean();
    res.json(users);
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
});

// @desc Get user profile edit page
// route GET /user/profileEdit/:id
// @access Private
const getUserProfileEdit = asyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({
        _id: req.user._id,
      })
  
      if (!user) {
        res.status(404);
        throw new Error('User not found');
      }
  
      if (user.id != req.user._id) {
        res.status(500);
        throw new Error('User not authorized');
      } else {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          aboutMe: user.aboutMe,
        })
      }
    } catch (err) {
      res.status(err.status || 500);
      throw new Error(err.message || 'Server Error');
    }
  })

// @desc update user profile
// route PUT /user/profile/:id
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if(user){
      if(!user.image){
        // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      //media is stored on cloudainary - the above request responds with url to media and the media id that you will need when deleting content
      user.image = result.secure_url,
      user.cloudinaryId = result.public_id
      } else if (user.image) { 
        // Delete image from cloudinary
      await cloudinary.uploader.destroy(goal.cloudinaryId);
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      user.image = result.secure_url,
      user.cloudinaryId = result.public_id
      }
      user.updatedAt = Date.now();
      user.aboutMe = req.body.aboutMe || user.aboutMe;

      const updatedUser = await user.save();
      res.status(200).json({
          _id: updatedUser._id,
          name: updatedUser.name,
      })
  }else{
      res.status(404);
      throw new Error('User not found');
  }
  res.status(200).json({message: 'Updated User Profile'})
});


// @desc Get user login edit page
// route GET /user/loginEdit/:id
// @access Private
const getUserLoginEdit = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.user._id,
    })

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (user.id != req.user._id) {
      res.status(500);
      throw new Error('User not authorized');
    } else {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      })
    }
  } catch (err) {
    res.status(err.status || 500);
    throw new Error(err.message || 'Server Error');
  }
})

// @desc update user login
// route POST w/ method override PUT /user/login/:id
// @access Private
const updateUserLogin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        })
    }else{
        res.status(404);
        throw new Error('User not found');
    }
    res.status(200).json({message: 'Update User Login'})
});

// @desc Get user profile
// route GET /user/:id
const getUserDashboard = asyncHandler( async (req, res) => {
  try {
    //id parameter comes from the user routes
    //router.get("/:id", protect, getUserProfile);
    //example: http://localhost:2121/user/631a7f59a3e56acfc7da286f
    //id === 631a7f59a3e56acfc7da286f
    const user = await User.findById(req.params.id);
    res.render("profile.ejs", { user: user });
  } catch (err) {
    console.log(err);
  }
});

// @desc    Delete user
// @route   DELETE user/:id
const deleteUser = asyncHandler(async (req, res) => {
  try {
    let user = await User.findById(req.params.id).lean()

    if (!user) {
      return res.render('error/404')
    }

    if (user.id != req.user.id) {
      res.redirect('/dashboard')
    } else {
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(goal.cloudinaryId);
      await User.remove({ _id: req.params.id })
      res.redirect('/')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

export{ getAllUsers,
    getUserProfileEdit,
    updateUserProfile,
    getUserLoginEdit,
    updateUserLogin,
    getUserDashboard,
    deleteUser
}