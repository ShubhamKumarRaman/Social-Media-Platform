import React, { useState } from 'react'
import { likePost, addComment } from '../../api/postApi'

const PostCard = ({ post, onUpdate }) => {
  const [comment, setComment] = useState('');

  return (
    <div className='bg-white p-4 rounded shadow'>
      <h3 className='font-semibold'>{post.title}</h3>
      <p className='text-sm mt-1'>{post.content}</p>

      <div className='flex gap-4 mt-2'>
        <button
          onClick={async () => {
            await likePost(post._id);
            onUpdate();
          }}
        >
          {post.likes}
        </button>

        <span>{post.comments.length}</span>
      </div>

      <div className='mt-3'>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Add Comment....'
          className='border p-1 w-full'
        />

        <button
          onClick={async()=>{
            await addComment(post._id,comment);
            setComment('');
            onUpdate();
          }}
          className='mt-1 text-sm text-indigo-600'
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default PostCard
