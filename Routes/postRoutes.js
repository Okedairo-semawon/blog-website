import express from 'express'
import { createPost, updatePost, deletePost, getPost } from '../Controllers/postController.js';
import {protectAuth, adminGuard} from '../middleware/authMiddleware.js';



const router = express.Router();

router.post('/', protectAuth, createPost);
router.route('/:slug').put( protectAuth, updatePost).delete( protectAuth, adminGuard, deletePost).get(getPost)
// create post 
/**
 * @swagger
 * api/posts/:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - caption
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post
 *               caption:
 *                 type: string
 *                 description: The caption for the post
 *               body:
 *                 type: object
 *                 description: The body content of the post (optional)
 *               photo:
 *                 type: string
 *                 description: The photo filename associated with the post (optional)
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 caption:
 *                   type: string
 *                 slug:
 *                   type: string
 *                 body:
 *                     type: object
 *                 user:
 *                   type: string
 *                   description: User ID who created the post
 *                 photo:
 *                   type: string
 *                   description: The post photo filename (optional)
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad Request – Missing title or caption
 *       500:
 *         description: Internal Server Error
 */

// update post 
/**
 * @swagger
 * api/posts/{slug}:
 *   put:
 *     summary: Update an existing post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the post to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               caption:
 *                 type: string
 *               slug:
 *                 type: string
 *               body:
 *                 type: object
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               photo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 caption:
 *                   type: string
 *                 slug:
 *                   type: string
 *                 body:
 *                     type: object
 *                 user:
 *                   type: string
 *                   description: User ID who created the post
 *                 photo:
 *                   type: string
 *                   description: The post photo filename (optional)
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid input or missing post
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * api/posts/{slug}:
 *   delete:
 *     summary: Delete a post by its slug
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the post to be deleted
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * api/posts/{slug}:
 *   get:
 *     summary: Get a single post by its slug
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the post to be fetched
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 caption:
 *                   type: string
 *                 slug:
 *                   type: string
 *                 body:
 *                     type: object
 *                 user:
 *                   type: string
 *                   description: User ID who created the post
 *                 photo:
 *                   type: string
 *                   description: The post photo filename (optional)
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal Server Error
 */


export default router;