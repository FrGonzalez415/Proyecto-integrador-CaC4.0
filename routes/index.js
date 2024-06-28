'use strict'

import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import apis from './apis.js'

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
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url + '.html'))
})

// Clásicos
router.get('/clasicos', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url + '.html'))
})

// Cooperativos
router.get('/cooperativos', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url + '.html'))
})

// Estrategia
router.get('/estrategia', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url + '.html'))
})

// Familiares
router.get('/familiares', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url + '.html'))
})

// Ofertas
router.get('/ofertas', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url + '.html'))
})

//                                  REGISTRO
router.get('/registro', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url + '.html'))
})

//                                  LOGIN 
router.get('/login', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url + '.html'))
})

//                                  CONTACTO
router.get('/contacto', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url + '.html'))
})

//                                  NOSOTROS
router.get('/nosotros', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url + '.html'))
})

//                                  TERMINOS Y CONDICIONES
router.get('/terminos-y-condiciones', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url + '.html'))
})

//                                  ARREPENTIMIENTO DE COMPRA
router.get('/arrepentimiento', (req, res) => {
    res.type('html').sendFile(path.join(__dirname, '..', 'public', 'HTML', req.url + '.html'))
})


//                                  MANEJO DE APIs

router.use('/api', apis)

/* //                                  Error 404
router.get('*', (req, res) => {
    const error404 = fs.readFileSync( __dirname + '/public/HTML/404.html', 'utf-8')
    res.type('html').send(error404)
}) */


export default router 
