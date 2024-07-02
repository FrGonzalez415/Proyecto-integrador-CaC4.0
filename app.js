"use strict";

import express from "express";
import router from "./routes/index.js";
import DB from "./DB/db.js";

//  Variables
const puerto = 3000;
const app = express();

//  MIDDLEWARES

//  Configuración de la carpeta pública
app.use(express.static("public"));

// Enrutador principal

app.use("/", router);

//  Conexión a la base de datos

/* DB.conectar().then(() => {
    DB.desconectar()
    console.log(DB.connection)}) */

/* DB.obtenerUsuario("admin@ludoteca.com")
  .then((usuario) => {
    console.log(usuario);
  })
  .catch((error) => {
    console.log(error);
  }); */

//  Servidor escuchando

app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
