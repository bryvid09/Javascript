class Animal {
    constructor(img) {
        this.img = img;
        this.opt = '+';
    }

    get verImg() {
        return this.img;
    }

    set cambiarImg(img) {
        this.img = img;
    }

    set cambiarOpt(opt) {
        this.opt = opt;
    }

    transformar(raça) {
        return this;
    }

    /**
     * 
     * @param {columna} x 
     * @param {fila} y 
     * @param {tamaño tabla} limite 
     * this.opt controla si se suma
     * o se resta y con ello consigo
     * el movimiento en "S"
     */
    mover(x, y, limite) {
        if (this.opt == '+') {
            x++;
            if (x == limite) {
                this.cambiarOpt = '-';
                x = limite - 1;
                y++;
            }
        } else {
            x--;
            if (x == -1) {
                this.cambiarOpt = '+';
                x = 0;
                y++;
            }
        }
        if (y == limite) {
            y = 0;
        }
        let movimientos = [y, x];
        return movimientos;
    }
}