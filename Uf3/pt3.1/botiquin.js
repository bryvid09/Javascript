class Botiquin {
    constructor(color) {
        this.x = Math.random() * 601;
        this.y = 0;
        this.color = color;
        this.botiquin;
    }    

    crearDiv() {
        let tablero = document.getElementById("tablero");
        this.botiquin = document.createElement("img");
        this.botiquin.setAttribute("src", "./img/botiquines/" + this.color + ".png");
        this.botiquin.setAttribute("width", "30");
        this.botiquin.setAttribute("height", "30");
        this.botiquin.style.position = "absolute";
        this.botiquin.style.top = this.y + "px";
        this.botiquin.style.left = this.x + "px";
        tablero.appendChild(this.botiquin);
    }

    mover(){
        this.y = this.y + 10;
    }

    colision(posY,posX){
        if((this.x <= posX+50 && this.x>=posX) && (this.y > posY)){
            return true;
        } else {
            return false;
        }
    }

    dibujar(){
        this.botiquin.style.top = this.y + "px";
    }
}