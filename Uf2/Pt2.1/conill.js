class Conill extends Animal {

    constructor(img) {
        super(img);
    }

    transformar(raça) {
        if (raça instanceof Cavall || raça instanceof Animal || raça instanceof Lleo) {
            raça = new Animal('desconegut');
            return raça;
        } else if (raça instanceof Tigre) {
            raça = new Lleo('lleo');
            return raça;
        } else {
            return raça;
        }
    }

    mover(x, y, limite) {
        x = Math.floor(Math.random() * limite);
        y = Math.floor(Math.random() * limite);
        let movimientos = [x, y];
        return movimientos;
    }
}
