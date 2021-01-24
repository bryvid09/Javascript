class Cavall extends Animal {
    constructor(img) {
        super(img);
        this.x;
        this.y;
    }
    transformar(raça) {
        if (raça instanceof Tigre) {
            raça = new Conill('conill');
            return raça;
        } else if (raça instanceof Lleo) {
            raça = new Tigre('tigre');
            return raça;
        } else if (raça instanceof Cavall) {
            return raça;
        } else if (raça instanceof Conill) {
            raça = new Animal('desconegut');
            return raça;
        } else {
            return raça;
        }
    }
    mover(x, y, limite) {
        x++;
        y += 2;
        if (x == limite) {
            x = 0;
        }
        if (limite <= y) {
            y = y - limite;
        }
        let movimientos = [y, x];
        return movimientos;
    }
}