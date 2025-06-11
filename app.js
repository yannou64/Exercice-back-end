import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRouter.js";
import { dbConnect } from "./dbConnection.js";

const app = express();
dotenv.config();
const port = process.env.PORT;

dbConnect()

app.use(express.json());
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Le serveur est démarré au http://localhost/${port}`);
});
