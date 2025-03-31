import express from "express";
import { userProfile, updateProfile, updateProfilePic, deleteUserProfile } from "../Controllers/userController.js";
import { protectAuth } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get('/profile', protectAuth, userProfile);
router.put('/updateProfile', protectAuth, updateProfile);
router.put('/updateProfilePic', protectAuth,  updateProfilePic);
router.delete('/deleteprofile', protectAuth, deleteUserProfile)
export default router;