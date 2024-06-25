'use strict'

//                  IMPORTS
import navBar from "../modulos/menu.js"

//                  VARIABLES
//  Se obtienen los elementos del formulario provenientes del DOM
const contactForm = document.getElementById('form-cont');
const nombre = document.getElementById('nombre-c').value.trim();
const apellido = document.getElementById('apellido-c').value.trim();
const email = document.getElementById('email-c').value.trim();
const comentario = document.getElementById('comentario-c').value.trim();

//                  REGEX
//  Expresiones regulares para validar los campos del formulario
const nameRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//                  FUNCIONES
//  Validación del formulario
function validateContactForm() {
  //  Se inicializa la variable valid en true
  let valid = true;

  //  Se validan los campos del formulario
  if (!nameRegex.test(nombre) || nombre.length < 5) {
    valid = false;
    alert("Ingrese un nombre válido");
  }
  if (!nameRegex.test(apellido) || apellido.length < 8) {
    valid = false;
    alert("Ingrese un apellido válido");
  }
  if (!emailRegex.test(email)) {
    valid = false;
    alert("Ingrese un email válido");
  }
  if (comentario.length < 10) {
    valid = false;
    alert("Ingrese un comentario válido");
  }

  // Si todos los campos son válidos, se envía el formulario y se resetea
  if (valid) {
    alert("El formulario ha sido enviado. Nos pondremos en contacto a la brevedad");
    contactForm.reset();
  }
}

//                  NAVBAR
//  se cargan las funcionalidades de la barra de navegación
navBar();

document.addEventListener('DOMContentLoaded', function () {

  // Validación del formulario de contacto
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    validateContactForm();
  });
})