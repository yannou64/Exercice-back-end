import express from "express";
import { createArticle, getAllArticle, getArticle, updateArticle, deleteArticle } from "../controllers/articleController.js";
import { verifyToken } from "../middlewares/verifyToken.js"

export const articleRouter = express.Router();

articleRouter.get('/posts', getAllArticle)
articleRouter.get('/posts/:id', getArticle)
articleRouter.post('/posts', verifyToken, createArticle)
articleRouter.put('/posts/:id', verifyToken, updateArticle)
articleRouter.delete('/posts/:id', verifyToken, deleteArticle)