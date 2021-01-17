class Animal{
    constructor(img){
        this.img = img;
    }
    get verImg(){
        return this.img;
    }
    set cambiarImg(img){
        this.img = img;
    }
    transformar(raça){
        raça = new Animal('desconegut');
        return raça;
    }
    mover(x,y){
        if(y == '+'){
            x++;
        }
        else if(y == '-'){
            x--;
        }
        return x;
    }
}