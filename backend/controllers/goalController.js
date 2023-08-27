import Goal from "../models/Goal.js";
import asyncHandler from 'express-async-handler'
import express from "express";

const router = express.Router()

//@desc  get all goals to load to api
//@route GET /goal
const getAllGoals = asyncHandler(async (req, res) => {
  try {
    const goals = await Goal.find({}).lean()
    res.json(goals)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
})

// @desc    Show add page
// @route   GET /goal/add
const newGoal = asyncHandler( async (req, res) => {
  res.render('goal/add')
})

// @desc    Process add form
// @route   POST /goal
const createGoal = asyncHandler( async (req, res) => {
  try {
    req.body.user = req.user.id
    const data = await Goal.create(req.body)
    res.json({ data })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    get goal by id
// @route   GET /goal/:id
const getGoal = asyncHandler( async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id).populate('user').lean()

    if (!goal) {
      return res.render('error/404')
    }
    res.render('goal/:id', {
      goal,
    })
  } catch (err) {
    console.error(err)
    res.render('error/404')
  }
})

// @desc    Show edit page
// @route   GET /goal/edit/:id
const editGoal = asyncHandler(async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
    }).lean()

    if (!goal) {
      return res.render('error/404')
    }

    if (goal.user != req.user.id) {
      res.redirect('/dashboard')
    } else {
      res.render('goal/edit', {
        goal,
      })
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    Update goal
// @route   PUT /goal/edit/:id
const updateGoal = asyncHandler(async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id).lean()

    if (!goal) {
      return res.render('error/404')
    }

    if (goal.user != req.user.id) {
      res.redirect('/')
    } else {
      goal = await Goal.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })

      res.redirect('/')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    Delete goal
// @route   DELETE /goal/:id
const deleteGoal = asyncHandler(async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id).lean()

    if (!goal) {
      return res.render('error/404')
    }

    if (goal.user != req.user.id) {
      res.redirect('/')
    } else {
      await Goal.remove({ _id: req.params.id })
      res.redirect('/')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    Likes goal
// @route   PUT /goal/likes/:id
const likeGoal = asyncHandler(async (req, res) => {
  try {
    await Goal.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { likes: 1 },
      }
    );
    console.log("Likes +1");
    res.redirect(`/goal/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
})

// @desc   update goal progress
// @route  PUT api/goal/:id

const updateGoalData = asyncHandler(async (req, res) => {
  try {
    const date = req.body.date;
    const goalId = req.body.id;
    const goal = await Goal.findById(goalId);
    const added = goal.datesCompleted.addToSet(date);
    await goal.save();

    res.status(200).json({message: "Goal Progress Updated"})
    console.log("Goal Progress Updated");

  } catch (err) {
    console.log(err);
  }
})

export { getAllGoals,
  getGoal,
  newGoal, 
  createGoal, 
  editGoal,
  updateGoal,
  likeGoal, 
  updateGoalData,
  deleteGoal
}