import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated: (state, action) => {
      const { id, content, title } = action.payload
      const post = state.posts.find((post) => post.id === id)
      post.content = content
      post.title = title
    },
    reactionAdded: (state, action) => {
      const { id, name } = action.payload
      const post = state.posts.find((post) => post.id === id)
      if (post) {
        post.reactions[name] += 1
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.push(...action.payload)
        state.status = 'loaded'
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
  },
})

export const selectPost = (postId) => (state) =>
  state.posts.posts.find((post) => post.id === postId)

export const selectPosts = (state) => state.posts.posts

export const selectPostStatus = (state) => state.posts.status

export const selectPostError = (state) => state.posts.error

export const fetchPosts = createAsyncThunk('posts/getPosts', async () => {
  const { data } = await client.get('/fakeApi/posts')
  return data
})

export const addPost = createAsyncThunk(
  'posts/addPost',
  async ({ title, content, userId }) => {
    try {
      const post = {
        title,
        content,
        user: userId,
        date: new Date().toISOString(),
      }
      const { data } = await client.post('/fakeApi/posts', post)
      return data
    } catch (err) {
      // customize the error message if request fails
      throw new Error('Content cannot be "error"').message
    }
  }
)

export const { postUpdated, reactionAdded } = postSlice.actions

export default postSlice.reducer
