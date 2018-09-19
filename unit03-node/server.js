/**
 * Sample (Node.js, non-Express) webserver for CS 336, Unit 3 - Run with either:
 *    node script.js
 *    npm start
 */

const http = require('http');
const http_status = require('http-status-codes');

const HOST = "127.0.0.1";
const PORT = 3000;

const server = http.createServer((req, res) => {
    'use strict';
    if (req.url == '/hello') {
        res.writeHead(http_status.OK, {'Content-Type': 'text/plain'});
        res.end('Hello, Node.js!');
    } else {
        res.writeHead(http_status.NOT_FOUND, {'Content-Type': 'text/plain'});
        res.end();
    }
});

server.listen(PORT, HOST, () => {
    console.log('Server running on ' + HOST + ':' + PORT + '.');
});

// Load/Invoke a function from a custom module.
let my_module = require('./module');
console.log(my_module.my_function());
