class Nave {
    
    constructor(color,x) {
        this.tablero = document.getElementById('tablero');
        this.x = x;
        this.y = this.tablero.clientHeight - 80;
        this.color = color;
        this.puntuacion = 0;
        this.nave;
    }

    get verX() {
        return this.x;
    }

    get verY() {
        return this.y;
    }

    get verColor() {
        return this.color;
    }

    get verPuntuacion() {
        return this.puntuacion;
    }

    crearDiv(){
        let imagen = document.createElement('img');
        imagen.src = './img/naves/'+this.color+'.png';
        imagen.width = '60';
        imagen.height = '50';
        this.nave = document.createElement('div');
        this.nave.style.width = '60px';
        this.nave.style.height = '50px';        
        this.nave.style.position = 'absolute';
        this.nave.style.top = this.y + 'px';
        this.nave.style.left = this.x + 'px';
        this.nave.style.zIndex = '2';
        this.nave.appendChild(imagen);
        this.tablero.appendChild(this.nave);
    }

    dibujar() {
        this.nave.style.left = this.x + 'px';
    }

    movimientoTeclado(tecla) {
        if (tecla.keyCode == '37') {
            this.x = this.x - 5 < 0 ? 0 : this.x - 15;            
        } else if (tecla.keyCode == '39') {
            this.x = this.x + 5 > this.tablero.clientWidth - 60 ? this.tablero.clientWidth - 60 : this.x + 15;
        }
    }

    movimientoRaton(raton) {
        this.x = raton.pageX >= 0 && raton.pageX <= this.tablero.clientWidth - 60 ? raton.pageX : this.x;
    }

    colision() {
        this.puntuacion ++;
    }
}
