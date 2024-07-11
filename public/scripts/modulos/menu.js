'use strict'

const menu          = document.querySelector( 'header .menu' )
const opciones      = document.querySelector( 'header nav' )
const desplegable   = document.querySelector( 'header .desplegable' )
const usuario       = document.querySelector( 'header .desplegable .iconos .usuario' )
const carrito       = document.querySelector( 'header .desplegable .iconos .carrito' )
const sessionOnBtns = document.querySelectorAll( 'header .desplegable .sesion .session-on' )
const sessionOffBtns = document.querySelectorAll( 'header .desplegable .sesion .session-off' )

//                  FUNCIONES
const navBar = () => {

if ( localStorage.getItem( 'token' ) !== null ) {
    
    sessionOnBtns.forEach( btn => btn.style.display = 'block' )
    sessionOffBtns.forEach( btn => btn.style.display = 'none' )
} else {

    fetch('/api/verificarToken', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.auth === true) {
            localStorage.setItem('token', data.token);
            console.log(data.token);
            sessionOnBtns.forEach(btn => btn.style.display = 'block');
            sessionOffBtns.forEach(btn => btn.style.display = 'none');
        } else {
            sessionOnBtns.forEach(btn => btn.style.display = 'none');
            sessionOffBtns.forEach(btn => btn.style.display = 'block');
        }
    })
    .catch(error => console.log(error));
}

const desplegarMenu = () => {
    opciones.classList.toggle( 'activo' )
    menu.classList.toggle( 'activo' )
}

const desplegarUsuario = () => {
    desplegable.classList.toggle( 'usuario-activo' )
}

const desplegarCarrito = () => {
    desplegable.classList.toggle( 'carrito-activo' )
}


menu.addEventListener( 'click', () => {
    if ( desplegable.classList.contains( 'carrito-activo' ) ) {
        desplegarCarrito()
        setTimeout(() => { 
            desplegarMenu()
        }, 500);
    } else if ( desplegable.classList.contains( 'usuario-activo' ) ) {
        desplegarUsuario()
        setTimeout(() => { 
            desplegarMenu()
        }, 500);
    } else {
        desplegarMenu()
    }
} )

usuario.addEventListener( 'click', () => {
    if ( menu.classList.contains( 'activo' ) ) {
        desplegarMenu()
        setTimeout(() => { desplegarUsuario() }, 500);
    }
    else if ( desplegable.classList.contains( 'carrito-activo' ) ) {
        desplegarCarrito()
        setTimeout(() => { desplegarUsuario() }, 500);
    }
    else {
        desplegarUsuario()
    }
} )

carrito.addEventListener( 'click', () => {
    if ( menu.classList.contains( 'activo' ) ) {
        desplegarMenu()
        setTimeout(() => { desplegarCarrito() }, 500);
    }
    else if ( desplegable.classList.contains( 'usuario-activo' ) ) {
        desplegarUsuario()
        setTimeout(() => { desplegable.classList.toggle( 'carrito-activo' ) }, 500);
    }
    else {
        desplegarCarrito()
    }
} )
}

export default navBar;