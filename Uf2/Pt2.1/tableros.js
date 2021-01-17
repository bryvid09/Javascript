class Tablero {
  constructor(medida) {
    this.tablero1 = new Array(medida);
    this.tablero2 = new Array(medida);
    this.altura = medida;
  }

  iniciarTablero() {
    for (let i = 0; i < this.tablero1.length; i++) {
      this.tablero1[i] = new Array(this.altura);
      for (let j = 0; j < this.tablero1; i++) {
        this.tablero1[i][j] = null;
      }
    }
  }

  rellenarAnimales() {
    let nAnimales =
      Math.floor(
        Math.random() * (this.tablero1.length * this.tablero1.length) -2
      ) + 2;
    for (let i = 0; i < nAnimales; i++) {
      let fila = Math.floor(Math.random() * this.tablero1.length);
      let columna = Math.floor(Math.random() * this.tablero1.length);
      let animal = Math.floor(Math.random() * 6) + 1;
      if (this.tablero1[fila][columna] == null) {
        switch (animal) {
          case 1:
            this.tablero1[fila][columna] = new Animal("desconegut");
            break;
          case 2:
            this.tablero1[fila][columna] = new Cavall("cavall");
            break;
          case 3:
            this.tablero1[fila][columna] = new Tigre("tigre");
            break;
          case 4:
            this.tablero1[fila][columna] = new Lleo("lleo");
            break;
          case 5:
            this.tablero1[fila][columna] = new Conill("conill");
            break;
        }
      }
    }
  }

  mostrarTabla() {
    let tabla = "<table border='1'>";
    this.tablero1.forEach((fila) => {
      tabla += "<tr>";
      fila.forEach((columna) => {
        if (columna != null) {
          tabla += "<td><img src ='./img" + columna.verImg + ".png'></td>";
        } else {
          tabla += "<td></td>";
        }
      });
      tabla += "</tr></table>";
    });
    document.write(tabla);
  }
}
