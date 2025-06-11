import express from "express"
import { loginUserController, createUser, logoutUserController } from "../controllers/userController.js"

export const userRouter = express.Router()

userRouter.post('/login', loginUserController)
userRouter.post('/new', createUser)
userRouter.post('/logout', logoutUserController)