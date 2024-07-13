'use strict'

import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import apis from './apis.js'
import AuthMiddleware from '../middlewares/authMiddleware.js';

// Construir __dirname basado en import.meta.url
const __dirname = path.dirname( fileURLToPath(import.meta.url) )

//  Enrutador

const router = express.Router()

//                                  INICIO
router.get('/', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

//                                  CATEGORIAS
// Cartas
router.get('/cartas', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url.toLowerCase() + '.html'))
})

// Clásicos
router.get('/clasicos', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url.toLowerCase() + '.html'))
})

// Cooperativos
router.get('/cooperativos', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url.toLowerCase() + '.html'))
})

// Estrategia
router.get('/estrategia', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url.toLowerCase() + '.html'))
})

// Familiares
router.get('/familiares', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url.toLowerCase() + '.html'))
})

// Ofertas
router.get('/ofertas', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url.toLowerCase() + '.html'))
})

//                                  REGISTRO
router.get('/registro', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url.toLowerCase() + '.html'))
})

//                                  LOGIN 
router.get('/login', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url.toLowerCase() + '.html'))
})

//                                  MODIFICAR DATOS
router.get('/modificar-datos', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url.toLowerCase() + '.html'))
})

//                                  ELIMINAR USUARIO
router.get('/eliminar-usuario', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url.toLowerCase() + '.html'))
})

//                                  CONTACTO
router.get('/contacto', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url.toLowerCase() + '.html'))
})

//                                  NOSOTROS
router.get('/nosotros', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url.toLowerCase() + '.html'))
})

//                                  TERMINOS Y CONDICIONES
router.get('/terminos-y-condiciones', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url.toLowerCase() + '.html'))
})

//                                  ARREPENTIMIENTO DE COMPRA
router.get('/arrepentimiento', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url.toLowerCase() + '.html'))
})

//                                  CARRITO
router.get('/carrito', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url.toLowerCase() + '.html'))
})


//                                  MANEJO DE APIs

router.use('/api', apis)

/* //                                  Error 404
router.get('*', (req, res) => {
    const error404 = fs.readFileSync( __dirname + '/public/HTML/404.html', 'utf-8')
    res.type('html').send(error404)
}) */


export default router 
