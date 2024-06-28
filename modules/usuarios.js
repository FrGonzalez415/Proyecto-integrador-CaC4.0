'use strict'

import fs from 'fs';

const Usuarios = {
    usuarios: JSON.parse(fs.readFileSync('./datos/usuarios.json', 'utf-8')),
    validarCredenciales(email, contraseña) {
        const usuario = this.usuarios.find( user => user.email === email );
        if ( usuario === undefined ) {
            return { error: 'email' };
        } else if ( usuario.contraseña !== contraseña ) {
            return { error: 'contraseña' };
        } else {
            return { usuario: usuario.nombre };
        }
    }
}

export default Usuarios;