var numero;
var numJugadores = 0;
var jugador;
var juego;
var room = [];
var socket = io.connect('http://localhost:8080', {
    'forceNew': true
});

socket.on('getNumero', function (data) { //Asignacion de jugador dependiendo del que ya exista
    numero = data;
    if (!jugador) {
        jugador = new Jugador(data);
        jugador.id = socket.id;        
        socket.emit('start', jugador);
    }
});

socket.on('room', function (data) { // Obtencion de la sala en la cual vamos a jugar
    let status = document.getElementById('status');
    for (let i = 0; i < data.length; i++) {
        for (let l = 0; l < data[i].length; l++) {
            if (socket.id == data[i][l].id) {
                room = data[i];
                jugador = data[i][l];
            }            
        }       
    }
    
    if (room.length < 2){
        status.style.animationName = 'parpadeo';
        status.innerHTML = 'BUSCANDO RIVAL...';
        if (jugador.numJug == 1) {
            document.getElementById('jug2').style.visibility = 'hidden';
        } else {
            document.getElementById('jug1').style.visibility = 'hidden';
        }
    } else if (room.length == 2 && !jugador.ready) {
        status.style.animationName = 'parpadeo';
        status.innerHTML = 'ENCONTRADO! PRESIONA "S" SI ESTAS LISTO';
        status.style.color = '#08A1AF';
        juego = new Juego(room);
        juego.mostrarRival(jugador);        
    } else if (room.length == 2 && jugador.ready){              
        for (let i = 0; i < room.length; i++){
            if (room[i].id != socket.id && !room[i].ready) {
                status.innerHTML = 'ESPERANDO CONFIRMACIÓN DEL RIVAL...';                
            } else {
                status.innerHTML = '0';
                status.style.animationName = 'none';
                juego.iniciar();
                
            }
        }
        juego.mostrarRival(jugador); 
    }
    
});

window.onload = function(){
    document.onkeydown = function (event) {
        if (event.keyCode == 83 && !jugador.ready) {            
            socket.emit('statusJugadores',jugador);
        }
    }
}