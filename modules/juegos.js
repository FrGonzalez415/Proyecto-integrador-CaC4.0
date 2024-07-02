"use strict";

import DB from "../DB/db.js";

const Juegos = {
  // Método para registrar un nuevo juego
  registrarJuego(nuevoJuego) {},

  // Método para obtener juego por ID
  obtenerJuego(id) {},

  // Método para obtener juegos por categoría
  obtenerJuegosPorCategoria(categoria) {
    return new Promise((resolve, reject) => {
      DB.obtenerDatosRelacionadosNaM("juego", "categoria", "nombre", categoria)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Método para obtener todos los juegos
  obtenerJuegos() {},

  // Método para modificar un juego
  modificarJuego(juego) {},

  // Método para eliminar un juego
  eliminarJuego(id) {},
};

export default Juegos;
