import express from "express";
import { createArticle, getAllArticle, getArticle } from "../controllers/articleController.js";
import { verifyToken } from "../middlewares/verifyToken.js"

export const articleRouter = express.Router();

articleRouter.get('/posts', getAllArticle)
articleRouter.get('/posts/:id', getArticle)
articleRouter.post('/posts', verifyToken, createArticle)