import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRouter.js";
import { dbConnect } from "./dbConnection.js";
import cookieParser from "cookie-parser";
import { articleRouter } from "./routes/articleRouter.js"

const app = express();
dotenv.config();
const port = process.env.PORT;

dbConnect()

app.use(cookieParser());
app.use(express.json());
app.use("/auth", userRouter);
app.use("/article", articleRouter);
app.use((req, res) => {
    res.status(404).json({message: "Erreur d'url, no match"})
})


app.listen(port, () => {
  console.log(`Le serveur est démarré au http://localhost/${port}`);
});
