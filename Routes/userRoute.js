import express from "express";
import { userProfile, updateProfile, updateProfilePic, getAllUsers, deleteUserProfile } from "../Controllers/userController.js";
import { protectAuth, adminGuard } from "../middleware/authMiddleware.js";
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         profilePic:
 *           type: string
 *         bio:
 *           type: string
 *     UpdateProfileInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         bio:
 *           type: string
 *     UpdateProfilePicInput:
 *       type: object
 *       required:
 *         - profilePic
 *       properties:
 *         profilePic:
 *           type: string
 *           description: URL of new profile picture
 */

/**
 * @swagger
 * api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user's profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * api/users/updateProfile:
 *   put:
 *     summary: Update user profile (name or bio)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileInput'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * api/users/updateProfilePic:
 *   put:
 *     summary: Update profile picture
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfilePicInput'
 *     responses:
 *       200:
 *         description: Profile picture updated
 *       400:
 *         description: Invalid image data
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * api/users/:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchKeyword
 *         schema:
 *           type: string
 *         description: Search users by email (case-insensitive)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users per page (default is 10)
 *     responses:
 *       200:
 *         description: A list of users with pagination info
 *         headers:
 *           x-filter:
 *             description: The search filter applied to the query
 *             schema:
 *               type: string
 *           x-totalcount:
 *             description: Total number of users matching the filter
 *             schema:
 *               type: integer
 *           x-currentpage:
 *             description: The current page number
 *             schema:
 *               type: integer
 *           x-pagesize:
 *             description: The number of users per page
 *             schema:
 *               type: integer
 *           x-totalpagecount:
 *             description: Total number of pages
 *             schema:
 *               type: integer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized – Requires authentication
 *       403:
 *         description: Forbidden – Admins only
 */


/**
 * @swagger
 * api/users/deleteprofile:
 *   delete:
 *     summary: Delete user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       401:
 *         description: Unauthorized
 */

router.get('/profile', protectAuth, userProfile);
router.put('/updateProfile', protectAuth, updateProfile);
router.put('/updateProfilePic', protectAuth,  updateProfilePic);
router.delete('/deleteprofile', protectAuth, adminGuard, deleteUserProfile)
router.get("/", protectAuth, adminGuard, getAllUsers);
export default router;