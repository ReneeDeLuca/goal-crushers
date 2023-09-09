import Status from '../models/Status.js'
import asyncHandler from 'express-async-handler'
import express from "express";

const router = express.Router()

//@desc  get all status to load to api
//@route GET /status
// link to statusApiSlice -> getAllStatus
const getAllStatus = asyncHandler(async (req, res) => {
    try {
        const statuses = await Status.find({}).lean()
        res.json(statuses)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
    })

// @desc  add status
// @route POST /status
// link to statusApiSlice -> addStatus
const addStatus = asyncHandler(async (req, res) => {
    try {
        req.body.user = req.user.id
        const data = await Status.create(req.body)
        res.json({ data })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

export { getAllStatus, addStatus }
