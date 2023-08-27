import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authReducer from './apiSlices/authSlice';
import { apiSlice } from './apiSlices/apiSlice';
import goalsReducer from './slices/goalsSlice';
import usersReducer from './slices/userSlice';


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    goals: goalsReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;

setupListeners(store.dispatch);