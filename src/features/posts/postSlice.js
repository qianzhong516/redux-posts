import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

/**
 * Normalizing state structure by `createEntityAdapter`. E.g,
 * {
 *   posts: {
 *     ids: ["1", "2", "3"],
 *     entities: {
 *       "1": {id: "1", title, content, ...},
 *       "2": {id: "2", title, content, ...},
 *       "3": {id: "3", title, content, ...},
 *     }
 *   }
 * }
 */
const postAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = postAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated: (state, action) => {
      const { id, content, title } = action.payload
      const post = state.entities[id]
      post.content = content
      post.title = title
    },
    reactionAdded: (state, action) => {
      const { id, name } = action.payload
      const post = state.entities[id]
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
        postAdapter.upsertMany(state, action.payload)
        state.status = 'loaded'
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })
      .addCase(addPost.fulfilled, postAdapter.addOne)
  },
})

export const {
  selectAll: selectPosts,
  selectById: selectPost,
  selectIds: selectPostIds,
} = postAdapter.getSelectors((state) => state.posts)

export const selectPostStatus = (state) => state.posts.status

export const selectPostError = (state) => state.posts.error

// create memoized selector that only regenerates results if inputs change
export const selectPostsByUser = createSelector(
  [selectPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
)

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
