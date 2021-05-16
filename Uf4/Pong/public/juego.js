class Juego{

   updateJugador(jugador){
    document.getElementById(jugador.lado).style.top = jugador.posY + 'px';
    document.getElementById(jugador.lado).style.left = jugador.posX + 'px';   
    document.getElementById(jugador.lado + 'Punto').innerHTML = jugador.puntos;
   }

   crearBola(bola) {
      let divBola = document.getElementById('bola');
      divBola.style.width = '15px';
      divBola.style.height = '15px';
      divBola.style.position = 'absolute';
      divBola.style.backgroundColor = 'red';
      divBola.style.border = 'solid 1px green';
      divBola.style.left = bola.posX + 'px';
      divBola.style.top = bola.posY + 'px';
   }

   updateBola(bola) {
      let divBola = document.getElementById('bola');
      divBola.style.top = bola.posY + 'px';
      divBola.style.left = bola.posX + 'px';
   }

   updateTiempo(tiempo) {
      let divTiempo = document.getElementById('time');
      divTiempo.innerHTML = tiempo.segundos;
   }
   
}