class Bola {
    constructor(direccion) {
        this.area = document.getElementById('area');
        this.limiteSuperior = 80;
        this.limiteInferior = area.clientHeight + 62;
        this.posX = Math.floor(this.area.clientWidth / 2);
        this.posY = Math.floor(Math.random() * this.area.clientHeight) + 85;
        this.direccionX = direccion;
        this.direccionY = Math.floor(Math.random() * 2);
    }

    get verPosX() {
        return this.posX;
    }

    crearElemento() {
        if (this.posY >= this.limiteInferior) {
            this.posY = this.limiteInferior;
        } else if (this.posY <= this.limiteSuperior) {
            this.posY = this.limiteSuperior + 5;
        }
        this.bola = document.createElement('div');
        this.bola.setAttribute('id','bola');
        this.bola.style.position = 'absolute';
        this.bola.style.left = this.posX + 'px';
        this.bola.style.top = this.posY + 'px';
        this.bola.style.backgroundColor = 'red';
        this.bola.style.border = 'solid 1px green';
        this.bola.style.width = '15px';
        this.bola.style.height = '15px';
        this.area.appendChild(this.bola);
    }

    mover(jug1X, jug1Y, jug2X, jug2Y) {
        // Movimiento izquierda
        if (this.direccionX == 0) {
            this.posX -= 10;
            if (this.posX <= jug1X + 11 && this.posY < jug1Y + 80 && this.posY > jug1Y) {
                this.posX = jug1X + 11;
                this.direccionX = 1; //Cambio de direccion EjeX
            } else if (this.posX <= 5) {
                this.posX = 0;
                if (this.direccionY == 0) {
                    this.posY -= 10;
                    return true;
                } else {
                    this.posY += 10;
                    return true;
                }
            }
            //Movimiento derecha
        } else if (this.direccionX == 1) {
            this.posX += 10;
            if (this.posX >= jug2X - 16 && this.posY < jug2Y + 80 && this.posY > jug2Y) {
                this.posX = jug2X - 16;
                this.direccionX = 0;
            } else if (this.posX >= this.area.clientWidth - 18) {
                this.posX = jug2X;
                if (this.direccionY == 0) {
                    this.posY -= 10;
                    return true;
                } else {
                    this.posY += 10;
                    return true;
                }
            }

        }
        //Movimiento arriba
        if (this.direccionY == 0) {
            this.posY -= 10;
            if (this.posY <= this.limiteSuperior) {
                this.posY = this.limiteSuperior;
                this.direccionY = 1; //Cambio de direccion EjeY
            }
            //Movimiento abajo
        } else if (this.direccionY == 1) {
            this.posY += 10;
            if (this.posY >= this.limiteInferior) {
                this.posY = this.limiteInferior
                this.direccionY = 0; //Cambio de direccion EjeY
            }
        }
        return false;
    }

    dibujar() {
        this.bola.style.left = this.posX + 'px';
        this.bola.style.top = this.posY + 'px';
    }

    eliminarBola(){
        this.bola.remove();
    }
}