// #!/usr/bin/env node
'use strict';
import app from './app';
import http from 'http';
import config from '-/config';

const server = http.createServer(app);
const port = normalizePort(config.server.port);

app.set('port', port);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Normalize a port into a number, string, or false.
function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) return val;  // named pipe
    if (port >= 0) return port;   // port number
    return false;
}


// Event listener for HTTP server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') log.error(error);

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            log.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;

        case 'EADDRINUSE':
            log.error(bind + ' is already in use');
            process.exit(1);
            break;

        case 'ETIMEDOUT':
            log.error('Timeout error');
            process.exit(1);
            break;

        default:
            log.error('LOG TEST:')
            log.error(error.message)
            log.error(error.code)
            throw error
    }
}

// Event listener for HTTP server "listening" event.
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    log.http(`Connected to localhost:${port}`)
}
