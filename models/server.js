const express = require('express');
const cors = require('cors');
const { socketController } = require('../socket/socket-controller');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        //---Socket
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server); //Informacion de todos los socket conectados
        //---

        this.paths = {};

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sovkets de mi aplicacion
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );
    }

    routes() {}

    sockets() {

        //Dejo ejemplo basico comentado y reemplazo por uso de controlador
        // this.io.on('connection', socket => {
        //     //console.log('Cliente Conectado :)', socket.id/*No usar. Es muy "volatil"*/);

        //     //---Lista de eventos perosinalizados
        //     socket.on('enviar-mensaje-desde-socket', (payload, callback /*Nota 1*/) => {
        //         //console.log(payload);

        //         //Esto si quiero mandar una respuesta a todos los socket conectados
        //         //this.io.emit('enviar-mensaje-desde-server',payload)

        //         const id = 123456

        //         callback({id, hora:new Date().getTime()});
        //     });
        //     //---
            
        //     // socket.on('disconnect', () => {
        //     //     console.log('Cliente Desconectado :(', socket.id /*No usar. Es muy "volatil"*/);
        //     // });

        //     //Nota 1
        //     /* El tercer argumento es opcional. Se agrega si necesitamos respuesta por parte del server
        //     en el mensaje enviado. Por ejemplo, si se grabo algo en la base y devuelve un id*/            
            
        // });

        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen( this.port, () => { //Cuando es servidor de socket es this.server y no this.app
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}

module.exports = Server;