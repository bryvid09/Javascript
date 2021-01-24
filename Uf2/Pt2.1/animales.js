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
        if (raça instanceof Cavall || raça instanceof Lleo || raça instanceof Tigre || raça instanceof Conill) {
            raça = new Animal('desconegut');
            return raça;
        }
        else{
            return raça;
        }
    }
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