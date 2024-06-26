'use strict'

//                  VARIABLES
const main = document.querySelector( 'main' )

const categoria = document.location.pathname.slice(1)

//                  IMPORTS
import navBar from "../modulos/menu.js"
import cargarJuegos from "../modulos/cargarJuegos.js";

//                  NAVBAR
//  se cargan las funcionalidades de la barra de navegación
navBar();

//                  MAIN
//  Se cargan el titulo en la pagina principal
let titulo = document.createElement('h1')
titulo.classList.add('titulo')
main.appendChild( titulo ).textContent = categoria

//  genera una llamada fetch para obtener los datos del archivo JSON y cargarlos en la página principal
fetch( `/api/productos?categoria=${categoria}` )
    .then( response => response.json() )
    .then( data => {
        main.appendChild( cargarJuegos( data ) )
    })
