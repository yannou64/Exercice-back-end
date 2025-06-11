import { mongoose } from "mongoose";
import  dotenv  from "dotenv"

dotenv.config()
const URI = process.env.URI

export async function dbConnect(){
    try{
        const dataBase = await mongoose.connect(URI)
        console.log("Connection à la base de donnée réussi ! : ", dataBase.connection.host)
    } catch (e) {
        console.log("Problème de connection à la base de donnée : ", e.message)
        process.exit(1)
    }
}

