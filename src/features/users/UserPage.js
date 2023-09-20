import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectUser } from '../users/userSlice'
import { selectPosts } from '../posts/postSlice'

export const UserPage = ({ match }) => {
  const { userId } = match.params

  const user = useSelector(selectUser(userId))

  const postsForUser = useSelector((state) => {
    const allPosts = selectPosts(state)
    return allPosts.filter((post) => post.user === userId)
  })

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  )
}