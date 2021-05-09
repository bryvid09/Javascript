class Jugador {
    constructor(jugador) {
        this.numJug = jugador;
        this.puntuacion = 0;
        this.jugador = document.getElementById('jug' + jugador);
        this.jugador.style.visibility = 'visible';
        this.panelPuntuacion = document.getElementById('punt' + jugador);
        this.posY = this.jugador.getBoundingClientRect().y;
        this.posX = this.jugador.getBoundingClientRect().x;
        this.limiteSuperior = this.posY;
        this.limiteInferior = document.getElementById('area').clientHeight - 5;
        this.id = '0';
    }

    // Funciones las cual no puedo utilizar en webSocket
    set cambiaId(id){
        this.id = id;
    }

    get verId(){
        return this.id;
    }

    get verNum() {
        return this.numJug;
    }


    get verPosX() {
        return this.posX;
    }

    get verPosY() {
        return this.posY;
    }

    get verPuntuacion() {
        return this.puntuacion;
    }

    mover(evento) {
        if (this.numJug == 1) {
            if (evento.keyCode == 38) {
                if (this.posY > this.limiteSuperior) {
                    this.posY -= 15;
                } else if (this.posY <= this.limiteSuperior) {
                    this.posY = this.limiteSuperior;
                }
            } else if (evento.keyCode == 40) {
                if (this.posY < this.limiteInferior) {
                    this.posY += 15;
                } else if (this.posY >= this.limiteInferior) {
                    this.posY = this.limiteInferior;
                }
            }
        } else if (this.numJug == 2) {
            if (evento.clientY >= this.limiteSuperior && evento.clientY <= this.limiteInferior) {
                this.posY = evento.clientY;
            }
        }

    }    

    dibuja() {
        this.jugador.style.top = this.posY + 'px';
    }

    sumaPuntos() {
        this.puntuacion++;
        this.panelPuntuacion.innerHTML = this.puntuacion;
    }
}