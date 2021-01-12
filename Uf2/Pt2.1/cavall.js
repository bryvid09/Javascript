class Cavall extends Animal{
    constructor(img){
        super(img);
        this.x;
        this.y;
    }
    transformar(raça){
        if(raça instanceof Tigre){
            raça = new Conill('conill');
            return raça;
        }
        else if(raça instanceof Lleo){
            raça = new Tigre('tigre');
            return raça;
        }
        else if(raça instanceof Conill || raça instanceof Animal){
            raça = new Animal('desconegut');
        }       
        else{
            return raça;
        } 
    }
    mover(x,y){
        let movimientos = [x+1,y+2];
        return movimientos;
    }
}