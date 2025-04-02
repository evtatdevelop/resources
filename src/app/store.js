import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import appReducer from '../appSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer
  },
});