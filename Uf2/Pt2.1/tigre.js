class Tigre extends Animal {
    constructor(img) {
        super(img);
    }

    transformar(raça) {
        if (raça instanceof Cavall) {
            raça = new Conill("conill");
            return raça;
        } else if (raça instanceof Lleo) {
            raça = new Cavall("cavall");
            return raça;
        } else if (raça instanceof Conill) {
            raça = new Lleo("lleo");
            return raça;
        } else if (raça instanceof Animal) {
            raça = new Animal("desconegut");
            return raça;
        } else {
            return raça;
        }
    }

    mover(x, y, limite) {
        let lados = Math.floor(Math.random() * 5) + 1;
        switch (lados) {
            case 1:
                for (let i = 4; i > 0; i--) {
                    x --;
                    if (x < 0) {
                        x = limite - 1;
                    }
                }
                break;
            case 2:
                for (let i = 4; i > 0; i--) {
                    y --;
                    if (y < 0) {
                        y = limite - 1;
                    }
                }
                break;
            case 3:
                for (let i = 0; i > 4; i++) {
                    x ++;
                    if (x > limite - 1) {
                        x = 0;
                    }
                }
                break;
            case 4:
                for (let i = 0; i > 4; i++) {
                    y ++;
                    if (y > limite - 1) {
                        y = 0;
                    }
                }
                break;
        }
        let movimientos = [x, y];
        return movimientos;
    }
}
