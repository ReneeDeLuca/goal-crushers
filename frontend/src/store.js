import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authReducer from './apiSlices/authSlice';
import { apiSlice } from './apiSlices/apiSlice';
import goalsReducer from './slices/goalsSlice';
import usersReducer from './slices/userSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalsReducer,
    users: usersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;

setupListeners(store.dispatch);