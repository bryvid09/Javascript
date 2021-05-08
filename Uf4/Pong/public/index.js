window.onload = function () {
    let juego = new Juego();

    document.onkeydown = function (e) {
        if (juego.verEstado == 'start' && (e.keyCode == 38 || e.keyCode == 40)) {
            juego.moverJugadores(e);
        } else if (e.keyCode == 83 && juego.verEstado == 'begin') {
            juego.iniciar();
        } else if (e.keyCode == 80 && juego.verEstado == 'start') {
            juego.parar();
        } else if (e.keyCode == 80 && juego.verEstado == 'stop') {
            juego.reanudar();
        } else if (e.keyCode == 82 && (juego.verEstado != 'begin')) {
            juego.reiniciar();
        }
    }

    document.onmousemove = function (e) {
        if (juego.verEstado == 'start') {
            juego.moverJugadores(e);
        }
    }
}