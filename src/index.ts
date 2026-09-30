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

// Interfaz del libro

interface ILibro {
    titulo: string
    autor: string
    precio: number
    stock: number
}

// Schema para el libro

const libroSchema = new mongoose.Schema<ILibro>({
    titulo: String,
    autor: String,
    precio: Number,
    stock: Number
})

// modelo del libro

const Libro = mongoose.model("libro", libroSchema)

// validar ID

const validateId = (id: string) => {
    return mongoose.Types.ObjectId.isValid(id)
}