import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Navbar } from './app/Navbar'
import { PostsList } from './features/posts/PostList'
import { AddPostForm } from './features/posts/AddPostForm'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { fetchPosts } from './features/posts/postSlice'
import { EditPostForm } from './features/posts/EditPostForm'
import { fetchUsers } from './features/users/userSlice'

function App() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <AddPostForm />
                <PostsList />
              </>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/editPost/:postId" component={EditPostForm} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
