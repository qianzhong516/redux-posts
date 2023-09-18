import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  users: [],
  status: 'idle',
  error: null,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users.push(...action.payload)
        state.status = 'loaded'
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      }),
})

export const fetchUsers = createAsyncThunk('users/loadUsers', async () => {
  const { data } = await client.get('/fakeApi/users')
  return data
})

export const selectUsers = (state) => state.users.users

export const selectUser = (userId) => (state) =>
  state.users.users.find((user) => user.id === userId)

export const selectUserStatus = (state) => state.users.status

export default userSlice.reducer
