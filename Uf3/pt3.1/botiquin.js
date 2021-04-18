class Botiquin {

    constructor(color, limite) {
        this.limite = limite - 40;
        this.color = color;
        this.tablero = document.getElementById('tablero');
        this.x = Math.floor(Math.random() * this.limite + 1);
        this.y = 0;
        this.opt = Math.floor(Math.random() * 2);
        this.botiquin;
    }

    get verX() {
        return this.x;
    }

    get verY() {
        return this.y;
    }

    get verColor() {
        return this.color;
    }

    eliminarDiv() {
        this.botiquin.remove();
    }

    crearDiv() {
        let imagen = document.createElement('img');
        imagen.src = './img/botiquines/'+this.color+'.png';
        imagen.width = '40';
        imagen.height = '40';
        this.botiquin = document.createElement('div');
        this.botiquin.style.width = '40px';
        this.botiquin.style.height = '40px';
        this.botiquin.style.position = 'absolute';
        this.botiquin.style.left = this.x + 'px';
        this.botiquin.style.top = this.y + 'px';
        this.botiquin.style.zIndex = 1;
        this.botiquin.appendChild(imagen);
        this.tablero.appendChild(this.botiquin);
    }

    mover(modo) {
        this.y += 10;
        if (modo == 'avanzado') {
            if (this.opt == 0) {
                this.x += 20;
                if (this.x > this.limite) {
                    this.x = this.limite;
                    this.opt = 1;
                }
            } else if (this.opt == 1) {
                this.x -= 20;
                if (this.x < 0) {
                    this.x = 0;
                    this.opt = 0;
                }
            }
        }
    }

    dibujar() {
        this.botiquin.style.top = this.y + 'px';
        this.botiquin.style.left = this.x + 'px';
    }

    colision(naveX, naveY) {
        if ((this.x >= naveX && this.x + 40 <= naveX + 60) &&
            (this.y >= naveY && this.y <= naveY + 40)) {
            return true;
        }
    }
}