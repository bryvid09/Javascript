class tablero {
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

  
}
