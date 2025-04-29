import express from 'express'
import { createPost, updatePost, deletePost, getPost } from '../Controllers/postController.js';
import {protectAuth, adminGuard} from '../middleware/authMiddleware.js';



const router = express.Router();

router.post('/', protectAuth, createPost);
router.route('/:slug').put( protectAuth, updatePost).delete( protectAuth, adminGuard, deletePost).get(getPost)


export default router;