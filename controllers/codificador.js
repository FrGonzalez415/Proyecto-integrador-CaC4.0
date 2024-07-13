'use state'

import bcrypt from 'bcrypt';

const Codificador = {
    // Método para codificar una contraseña
    codificarPassword(password) {
        return bcrypt.hash(password, 8)
    },
    // Método para comparar una contraseña con su hash
    compararPassword(password, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

export default Codificador