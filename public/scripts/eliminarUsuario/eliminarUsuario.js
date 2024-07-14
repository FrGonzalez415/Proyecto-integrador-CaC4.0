"use strict";

//                  REGEX
//  Expresiones regulares para validar los campos del formulario
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

const eliminarForm = document.getElementById("form-eliminar");
const sesionActiva = document.querySelector("main .sesion-activa");
const sesionInactiva = document.querySelector("main .sesion-inactiva");

//                  IMPORTS
import navBar from "../modulos/menu.js";

//                  FUNCIONES
//  Validación del formulario
function validateEliminarForm() {
  //                  VARIABLES
  //  Se obtienen los elementos del formulario provenientes del DOM
  const email = document.getElementById("email-eliminar").value.trim();
  const password = document.getElementById("password-eliminar").value.trim();
  //  Se inicializa la variable valid en true
  let valid = true;

  //  Se validan los campos del formulario
  if (!emailRegex.test(email)) {
    valid = false;
    alert("Por favor, ingrese un email válido.");
  }
  if (!passwordRegex.test(password)) {
    valid = false;
    alert(
      "La contraseña debe contener al menos una minúscula, una mayúscula, un número y 8 caracteres"
    );
  }

  // Si todos los campos son válidos, se envía el formulario y se resetea
  if (valid) {
    const credenciales = {
      email: email,
      password: password,
    };
    // Enviar los datos utilizando fetch con el método POST
    fetch("/api/eliminar-usuario", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(credenciales),
    })
      .then((response) => {
        if (!response.ok) {
          // Manejar errores de la respuesta
          return response.json().then((error) => Promise.reject(error));
        } else return response.json();
      })
      .then((data) => {
        // Manejar la respuesta exitosa
        localStorage.removeItem("token");

        alert(`¡Usuario eliminado correctamente!`);

        window.location.href = "/";
      })
      .catch((error) => {
        // Manejar errores de la respuesta
        alert(`Error: ${error.error}`);
        eliminarForm.reset();
      });
  }
}

const iniciarSesion = (token) => {
  localStorage.setItem("token", token);
  sesionActiva.style.display = "flex";
  sesionInactiva.style.display = "none";
};

const cerrarSesion = () => {
  localStorage.removeItem("token");
  sesionActiva.style.display = "none";
  sesionInactiva.style.display = "flex";
};

const validarSesion = (token) => {
  fetch("/api/verificar-token", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          cerrarSesion();
          Promise.reject(error);
        });
      }
      return res.json();
    })
    .then((data) => {
      if (data.auth === true) {
        iniciarSesion(data.token);
      } else if (data.auth === false) {
        console.log(data.message);
        cerrarSesion();
      }
    })
    .catch((error) => console.log(error));
};

//                  NAVBAR
//  se cargan las funcionalidades de la barra de navegación
navBar();

document.addEventListener("DOMContentLoaded", function () {
  eliminarForm.addEventListener("submit", function (event) {
    //                  EVENTOS
    //  Validación del formulario de inicio de sesión
    event.preventDefault();
    validateEliminarForm();
  });

  //  Se verifica que haya una sesion activa
  if (localStorage.getItem("token") !== null) {
    validarSesion(localStorage.getItem("token"));
  } else {
    cerrarSesion();
  }
});
