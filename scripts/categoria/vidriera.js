'use strict'

const juegos = document.querySelectorAll( 'main .vidriera .juego' )



juegos.forEach( ( juego, i ) => {
    let nombreDelJuego = juegos[i].querySelector( '.nombre' ).textContent.toLowerCase().replace( /[.]/g, '' ).replace( /[ ]/g, '_' )
    juegos[i].style.backgroundImage = `url(../imagenes/Juegos/${nombreDelJuego}.png)`
    })

