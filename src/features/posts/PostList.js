import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import {
  selectPosts,
  selectPostStatus,
  fetchPosts,
  selectPostError,
} from './postSlice'
import { Spinner } from '../../components/Spinner'

const PostExcerpt = ({ post }) => (
  <article className="post-excerpt">
    <h3>{post.title}</h3>
    <PostAuthor userId={post.user} />
    <TimeAgo timestamp={post.date} />
    <p className="post-content">{post.content.substring(0, 100)}</p>
    <ReactionButtons post={post} />
    <Link to={`/posts/${post.id}`} className="button muted-button">
      View Post
    </Link>
  </article>
)

export const PostsList = () => {
  const dispatch = useDispatch()

  const postStatus = useSelector(selectPostStatus)
  const posts = useSelector(selectPosts)
  const error = useSelector(selectPostError)

  React.useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content
  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'loaded') {
    const sortedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else {
    content = error
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
