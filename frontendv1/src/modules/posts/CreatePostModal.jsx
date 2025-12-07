import React, { useState } from 'react'
import { createPost } from '../../api/postApi'

const CreatePostModal = ({ open, onClose, onPostCreated }) => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null;

  const submitHandler = async () => {
    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()

    if (!trimmedTitle || !trimmedContent) {
      setError('Title and content are required.')
      return
    }

    try {
      setLoading(true)
      setError('')

      const formData = new FormData()
      formData.append('title', trimmedTitle)
      formData.append('content', trimmedContent)

      const post = await createPost(formData)

      if (onPostCreated) onPostCreated(post)
      setTitle('')
      setContent('')
      onClose()
    } catch (err) {
      console.error('Error creating post:', err)
      setError('Failed to create post. Please try again.')
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className='fixed inset-0 bg-black/40 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-md'>
        
        <h2 className='font-semibold mb-2'>Create Post</h2>

        <input
          className='w-full border p-2 mb-2'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className='w-full border p-2 mb-2'
          placeholder='Content'
          rows='4'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <div className='flex justify-end gap-2'>
          <button
            className='px-4 py-1 rounded border'
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className='bg-indigo-600 text-white px-4 py-1 rounded disabled:opacity-50'
            onClick={submitHandler}
            disabled={loading}
          >
            {loading ? 'Posting…' : 'Post'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default CreatePostModal
