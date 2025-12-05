const express = require('express')
const router = express.Router();
// require controllers
const { getAllPosts, createPost, likePost, addComment } = require('../controllers/postController')

// get / route for getallPosts
router.get('/', getAllPosts);

//post / route for createPost
router.post('/', createPost);

//post /like/:id for like Post
router.post('/like/:id', likePost)

//post /comment/:id for add Comments
router.post('/comment/:id', addComment)

module.exports = router;