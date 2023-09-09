import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  comments: [],
  status: 'idle',
  error: null
}

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentAdded:{
      reducer(state, action) {
      state.comment.push(action.payload)
      },
      prepare(text, commentUser,goalId, goalUser) {
        return {
          payload: {
            text,
            commentUser,
            goalId,
            goalUser
          }
        }
      }
    },
    likeAdded(state, action) {
      const { commentId } = action.payload
      const existingComment = state.comments.find(comment => comment.id === commentId)
      if (existingComment) {
        existingComment.likes++
      }
    }
  }
})

export const { commentAdded, likeAdded } = commentSlice.actions

export default commentSlice.reducer

export const selectAllComments = state => state.comments.comments

export const selectCommentById = (state, commentId) => state.comments.comments.find(comment => comment.id === commentId)
