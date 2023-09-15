import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPost } from './postSlice'

export const AddPostForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const handleSubmit = () => {
    if (title && content) {
      dispatch(
        addPost({
          title,
          content,
        })
      )
    }
    setTitle('')
    setContent('')
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={handleSubmit}>
          Save Post
        </button>
      </form>
    </section>
  )
}
