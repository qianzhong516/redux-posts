import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { useDispatch } from 'react-redux'
import { client } from './api/client'
import { getPosts } from './app/features/posts/postSlice'
import { PostsList } from './app/features/posts/PostList'

function App() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    client.get('/fakeApi/posts').then((res) => {
      dispatch(getPosts(res.data))
    })
  }, [dispatch])

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <PostsList />} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
