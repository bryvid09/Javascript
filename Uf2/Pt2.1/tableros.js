class Tablero {
    constructor(medida) {
        medida = parseInt(medida);        
        this.tablero1 = new Array(medida);
        this.tablero2 = new Array(medida);
        this.altura = medida;
    }

    iniciarTablero() {
        for (let i = 0; i < this.tablero1.length; i++) {
            this.tablero1[i] = new Array(this.altura);
            for (let j = 0; j < this.tablero1[i].length; j++) {
                this.tablero1[i][j] = null;
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
        let tabla = "<div><table border='1'>";
        for (let i = 0; i < this.tablero1.length; i++) {
            tabla += "<tr>";
            for (let j = 0; j < this.tablero1[i].length; j++) {
                if (this.tablero1[i][j] != null) {
                    tabla += "<td><img src='./img/" + this.tablero1[i][j].verImg + ".png' width='75' height='75'></td>";
                } else {
                    tabla += "<td width='75' height='75'></td>";
                }
            }
            tabla += "</tr>";
        }
        tabla += "</table><br><button id='mover'>Mover</button></div>";
        document.getElementById("tableros").innerHTML = tabla;
    }

    mostrarTabla2() {
        let tabla = "<div><table border='1'>";
        for (let i = 0; i < this.tablero2.length; i++) {
            tabla += "<tr>";
            for (let j = 0; j < this.tablero2[i].length; j++) {
                if (this.tablero2[i][j] != null) {
                    tabla += "<td><img src='./img/" + this.tablero2[i][j].verImg + ".png' width='75' height='75'></td>";
                } else {
                    tabla += "<td width='75' height='75'></td>";
                }
            }
            tabla += "</tr>";
        }
        tabla += "</table><br>";
        document.getElementById("tableros").innerHTML = tabla;
    }

}
