import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import {
  selectPostIds,
  selectPostStatus,
  fetchPosts,
  selectPostError,
  selectPost,
} from './postSlice'
import { Spinner } from '../../components/Spinner'

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPost(state, postId))

  return (
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
}

export const PostsList = () => {
  const dispatch = useDispatch()

  const postStatus = useSelector(selectPostStatus)
  const sortedPostIds = useSelector(selectPostIds)
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
    content = sortedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
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
