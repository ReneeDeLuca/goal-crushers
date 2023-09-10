import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  goals: [],
  status: 'idle',
  error: null
}

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    goalAdded:{
      reducer(state, action) {
      state.goals.push(action.payload)
      },
      prepare(title, endDate, isPublic, completionData, user) {
        return {
          payload: {
            title,
            endDate,
            isPublic,
            completionData,
            user
          }
        }
      }
    },
    goalDataUpdated(state, action) {
      const { _id, completionData } = action.payload
      const existingGoal = state.goals.find(goal => goal._id === _id)
      if (existingGoal) {
        existingGoal.completionData = completionData
      }
    },
    goalUpdated(state, action) {
      const { _id, title, endDate, isPublic } = action.payload
      const existingGoal = state.goals.find(goal => goal._id === _id)
      if (existingGoal) {
        existingGoal.title = title
        existingGoal.endDate = endDate
        existingGoal.isPublic = isPublic
      }
    },
    reactionAdded(state, action) {
      const { goalId, reaction } = action.payload
      const existingGoal = state.goals.find(goal => goal.id === goalId)
      if (existingGoal) {
        existingGoal.reactions[reaction]++
      }
    }
  }
})

export const { goalAdded, goalDataUpdated,goalUpdated, reactionAdded } = goalsSlice.actions

export default goalsSlice.reducer

export const selectAllGoals = state => state.goals.goals

export const selectGoalById = (state, goalId) => state.goals.goals.find(goal => goal.id === goalId)
