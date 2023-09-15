import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Navbar } from './app/Navbar'
import { PostsList } from './app/features/posts/PostList'
import { AddPostForm } from './app/features/posts/AddPostForm'
import { SinglePostPage } from './app/features/posts/SinglePostPage'
import { fetchPosts } from './app/features/posts/postSlice'

function App() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchPosts())
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
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
