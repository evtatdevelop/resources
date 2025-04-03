import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import appReducer from '../appSlice';
import fileResourceReducer from '../features/fileResouce/fileResourceSlice';
import serverResourceReducer from '../features/serverResouce/serverResourceSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    fileResource: fileResourceReducer,
    serverResource: serverResourceReducer
  },
});