class Juego{
    constructor(jugadores){
        this.juagadores = jugadores;
        //this.bola = new Bola(0);        
        this.estado = 'begin';
    }

    mostrarRival(jugador){
        for (let i = 0; i < this.juagadores.length; i++){
            if (this.juagadores[i].id != jugador.id){
                document.getElementById('jug'+this.juagadores[i].numJug).style.visibility = 'visible';
            }
        }
    }

    get verEstado(){
        return this.estado;
    }
    
    

    iniciar(){
        this.estado = 'start';
        this.segundos = 0;
        // this.bola.crearElemento();      
        // document.getElementById('time').innerHTML = this.segundos;
        // this.movimientoBola = setInterval(this.moverBola,50,this);
        this.cuentaTiempo = setInterval(this.tiempo,1000,this);
    }

    

    tiempo(juego){
        juego.segundos++;
        if(juego.segundos == 60) {
            juego.parar();            
        } else{
            document.getElementById('status').innerHTML = juego.segundos;
        }
    }

    dibujarJugador(){
        this.jugador.dibuja();
    }

    parar(){
        if (this.segundos == 60) {
            this.estado = 'end';
            this.bola.eliminarBola();
            clearInterval(this.movimientoBola);
            clearInterval(this.cuentaTiempo);
            if (this.jugador1.verPuntuacion > this.jugador2.verPuntuacion) {
                document.getElementById('time').innerHTML = 'Ganador jugador 1';
            } else if(this.jugador1.verPuntuacion < this.jugador2.verPuntuacion) {
                document.getElementById('time').innerHTML = 'Ganador jugador 2';
            } else {
                document.getElementById('time').innerHTML = 'Empate !!';
            }
        }
        this.estado = 'stop';
        clearInterval(this.cuentaTiempo);
        clearInterval(this.movimientoBola);
    }

    reanudar(){
        this.movimientoBola = setInterval(this.moverBola,50,this);
        this.cuentaTiempo = setInterval(this.tiempo,1000,this);
        this.estado = 'start';
    }

    reiniciar(){
        this.segundos = 0;
        document.getElementById('time').innerHTML = this.segundos;
        document.getElementById('punt1').innerHTML = 0;
        document.getElementById('punt2').innerHTML = 0;
        this.estado = 'start';
        clearInterval(this.movimientoBola);
        clearInterval(this.cuentaTiempo);
        this.jugador1 = new Jugador('1');
        this.jugador2 = new Jugador('2');
        this.reiniciarBola(0);                
        this.movimientoBola = setInterval(this.moverBola,50,this);
        this.cuentaTiempo = setInterval(this.tiempo,1000,this);
    }

    moverJugadores(event) {        
        this.jugador.mover();
    }



    moverBola(juego){
        let punto = juego.bola.mover(juego.jugador1.verPosX,juego.jugador1.verPosY,juego.jugador2.verPosX,juego.jugador2.verPosY);
        juego.bola.dibujar();
        if (punto) {
            if (juego.bola.verPosX < document.getElementById('area').clientWidth / 2) {
                juego.reiniciarBola(1);
                juego.jugador2.sumaPuntos();
            } else {                
                juego.reiniciarBola(0);
                juego.jugador1.sumaPuntos();
            }
        }
    }

    reiniciarBola(direccionX){
        this.bola.eliminarBola();
        this.bola = new Bola(direccionX);
        this.bola.crearElemento();
    }
}