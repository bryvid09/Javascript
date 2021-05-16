function Jugador(id, lado, posY, posX, limiteSup, limiteInf, puntos) {
    this.id = id;
    this.lado = lado;
    this.posY = posY;
    this.posX = posX;
    this.limiteSup = limiteSup;
    this.limiteInf = limiteInf;
    this.puntos = puntos;
    this.name = 'jugador';
}

function Bola(direccionX, direccionY, limiteSup, limiteInf, posX, posY, limiteWidth) {
    this.direccionX = direccionX;
    this.direccionY = direccionY;
    this.limiteSup = limiteSup;
    this.limiteInf = limiteInf;
    this.posX = posX;
    this.posY = posY;
    this.punto = false;
    this.limiteWidth = limiteWidth;
    this.name = 'bola';
}

function tiempo(segundos) {
    this.segundos = 0;
    this.name = 'tiempo';
}

var jugadores = {};


var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var jugadores = [];
var rooms = [];
var jugador;
var conexiones = 0;
var cuentaTiempo;
var movimientoBola;
var bola;

app.use(express.static(path.join(__dirname, '/public')));

server.listen(8080, function () {
    console.log('Servidor corriendo en http://localhost:8080');
});

function emitirTiempo() {
    clearInterval(cuentaTiempo);
    cuentaTiempo = setInterval(function () {
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].length > 2) {
                rooms[i][2].segundos++;
                if (rooms[i][2].segundos == 21) {
                    rooms[i] = [];
                    io.sockets.emit('fin', '');
                }
            }
        }
    }, 1000);
}

function moverBola() {
    movimientoBola = setInterval(function () {
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].length > 2) {
                for (let j = 0; j < rooms[i].length; j++) {
                    if (rooms[i][j].name == 'bola') {
                        if (rooms[i][j].direccionX == 0) { //Movimiento izquierda
                            rooms[i][j].posX -= 10;
                            if (rooms[i][j].posX <= rooms[i][0].posX && rooms[i][j].posY <= rooms[i][0].posY + 80 && rooms[i][j].posY >= rooms[i][0].posY) {
                                rooms[i][j].direccionX = 1;
                                rooms[i][j].posX = rooms[i][0].posX + 11;
                            } else if (rooms[i][j].posX <= 5) {
                                rooms[i][j].posX = 0;
                                rooms[i][1].puntos++;
                                if (rooms[i][j].direccionY == 0) {
                                    rooms[i][j].posY -= 10;
                                    rooms[i][j].punto = true;
                                } else {
                                    rooms[i][j].posY += 10;
                                    rooms[i][j].punto = true;
                                }
                            }
                        } else if (rooms[i][j].direccionX == 1) { //movmiento derecha
                            rooms[i][j].posX += 10;
                            if (rooms[i][j].posX >= rooms[i][1].posX - 16 && rooms[i][j].posY < rooms[i][1].posY + 80 && rooms[i][j].posY > rooms[i][1].posY) {
                                rooms[i][j].direccionX = 0;
                                rooms[i][j].posX = rooms[i][1].posX - 16;
                            } else if (rooms[i][j].posX >= rooms[i][j].limiteWidth) {
                                rooms[i][j].posX = rooms[i][j].limiteWidth;
                                rooms[i][0].puntos++;
                                if (rooms[i][j].direccionY == 0) {
                                    rooms[i][j].posY -= 10;
                                    rooms[i][j].punto = true;
                                } else {
                                    rooms[i][j].posY += 10;
                                    rooms[i][j].punto = true;
                                }
                            }
                        }

                        if (rooms[i][j].direccionY == 0) {
                            rooms[i][j].posY -= 10;
                            if (rooms[i][j].posY <= rooms[i][j].limiteSup) {
                                rooms[i][j].posY = rooms[i][j].limiteSup;
                                rooms[i][j].direccionY = 1;
                            }
                        } else if (rooms[i][j].direccionY == 1) {
                            rooms[i][j].posY += 10;
                            if (rooms[i][j].posY >= rooms[i][j].limiteInf) {
                                rooms[i][j].posY = rooms[i][j].limiteInf;
                                rooms[i][j].direccionY = 0;
                            }
                        }
                        io.sockets.emit('moverBola', rooms[i][j]);
                    }
                }
            }
        }
    }, 80);
}

