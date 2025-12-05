const mongoose = require('mongoose')

// if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ message: 'Invalid Post ID' });
// }


//require ../models/Post
const Post = require('../models/Post')

//Get all posts -> 
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
        res.status(200).json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json(
            {
                message: 'Failed to fetch posts'
            }
        )
    }
}

//Create Post 
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json(
                {
                    message: 'Title & content required'
                }
            )
        }

        const post = await Post.create({ title, content })
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json(
            {
                message: 'Post Creation failed'
            }
        )
    }
}

// Like a Post
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            {
                new: true
            }
        )
        if (!post) {
            return res.status(404).json(
                {
                    message: 'Post not found'
                }
            )
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(
            {
                message: 'Failed to like post'
            }
        )
    }
}

// Add a Comment
exports.addComment = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || text.trim() === '') {
            return res.status(400).json(
                {
                    message: 'Comment text required'
                }
            )
        }

        const post = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $push: { comments: { text } }
            },
            {
                new: true
            }
        )

        if (!post) {
            return res.status(404).json(
                {
                    message: 'Post not found'
                }
            )
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({
            message: 'Failed to add comment'
        })
    }
}