class Tablero {
    constructor(medida) {
        medida = parseInt(medida);
        this.tablero1 = new Array(medida);
        this.tablero2 = new Array(medida);
        this.altura = medida;
        this.tabla = "";
    }

    iniciarTablero() {
        for (let i = 0; i < this.tablero1.length; i++) {
            this.tablero1[i] = new Array(this.altura);
            this.tablero2[i] = new Array(this.altura);
            for (let j = 0; j < this.tablero1[i].length; j++) {
                this.tablero1[i][j] = null;
                this.tablero2[i][j] = null;
            }
        }
    }

    rellenarAnimales() {
        let nAnimales = Math.floor(Math.random() * this.tablero1.length * this.tablero1.length);
        while (nAnimales == this.tablero1.length * this.tablero1.length || nAnimales <= 1) {
            nAnimales = Math.floor(Math.random() * this.tablero1.length * this.tablero1.length);
        }
        let i = 1;
        while (i <= nAnimales) {
            let fila = Math.floor(Math.random() * this.tablero1.length);
            let columna = Math.floor(Math.random() * this.tablero1.length);
            let animal = Math.floor(Math.random() * 6) + 1;
            if (this.tablero1[fila][columna] == null) {
                switch (animal) {
                    case 1:
                        this.tablero1[fila][columna] = new Animal("desconegut");
                        i++;
                        break;
                    case 2:
                        this.tablero1[fila][columna] = new Cavall("cavall");
                        i++;
                        break;
                    case 3:
                        this.tablero1[fila][columna] = new Tigre("tigre");
                        i++;
                        break;
                    case 4:
                        this.tablero1[fila][columna] = new Lleo("lleo");
                        i++;
                        break;
                    case 5:
                        this.tablero1[fila][columna] = new Conill("conill");
                        i++;
                        break;
                }
            }
        }
    }

    mostrarTabla() {
        this.tabla = "<div id='t1'><table border='1'>";
        for (let i = 0; i < this.tablero1.length; i++) {
            this.tabla += "<tr>";
            for (let j = 0; j < this.tablero1[i].length; j++) {
                if (this.tablero1[i][j] != null) {
                    this.tabla += "<td><img src='./img/" + this.tablero1[i][j].verImg + ".png'></td>";
                } else {
                    this.tabla += "<td></td>";
                }
            }
            this.tabla += "</tr>";
        }
        this.tabla += "</table><br>";
        document.getElementById("tableros").innerHTML = this.tabla;
    }


    moverAnimales() {
        for (let i = 0; i < this.tablero1.length; i++) {
            for (let j = 0; j < this.tablero1[i].length; j++) {
                if (this.tablero1[i][j] != null) {
                    let posiciones = this.tablero1[i][j].mover(i, j, this.altura);
                    if (this.tablero1[posiciones[0]][posiciones[1]] instanceof Animal) {
                        this.tablero2[posiciones[0]][posiciones[1]] = this.tablero1[posiciones[0]][posiciones[1]];
                        this.tablero1[posiciones[0]][posiciones[1]] = this.tablero1[i][j].transformar(this.tablero1[posiciones[0]][posiciones[1]]);
                        this.tablero1[i][j] = null;
                    }
                }
            }
        }
        this.mostrarTabla();
    }

    
}
