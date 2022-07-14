import http from 'http';
import { normalizePort, errorHandlerPort, sequelize } from './src/helpers';
import express from "./src/services/express";
import { PORT, root } from "./src/config";
import routes from "./src/routes";

// load database for sequelize
import User from "./src/models/user";
import Role from "./src/models/roles";


const port = normalizePort(PORT);
const app = express(root, routes);
const server = http.createServer(app);

server.on('error server', errorHandlerPort)
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Serveur démarré sur le ' + bind);
});

// Database connect
sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a été établie avec succès ...'))
    .catch((error)=> console.error('Impossible de se connecter à la base de données:', error))
 
// { force: true } { alter: true }
sequelize.sync({ alter: true }).then(() => {
    setImmediate(() => { 
        server.listen(PORT);
    })
}).catch(err => console.log("Error: " + err));