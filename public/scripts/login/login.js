"use strict";

//                  REGEX
//  Expresiones regulares para validar los campos del formulario
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

const loginForm = document.getElementById("form-is");

//                  IMPORTS
import navBar from "../modulos/menu.js";

//                  FUNCIONES
//  Validación del formulario
function validateLoginForm() {
  //                  VARIABLES
  //  Se obtienen los elementos del formulario provenientes del DOM
  const email = document.getElementById("email-is").value.trim();
  const password = document.getElementById("password-is").value.trim();
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
    const loginBody = {
      email: email,
      password: password,
    };
    // Enviar los datos utilizando fetch con el método POST
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(loginBody),
    })
      .then( response => {
        if (!response.ok) {
          // Manejar errores de la respuesta
          return response.json().then(error => Promise.reject(error));
        } else return response.json();
      })
      .then( data => {
        // Manejar la respuesta exitosa
        if ( data.auth === "false" ) {
          return alert( data.message );
        } else {
          localStorage.setItem("token", data.token);
          alert(
            `¡Bienvenido ${data.usuario}! Se ha iniciado sesión correctamente.`
          );
          loginForm.reset();
        }
      })
      .catch(error => {
        // Manejar errores de la respuesta
        alert(`Error: ${error.error}`);
        loginForm.reset();
        });
  }
}

//                  NAVBAR
//  se cargan las funcionalidades de la barra de navegación
navBar();

document.addEventListener("DOMContentLoaded", function () {
  loginForm.addEventListener("submit", function (event) {
    //                  EVENTOS
    //  Validación del formulario de inicio de sesión
    event.preventDefault();
    validateLoginForm();
  });
});
