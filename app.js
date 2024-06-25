'use strict'

import express from 'express'
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import indexRouter from './routes/index.js'
import cargarJuegos from './public/scripts/modulos/cargarJuegos.js';

//  Función para filtrar los juegos por categoría
function filtrarJuegosPorCategoria( juego, categoria ) {
    let flag = false
    juego.categoria.forEach( cat => {
        if ( cat.nombre === categoria ) {
            flag = true
    };
    })
    return flag
}


//  Variables
const puerto = 3000
const app = express()

// Construir __dirname basado en import.meta.url
const __dirname = path.dirname( fileURLToPath(import.meta.url) );

// Middleware
app.use(express.static('public'))

// Enrutador

indexRouter(app, fs, __dirname)

// API

app.get('/api/productos', (req, res) => {

    //  Se envían los datos de los productos en formato JSON
    res.json( JSON.parse( fs.readFileSync( './datos/juegos.json', 'utf-8' ) ).filter( juego => filtrarJuegosPorCategoria( juego, req.query.categoria ) ) ) 
    
})

//  Servidor escuchando

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`)
})