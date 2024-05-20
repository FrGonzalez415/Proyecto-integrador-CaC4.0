'use strict'

const categorias = document.querySelectorAll( 'main .categorias .banner' )

categorias.forEach( ( categoria, i ) => {
    categorias[i].style.backgroundImage = `url(./imagenes/categorias/${categorias[i].querySelector( '.titulo' ).textContent.toLowerCase()}.png)`
    categorias[i].style.backgroundSize = 'cover'
    categorias[i].style.backgroundPosition = 'center'
    categorias[i].style.backgroundRepeat = 'no-repeat'
    categorias[i].style.color = 'transparent'
})

categorias.forEach( ( categoria, i ) => {
    categorias[i].addEventListener( 'mouseover', () => {
        categorias[i].querySelector( '.titulo' ).classList.toggle( 'activo' )
    })
    categorias[i].addEventListener( 'mouseout', () => {
        categorias[i].querySelector( '.titulo' ).classList.toggle( 'activo' )
    })
})