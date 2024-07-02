'use strict'

function cargarJuegos( juegos ) {

    let vidrieraHTML = document.createElement('div')
    vidrieraHTML.classList.add('vidriera')

    juegos.forEach( ( juego, i ) => {
    let juegosHTML = document.createElement('div')
    juegosHTML.classList.add('juego')
    let InfoJuegosHTML = document.createElement('div')
    InfoJuegosHTML.classList.add('info')
    InfoJuegosHTML.innerHTML = `
            <p class="nombre">${juego.titulo}</p>
            <p class="precio">${juego.precio}</p>
            <a class="boton" href="#">Ver</a>
            `
    juegosHTML.appendChild(InfoJuegosHTML)
    juegosHTML.style.backgroundImage = `url(${juego.imagen})`
    vidrieraHTML.appendChild(juegosHTML)
    })
    return vidrieraHTML
}

export default cargarJuegos

/* <h1 class="titulo">Juegos Clásicos</h1>
      <div class="vidriera">
        <div class="juego">
          <div class="info">
            <p class="nombre">Damas</p>
            <p class="precio">$15,000</p>
            <a class="boton" href="./mostrador.html">Ver</a>
          </div>
        </div> */