import express from 'express'
import { login, profile, signup, verifyAccount } from '../controllers/auth.controller.js';

export const authRouter = express.Router();

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.post("/verify-account",verifyAccount)
authRouter.post("/profile",profile)