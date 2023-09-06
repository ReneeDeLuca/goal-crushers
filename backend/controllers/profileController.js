import Goal from "../models/Goal.js";
import User from '../models/User.js'
import Comment from '../models/Comment.js'
import asyncHandler from 'express-async-handler'
import express from "express";

const router = express.Router()

// @desc    User profile
// @route   GET api/profile/:id

const getProfile = asyncHandler( async (req, res) => {
    try {
      const profile = await User.find({
        _id: req.params.id,
        })
        .lean();
      const comments = await Comment.find(
        {goalId: req.params.id})
        .sort({ createdAt: "desc" })
        .lean();
      const goals = await Goal.find({
        user: req.params.id,
        status: 'public',
        })
        .sort({ createdAt: "desc" })
        .lean();
        
  
      res.render('profile.ejs', {
        profile: profile, 
        comments: comments,
        goals: goals,
      })
    } catch (err) {
      console.error(err)
      res.render('error/500')
    }
  })

//@desc    Follow a profile
//@route   PUT /profile/follow/:id
const followProfile = asyncHandler( async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { 
        _id: req.user.id 
      },
      {
        $push: { favorites: req.params.id }
      },
      { 
        new: true 
      }
    );
    console.log("Followed!");
    res.redirect(`/profile/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
});

//@desc    Unfollow a profile
//@route   PUT /profile/unfollow/:id
const unfollowProfile = asyncHandler( async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { 
        _id: req.user.id 
      },
      {
        $pull: { favorites: req.params.id }
      },
      { 
        new: true 
      }
    );
    console.log("Unfollowed!");
    res.redirect(`/profile/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
});

export {
  getProfile,
  followProfile,
  unfollowProfile
}
