class Nave {
    constructor(color, x, y, limWidth) {
        this.y = y;
        this.x = Math.floor(x);
        this.puntuacion = 0;
        this.color = color;
        this.nave;
        this.limWidth = limWidth - 80;
    }

    get verY() {
        return this.y;
    }

    get verX() {
        return this.x;
    }

    redimensionar(x, y, limWidth) {
        this.x = Math.floor(x);
        this.y = y;
        this.limWidth = limWidth - 80;
    }

    moverTeclado(tecla) {
        if (tecla.keyCode == '37') {
            this.x = this.x - 10 >= 31? this.x - 10 : this.x;            
        } else if (tecla.keyCode == '39') {
            this.x = this.x < this.limWidth ? parseInt(this.x) + 10 : this.x;
        }
    }

    moverRaton(raton) {
        this.x = raton.pageX > 30 && raton.pageX < this.limWidth ? raton.pageX : this.x;
    }

    crearDiv() {
        let tablero = document.getElementById("tablero");
        this.nave = document.createElement('img');
        this.nave.setAttribute("src", "./img/naves/" + this.color + ".png");
        this.nave.setAttribute("width", "50");
        this.nave.setAttribute("height", "60");
        this.nave.style.position = 'absolute';
        this.nave.style.top = this.y + 'px';
        this.nave.style.left = this.x + 'px';
        tablero.appendChild(this.nave);
    }

    dibujar() {
        this.nave.style.left = this.x + 'px';
        this.nave.style.top = this.y + 'px';
    }

    incrementarPuntos(colision) {
        if (colision) {
            this.puntuacion++;
        }
    }
}