var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var conexiones = 0;
var jugadores = {};
var rooms = [];

app.use(express.static(path.join(__dirname, '/public')));

server.listen(8080, function () {
    console.log('Servidor corriendo en http://localhost:8080');
});

function getNumero() {
    let num = 1;
    if (rooms.length) {
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].length == 1) {
                if (rooms[i][0].numJug == 1) {
                    num = 2;
                }
            }
        }
    }
    io.sockets.emit('getNumero', num);
}

function enviarRoom() {
    io.sockets.emit('room', rooms);
}



io.sockets.on('connection', function (socket) {    

    getNumero();



    socket.on('start', function (data) {
        jugadores[socket.id] = data;
        if (!rooms.length) {
            rooms.push([data]);
        } else {
            let encontrada = false; // Para comprobar si encontro una room con un jugador
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].length == 1) {
                    rooms[i].push(data);
                    encontrada = true // Si la encuentra no hara falta crear otra
                }
            }
            if (!encontrada) { // Creacion de otra room
                rooms.push([data]);
            }
        }
        enviarRoom();
    });

    socket.on('statusJugadores', function (data) {
        for (let i = 0; i < rooms.length; i++) {
            for (let l = 0; l < rooms[i].length; l++) {
                if (socket.id == rooms[i][l].id) {
                    rooms[i][l].ready = true;
                }
            }
        }
        enviarRoom();
    });

    socket.on('disconnect', function () {
        for (let i = 0; i < rooms.length; i++) {
            for (let l = 0; l < rooms[i].length; l++) {
                if (socket.id == rooms[i][l].id) {
                    rooms[i].splice(l, 1);                    
                }
            }
            if (!rooms[i].length) {
                rooms.splice(i, 1);
            }
        }
        delete jugadores[socket.id];              
        enviarRoom();
    });
});