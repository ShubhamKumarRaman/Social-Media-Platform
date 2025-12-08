import React, { useState, useRef } from 'react'
import axios from 'axios'

const CreatePost = () => {

    const fileInputRef = useRef(null);

    // Use Vite variable form:
    const API = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL;

    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        file: null,
    });

    // Handle text inputs
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPost({ ...newPost, [name]: value });
    };

    // Handle file input
    const handleFileChange = (event) => {
        setNewPost({ ...newPost, file: event.target.files[0] });
    };

    // Submit post
    const handlePostSubmit = () => {
        if (!newPost.title.trim() || !newPost.content.trim()) {
            alert('Title and Content are required');
            return;
        }

        const formData = new FormData();
        formData.append('title', newPost.title);
        formData.append('content', newPost.content);

        if (newPost.file) {
            formData.append('file', newPost.file);
        }

        axios
            .post(`${API}/api/posts`, formData)
            .then((res) => {
                console.log("Post created:", res.data);

                // Reset form
                setNewPost({ title: "", content: "", file: null });

                // Clear file input field
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            })
            .catch((err) => console.error('Error creating post: ', err));
    };

    return (
        <div className='create-post'>
            <h2>Create a Post</h2>

            <input
                type='text'
                name='title'
                placeholder='Title'
                value={newPost.title}
                onChange={handleInputChange}
            />

            <textarea
                name='content'
                placeholder='Content'
                value={newPost.content}
                onChange={handleInputChange}
            />

            <input
                type='file'
                name='file'
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            <button onClick={handlePostSubmit}>Post</button>
        </div>
    )
}

export default CreatePost;
