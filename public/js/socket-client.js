var socket = io();

socket.on('connect', () => {
    // either with send()
    //socket.send("Servidor conectado");
    console.log('Servidor conectado');
});

socket.on('disconnect', () => {
    // either with send()
    //socket.send("Servidor conectado");
    console.log('Servidor desconectado');
});

socket.on('distance', ( payload ) => {
    console.log('distancia recibida');
    console.log(payload);
})