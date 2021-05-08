class Jugador {
    constructor(jugador) {
        this.puntuacion = 0;
        this.jugador = document.getElementById('jug' + jugador);
        this.panelPuntuacion = document.getElementById('punt' + jugador);
        this.posY = this.jugador.getBoundingClientRect().y;
        this.posX = this.jugador.getBoundingClientRect().x;
        this.limiteSuperior = this.posY;
        this.limiteInferior = document.getElementById('area').clientHeight - 5;
    }

    get verPosX() {
        return this.posX;
    }

    get verPosY() {
        return this.posY;
    }

    get verPuntuacion(){
        return this.puntuacion;
    }

    moverTeclado(tecla) {
        if (tecla.keyCode == 38) {
            if (this.posY > this.limiteSuperior) {
                this.posY -= 15;
            } else if (this.posY <= this.limiteSuperior) {
                this.posY = this.limiteSuperior;
            }
        } else if (tecla.keyCode == 40) {
            if (this.posY < this.limiteInferior) {
                this.posY += 15;
            } else if (this.posY >= this.limiteInferior) {
                this.posY = this.limiteInferior;
            }
        }
    }

    moverRaton(raton) {
        if (raton.clientY >= this.limiteSuperior && raton.clientY <= this.limiteInferior) {
            this.posY = raton.clientY;
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