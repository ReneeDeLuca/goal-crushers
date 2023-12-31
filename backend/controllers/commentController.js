import Comment from "../models/Comment.js";
import asyncHandler from 'express-async-handler'
import express from "express";

const router = express.Router()

//@desc  get all comments to load to api
//@route GET /comment
// link to commentApiSlice -> getAllcomments
const getAllComments = asyncHandler(async (req, res) => {
    try {
      const comments = await Comment.find({}).lean()
      res.json(comments)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server Error' })
    }
  });

// @desc    get comment by id
// @route   GET /comment/:id
// link to commentApiSlice -> getCommentById
const getComment = asyncHandler( async (req, res) => {
    try {
      const commentId = req.params.id;
      const comment = await Comment.findById(commentId.slice(1)).lean();
      res.json(comment)
    } catch (err) {
      console.error(err)
    }
  });

// @desc    Process add form
// @route   POST /comment
// link to commentApiSlice -> addComment
const addComment = asyncHandler( async (req, res) => {
    try {
      const commentUser = req.body.commentUser
      const goalId = req.body.goalId
      const text = req.body.text
      const goalUser = req.body.goalUser
      const data = await Comment.create({commentUser, goalUser, goalId, text})
      res.json({ data })
    } catch (err) {
      console.error(err)
      res.render('error/500')
    }
  });

// @desc    Like comment
// @route   PUT /comment/:id
// link to commentApiSlice -> addLike

const addLike = asyncHandler(async (req, res) => {
    try {
      const commentId = req.body.commentId;
      console.log(commentId);
      const comment = await Comment.findByIdAndUpdate(commentId)
      comment.likes += 1;
      await comment.save();
      res.json({message: "Comment Liked"})
      console.log("Comment Liked");
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  });

// @desc    Delete comment
// @route   DELETE /comment/:id
// link to commentApiSlice -> deleteComment
const deleteComment = asyncHandler(async (req, res) => {
    try {
      const commentId = req.body.commentId;
      let comment = await Comment.findById(commentId)
      
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' })
      }
        await Comment.deleteOne({ _id: commentId })
        res.json({message: "Comment Deleted"})
        console.log("Comment Deleted");
        
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  });

  export { getAllComments, getComment, addComment, addLike, deleteComment }