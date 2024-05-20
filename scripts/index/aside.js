'use strict'

const aside             = document.querySelector( 'aside' )
const ofertas           = document.querySelector( 'main .ofertas' )
const ofertasBanner     = document.querySelector( 'aside .ofertas' )
const categorias        = document.querySelectorAll( 'main .categorias .banner' )
const categoriasBanner  = document.querySelectorAll( 'aside .categoria' )


//  Ofertas
ofertas.addEventListener( 'mouseover', () => {

    //  desplegar banner en aside
    ofertasBanner.style.width = '100%'
})

ofertas.addEventListener( 'mouseout', () => {

    //  Ocultar banner en aside
     ofertasBanner.style.width = '0%'

})


//  Categorias
categorias.forEach( ( categoria, i ) => {

    categorias[i].addEventListener( 'mouseover', () => {

        //  desplegar banner en aside
        categoriasBanner[i].style.width = '100%'

        //  asignar clase activo a la categoria y mostrar imagen de fondo
        categorias[i].classList.add( 'activo' )
        categorias[i].style.backgroundImage = `url(./imagenes/categorias/${categorias[i].textContent}.png)`
        categorias[i].style.color = 'transparent'
    })

    categorias[i].addEventListener( 'mouseout', () => {

        //  Ocultar banner en aside
        categoriasBanner[i].style.width = '0%'

        //  quitar clase activo a la categoria y ocultar imagen de fondo
        categorias[i].classList.remove( 'activo' )
        categorias[i].style.backgroundImage = `none`
        categorias[i].style.color = 'inherit'
    })
})

