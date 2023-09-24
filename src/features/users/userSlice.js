import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const userAdapter = createEntityAdapter()

const initialState = userAdapter.getInitialState({
  status: 'idle',
  error: null,
})

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
        state.status = 'loaded'
        // to avoid duplicate entries being added to the `users` state
        userAdapter.setAll(state, action.payload)
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

export const { selectAll: selectUsers, selectById: selectUser } =
  userAdapter.getSelectors((state) => state.users)

export const selectUserStatus = (state) => state.users.status

export default userSlice.reducer
