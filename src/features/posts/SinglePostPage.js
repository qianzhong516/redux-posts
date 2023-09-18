import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from '../posts/PostAuthor'
import { TimeAgo } from '../posts/TimeAgo'
import { ReactionButtons } from '../posts/ReactionButtons'
import { selectPost } from './postSlice'

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const post = useSelector(selectPost(postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}
