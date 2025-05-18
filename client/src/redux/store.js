import { configureStore } from '@reduxjs/toolkit'
import useReducer from "./userSlice"

export default configureStore({
  reducer: {
    user: useReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['user.socketConnection'],
        ignoredActions: ['user/setSocketConnection'],
      },
    }),
});