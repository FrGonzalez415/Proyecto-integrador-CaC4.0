'use strict'

import DB from '../DB/db.js'

const Categorias = {
    // Método para obtener todas las categorías
    obtenerCategorias() {
        return new Promise((resolve, reject) => {
            DB.obtenerTabla('categoria')
                .then((result) => {
                    resolve(result)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

export default Categorias