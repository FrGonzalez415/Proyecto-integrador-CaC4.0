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

//                    RUTA PARA REGISTRAR UN NUEVO USUARIO
router.post("/registro", (req, res) => {

  // Se registra el nuevo usuario
  Usuarios.registrarUsuario(req.body)
  .then((registro) => {

    // Si no hay errores, se genera un token
    if (registro.error === undefined) {

    Auth.generarToken({ idusuario: registro.idusuario })
      .then((token) => {

        res.status(201).json({ auth: "true", token: token, estado: "Usuario registrado", usuario: registro.usuario });

      })
      .catch((error) => {

        res.status(500).json({ error: "Usuario registrado, error al generar token" });

      });

    } else if (registro.error === "email") {

      // Si el error es por email, se envía un estado 409 y un mensaje de error
      res.status(409).json({ error: "Ya se encuentra un usuario registrado con ese email" });

    }
    })
    .catch((error) => {
  
        // Si hay un error, se envía un estado y un mensaje de error
        res.status(500).json({ error: error.message });

    });
});

//                    RUTA PARA VALIDAR UN USUARIO
router.post("/login", (req, res) => {

  // Se valida el email y la contraseña
  Usuarios.validarCredenciales(req.body.email, req.body.password)
    .then((validacion) => {

      // Si no hay errores, se genera un token
      if (validacion.error === undefined) {

        // Si no hay errores, se envía un estado 200 y un mensaje de éxito
        Auth.generarToken({ idusuario: validacion.idusuario })

          .then((token) => {

            res.status(200).json({ auth: "true", token: token, estado: "Login successful", usuario: validacion.usuario });

          })
          .catch((error) => {

            res.status(500).json({ error: "Error al generar token" });

          });

      } else if (validacion.error === "email") {

        // Si el error es por email, se envía un estado 401 y un mensaje de error
        res.status(401).json({ error: "Email incorrecto" });

      } else if (validacion.error === "contraseña") {

        // Si el error es por contraseña, se envía un estado 401 y un mensaje de error
        res.status(401).json({ error: "Contraseña incorrecta" });
      }
    })
    .catch((err) => {

      // Si hay un error, se envía un estado y un mensaje de error
      res.status(500).json({ error: err.message });
    });
});

//                    RUTA PARA OBTENER LOS JUEGOS FILTRADOS POR CATEGORÍA
router.get("/productos", (req, res) => {
  Juegos.obtenerJuegosPorCategoria(req.query.categoria)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

//                    RUTA PARA OBTENER LAS CATEGORÍAS
router.get("/categorias", (req, res) => {
  Categorias.obtenerCategorias()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

//                    RUTA PARA VALIDAR UN TOKEN
router.post("/verificar-token", AuthMiddleware, (req, res) => {
  Auth.generarToken({ idusuario: req.idusuario })
    .then((token) => {
      res.status(200).json({ auth: true, token: token, message: "Token válido" });
    })
    .catch((error) => {
      res.status(500).json({ auth: false, error: "Error al generar token" });
    });
});

//                    RUTA PARA ELIMINAR UN USUARIO
router.delete("/eliminar-usuario", AuthMiddleware, (req, res) => {
  
        Usuarios.eliminarUsuario(req.idusuario, req.body.email, req.body.password)
          .then((result) => {
            if (result.error === undefined) {
              res.status(200).json({ auth: false, token: null, usuario: result.usuario, mensaje: "Usuario eliminado correctamente" });
            } else if (result.error === "email") {
              res.status(401).json({ error: "Email incorrecto" });
            } else if (result.error === "contraseña") {
              res.status(401).json({ error: "Contraseña incorrecta" });
            }
          })
          .catch((error) => {
            res.status(500).json({ error: error });
          });
    });

//                    RUTA PARA MODIFICAR UN USUARIO
router.put("/modificar-usuario", AuthMiddleware, (req, res) => {
  Usuarios.modificarUsuario(req.body, req.idusuario)
    .then((result) => {
      Auth.generarToken({ idusuario: req.idusuario })
        .then((token) => {
          res.status(200).json({ auth: true, token: token, mensaje: "Usuario modificado correctamente" });
        })
        .catch((error) => {
          res.status(500).json({ error: "Usuario modificado, no se pudo generar un nuevo token" });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

//                    RUTA PARA OBTENER LOS DATOS DE UN USUARIO
router.get("/datos-usuario", AuthMiddleware, (req, res) => {
  Usuarios.mostrarDatos(req.idusuario)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

// Exporta el router para usarlo en tu aplicación principal
export default router;
