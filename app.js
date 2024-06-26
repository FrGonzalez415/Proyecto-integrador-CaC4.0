'use strict'

import express from 'express'
import router from './routes/index.js'

//  Variables
const puerto = 3000
const app = express()

//  MIDDLEWARES

//  Configuración de la carpeta pública
app.use(express.static('public'))

// Enrutador principal

app.use('/', router)

//  Servidor escuchando

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`)
})