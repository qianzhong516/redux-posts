import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  posts: [],
  status: 'loading',
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload)
    },
    postUpdated: (state, action) => {
      const { id, content, title } = action.payload
      const post = state.posts.find((post) => post.id === id)
      post.content = content
      post.title = title
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.push(...action.payload)
        state.status = 'idle'
      })
  },
})

export const fetchPosts = createAsyncThunk('posts/getPosts', async () => {
  const { data } = await client.get('/fakeApi/posts')
  return data
})

export const { addPost, postUpdated } = postSlice.actions

export default postSlice.reducer
