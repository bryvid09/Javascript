var socket = io.connect('http://localhost:8080', {
    'forceNew': true
});

var jugador;
var room = [];
var juego = new Juego;
var bola;

window.onload = function () {

    /**
     * Emite el lado del jugador para que no se pisen
     * unos con otros
     */
    socket.on('lado', function (data) {
        let elemento = document.getElementById(data)
        if (!jugador) {
            jugador = {
                lado: data,
                posY: elemento.getBoundingClientRect().y,
                posX: elemento.getBoundingClientRect().x,
                limiteSup: elemento.getBoundingClientRect().y,
                limiteInf: document.getElementById('area').clientHeight - 5,
                puntos: 0,
            }
            socket.emit('start', jugador);
        }
        bola = {
            direccionX: 1,
            direccionY: 0,
            limiteSup: 80,
            limiteInf: document.getElementById('area').clientHeight + 62,
            posX: Math.floor(document.getElementById('area').clientWidth / 2),
            posY: 250,
            limiteWidth: document.getElementById('area').clientWidth - 18,
        }
        socket.emit('bola', bola);
        juego.crearBola(bola);
    });

    /**
     * Separe los jugadores por salas no se logro identificar la
     * desconexion del jugador, tambien en esta función pinto a los
     * jugadores, la bola y el tiempo.
     */
    socket.on('rooms', function (rooms) {          
        
        for (let i = 0; i < rooms.length; i++) {
            for (let j = 0; j < rooms[i].length; j++) {
                if (rooms[i][j].name == 'jugador' && rooms[i][j].id == socket.id) {
                    room = rooms[i];
                    for (let l = 0; l < room.length; l++) {
                        if (room[l].name == 'jugador') {
                            juego.updateJugador(room[l]);
                        }
                        if (room[l].name == 'bola') {
                            if (room[l].punto) {
                                if (room[l].posX < document.getElementById('area').clientWidth / 2) {
                                    bola = {
                                        direccionX: 1,
                                        direccionY: 0,
                                        limiteSup: 80,
                                        limiteInf: document.getElementById('area').clientHeight + 62,
                                        posX: Math.floor(document.getElementById('area').clientWidth / 2),
                                        posY: 250,
                                        limiteWidth: document.getElementById('area').clientWidth - 18,
                                    }
                                } else {
                                    bola = {
                                        direccionX: 0,
                                        direccionY: 0,
                                        limiteSup: 80,
                                        limiteInf: document.getElementById('area').clientHeight + 62,
                                        posX: Math.floor(document.getElementById('area').clientWidth / 2),
                                        posY: 250,
                                        limiteWidth: document.getElementById('area').clientWidth - 18,
                                    }
                                }
                                socket.emit('nuevaBola', bola);
                            }
                            juego.updateBola(room[l]);
                        }
                        if (room[l].name == 'tiempo') {
                            juego.updateTiempo(room[l]);
                        }
                    }
                }
                if (room.length == 1) {
                    document.getElementById('time').innerHTML = 'Esperando rival';
                }
            }
        }
    });

    /**
     * Fin del juego
     */
    socket.on('fin', function() {
        document.getElementById('time').innerHTML = 'FIN!';
        document.getElementById('bola').style.visibility = 'hidden';
    });
    
    document.onkeydown = function (event) {
        socket.emit('mover', [event.type, event.keyCode]);        
    }

    document.onmousemove = function (event) {
        socket.emit('mover', [event.type, event.pageY]);
    }
}