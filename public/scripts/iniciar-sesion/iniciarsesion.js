'use strict'

//                  IMPORTS
import navBar from "../modulos/menu.js"

//                  VARIABLES
//  Se obtienen los elementos del formulario provenientes del DOM
const loginForm = document.getElementById('form-is');
const email = document.getElementById('email-is').value.trim();
const password = document.getElementById('password-is').value.trim();

//                  REGEX
//  Expresiones regulares para validar los campos del formulario
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

//                  FUNCIONES
//  Validación del formulario
    function validateLoginForm() {
      //  Se inicializa la variable valid en true
      let valid = true;
  
      //  Se validan los campos del formulario
      if (!emailRegex.test(email)) {
        valid = false;
        alert('Por favor, ingrese un email válido.');
      }
      if (!passwordRegex.test(password)) {
        valid = false;
        alert("La contraseña debe contener al menos una minúscula, una mayúscula, un número y 8 caracteres");
      }
  
      // Si todos los campos son válidos, se envía el formulario y se resetea
      if (valid) {
        alert("Sesión iniciada");
        loginForm.reset();
      }
    }

//                  NAVBAR
//  se cargan las funcionalidades de la barra de navegación
navBar();

//                  EVENTOS
//  Validación del formulario de inicio de sesión
document.addEventListener('DOMContentLoaded', function () {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      validateLoginForm();
    });
  });
  
  
  
  
  
  
  
  