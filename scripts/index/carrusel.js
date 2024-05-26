'use strict'

const mostrador     = document.querySelector( 'main .mostrador' )
const elementos     = document.querySelectorAll( 'main .elemento' )
const puntos        = document.querySelectorAll( 'main .punto' )
const anterior      = document.querySelector( 'main .anterior' )
const siguiente     = document.querySelector( 'main .siguiente' )

//                      FUNCIONES

//  Limpiar estado activo de puntos y elementos
function limpiarActivo ( elemento ) {
    elemento.forEach( ( elem, i ) => {
        elemento[i].classList.remove( 'activo' )
    })
}

//  Desplazar el mostrador con un total de 1 elemento para pantallas de hasta 600px y 3 elementos para pantallas de mayor tamaño
function desplazamiento ( i ) {
    if ( window.innerWidth < 600 ) {
        mostrador.style.transform = `translateX( ${ (i) * (-100/puntos.length) }% )`
    } else {
        if ( i != 0 && i != puntos.length-1 ) {
            mostrador.style.transform = `translateX( ${ (i-1) * (-100/puntos.length) }% )`
        } else if ( i == 0 ) {
            mostrador.style.transform = `translateX( ${ (i) * (-100/puntos.length) }% )`
        } else if ( i == puntos.length-1 ) {
            mostrador.style.transform = `translateX( ${ (i-2) * (-100/puntos.length) }% )`
        }
    }
}

//                      SELECTOR DE ELEMENTOS MEDIANTE EL CURSOR

//  Asignar evento de mouse over/out a cada elemento
elementos.forEach( ( elemento, i ) => {
    elementos[i].addEventListener( 'mouseover', () => {

        //  Limpiar estados
        limpiarActivo(elementos)

        //  Setear estado activo en el elemento respectivo
        elementos[i].classList.add( 'activo' )
    })
})

elementos.forEach( ( elemento, i ) => {
    elementos[i].addEventListener( 'mouseout', () => {

        //  Limpiar estados
        limpiarActivo(elementos)

        // asignar estado activo al elemento que corresponda en relación al punto activo
        puntos.forEach( ( punto, j ) => {
            if ( puntos[j].classList.contains( 'activo' ) ) {
                elementos[j].classList.add( 'activo' )
            }
        })
    })
})

//                      SELECTOR DE ELEMENTOS POR PUNTOS

//  Asignar evento de click a cada punto
puntos.forEach( ( punto, i ) => {
    puntos[i].addEventListener( 'click', () => {

        //  Realizar desplazamiento
        desplazamiento( i )

        //  Limpiar estados
        limpiarActivo( puntos )
        limpiarActivo( elementos )

        //  Setear estado activo en punto clickeado y elemento respectivo
        puntos[i].classList.add( 'activo' )
        elementos[i].classList.add( 'activo' )
    })
})

//                      SELECTOR DE ELEMENTOS ANTERIOR Y POSTERIOR

//  Anterior
anterior.addEventListener( 'click', () => {
    puntos.forEach( ( punto, i ) => {

        //  Buscar el elemento activo por medio de los puntos
        if ( puntos[i].classList.contains( 'activo' ) && i != 0 ){

            //  Remover estado activo del punto y el elemento
            puntos[i].classList.remove( 'activo' )
            elementos[i].classList.remove( 'activo' )

            //  Realizar desplazamiento al elemento anterior
            desplazamiento(i-1)

            //  Asignar estado activo al punto y el elemento anterior
            puntos[i-1].classList.add( 'activo' )
            elementos[i-1].classList.add( 'activo' )
        }
    })
})

//  Posterior
siguiente.addEventListener( 'click', () => {

    //  Bandera utilizada para evitar desplazamientos no deseados
    let desplazado = false
    puntos.forEach( ( punto, i ) => {

        //  Buscar el elemento activo por medio de los puntos
        if ( !desplazado && puntos[i].classList.contains( 'activo' ) && i != puntos.length-1 ){

            //  Remover estado activo del punto y el elemento
            puntos[i].classList.remove( 'activo' )
            elementos[i].classList.remove( 'activo' )

            //  Realizar desplazamiento al elemento siguiente
            desplazamiento(i+1)

            //  Asignar estado activo al punto y el elemento anterior
            puntos[i+1].classList.add( 'activo' )
            elementos[i+1].classList.add( 'activo' )

            //  Breakpoint
            desplazado = true
        }
    })
})