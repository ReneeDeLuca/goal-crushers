import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import cloudinary from "../middleware/cloudinary.js";
import express from "express";

const router = express.Router();

// @desc    Get all users for API
// @route   GET /api/users
//linked to userApiSlice -> getAllUsers
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).lean();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc Get user profile
// route GET /user/:id
// link to userApiSlice -> getUserById
const getUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId.slice(1)).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

// @desc update user profile image
// route PUT /users/image/:id
// @access Private
const updateUserImage = asyncHandler(async (req, res) => {
  console.log(req.body);
  const userId = req.body.userId
  const imageUrl = req.body.url;
  const imageId = req.body.image;
  const user = await User.findById(userId);
  try {
    if (user) {
        //set new image
        user.image = imageUrl;
        user.cloudinaryId = imageId;
        const updatedUser = await user.save();
        res.status(200).json({
        id: updatedUser._id,
        image: updatedUser.image,
        message: "Updated User Image" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

//@ desc update user profile about me
// route PUT /users/profile/aboutMe/:id
// @access Private
const updateUserAboutMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id);
  const aboutMe = req.body.aboutMe;
  try {
    if (user) {
      user.aboutMe = aboutMe;
      const updatedUser = await user.save();
      res.status(200).json({
        id: updatedUser._id,
        aboutMe: updatedUser.aboutMe,
      });
      res.status(200).json({ message: "Updated User Profile" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


// @desc update user login
// route POST w/ method override PUT /user/login/:id
// @access Private
const updateUserLogin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({ message: "Update User Login" });
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

    res.status(200).json({ message: `${followName} followed!` });
    console.log(`${followName} followed!`);
  } catch (err) {
    console.log(err);
  }
});

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

    res.status(200).json({ message: `${followName} unfollowed!` });
    console.log(`${followName} unfollowed!`);
  } catch (err) {
    console.log(err);
  }
});

//@desc Delete user temp image
//@route POST api/users/tempimage/:${public_id}

const deleteUserImage = asyncHandler(async (req, res) => {
  try {
    const public_id = req.params.public_id;
    await cloudinary.uploader.destroy(public_id);
    res.json({ message: "Image Deleted" });
    console.log("Image Deleted");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Delete user
// @route   DELETE api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId.slice(1)).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(goal.cloudinaryId);
    await User.deleteOne({ _id: userId.slice(1) });
    res.json({ message: "User Deleted" });
    console.log("User Deleted");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

export {
  getAllUsers,
  updateUserAboutMe,
  updateUserImage,
  updateUserLogin,
  getUser,
  followUser,
  unfollowUser,
  deleteUserImage,
  deleteUser,
};
