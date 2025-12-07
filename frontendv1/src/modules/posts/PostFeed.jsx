import React, { useEffect, useState } from 'react'
import { getPosts } from '../../api/postApi'
import CreatePostModal from './CreatePostModal'
import PostCard from '../../components/Post/PostCard'

const PostFeed = () => {

  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className='mb-4 px-4 py-2 bg-indigo-600 text-white rounded'
      >
        Create Post
      </button>

      <CreatePostModal
        open={open}
        onClose={() => setOpen(false)}
        onPostCreated={(post) => setPosts([post, ...posts])}
      />

      <div className='space-y-4'>
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onUpdate={loadPosts}
          />
        ))}

      </div>

    </div>
  )
}

export default PostFeed
