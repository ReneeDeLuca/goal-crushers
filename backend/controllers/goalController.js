import Goal from "../models/Goal.js";
import asyncHandler from 'express-async-handler'
import express from "express";

const router = express.Router()

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
    await Goal.create(req.body)
    res.redirect('/dashboard')
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

    if (goal.user._id != req.user.id && goal.status == 'private') {
      res.render('error/404')
    } else {
      res.render('goal/show', {
        goal,
      })
    }
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
      res.redirect('/dashboard')
    } else {
      goal = await Goal.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })

      res.redirect('/dashboard')
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
      res.redirect('/dashboard')
    } else {
      await Goal.remove({ _id: req.params.id })
      res.redirect('/dashboard')
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
// @route  PUT /goal/progress/:id

const updateGoalData = asyncHandler(async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id).lean()

    if (!goal) {
      return res.render('error/404')
    }

    if (goal.user != req.user.id) {
      res.redirect('/dashboard')
    } else {
    await Goal.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: 
          { completionData: 
            {
              x : Date.now,
              value : true,
            }
          }
      });
    console.log("Goal Updated");
    res.redirect(`/dashboard`);
    }
  } catch (err) {
    console.log(err);
  }
})

export { getGoal,
  newGoal, 
  createGoal, 
  editGoal,
  updateGoal,
  likeGoal, 
  updateGoalData,
  deleteGoal
}