import express from "express";
import { userProfile } from "../Controllers/userController.js";
const router = express.Router();

router.get('/profile', userProfile);

export default router