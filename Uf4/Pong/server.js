var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var conexiones = [];
var jugadores = {};
var rooms = [];

app.use(express.static(path.join(__dirname, '/public')));

server.listen(8080, function () {
    console.log('Servidor corriendo en http://localhost:8080');
});

function getConexiones() {
    io.sockets.emit('getConexiones', conexiones.length);
}

function enviarJugadores() {    
    io.sockets.emit('jugadores', jugadores);
}



setInterval(enviarJugadores, 30);

io.sockets.on('connection', function (socket) {
    conexiones.push(socket);
    getConexiones();

    socket.on('start', function (data) {                    
        jugadores[socket.id] = data;
        if (!rooms.length) {
            rooms.push([data]);
        } else {
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].length == 1){
                    rooms[i].push(data);
                } else{
                    
                }
            }
        }        
    });
});

// io.sockets.on('disconnect', function(){
//     for (let i = 0; i < jugadores.length; i++) {
        
//     }
// });