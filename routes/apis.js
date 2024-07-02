"use strict";

import DB from "../DB/db.js";
import express from "express";
import Juegos from "../modules/juegos.js";
import Usuarios from "../modules/usuarios.js";
import Pedidos from "../modules/pedidos.js";

const router = express.Router();
const error = new Error();

// Configura el router para recibir solicitudes JSON
router.use(express.json());

// Ruta para registrar un nuevo usuario
router.post("/registro", (req, res) => {
  // Se registra el nuevo usuario
  const registro = Usuarios.registrarUsuario(req.body);
  console.log(registro);
  try {
    if (registro.error === undefined) {
      // Si no hay errores, se envía un estado 201 y un mensaje de éxito
      res
        .status(201)
        .json({ estado: "Usuario registrado", usuario: registro.usuario });
    } else if (registro.error === "email") {
      // Si el error es por email, se envía un estado 409 y un mensaje de error
      error.statusCode = 409;
      error.message = "Ya se encuentra un usuario registrado con ese email";
      throw error;
    } else {
      // Si hay un error, se envía un estado 500 y un mensaje de error
      error.statusCode = 500;
      error.message = "Error al registrar el usuario";
      throw error;
    }
  } catch (err) {
    // Si hay un error, se envía un estado y un mensaje de error
    res.status(err.statusCode).json({ error: err.message });
  }
});

// Ruta para validar el login de un usuario
router.post("/login", (req, res) => {
  // Se valida el email y la contraseña
  Usuarios.validarCredenciales(req.body.email, req.body.password)
    .then((validacion) => {
      if (validacion.error === undefined) {
        // Si no hay errores, se envía un estado 200 y un mensaje de éxito
        res
          .status(200)
          .json({ estado: "Login successful", usuario: validacion.usuario });
      } else if (validacion.error === "email") {
        // Si el error es por email, se envía un estado 401 y un mensaje de error
        error.statusCode = 401;
        error.message = "Email incorrecto";
        throw error;
      } else if (validacion.error === "contraseña") {
        // Si el error es por contraseña, se envía un estado 401 y un mensaje de error
        error.statusCode = 401;
        error.message = "Contraseña incorrecta";
        throw error;
      }
    })
    .catch((error) => {
      // Si hay un error, se envía un estado y un mensaje de error
      res.status(err.statusCode).json({ error: err.message });
    });
});

// Ruta para obtener los productos filtrados por categoría
router.get("/productos", (req, res) => {
  Juegos.obtenerJuegosPorCategoria(req.query.categoria)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

// Exporta el router para usarlo en tu aplicación principal
export default router;
