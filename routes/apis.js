'use strict'

import express from 'express';
import Filtros from '../modules/filtros.js';
import Usuarios from '../modules/usuarios.js';

const router = express.Router();
const error = new Error();

// Configura el router para recibir solicitudes JSON
router.use(express.json());

// Ruta para validar el login
router.post('/login', (req, res,) => {

    // Se valida el email y la contraseña
    const validacion = Usuarios.validarCredenciales(req.body.email, req.body.password);
    
    try {
        if ( validacion.error === undefined ) {
            // Si no hay errores, se envía un estado 200 y un mensaje de éxito
            res.status(200).json({ estado: 'Login successful', usuario: validacion.usuario});
        } else if ( validacion.error === 'email' ) {
            // Si el error es por email, se envía un estado 401 y un mensaje de error
            error.statusCode = 401;
            error.message = 'Email incorrecto';
            throw error;
        } else if ( validacion.error === 'contraseña' ) {
            // Si el error es por contraseña, se envía un estado 401 y un mensaje de error
            error.statusCode = 401;
            error.message = 'Contraseña incorrecta';
            throw error;
        }
    } catch (err) {
        // Si hay un error, se envía un estado y un mensaje de error
        res.status(err.statusCode).json({ error: err.message })
    }
});


// Ruta para obtener los productos filtrados por categoría
router.get('/productos', (req, res) => {
    res.json( Filtros.filtrarPorCategoria( req.query.categoria ) );
});



// Exporta el router para usarlo en tu aplicación principal
export default router;