# Mongoose Proyecto UTN

Proyecto CRUD de libros realizado con **TypeScript**, **Mongoose** y **MongoDB**.

## Tecnologías

* TypeScript
* Node.js
* Mongoose
* MongoDB
* dotenv

## Instalación

Instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` en la raíz del proyecto:

```env
URI_DB=mongodb://localhost:27017/biblioteca
```

## Uso

Los comandos se ejecutan desde la terminal.

### Ver comandos disponibles

```bash
node ./src/index.ts info
```

### Crear un libro

```bash
node ./src/index.ts create "El Principito" "Antoine de Saint-Exupéry" 15000 10
```

### Leer todos los libros

```bash
node ./src/index.ts read
```

### Leer un libro por ID

```bash
node ./src/index.ts read ID
```

### Actualizar un libro

```bash
node ./src/index.ts update ID "El Principito" "Antoine de Saint-Exupéry" 18000 50
```

### Eliminar un libro

```bash
node ./src/index.ts delete ID
```

## Estructura

```text
src/
└── index.ts

.env
.env.example
.gitignore
package.json
package-lock.json
tsconfig.json
README.md
```