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

  mover(x, y) {
    let lados = Math.floor(Math.random() * 5) + 1;
    switch (lados) {
      case 1:
        x-=4;
        break;
      case 2:
        y-=4;
        break;
      case 3:
        x+=4;
        break;
      case 4:
        y+=4;
        break;
    }
    let movimientos = [x,y];
    return movimientos;
  }
}
