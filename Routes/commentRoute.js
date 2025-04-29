import express from 'express'
import { createComment } from '../Controllers/commentController.js';
import {protectAuth, adminGuard} from '../middleware/authMiddleware.js';


const router = express.Router();
router.post('/', protectAuth, createComment);

export default router