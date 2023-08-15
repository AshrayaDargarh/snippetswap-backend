import express from "express"
import { getUser,updateUser } from "../controllers/user"
export const userRouter=express.Router()

userRouter
.get('/',getUser)
.patch('/:id',updateUser)