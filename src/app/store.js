import { configureStore } from '@reduxjs/toolkit'

import postReducer from '../features/posts/postSlice'
import userReducer from '../features/users/userSlice'
import notificationReducer from '../features/notifications/notificationSlice'

export default configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
    notifications: notificationReducer,
  },
})
