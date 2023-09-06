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
  })

// @desc    Process add form
// @route   POST /comment
// link to commentApiSlice -> addComment
const addComment = asyncHandler( async (req, res) => {
    try {
      req.body.user = req.user.id
      const data = await Comment.create(req.body)
      res.json({ data })
    } catch (err) {
      console.error(err)
      res.render('error/500')
    }
  })

// @desc    Delete comment
// @route   DELETE /comment/:id
// link to commentApiSlice -> deleteComment
const deleteComment = asyncHandler(async (req, res) => {
    try {
      const commentId = req.body.id;
      let comment = await Comment.findById(commentId.slice(1)).lean()
      
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' })
      }
        await Comment.deleteOne({ _id: commentId.slice(1) })
        res.json({message: "Comment Deleted"})
        console.log("Comment Deleted");
        
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })

  export { getAllComments, addComment, deleteComment }