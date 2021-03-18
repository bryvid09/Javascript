class Botiquin {
    constructor(color, widthTab) {
        let rand = Math.floor(Math.random() * widthTab - 80);
        if (rand <= 40) {
            rand = 40;
        }
        this.x = rand;
        this.y = 10;
        this.color = color;
        this.botiquin;
    }

    crearDiv() {
        let tablero = document.getElementById("tablero");
        this.botiquin = document.createElement("img");
        this.botiquin.setAttribute("src", "./img/botiquines/" + this.color + ".png");
        this.botiquin.setAttribute("width", "45");
        this.botiquin.setAttribute("height", "40");
        this.botiquin.style.position = "absolute";
        this.botiquin.style.top = this.y + "px";
        this.botiquin.style.left = this.x + "px";
        tablero.appendChild(this.botiquin);
    }

    mover() {
        this.y = this.y + 10;
    }

    colision(posY, posX) {
        if ((this.x <= posX + 50 && this.x >= posX) && (this.y > posY)) {
            return true;
        } else {
            return false;
        }
    }

    dibujar() {
        this.botiquin.style.top = this.y + "px";
    }
}