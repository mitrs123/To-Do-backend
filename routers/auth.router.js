import express from 'express'
import { login, profile, signup, verifyAccount } from '../controllers/auth.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';

export const authRouter = express.Router();

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.post("/verify-account",isLoggedIn,verifyAccount)
authRouter.post("/profile",profile)

