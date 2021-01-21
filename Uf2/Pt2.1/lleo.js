class Lleo extends Animal {
    constructor(img) {
        super(img);
    }

    transformar(raça) {
        if (raça instanceof Cavall) {
            raça = new Tigre('tigre');
            return raça;
        } else if (raça instanceof Tigre) {
            raça = new Cavall('cavall');
            return raça;
        } else if (raça instanceof Conill || raça instanceof Animal) {
            raça = new Animal('desconegut');
            return raça;
        } else {
            return raça;
        }
    }

    mover(x, y, limite) {
        if (x != Math.floor(limite / 2) && x != limite - 1) {
            x ++;
        } else if (x == limite - 1) {
            x = 0;
        }
        if (y != Math.floor(limite / 2) && y != limite - 1) {
            y ++;
        } else if (y != limite - 1) {
            y = 0;
        }
        let movimientos = [x, y];
        return movimientos;
    }
}
