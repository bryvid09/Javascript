var conexiones = 0;
var numJugadores = 0;
var jugador;
var juego;
var room = [];
var socket = io.connect('http://localhost:8080', {
    'forceNew': true
});

socket.on('getConexiones', function (data) {
    conexiones = data;
    if (!jugador) {
        jugador = conexiones % 2 != 0 ? new Jugador(1) : new Jugador(2); //Controlamos que no se pise un jugador con otro            
        jugador.id = socket.id;        
        socket.emit('start', jugador);
    }
});

socket.on('room', function (data) {
    for (let i = 0; i < data.length; i++) {
        for (let l = 0; l < data[i].length; l++) {
            if (socket.id == data[i][l].id) {
                room = data[i];
            }
        }       
    }    
    console.log(room);
});