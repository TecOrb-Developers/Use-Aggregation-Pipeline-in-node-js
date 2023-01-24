import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import server from './server';
const { createServer } = require("http");
const { Server } = require("socket.io");
require('./utils/cronHandler')



// Constants
const serverStartMsg = 'Express server started on port: ',
port = (process.env.PORT || 3009);

const httpServer = createServer(server);
// Start server
httpServer.listen(port, () => {
    logger.info(serverStartMsg + port);
    console.log(serverStartMsg + port);
});

const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
    pingTimeout: 60000,
    transport: 'polling'
});
var events = require('events');
const eventEmitter = new events.EventEmitter();
export = {
    io: io
};
// setTimeout(() => {
    // require('@utils/socketHandler')(eventEmitter)
    require('@utils/cronHandler')
// }, 10)
