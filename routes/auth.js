import express from "express"
import { signUp,login,forgotPassword,resetPassword } from "../controllers/auth"
export const authRouter=express.Router()

authRouter
.post('/signUp',signUp)
.post('/login',login)
.post('/forgot-password',forgotPassword)
.post('/reset-password/:token',resetPassword)