function emitLado() {
    let lado = 'izquierda';
    if (rooms.length) {
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].length == 1) {
                if (rooms[i][0].lado == 'izquierda') {
                    lado = 'derecha';
                }
            }
        }
    }
    io.sockets.emit('lado', lado);
}



io.on('connection', function (socket) {
    conexiones++;

    emitLado();

    socket.on('start', function (data) {
        var jugador = new Jugador(socket.id, data.lado, data.posY, data.posX, data.limiteSup, data.limiteInf, data.puntos);
        jugadores.push(jugador);
        if (!rooms.length) {
            rooms.push([jugador]);
        } else {
            let encontrada = false;
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].length == 1) {
                    rooms[i].push(jugador);
                    rooms[i].push(new tiempo(0));
                    encontrada = true;
                }
            }
            if (!encontrada) {
                rooms.push([jugador]);
            }
        }        
    });

    setInterval(function () {
        socket.emit('rooms', rooms);
    }, 35);

    socket.on('bola', function (data) {
        if (data.posY >= data.limiteInf) {
            data.posY = data.limiteInf;
        } else if (data.posY <= data.limiteSup) {
            data.posY = data.limiteSup + 5;
        }
        bola = new Bola(data.direccionX, data.direccionY, data.limiteSup, data.limiteInf, data.posX, data.posY, data.limiteWidth);
        for (let i = 0; i < rooms.length; i++) {
            for (let j = 0; j < rooms[i].length; j++) {
                if (rooms[i][j].name == 'jugador' && rooms[i][j].id == socket.id) {
                    if (rooms[i].length < 4 && rooms[i].length > 1) {
                        rooms[i].push(bola);
                    }
                }
            }
        }
    });

    socket.on('nuevaBola', function (data) {
        bola = new Bola(data.direccionX, data.direccionY, data.limiteSup, data.limiteInf, data.posX, data.posY, data.limiteWidth);
        for (let i = 0; i < rooms.length; i++) {
            for (let j = 0; j < rooms[i].length; j++) {
                if (rooms[i][j].name == 'jugador' && rooms[i][j].id == socket.id) {
                    rooms[i][3] = bola;
                }
            }
        }
    })

    emitirTiempo();
    clearInterval(movimientoBola);
    moverBola();

    socket.on('mover', function (data) {
        if (data[0] === 'mousemove') {
            for (let i = 0; i < rooms.length; i++) {
                for (let j = 0; j < rooms[i].length; j++) {
                    if (rooms[i][j].name == 'jugador' && rooms[i][j].lado == 'izquierda' && socket.id == rooms[i][j].id) {
                        if (data[1] >= rooms[i][j].limiteSup && data[1] <= rooms[i][j].limiteInf - 5) {
                            rooms[i][j].posY = data[1];
                        }
                    }
                }
            }
        } else if (data[0] === 'keydown') {
            for (let i = 0; i < rooms.length; i++) {
                for (let j = 0; j < rooms[i].length; j++) {
                    if (rooms[i][j].name == 'jugador' && rooms[i][j].lado == 'derecha' && socket.id == rooms[i][j].id) {
                        if (data[1] == 38) {
                            if (rooms[i][j].posY > rooms[i][j].limiteSup) {
                                rooms[i][j].posY -= 15;
                            } else if (rooms[i][j].posY <= rooms[i][j].limiteSup) {
                                rooms[i][j].posY = rooms[i][j].limiteSup;
                            }
                        } else if (data[1] == 40) {
                            if (rooms[i][j].posY < rooms[i][j].limiteInf) {
                                rooms[i][j].posY += 15;
                            } else if (rooms[i][j].posY >= rooms[i][j].limiteInf) {
                                rooms[i][j].posY = rooms[i][j].limiteInf;
                            }
                        }
                    }
                }
            }
        }
    });

    

});