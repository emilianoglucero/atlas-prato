const Gpio = require('pigpio').Gpio;
console.log('start');

const socketDistance = (socket) => {

    let distance;

    // gpio code start

    // The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
        const MICROSECDONDS_PER_CM = 1e6/34321;

        const trigger = new Gpio(23, {mode: Gpio.OUTPUT});
        const echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});

        trigger.digitalWrite(0); // Make sure trigger is low

        const watchHCSR04 = () => {
        let startTick;

        echo.on('alert', (level, tick) => {
            if (level == 1) {
            startTick = tick;
            } else {
            const endTick = tick;
            const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
            //console.log(diff / 2 / MICROSECDONDS_PER_CM);
            distance = diff / 2 / MICROSECDONDS_PER_CM;
            //console.log(distance)
            socket.emit('distance', distance);
            }
        });
        };

        watchHCSR04();

        // Trigger a distance measurement once per second
        setInterval(() => {
            trigger.trigger(10, 1); // Set trigger high for 10 microseconds
        }, 1000);

    // gpio code end

    console.log('cliente conectado');
    //console.log(distance);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    })

    // setInterval(() => {
    //     console.log(distance);
    //     socket.emit('distance', distance);
    // }, 1000);

    //socket.emit('distance', distance);

    // socket.on('distance', () => {
    //     this.io.emit('el numero de la distancia', 'desde el server');
    // })

}




module.exports = {
    socketDistance
}