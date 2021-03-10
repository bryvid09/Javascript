class Nave{
    constructor(color, x){
        this.y = 400;
        this.x = x;
        this.puntuacion = 0;
        this.color = color;
        this.nave;
    }

    moverTeclado(tecla){        
        if(tecla.keyCode == '37'){
            this.x = this.x > 0? this.x-10 : this.x;
        } else if(tecla.keyCode == '39'){
            this.x = this.x < 600? parseInt(this.x)+10 : this.x;
        }        
    }

    moverRaton(raton){
        this.x = raton.pageX > 0 && raton.pageX < 601? raton.pageX : this.x;
    }

    crearDiv(){
        this.nave = document.createElement('img');
        this.nave.setAttribute("src","./img/"+this.color+".png");
        this.nave.setAttribute("width","60");
        this.nave.setAttribute("height","80");
        this.nave.style.position = 'absolute';
        this.nave.style.top = this.y+'px';       
        this.nave.style.left = this.x + 'px';
        document.body.appendChild(this.nave);
    }

    dibujar(){
        this.nave.style.left = this.x + 'px';
    }
}