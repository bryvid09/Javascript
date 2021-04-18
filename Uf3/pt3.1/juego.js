class Juego {

    constructor() {
        //Texto de inicio
        this.textoPortada = document.createElement('h1');
        this.textoPortada.appendChild(document.createTextNode('Presiona ENTER para comenzar'));
        this.textoPortada.style.fontSize = '60px';
        this.textoPortada.style.color = 'white';
        this.textoPortada.setAttribute('class','parpadea');

        //Creacion de tablero
        this.tablero = document.createElement('div');
        this.tablero.setAttribute('id', 'tablero');
        this.tablero.style.background = 'gray';
        this.tablero.style.width = '100%';
        this.tablero.style.position = 'absolute';
        this.tablero.style.left = '0px';
        this.tablero.style.top = '0px';
        this.tablero.style.height = (document.documentElement.clientHeight) + 'px';
        this.tablero.style.margin = 0;
        this.tablero.style.padding = 0;
        this.estado = 'begin';
        this.backgrounPosition = 0;
        this.botiquin = 0;
        this.tablero.appendChild(this.textoPortada);
        document.body.appendChild(this.tablero);
        this.botiquines = [new Botiquin('red', this.tablero.clientWidth), new Botiquin('blue', this.tablero.clientWidth)];
    }

    get verEstado() {
        return this.estado;
    }

    iniciar() {
        //Variables utilizadas
        this.textoPortada.remove();
        this.estado = 'start';
        this.jugador = 1;
        this.segundos = 0;
        this.botiquinesRojos = 1;
        this.botiquinesAzules = 1;
        this.modo = 'normal';
        this.velocidadBajada = 800;
        this.velocidadCreacion = 4000;

        //estilos
        this.tablero.style.backgroundImage = "url('./img/fondo.png')";
        this.tablero.style.backgroundSize = '100%,100%';
        this.tablero.style.backgroundPositionY = this.backgrounPosition + 'px';
       
        //Objetos
        this.nave = new Nave('red', 200);
        this.nave2 = new Nave('blue', 300);
        this.crearPanel();
        this.nave.crearDiv();
        this.nave2.crearDiv();
        this.nave.dibujar();
        this.nave2.dibujar();
        this.botiquines[0].crearDiv();
        this.botiquines[0].dibujar();
        this.botiquines[1].crearDiv();
        this.botiquines[1].dibujar();        

        //Movimientos        
        this.movimientoTab = setInterval(function (juego) {
            juego.backgrounPosition += 10;
            juego.tablero.style.backgroundPositionY = juego.backgrounPosition + 'px';
        }, 120, this);
        this.movimientoBot = setInterval(this.moverBotiquines, this.velocidadBajada, this);
        this.creacionBotiquines = setInterval(this.crearBotiquines, this.velocidadCreacion, this);
        this.time = setInterval(this.temporizador, 1000, this);
    }

    subirDificultad() {
        //Limite de velocidad 
        if (this.velocidadBajada > 90 && this.velocidadCreacion > 550) {
            this.velocidadBajada -= 80;
            this.velocidadCreacion -= 100;
            clearInterval(this.movimientoBot);
            clearInterval(this.creacionBotiquines);
            this.movimientoBot = setInterval(this.moverBotiquines, this.velocidadBajada, this);
            this.creacionBotiquines = setInterval(this.crearBotiquines, this.velocidadCreacion, this);
        }
    }

    cambiarModo() {
        if (this.modo == 'normal') {
            this.modo = 'avanzado';
        }
    }

    temporizador(juego) {
        if (juego.segundos == 60) {
            //Si el tiempo se acaba y hubo la misma cantidad de botiquines para 
            //cada jugador el juego se acaba
            if (juego.botiquinesRojos == juego.botiquinesAzules && juego.botiquines.length == 0) {
                clearInterval(juego.time);
                juego.gameOver();
                if (juego.nave.verPuntuacion > juego.nave2.verPuntuacion) {
                    juego.tiempoJuego.innerHTML = 'Fin de juego Ganador ROJO';
                    juego.tiempoJuego.style.color = 'red';               
                } else if (juego.nave.verPuntuacion < juego.nave2.verPuntuacion) {
                    juego.tiempoJuego.innerHTML = 'Fin de juego Ganador AZUL';
                    juego.tiempoJuego.style.color = 'blue';
                } else {
                    juego.tiempoJuego.innerHTML = 'Fin de juego EMPATE';
                }

            } else if (juego.botiquinesRojos == juego.botiquinesAzules) {
                //Si aun quedan botiquines por bajar se para la creación 
                clearInterval(juego.creacionBotiquines);
            }
        } else {
            juego.segundos++;
            juego.tiempoJuego.innerHTML = juego.segundos;
        }
    }

    //Fin de juego 
    gameOver() {
        this.estado = 'end';
        clearInterval(this.movimientoTab);
        clearInterval(this.movimientoBot);
        clearInterval(this.creacionBotiquines);
    }
    
    //Panel de puntuación y tiempo
    crearPanel() {
        //Creacion de elementos
        let puntuacionN1 = this.nave.verPuntuacion;
        let puntuacionN2 = this.nave2.verPuntuacion;
        let panelPadre = document.createElement('div');       
        this.divPuntuacion1 = document.createElement('div');
        this.divPuntuacion2 = document.createElement('div');
        this.tiempoJuego = document.createElement('div');
        
        //Estilos
        panelPadre.style.display = 'flex';
        panelPadre.style.justifyContent = 'space-between';
        this.tiempoJuego.style.color = 'white';
        this.divPuntuacion1.style.color = 'red';
        this.divPuntuacion2.style.color = 'blue';
        this.tiempoJuego.style.fontSize = '60px';
        this.divPuntuacion1.style.fontSize = '60px';
        this.divPuntuacion2.style.fontSize = '60px';
        this.divPuntuacion1.style.marginLeft = '30px';
        this.divPuntuacion2.style.marginRight = '30px';
        this.tiempoJuego.style.fontWeight = 'bold';
        this.divPuntuacion1.style.fontWeight = 'bold';
        this.divPuntuacion2.style.fontWeight = 'bold';
        this.tiempoJuego.style.zIndex = 3;
        this.divPuntuacion1.style.zIndex = 3;
        this.divPuntuacion2.style.zIndex = 3;
        
        //Introducir hijos
        this.tiempoJuego.appendChild(document.createTextNode(this.segundos));
        this.divPuntuacion1.appendChild(document.createTextNode(puntuacionN1));
        this.divPuntuacion2.appendChild(document.createTextNode(puntuacionN2));
        panelPadre.appendChild(this.divPuntuacion1);
        panelPadre.appendChild(this.tiempoJuego);
        panelPadre.appendChild(this.divPuntuacion2);
        this.tablero.appendChild(panelPadre);
    }

    crearBotiquines(juego) {
        let bot;
        if (juego.jugador == 1) {
            bot = new Botiquin('red', this.tablero.clientWidth);
            juego.botiquinesRojos++;
            bot.crearDiv();
            juego.botiquines.push(bot);
            juego.jugador = 2;
        } else {
            bot = new Botiquin('blue', this.tablero.clientWidth);
            juego.botiquinesAzules++;
            bot.crearDiv();
            juego.botiquines.push(bot);
            juego.jugador = 1;
        }
    }

    moverBotiquines(juego) {
        let numBot = 0;
        while (numBot < juego.botiquines.length) {
            juego.botiquines[numBot].mover(juego.modo);
            if (juego.botiquines[numBot].verY + 40 >= juego.tablero.clientHeight) {
                juego.eliminarBotiquines(juego.botiquines[numBot]);
            } else {
                if (juego.botiquines[numBot].verColor == 'red') {
                    if (juego.botiquines[numBot].colision(juego.nave.verX, juego.nave.verY)) {
                        juego.nave.colision();
                        juego.eliminarBotiquines(juego.botiquines[numBot]);
                        juego.updatePuntuacion();
                    } else {
                        juego.botiquines[numBot].dibujar();
                    }
                } else if (juego.botiquines[numBot].verColor == 'blue') {
                    if (juego.botiquines[numBot].colision(juego.nave2.verX, juego.nave2.verY)) {
                        juego.nave2.colision();
                        juego.eliminarBotiquines(juego.botiquines[numBot]);
                        juego.updatePuntuacion();
                    } else {
                        juego.botiquines[numBot].dibujar();
                    }
                }
            }
            numBot++;
        }

    }

    //Actualizacion de puntuación
    updatePuntuacion() {
        this.divPuntuacion1.innerHTML = this.nave.verPuntuacion;
        this.divPuntuacion2.innerHTML = this.nave2.verPuntuacion;
    }

    eliminarBotiquines(botiquin) {
        let posBot = this.botiquines.indexOf(botiquin);
        if (posBot != -1) {
            this.botiquines.splice(posBot, posBot + 1);
            botiquin.eliminarDiv();
        }
    }
    
    //Si presionas ENTER cuando el juego esta en curso se para 
    pause() {
        this.estado = 'stop';
        clearInterval(this.movimientoTab);
        clearInterval(this.movimientoBot);
        clearInterval(this.creacionBotiquines);
        clearInterval(this.time);
    }

    //Para Reanudar el juego despues de pararlo
    start() {
        this.estado = 'start';
        this.movimientoTab = setInterval(function (juego) {
            juego.backgrounPosition += 10;
            juego.tablero.style.backgroundPositionY = juego.backgrounPosition + 'px';
        }, 120, this);
        this.movimientoBot = setInterval(this.moverBotiquines, this.velocidadBajada, this);
        this.creacionBotiquines = setInterval(this.crearBotiquines, this.velocidadCreacion, this);
        this.time = setInterval(this.temporizador, 1000, this);
    }

    update(e) {
        if (e.type == 'mousemove') {
            this.nave2.movimientoRaton(e);
        } else if (e.type == 'keydown') {
            this.nave.movimientoTeclado(e);
        }
    }

    draw() {
        this.nave.dibujar();
        this.nave2.dibujar();
    }
}