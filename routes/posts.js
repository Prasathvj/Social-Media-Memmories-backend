const express = require('express')
const multer= require('multer');
const {getPosts, createPost, getPost, updatePost, deletePost, likePost, writeComment} = require('../controllers/posts')
const path = require('path');
const { join } = require('path');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'uploads/posts'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});


const router = express.Router();

router.get('/posts',getPosts)
router.post('/post',upload.array('images'),createPost);
router.get('/:id',getPost)
router.patch('/:id',updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);
router.post('/post/comment',writeComment)


module.exports = router;