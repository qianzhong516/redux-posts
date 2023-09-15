import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.push(...action.payload)
    },
  },
})

export const { getPosts } = postSlice.actions

export default postSlice.reducer
