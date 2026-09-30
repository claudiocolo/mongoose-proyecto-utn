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

// READ - leer todos

const showLibros = async () => {
    return await Libro.find()
}

// READ - leer uno

const getLibro = async (id: string | undefined) => {
    if (!id) {
        return "ID es requerido"
    }

    if (!validateId(id)) {
        return "ID es invalido"
    }

    const foundLibro = await Libro.findById(id)

    if (!foundLibro) {
        return "Libro no encontrado"
    }

    return foundLibro
}

// CREATE

const createLibro = async (data: ILibro) => {

    const newLibro = new Libro(data)

    return await newLibro.save()

}

// UPDATE

const updateLibro = async (id: string | undefined, updates: string[]) => {
    if (!id) {
        return "ID es requerido"
    }

    if (!validateId(id)) {
        return "ID es invalido"
    }

    if (updates.length < 4) {
        return "Faltan datos para actualizar el libro"
    }

    const libroUpdated = await Libro.findByIdAndUpdate(
        id,

        {
            titulo: updates[0],
            autor: updates[1],
            precio: Number(updates[2]),
            stock: Number(updates[3])
        },

        {
            new: true
        }

    )

    if (!libroUpdated) {
        return "Libro no encontrado"
    }

    return libroUpdated

}

// DELETE

const deleteLibro = async (id: string | undefined) => {
    if (!id) {
        return "ID es requerido"
    }

    if (!validateId(id)) {
        return "ID es invalido"
    }

    const libroDeleted = await Libro.findByIdAndDelete(id)

    if (!libroDeleted) {
        return "Libro no encontrado"
    }

    return "Libro eliminado correctamente"
}

const main = async () => {

    await connectDb(URI_DB)

    switch (action) {

        case "info":

            console.log(`
                create "titulo" "autor" precio stock
                read
                read ID
                update ID "titulo" "autor" precio stock
                delete ID
            `)

            break

        // Crear

        case "create": {

            if (
                !args[1] ||
                !args[2] ||
                !args[3] ||
                !args[4]
            ) {

                console.log(
                    'Uso: create "titulo" "autor" precio stock'
                )

                break
            }

            const data: ILibro = {
                titulo: args[1],
                autor: args[2],
                precio: Number(args[3]),
                stock: Number(args[4])
            }

            console.log(await createLibro(data))

            break
        }

        // Leer

        case "read":

            if (args[1]) {
                console.log(await getLibro(args[1]))
            } else {
                console.log(await showLibros())
            }

            break

        // Actualizar

        case "update": {

            const id = args[1]

            const updates = args.slice(2)

            console.log(await updateLibro(id, updates))

            break
        }

        // Borrar

        case "delete": {

            const id = args[1]

            console.log(await deleteLibro(id))

            break
        }

        // Comando invalido

default:

    console.log(`
        Comando no válido.

        Comandos disponibles:
        create "titulo" "autor" precio stock
        read
        read ID
        update ID "titulo" "autor" precio stock
        delete ID
    `)
    }

    await mongoose.disconnect()
}

main()