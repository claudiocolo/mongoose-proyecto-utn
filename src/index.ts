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

const args = process.argv.splice(2)
const action = args[0]

interface ILibro {
    titulo: string
    autor: string
    precio: number
    stock: number
}