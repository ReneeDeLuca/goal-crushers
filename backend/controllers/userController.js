import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import cloudinary from '../middleware/cloudinary.js'
import express from "express";

const router = express.Router()

// @desc    Get all users for API
// @route   GET /api/users
//linked to userApiSlice -> getAllUsers
const getAllUsers = asyncHandler(async (req, res) => {
  try{
    const users = await User.find({}).lean();
    res.json(users);
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
});

// @desc Get user profile
// route GET /user/:id
// link to userApiSlice -> getUserById
const getUser = asyncHandler( async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId.slice(1)).lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (err) {
    console.log(err);
  }
});


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

//@desc follow user
// @route PUT /user/follow/:id
// link to userApiSlice -> followUser

const followUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.body.userId;
    const followId = req.body.followId;
    const followName = req.body.followName;
    const user = await User.findById(userId);
    const followed = user.favorites.addToSet(followId);
    await user.save();

    res.status(200).json({message: `${followName} followed!`})
    console.log(`${followName} followed!`);

  } catch (err) {
    console.log(err);
  }
})

//@desc unfollow user
// @route PUT /user/unfollow/:id
// link to userApiSlice -> unfollowUser

const unfollowUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.body.userId;
    const followId = req.body.followId;
    const followName = req.body.followName;
    const user = await User.findById(userId);
    const unfollowed = user.favorites.remove(followId);
    await user.save();

    res.status(200).json({message: `${followName} unfollowed!`})
    console.log(`${followName} unfollowed!`);

  } catch (err) {
    console.log(err);
  }
})


// @desc    Delete user
// @route   DELETE user/:id
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId.slice(1)).lean()

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(goal.cloudinaryId);
      await User.deleteOne({ _id: userId.slice(1)})
      res.json({ message: 'User Deleted' })
      console.log("User Deleted");
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

export{ getAllUsers,
    updateUserProfile,
    getUserLoginEdit,
    updateUserLogin,
    getUser,
    followUser,
    unfollowUser,
    deleteUser
}