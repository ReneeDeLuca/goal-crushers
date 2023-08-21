import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  status: 'idle',
  error: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userAdded:{
    reducer(state, action) {
    state.users.push(action.payload)
    },
    prepare(name, email, password) {
      return {
        payload: {
          name,
          email,
          password
        }
      }
    }
  },}
})

export default usersSlice.reducer

export const selectAllUsers = state => state.users

export const selectUserById = (state, userId) => state.users.find(user => user.id === userId)