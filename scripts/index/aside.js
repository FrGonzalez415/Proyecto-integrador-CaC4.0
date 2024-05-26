'use strict'

const aside             = document.querySelector( 'aside' )
const ofertas           = document.querySelector( 'main .ofertas' )
const ofertasBanner     = document.querySelector( 'aside .ofertas' )
/* const categorias        = document.querySelectorAll( 'main .categorias .banner' ) */
const categoriasBanner  = document.querySelectorAll( 'aside .categoria' )


ofertas.addEventListener( 'mouseover', () => {
    let banner = document.createElement( 'div' )
    banner.classList.add( `mostrador` )
    banner.innerHTML = `
    <img src="./imagenes/aside/${ofertas.className}-1.png" alt="" class="banner" />
    <img src="./imagenes/aside/${ofertas.className}-2.png" alt="" class="banner" />
    <img src="./imagenes/aside/${ofertas.className}-3.png" alt="" class="banner" />
    <img src="./imagenes/aside/${ofertas.className}-4.png" alt="" class="banner" />
    `
    aside.appendChild( banner )
})

ofertas.addEventListener( 'mouseout', () => {
    aside.querySelector('.mostrador').remove()
})

categorias.forEach( ( categoria, i ) => {
    categorias[i].addEventListener( 'mouseover', () => {
        let banner = document.createElement( 'div' )
        banner.classList.add( `mostrador` )
        banner.innerHTML = `
        <img src="./imagenes/aside/${categorias[i].id}-1.png" alt="" class="banner" />
        <img src="./imagenes/aside/${categorias[i].id}-2.png" alt="" class="banner" />
        <img src="./imagenes/aside/${categorias[i].id}-3.png" alt="" class="banner" />
        <img src="./imagenes/aside/${categorias[i].id}-4.png" alt="" class="banner" />
        `
        aside.appendChild( banner )
    })

    categorias[i].addEventListener( 'mouseout', () => {
        aside.querySelector(`.mostrador`).remove()
    })
})