import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = []

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchUsers.pending, (state, action) => {})
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.push(...action.payload)
      }),
})

export const fetchUsers = createAsyncThunk('users/loadUsers', async () => {
  const { data } = await client.get('/fakeApi/users')
  return data
})

export default userSlice.reducer
