window.onload = function() {
    let juego = new Juego();
    
    document.onkeydown = function(e) {
        if (e.keyCode == 32 && juego.verEstado == 'begin'){
            juego.iniciar();
        } else if (e.keyCode == 32 && juego.verEstado == 'start'){
            juego.pause();
        } else if (e.keyCode == 32 && juego.verEstado == 'stop'){
            juego.start();
        } else if (e.keyCode == 113 && juego.verEstado == 'start') {
            juego.cambiarModo();
        }else if (e.keyCode == 65 && juego.verEstado == 'start') {            
            juego.subirDificultad();
        }else if (juego.verEstado == 'start') {
            juego.update(e);
            juego.draw();
        }
        
    }  
    
    document.onmousemove = function(e) {
        if (juego.verEstado == 'start') {
            juego.update(e);
            juego.draw();
        }
    }
}