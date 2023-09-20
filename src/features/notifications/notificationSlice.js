import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { client } from '../../api/client'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    console.log(allNotifications)
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    console.log(latestTimestamp)
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.data
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    markRead: (state, action) => {
      state.forEach((notification) => {
        notification.read = true
      })
    },
    syncLatestNotificationStatus: (state, action) => {
      state.forEach((notification) => {
        notification.isNew = !notification.read
      })
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload)
      // sync isNew with read status. This is especially useful when fetching new notifications on the notification page
      state.forEach((notification) => {
        notification.isNew = !notification.read
      })
      // Sort with newest first
      state.sort((a, b) => b.date.localeCompare(a.date))
    })
  },
})

export default notificationsSlice.reducer

export const { markRead, syncLatestNotificationStatus } =
  notificationsSlice.actions

export const selectAllNotifications = (state) => state.notifications

export const selectUnreadNotificationCount = (state) =>
  state.notifications.filter((notification) => notification.isNew).length
