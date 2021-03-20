const express = require('express');
const cors = require('cors');
const { socketDistance } = require('../sockets/distance');

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io     = require('socket.io')(this.server, {
            cors: {
              origin: "http://localhost:8000",
              methods: ["GET", "POST"]
            }
        });

        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Eventos del Socket
        this.sockets();
    }

    // async conectarDB() {
    //     await dbConnection();
    // }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
         this.app.use( express.static('atlas-prato-static-client') );
        //this.app.use( express.static('public') );

    }

    routes() {
        
       // this.app.use( this.paths.auth, require('../routes/auth'));
        
    }

    sockets(){

        this.io.on("connection", socketDistance);

    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;