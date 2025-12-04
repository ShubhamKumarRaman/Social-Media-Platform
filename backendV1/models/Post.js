const mongoose = require('mongoose')

// Comment Schema
const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            require: true,
            trim: true,
            maxlength: 500
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)

//PostSchema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
    },
    likes: {
        type: Number,
        default: 0,
        min: 0
    },
    comments: [commentSchema]
},
    {
        timestamps: true
    }
)

// Exports as model named Post
module.exports = mongoose.model('Post', postSchema);