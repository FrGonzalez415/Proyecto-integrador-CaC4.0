"use strict";

import DB from "../DB/db.js";

const Usuarios = {
  // Método para registrar un nuevo usuario
  registrarUsuario(nuevoUsuario) {
    let credencialesUsuario = {
      email: nuevoUsuario.email,
      contraseña: nuevoUsuario.contraseña,
    };
    let datosUsuario = {
      nombre: nuevoUsuario.nombre,
      apellido: nuevoUsuario.apellido,
      telefono: nuevoUsuario.telefono,
      cumpleaños: nuevoUsuario.cumpleaños,
      pais: nuevoUsuario.pais,
      provincia: nuevoUsuario.provincia,
      ciudad: nuevoUsuario.ciudad,
      codigoPostal: nuevoUsuario.codigoPostal,
      calle: nuevoUsuario.calle,
      numero: nuevoUsuario.numero,
      vivienda: nuevoUsuario.vivienda,
    };
  },

  // Método para modificar un usuario REVISAR
  modificarUsuario(usuario) {

  },

  // Método para eliminar un usuario
  eliminarUsuario(id) {
    
  },

  // Método para validar las credenciales de un usuario
  validarCredenciales(email, contraseña) {
    return new Promise((resolve, reject) => {
      DB.buscarEnBaseDeDatos('usuario', 'email', email)
        .then((usuario) => {
          console.log(usuario);
          if (usuario.error === 'email') {
            reject({ error: "email" });
          } else if (usuario.password !== contraseña) {
            reject({ error: "contraseña" });
          } else if (usuario.password === contraseña) {
            resolve({ usuario: usuario.nombre });
          }
        })
        .catch((error) => {
          console.log('El error es el siguiente: ', error);
          reject(error);
        });
    });
  },

  // Método para mostrar usuario por ID
  mostrarUsuario(id) {
  },
};

export default Usuarios;
