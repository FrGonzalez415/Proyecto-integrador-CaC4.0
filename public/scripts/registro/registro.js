'use strict'

//                  IMPORTS
import navBar from "../modulos/menu.js"

//                  VARIABLES
//  Se obtienen los elementos del formulario provenientes del DOM
const registerForm = document.getElementById('form-reg');
const email = document.getElementById('email-reg').value.trim();
const password = document.getElementById('password-reg').value.trim();
const cellphone = document.getElementById('cellphone-reg').value.trim();
const name = document.getElementById('name-reg').value.trim();
const surname = document.getElementById('surname-reg').value.trim();
const birthdate = document.getElementById('birthdate-reg').value.trim();
const city = document.getElementById('city-reg').value.trim();
const zip = document.getElementById('zip-reg').value.trim();
const street = document.getElementById('street-reg').value.trim();
const number = document.getElementById('number-reg').value.trim();
const optionCasa = document.getElementById('option-reg').checked;
const optionDepto = document.getElementById('option2-reg').checked;

//                  REGEX
//  Expresiones regulares para validar los campos del formulario
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
const phoneRegex = /^[0-9]+$/;
const nameRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
const birthdateRegex = /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
const zipRegex = /^[0-9]+$/;
const numberRegex = /^[0-9]+$/;

//                  FUNCIONES
//  Validación del formulario
function validateRegisterForm() {
  //  Se inicializa la variable valid en true
  let valid = true;

  //  Se validan los campos del formulario
  if (!emailRegex.test(email)) {
    valid = false;
    alert("Ingrese un email válido");
  }
  if (!passwordRegex.test(password)) {
    valid = false;
    alert("La contraseña debe contener al menos una minúscula, una mayúscula, un número y 8 caracteres");
  }
  if (!phoneRegex.test(cellphone) || cellphone.length < 10) {
    valid = false;
    alert("Ingrese un número de celular válido");
  }
  if (!nameRegex.test(name) || name.length < 5) {
    valid = false;
    alert("Ingrese un nombre válido");
  }
  if (!nameRegex.test(surname) || surname.length < 8) {
    valid = false;
    alert("Ingrese un apellido válido");
  }
  if (!birthdate || !birthdateRegex.test(birthdate)) {
    valid = false;
    alert("Ingrese una fecha de cumpleaños válida");
  }
  if (!nameRegex.test(city) || city.length < 5) {
    valid = false;
    alert("Ingrese una ciudad válida");
  }
  if (!zipRegex.test(zip) || zip.length < 2) {
    valid = false;
    alert("Ingrese un código postal válido");
  }
  if (!nameRegex.test(street) || street.length < 5) {
    valid = false;
    alert("Ingrese un nombre de calle válido");
  }
  if (!numberRegex.test(number) || number.length < 2) {
    valid = false;
    alert("Ingrese un número de calle válido");
  }
  if (!optionCasa && !optionDepto) {
    valid = false;
    alert("Seleccione una opción");
  }

  // Si todos los campos son válidos, se envía el formulario y se resetea
  if (valid) {
    alert('Formulario de registro enviado');
    registerForm.reset();
  }
}

//                  NAVBAR
//  se cargan las funcionalidades de la barra de navegación
navBar();

//                  EVENTOS
//  Validación del formulario de registro
document.addEventListener('DOMContentLoaded', () => {
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    validateRegisterForm();
  });
})