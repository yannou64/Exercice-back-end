import express from "express"
import { login, create, logout } from "../controllers/userController.js"

export const userRouter = express.Router()

userRouter.post('/login', login)
userRouter.post('/register', create)
userRouter.post('/logout', logout)