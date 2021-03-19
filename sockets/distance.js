const socketDistance = (socket) => {

    console.log('cliente conectado');

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    })

    socket.emit('distance', 10);

    // socket.on('distance', () => {
    //     this.io.emit('el numero de la distancia', 'desde el server');
    // })

}

module.exports = {
    socketDistance
}