"use strict";

import DB from "../DB/db.js";

const Usuarios = {
  // Método para registrar un nuevo usuario
  registrarUsuario(nuevoUsuario) {
    return new Promise((resolve, reject) => {
      DB.buscarEnBaseDeDatos("usuario", "email", nuevoUsuario.email)
        .then((usuario) => {
          if (usuario.error === "email") {
            let credencialesUsuario = {
              email: nuevoUsuario.email,
              password: nuevoUsuario.password,
            };
            DB.insertarEnBaseDeDatos("usuario", credencialesUsuario)
              .then(([result]) => {
                DB.buscarEnBaseDeDatos("usuario", "email", nuevoUsuario.email)
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
                        resolve({ usuario: datosUsuario.nombre });
                      })
                      .catch((error) => {
                        console.log("El error es el siguiente: ", error);
                        reject(error);
                      });
                  })
                  .catch((error) => {
                    console.log("El error es el siguiente: ", error);
                  });
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            reject({ error: "email" });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Método para modificar un usuario REVISAR
  modificarUsuario(usuarioModificado) {
    return new Promise ((resolve, reject) => {
      DB.buscarEnBaseDeDatos("usuario", "email", usuarioModificado.email)
      .then((usuario) =>{
        if(usuario.error === "email") {
          reject({error: "usuario no encontrado"});
        }else{
          let datosUsuario = {
            nombre: usuarioModificado.nombre,
            apellido: usuarioModificado.apellido,
            telefono: usuarioModificado.telefono,
            fechaNacimiento: usuarioModificado.fechaNacimiento,
            pais: usuarioModificado.pais,
            provincia: usuarioModificado.provincia,
            ciudad: usuarioModificado.ciudad,
            codigoPostal: usuarioModificado.codigoPostal,
            calle: usuarioModificado.calle,
            numero: usuarioModificado.numero,
            vivienda: usuarioModificado.vivienda
          };
          DB.modificarEnBaseDeDatos("datos_usuario", datosUsuario, "idusuario", usuario.idusuario)
          .then(([result]) => {
            resolve({mensaje: "Datos actualizados correctamente"});
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

  // Método para eliminar un usuario
  eliminarUsuario(id) {},

  // Método para validar las credenciales de un usuario
  validarCredenciales(email, contraseña) {
    return new Promise((resolve, reject) => {
      DB.buscarEnBaseDeDatos("usuario", "email", email)
        .then((usuario) => {
          console.log(usuario);
          if (usuario.error === "email") {
            reject({ error: "email" });
          } else if (usuario.password !== contraseña) {
            reject({ error: "contraseña" });
          } else if (usuario.password === contraseña) {
            resolve({ usuario: usuario.nombre });
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
