import express from 'express';
import { createPost, deletePost, getPost, getPosts, likePost, updatePost, writeComment } from '../controllers/posts.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, join(__dirname, '..', 'uploads/posts'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

console.log(__dirname);
const router = express.Router();

router.get('/posts',getPosts)
router.post('/post',upload.array('images'),createPost);
router.get('/:id',getPost)
router.patch('/:id',updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);
router.post('/post/comment',writeComment)


export default router;