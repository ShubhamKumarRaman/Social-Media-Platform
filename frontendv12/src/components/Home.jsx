import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
    const [commentInputs, setCommentInputs] = useState({})
    const [posts, setPosts] = useState([])

    const API = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL;

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get(`${API}/api/posts`) // adjust to your API
                const data = res?.data ?? res
                const list = Array.isArray(data) ? data : Array.isArray(data?.posts) ? data.posts : []
                setPosts(list)
            } catch (err) {
                console.error(err)
                setPosts([])
            }
        }
        load()
    }, [])

    const handleLike = (postId) => {
        axios
            .post(`${API}/api/posts/like/${postId}`)
            .then((res) => {
                const updatedPosts = posts.map((post) =>
                    post._id === postId ? res.data : post
                );
                setPosts(updatedPosts);
            })
            .catch((err) => console.error("Error liking post: ", err));
    };

    const handleAddComment = (postId, commentText) => {
        if (!commentText?.trim()) return;

        axios
            .post(`${API}/api/posts/comment/${postId}`, { text: commentText })
            .then((res) => {
                const updatedPosts = posts.map((post) =>
                    post._id === postId ? res.data : post
                );
                setPosts(updatedPosts);

                // Clear input for this post only
                setCommentInputs((prev) => ({
                    ...prev,
                    [postId]: ""
                }));
            })
            .catch((err) => console.error("Error adding comment: ", err));
    };

    const safePosts = Array.isArray(posts) ? posts : []

    return (
        <div className='home'>
            <h2>Recent Posts</h2>

            {safePosts.map((post) => (
                <div key={post._id} className='post'>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>

                    {/* Media */}
                    {post.file && (
                        <div>
                            {post.file.includes(".mp4") ? (
                                <video width='320' height='240' controls>
                                    <source
                                        src={`${API}/uploads/${post.file}`}
                                        type='video/mp4'
                                    />
                                </video>
                            ) : (
                                <img
                                    src={`${API}/uploads/${post.file}`}
                                    alt='Post Media'
                                />
                            )}
                        </div>
                    )}

                    {/* Likes */}
                    <p>Likes: {post.likes}</p>
                    <button onClick={() => handleLike(post._id)}>Like</button>

                    {/* Comments */}
                    <p>Comments: {post.comments.length}</p>
                    <ul>
                        {post.comments.map((comment, index) => (
                            <li key={index}>{comment.text}</li>
                        ))}
                    </ul>

                    {/* Comment Input */}
                    <input
                        type='text'
                        placeholder='Add a comment'
                        className='comment-input'
                        value={commentInputs[post._id] || ""}
                        onChange={(e) =>
                            setCommentInputs({
                                ...commentInputs,
                                [post._id]: e.target.value,
                            })
                        }
                    />

                    <button
                        onClick={() =>
                            handleAddComment(post._id, commentInputs[post._id])
                        }
                        className='comment-button'
                    >
                        Add Comment
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Home
