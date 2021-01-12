class Lleo extends Animal{
    constructor(img){
        super(img);
    }

    transformar(raça){
        if(raça instanceof Cavall){
            raça = new Tigre('tigre');
            return raça;
        }
        else if(raça instanceof Tigre){
            raça = new Cavall('cavall');
            return raça;
        }
        else if(raça instanceof Conill || raça instanceof Animal){
            raça = new Animal('desconegut');
            return raça;
        }
        else{
            return raça;
        }
    }

    mover(x,y){
        let movimientos;
        if(x != 0){
            x++;
            movimientos = [x,y];            
        }        
        else if(y != 0){
            y++;
            movimientos = [x,y];
        }
        else{
            movimientos = [x,y];
        }
        return movimientos;
    }
}