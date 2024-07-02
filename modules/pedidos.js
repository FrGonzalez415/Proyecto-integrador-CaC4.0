'use strict'

import fs from 'fs';
import Juegos from './juegos.js';

const Pedidos = {
    pedidos: JSON.parse(fs.readFileSync('./datos/pedidos.json', 'utf-8')),

    // Método para registrar un nuevo pedido
    registrarPedido(nuevoPedido) {
        let pedido = {
            id: this.pedidos.length + 1,
            idUsuario: nuevoPedido.idUsuario,
            productos: nuevoPedido.productos,
            fecha: nuevoPedido.fecha,
            total: 0,
            estado: "pendiente"
        };
        pedido.productos.forEach( producto => pedido.total += Juegos.obtenerJuego(producto.id).precio * producto.cantidad );
        this.pedidos.push(pedido);
        fs.writeFileSync('./datos/pedidos.json', JSON.stringify(this.pedidos, null, ' '));
        return { pedido: pedido.id };
    },

    // Método para obtener pedido por ID
    obtenerPedido(id) {
        const pedido = this.pedidos.find( pedido => pedido.id === id );
        if ( pedido !== undefined ) {
            return { pedido };
        } else {
            return { error: 'ID incorrecto' };
        }
    },

    // Método para modificar un pedido
    modificarPedido(pedido) {
        const index = this.pedidos.findIndex( pedido => pedido.id === pedido.id );
        if ( index !== -1 ) {
            this.pedidos[index] = pedido;
            fs.writeFileSync('./datos/pedidos.json', JSON.stringify(this.pedidos, null, ' '));
            return { pedido: pedido.id };
        } else {
            return { error: 'ID incorrecto' };
        }
    },

    // Metodo para modificar el estado de un pedido
    modificarEstado(id, estado) {
        const index = this.pedidos.findIndex( pedido => pedido.id === id );
        if ( index !== -1 ) {
            this.pedidos[index].estado = estado;
            fs.writeFileSync('./datos/pedidos.json', JSON.stringify(this.pedidos, null, ' '));
            return { pedido: this.pedidos[index] };
        } else {
            return { error: 'ID incorrecto' };
        }
    },

    // Metodo para modificar 

    // Método para eliminar un pedido
    eliminarPedido(id) {
        const index = this.pedidos.findIndex( pedido => pedido.id === id );
        if ( index !== -1 ) {
            let pedidoEliminado = this.pedidos[index];
            this.pedidos.splice(index, 1);
            fs.writeFileSync('./datos/pedidos.json', JSON.stringify(this.pedidos, null, ' '));
            return { pedidoEliminado };
        } else {
            return { error: 'ID incorrecto' };
        }
    }
}

export default Pedidos;