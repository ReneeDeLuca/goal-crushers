import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  statuses: [],
  status: 'idle',
  error: null
}

const statusSlice = createSlice({
  name: 'statuses',
  initialState,
  reducers: {
    statusAdded:{
      reducer(state, action) {
      state.statuses.push(action.payload)
      },
      prepare(user, userName, statusType) {
        return {
          payload: {
            user,
            userName,
            statusType
          }
        }
      }
    },
    
    }
})

export const { statusAdded } = statusSlice.actions

export default statusSlice.reducer

export const selectAllstatus = state => state.statuses.statuses

