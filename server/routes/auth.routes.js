import { Router } from "express";
import { forgotPassword, getProfile, login, logout, profile, register, resetPassword } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/fetch-profile', verifyJWT, profile)
router.get('/get-detail-profile', verifyJWT, getProfile)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

export default router