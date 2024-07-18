import express from 'express';
import { createUser, loginUser, logoutUser, getProfile, updateProfile } from '../controllers/userController.js';
import { checkToken } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post("/", createUser)            //createUser

router.post("/login", loginUser)       //loginUser

router.post("/logout", logoutUser)      //logoutUser

router.get("/profile", checkToken, getProfile)      //getProfile

router.put("/profile", checkToken, updateProfile)      //updateProfile


export default router;