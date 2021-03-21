class Juego {
    constructor() {
        this.wid = document.documentElement.clientWidth;
        this.hei = document.documentElement.clientHeight;
        this.panelInicio = document.createElement('div');
        let textoInicio = document.createTextNode('Presiona Enter para iniciar el juego');
        this.panelInicio.appendChild(textoInicio);
        this.panelInicio.style.width = this.wid - 40 + "px";
        this.panelInicio.style.height = this.hei - 40 + "px";
        this.panelInicio.style.margin = 'auto';
        this.panelInicio.style.backgroundColor = 'grey';
        document.body.appendChild(this.panelInicio);
        this.panel = document.createElement('div');
        this.nave1 = new Nave('rojo', this.wid / 6, this.hei - 150, this.wid);
        this.nave2 = new Nave('azul', this.wid / 1.5, this.hei - 150, this.wid);
        this.botiquines = new Array(new Botiquin('rojo',this.wid), new Botiquin('azul',this.wid));
        this.estado = 'inicio';
    }

    get verEstado() {
        return this.estado;
    }

    iniciar(event) {
        if (event.keyCode == '32') {
            document.body.removeChild(this.panelInicio);
            this.panel.setAttribute('id', 'tablero');            
            this.panel.style.width = this.wid - 40 + "px";
            this.panel.style.height = this.hei - 40 + "px";
            this.panel.style.margin = 'auto';
            this.panel.style.position = 'fixed';
            this.panel.style.backgroundImage = "url('./img/fondo.jpg')";
            this.panel.style.backgroundSize = '1300px';
            this.panel.style.backgroundRepeat = 'repeat';
            document.body.appendChild(this.panel);
            this.botiquines.map((el) => {
                el.crearDiv();
                el.mover();
                el.dibujar();
            })
            this.nave1.crearDiv();
            this.nave2.crearDiv();                             
            this.estado = 'jugando';
        }

    }

    moverFondo(juego){
        if(juego.verEstado == 'jugando') {
            juego.panel.style.backgroundPositionY = parseInt(juego.panel.style.backgroundPositionY) + 50 + 'px';
        }        
    }

    cambioTamaño(juego) {
        juego.wid = document.documentElement.clientWidth;
        juego.hei = document.documentElement.clientHeight;
        if (this.estado == 'jugando') {
            juego.panel.style.width = juego.wid - 40 + "px";
            juego.panel.style.height = juego.hei - 40 + "px";
            juego.nave1.redimensionar(juego.wid / 6, juego.hei - 150, juego.wid);
            juego.nave2.redimensionar(juego.wid / 1.5, juego.hei - 150, juego.wid);
            juego.nave1.dibujar();
            juego.nave2.dibujar();
        } else if (this.estado == 'inicio'){
            juego.panelInicio.style.width = juego.wid - 40 + "px";
            juego.panelInicio.style.height = juego.hei - 40 + "px";
        }

    }

    moverNaves(event) {
        if (event.type == 'mousemove') {
            this.nave2.moverRaton(event);
            this.nave2.dibujar();
        } else if (event.type == 'keypress' || event.type == 'keydown') {
            this.nave1.moverTeclado(event)
            this.nave1.dibujar();
        }
    }
}