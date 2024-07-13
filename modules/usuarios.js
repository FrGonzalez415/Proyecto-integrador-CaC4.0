"use strict";

import DB from "../DB/db.js";
import Codificador from "../controllers/codificador.js";

const Usuarios = {
  // Método para registrar un nuevo usuario
  registrarUsuario(nuevoUsuario) {
    return new Promise((resolve, reject) => {
      DB.buscarEnBaseDeDatos("usuario", "email", nuevoUsuario.email)
        .then((usuario) => {
          if (usuario.error === "email") {
            Codificador.codificarPassword(nuevoUsuario.password)
              .then((password) => {
                let credencialesUsuario = {
                  email: nuevoUsuario.email,
                  password: password,
                };

                DB.insertarEnBaseDeDatos("usuario", credencialesUsuario)
                  .then(([result]) => {
                    DB.buscarEnBaseDeDatos(
                      "usuario",
                      "email",
                      nuevoUsuario.email
                    )
                      .then((usuario) => {
                        let datosUsuario = {
                          nombre: nuevoUsuario.nombre,
                          apellido: nuevoUsuario.apellido,
                          telefono: nuevoUsuario.telefono,
                          fechaNacimiento: nuevoUsuario.fechaNacimiento,
                          pais: nuevoUsuario.pais,
                          provincia: nuevoUsuario.provincia,
                          ciudad: nuevoUsuario.ciudad,
                          codigoPostal: nuevoUsuario.codigoPostal,
                          calle: nuevoUsuario.calle,
                          numero: nuevoUsuario.numero,
                          vivienda: nuevoUsuario.vivienda,
                          idusuario: usuario.idusuario,
                        };

                        DB.insertarEnBaseDeDatos("datos_usuario", datosUsuario)
                          .then(([result]) => {
                            resolve({
                              idusuario: usuario.idusuario,
                              usuario: nuevoUsuario.nombre,
                            });
                          })
                          .catch((error) => {
                            console.log("El error es el siguiente: ", error);
                            reject(error);
                          });
                      })
                      .catch((error) => {
                        console.log("El error es el siguiente: ", error);
                        reject(error);
                      });
                  })
                  .catch((error) => {
                    console.log("El error es el siguiente: ", error);
                    reject(error);
                  });
              })
              .catch((error) => {
                console.log("El error es el siguiente: ", error);
                reject(error);
              });
          } else {
            resolve({ error: "email" });
          }
        })
        .catch((error) => {
          console.log("El error es el siguiente: ", error);
          reject(error);
        });
    });
  },

  // Método para modificar un usuario REVISAR
  modificarUsuario(usuarioModificado, idusuario) {
    return new Promise((resolve, reject) => {
      console.log(usuarioModificado);
      console.log(idusuario);

      DB.modificarEnBaseDeDatos(
        "datos_usuario",
        usuarioModificado,
        "idusuario",
        idusuario
      )
        .then(([result]) => {
          resolve({ mensaje: "Datos actualizados correctamente" });
        })
        .catch((error) => {
          console.log("El error es el siguiente: ", error);
          reject(error);
        });
    });
  },

  // Método para eliminar un usuario
  eliminarUsuario(id, email, password) {
    return new Promise((resolve, reject) => {
      DB.buscarEnBaseDeDatos("usuario", "idusuario", id).then((usuario) => {
        if (usuario.error === "id") {
          resolve({ error: "id" });
        } else if (usuario.email !== email) {
          resolve({ error: "email" });
        } else {
          Codificador.compararPassword(password, usuario.password).then(
            (validacion) => {
              if (validacion) {
                DB.eliminarEnBaseDeDatos("datos_usuario", "idusuario", id)
                  .then(([result]) => {
                    DB.eliminarEnBaseDeDatos("usuario", "idusuario", id)
                      .then(([result]) => {
                        resolve({
                          usuario: id,
                          mensaje: "Usuario eliminado correctamente",
                        });
                      })
                      .catch((error) => {
                        console.log("El error es el siguiente: ", error);
                        reject(error);
                      });
                  })
                  .catch((error) => {
                    console.log("El error es el siguiente: ", error);
                    reject(error);
                  });
              } else {
                resolve({ error: "contraseña" });
              }
            }
          );
        }
      });
    });
  },

  // Método para validar las credenciales de un usuario
  validarCredenciales(email, contraseña) {
    return new Promise((resolve, reject) => {
      DB.buscarEnBaseDeDatos("usuario", "email", email)
        .then((credenciales) => {
          if (credenciales.error === "email") {
            resolve({ error: "email" });
          } else {
            Codificador.compararPassword(contraseña, credenciales.password)
              .then((validacion) => {
                if (validacion) {
                  DB.buscarEnBaseDeDatos(
                    "datos_usuario",
                    "idusuario",
                    credenciales.idusuario
                  )
                    .then((usuario) => {
                      if (usuario.error === undefined) {
                        resolve({
                          idusuario: usuario.idusuario,
                          usuario: usuario.nombre,
                        });
                      } else {
                        reject({ error: usuario.error });
                      }
                    })
                    .catch((error) => {
                      console.log("El error es el siguiente: ", error);
                      reject(error);
                    });
                } else {
                  console.log("Contraseña incorrecta");
                  resolve({ error: "contraseña" });
                }
              })
              .catch((error) => {
                console.log("El error es el siguiente: ", error);
                reject(error);
              });
          }
        })
        .catch((error) => {
          console.log("El error es el siguiente: ", error);
          reject(error);
        });
    });
  },

  // Método para mostrar usuario por ID
  mostrarDatos(id) {
    return new Promise((resolve, reject) => {
      DB.buscarEnBaseDeDatos("datos_usuario", "idusuario", id)
        .then((usuario) => {
          if (usuario.error === "id") {
            reject({ error: "usuario no encontrado" });
          } else {
            resolve(usuario);
          }
        })
        .catch((error) => {
          console.log("El error es el siguiente: ", error);
          reject(error);
        });
    });
  },
};

export default Usuarios;
