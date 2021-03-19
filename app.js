require('dotenv').config();

const Server = require('./models/server');
//console.log(Server);
const server = new Server();
//console.log(server);

server.listen();