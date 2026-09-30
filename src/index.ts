import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const URI_DB = process.env.URI_DB || ""

const connectDb = async (URI: string) => {
    try {
        await mongoose.connect(URI)
    } catch (e) {
        console.log("Error al conectar a MongoDB")
    }
}
