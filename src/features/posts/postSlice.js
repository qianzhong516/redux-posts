import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
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
    addPost: {
      reducer: (state, action) => {
        state.posts.push(action.payload)
      },
      prepare: ({ title, content, userId }) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        }
      },
    },
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
  },
})

export const selectPost = (postId) => (state) =>
  state.posts.posts.find((post) => post.id === postId)

export const selectPosts = (state) => state.posts.posts

export const selectPostStatus = (state) => state.posts.status

export const fetchPosts = createAsyncThunk('posts/getPosts', async () => {
  const { data } = await client.get('/fakeApi/posts')
  return data
})

export const { addPost, postUpdated, reactionAdded } = postSlice.actions

export default postSlice.reducer
