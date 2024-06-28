'use strict'

import fs from 'fs'

//  Funciones
function filtrarJuegosPorCategoria( juego, categoria ) {
    let flag = false
    juego.categoria.forEach( cat => {
        if ( cat.nombre === categoria ) {
            flag = true
    };
    })
    return flag
}

//  Filtros

const Filtros = {
    filtrarPorCategoria( categoria ) {
        //  Devuelve un array con los juegos de la categoría indicada
        return JSON.parse( fs.readFileSync( './datos/juegos.json', 'utf-8' ) ).filter( juego => filtrarJuegosPorCategoria( juego, categoria ) )
    }
}

export default Filtros;