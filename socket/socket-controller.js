
const socketController = (socket) => {

    socket.on('enviar-mensaje-desde-socket', (payload, callback) => {

        const id = 123456

        callback({payload, id, hora:new Date().getTime()});

        //Tambien puedo mandar un nuevo evento (en lugar del callback) al socket emisor
        //Este solo sera procesado por el socket que me disparo el evento
        socket.emit('mensaje-confirmacion', 'ok');

        //Si quiero enviar un mensake a todos los demas socket, menos al receptor
        socket.broadcast.emit('enviar-mensaje-desde-server', 'Hola a todos!!')

    });
}

module.exports = {
    socketController  
};