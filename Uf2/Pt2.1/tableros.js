class Tablero {
    constructor() {
        let medida = prompt("Medida del tablero");
        medida = parseInt(medida);
        while (medida < 3) {
            medida = parseInt(prompt("Medida del tablero"));
        }
        this.tablero1 = new Array(medida);
        this.tablero2 = new Array(medida);
        this.altura = medida;
        this.start();
    }

    /**
     * inicia las tablas al empezar la partida
     */
    start() {
        this.iniciarTablero(this.tablero1);
        this.iniciarTablero(this.tablero2);
        this.rellenarAnimales();
        this.mostrarTabla(this.tablero1);
    }

    /**
     * Inicia la tabla pasada
     * como parametro
     */
    iniciarTablero(tabla) {
        for (let i = 0; i < tabla.length; i++) {
            tabla[i] = new Array(this.altura);
            for (let j = 0; j < tabla[i].length; j++) {
                tabla[i][j] = null;
            }
        }
    }

    /**
     * Rellena los animales en tabla1, el
     * While controla que no aparezca 
     * un animales y que tampoco
     * rellene todo el tablero
     */
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

    /**
     * Mostrar las tablas segun
     * los parametros pasados
     */
    mostrarTabla() {
        let t1;
        let t2;

        if (arguments.length == 1) {
            t1 = "<div><table border='1'>";
            for (let i = 0; i < arguments[0].length; i++) {
                t1 += "<tr>";
                for (let j = 0; j < arguments[0][i].length; j++) {
                    if (arguments[0][i][j] != null) {
                        t1 += "<td><img src='./img/" + arguments[0][i][j].verImg + ".png'></td>";
                    } else {
                        t1 += "<td></td>";
                    }
                }
                t1 += "</tr>";
            }
            t1 += "</table><button id='move' onclick='move()'>Mover</button><button id='restart' onclick='reiniciar()'>Reiniciar</button></div>";
            document.getElementById("contenedor").innerHTML = t1;            
        } else if (arguments.length == 2) {
            t1 = "<div><table border='1'>";

            for (let i = 0; i < arguments[0].length; i++) {
                t1 += "<tr>";
                for (let j = 0; j < arguments[0][i].length; j++) {
                    if (arguments[0][i][j] != null) {
                        t1 += "<td><img src='./img/" + arguments[0][i][j].verImg + ".png'></td>";
                    } else {
                        t1 += "<td></td>";
                    }
                }
                t1 += "</tr>";
            }

            t1 += "</table><button id='move' onclick='move()'>Mover</button><button id='restart' onclick='reiniciar()'>Reiniciar</button></div>";
            t2 = "<div><table border='1'>";

            for (let i = 0; i < arguments[1].length; i++) {
                t2 += "<tr>";
                for (let j = 0; j < arguments[1][i].length; j++) {
                    if (arguments[1][i][j] != null) {
                        t2 += "<td><img src='./img/" + arguments[1][i][j].verImg + ".png'></td>";
                    } else {
                        t2 += "<td></td>";
                    }
                }
                t2 += "</tr>";
            }

            t2 += "</table></div>";
            document.getElementById("contenedor").innerHTML = t1 + t2;            
        }
    }


    /**
     * Movimiento de los animales
     */
    moverAnimales() {
        for (let i = 0; i < this.tablero1.length; i++) {
            for (let j = 0; j < this.tablero1[i].length; j++) {
                if (this.tablero1[i][j] instanceof Animal) {
                    let posiciones = this.tablero1[i][j].mover(j, i, this.altura);
                    if (this.tablero2[posiciones[0]][posiciones[1]] instanceof Animal) {
                        let evolucion = this.tablero2[posiciones[0]][posiciones[1]].transformar(this.tablero1[i][j]);
                        this.tablero2[posiciones[0]][posiciones[1]] = evolucion;
                    } else {
                        this.tablero2[posiciones[0]][posiciones[1]] = this.tablero1[i][j];
                    }
                }
            }
        }
        this.mostrarTabla(this.tablero1,this.tablero2);       
        this.copiarTabla(); 
        this.iniciarTablero(this.tablero2);
    }

    /**
     * Copia tabla2 a tabla1
     */
    copiarTabla(){
        for(let i = 0; i < this.tablero1.length; i++){
            for(let j = 0; j < this.tablero1[i].length; j++){
                this.tablero1[i][j] = this.tablero2[i][j];
            }
        }
    }
}