class Conill extends Animal{

    constructor(img){
        super(img);
    }

    transformar(raça){
        if(raça instanceof Cavall || raça instanceof Animal || raça instanceof Lleo){
            raça = new Animal('desconegut');
            return raça;
        }
        else if(raça instanceof Tigre){
            raça = new Lleo('lleo');
            return raça;
        }        
        else{
            return raça;
        }
    }
    
    mover(x,y){
        let movimientoX = Math.floor(Math.random() * 21);
        let movimientoY = Math.floor(Math.random() * 21);
        let movimientos = [x+movimientoX,y+movimientoY];
        return movimientos;
    }
}