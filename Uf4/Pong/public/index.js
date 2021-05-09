var conexiones = 0;
var numJugadores = 0;
var jugador;
var juego;
var jugadores = [];
var socket = io.connect('http://localhost:8080', {
    'forceNew': true
});
setInterval(function () {
    socket.on('getConexiones', function (data) {
        conexiones = data;
        if (!jugador) {
            jugador = conexiones % 2 != 0 ? new Jugador(1) : new Jugador(2); //Controlamos que no se pise un jugador con otro            
            jugador.id = socket.id;
            jugadores.push(jugador);
            socket.emit('start', jugador);
        }
    });
}, 30);

socket.on('jugadores', function (data) {
    for (let i = 0; i < data.length; i++) {
        for (let l = 0; l < data[i].length; l++) {            
            if (data[i][l].id == socket.id) {
                jugadores = data[i];
            }
        }
    }    
    if (data.length == 1) {
        document.getElementById('espera').innerHTML = 'BUSCANDO RIVAL';
    } else if (data.length == 2) {
        document.getElementById('espera').innerHTML = 'RIVAL ENCONTRADO,PRESIONA "S" SI ESTAS LISTO';
    }
});

window.onload = function () {






    document.onkeydown = function (ev) {
        if (ev.keyCode == 83 && jugadores.length == 2 && !juego) {
            juego = new Juego(jugador);
            console.log(jugadores.length);
        }
    }
}