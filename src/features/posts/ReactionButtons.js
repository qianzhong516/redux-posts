import React from 'react'
import { reactionAdded } from './postSlice'
import { useDispatch } from 'react-redux'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()
  const addReaction = (name) => {
    dispatch(reactionAdded({ id: post.id, name }))
  }
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() => addReaction(name)}
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
