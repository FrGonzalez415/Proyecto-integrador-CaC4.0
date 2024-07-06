"use strict";

import express from "express";
import router from "./routes/index.js";
import DB from "./DB/db.js";

//  Variables
const puerto = process.env.PORT || 3000;
const app = express();

//  MIDDLEWARES

//  Configuración de la carpeta pública
app.use(express.static("public"));

// Enrutador principal

app.use("/", router);

//  Servidor escuchando

app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
