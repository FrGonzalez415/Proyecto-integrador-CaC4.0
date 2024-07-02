"use strict";

import mysql from "mysql2/promise";

const DB = {
  connection: null,

  // Método para conectar a la base de datos
  conectar() {
    return new Promise((resolve, reject) => {
      mysql
        .createConnection({
          host: "localhost",
          user: "root",
          password: "root",
          database: "ludoteca",
        })
        .then((connection) => {
          this.connection = connection;
          console.log("Conexión a la base de datos exitosa");
          resolve();
        })
        .catch((error) => {
          console.error("Error al intentar conectar a la base de datos", error);
          reject(error);
        });
    });
  },

  // Método para desconectarse de la base de datos
  desconectar() {
    return new Promise((resolve, reject) => {
      if (this.connection !== null) {
        this.connection
          .end()
          .then(() => {
            console.log("Desconexión de la base de datos exitosa");
            resolve();
          })
          .catch((error) => {
            console.error(
              "Error al intentar desconectar de la base de datos",
              error
            );
            reject(error);
          });
      } else {
        console.log("No hay conexión a la base de datos");
        resolve(); // No hay conexión, pero se resuelve porque no es un error
      }
    });
  },

  // Método para buscar en la base de datos
  buscarEnBaseDeDatos(tabla, columna, valor) {
    return new Promise((resolve, reject) => {
      this.conectar()
        .then(() => {
          // Ejecutar la consulta
          this.connection
            .query("SELECT * FROM ?? WHERE ?? = ?", [tabla, columna, valor])
            .then(([resultados, campos]) => {
              // Manejar los resultados de la consulta
              if (resultados.length === 1) {
                console.log("Se enontró un resultado");
                resolve(resultados[0]);
              } else if (resultados.length > 1) {
                console.log("Se encontraron múltiples resultados");
                resolve(resultados);
              } else if (resultados.length === 0) {
                console.log("No se encontraron resultados");
                resolve({ error: columna });
              }
            })
            .catch((error) => {
              // Manejar el error
              console.error(
                "Error al intentar buscar en la base de datos",
                error
              );
              reject(error);
            });
        })
        .finally(() => {
          this.desconectar();
        });
    });
  },

  // Método para obtener datos de tablas con una relación de muchos a muchos
  obtenerDatosRelacionadosNaM( tablaDatos, tablaFiltro, columnaFiltro, valorFiltro ) {
    return new Promise((resolve, reject) => {
      this.conectar()
        .then(() => {
            let relacion;
          if (
            (tablaDatos === "juego" && tablaFiltro === "categoria") ||
            (tablaDatos === "categoria" && tablaFiltro === "juego")
          ) {
            // Construir la consulta SQL utilizando los parámetros
            relacion = 'categoria_has_juego';
          } else if (
            (tablaDatos === "pedido" && tablaFiltro === "juego") ||
            (tablaDatos === "juego" && tablaFiltro === "pedido")
          ) {
            // Construir la consulta SQL utilizando los parámetros
            relacion = 'pedido_has_juego';
          } else {
            // Si no se cumple ninguna de las condiciones anteriores, se rechaza la promesa
            reject({error: "Error al intentar obtener datos, las tablas ingresadas no tienen dicha relación"});
          }
          const consulta = `
                SELECT ${tablaDatos}.*
                FROM ${tablaDatos}
                JOIN ${relacion} ON ${tablaDatos}.id${tablaDatos} = ${relacion}.id${tablaDatos}
                JOIN ${tablaFiltro} ON ${relacion}.id${tablaFiltro} = ${tablaFiltro}.id${tablaFiltro}
                WHERE ${tablaFiltro}.${columnaFiltro} = ?
              `;
          // Ejecutar la consulta
          this.connection
            .query(consulta, [valorFiltro])
            .then(([rows]) => {
              resolve(rows);
            })
            .catch((error) => {
              console.error("Error al obtener los datos", error);
              reject(error);
            });
        })
        .finally(() => {
          this.desconectar();
        });
    });
  },
};

export default DB;
