"use strict";

import express from "express";
import Auth from "../controllers/authController.js";
import Categorias from "../modules/categorias.js";
import Usuarios from "../modules/usuarios.js";
import Pedidos from "../modules/pedidos.js";
import Juegos from "../modules/juegos.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Configura el router para recibir solicitudes JSON
router.use(express.json());

// Ruta para registrar un nuevo usuario
router.post("/registro", (req, res) => {
  // Se registra el nuevo usuario
  Usuarios.registrarUsuario(req.body)
  .then((registro) => {
    Auth.generarToken({ idusuario: registro.idusuario })
      .then((token) => {
        res.status(201).json({ auth: "true", token: token, estado: "Usuario registrado", usuario: registro.usuario });
      })
      .catch((error) => {
        res.status(500).json({ error: "Usuario registrado, error al generar token" });
      });
    })
    .catch((error) => {
        let statusCode
        let message
        if (error.error === "email") {
        // Si el error es por email, se envía un estado 409 y un mensaje de error
        statusCode = 409;
        message = "Ya se encuentra un usuario registrado con ese email";
      } else {
        // Si hay un error, se envía un estado 500 y un mensaje de error
        statusCode = 500;
        message = "Error al registrar el usuario";
      }
      res.status(statusCode).json({ error: message })
    });
});

// Ruta para validar el login de un usuario
router.post("/login", (req, res) => {
  // Se valida el email y la contraseña
  Usuarios.validarCredenciales(req.body.email, req.body.password)
    .then((validacion) => {
      if (validacion.error === undefined) {
        // Si no hay errores, se envía un estado 200 y un mensaje de éxito
        console.log(validacion);
        Auth.generarToken({ idusuario: validacion.idusuario })
          .then((token) => {
            console.log(token);
            res.status(200).json({ auth: "true", token: token, estado: "Login successful", usuario: validacion.usuario });
          })
          .catch((error) => {
            res.status(500).json({ error: "Error al generar token" });
          });
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
    .catch((err) => {
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

// Ruta para obtener las categorías
router.get("/categorias", (req, res) => {
  Categorias.obtenerCategorias()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

// Ruta para validar un token
router.post("/verificarToken", AuthMiddleware, (req, res) => {
  Auth.generarToken({ idusuario: req.idusuario })
    .then((token) => {
      res.status(200).json({ auth: "true", token: token, message: "Token válido" });
    })
    .catch((error) => {
      res.status(500).json({ auth: "false", error: "Error al generar token" });
    });
});

// Exporta el router para usarlo en tu aplicación principal
export default router;
