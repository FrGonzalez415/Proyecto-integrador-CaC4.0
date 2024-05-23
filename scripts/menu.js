'use strict'

const menu      = document.querySelector( 'header .menu' )
const opciones  = document.querySelector( 'header nav' )

menu.addEventListener( 'click', () => {
    opciones.classList.toggle( 'activo' )
    menu.classList.toggle( 'activo' )
})