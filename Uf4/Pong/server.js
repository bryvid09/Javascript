var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '/public')));

server.listen(8080, function() {
    console.log('Servidor corriendo en http://localhost:8080');
});



var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', function(socket) {
    console.log('UN CLIENTE CONNECT');
})