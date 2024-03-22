export class BaseCronometro {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.radio = this.canvas.width / 2;
    }

    dibujar() {
        this.dibujarBordeVerde();
        this.dibujarEsferaCentral();
        this.dibujarNumeros();
        this.dibujarLineas();
    }

    dibujarBordeVerde() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#00A48A'; // Cambiar el color del borde a verde
        this.ctx.lineWidth = 5; // Ajustar el ancho del borde según sea necesario
        this.ctx.arc(this.radio, this.radio, this.radio - 2.5, 0, 2 * Math.PI); // El radio se reduce ligeramente para que el borde esté dentro del canvas
        this.ctx.stroke();
    }

    dibujarEsferaCentral() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#00A48A';
        this.ctx.arc(this.radio, this.radio, 10, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    dibujarNumeros() {
        this.ctx.font = this.radio / 10 + 'px arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        for (let i = 0; i < 60; i++) {
            if (i % 5 === 0) {
                //Dibujo de números
                this.ctx.fillStyle = '#00A48A';
                this.ctx.fillText(
                    i,
                    this.radio + (this.radio - 30) * 0.9 * Math.sin((i * 2 * Math.PI) / 60),
                    this.radio - (this.radio - 30) * 0.9 * Math.cos((i * 2 * Math.PI) / 60)
                );
            }
        }
    }

    dibujarLineas() {
        for (let i = 0; i < 60; i++) {
            this.ctx.strokeStyle = '#00A48A';
            //Definición de límite exterior de dibujo de líneas
            let x2 = this.radio + (this.radio - 15) * Math.sin((i * 2 * Math.PI) / 60);
            let y2 = this.radio - (this.radio - 15) * Math.cos((i * 2 * Math.PI) / 60);
            let x1 = 0;
            let y1 = 0;
            if (i % 5 === 0) {
                //Definición de límite interior de dibujo de líneas
                this.ctx.lineWidth = 3;
                x1 = this.radio + (this.radio - 30) * Math.sin((i * 2 * Math.PI) / 60);
                y1 = this.radio - (this.radio - 30) * Math.cos((i * 2 * Math.PI) / 60);
            } else {
                //Definición de límite interior de dibujo de líneas
                this.ctx.lineWidth = 1;
                x1 = this.radio + (this.radio - 25) * Math.sin((i * 2 * Math.PI) / 60);
                y1 = this.radio - (this.radio - 25) * Math.cos((i * 2 * Math.PI) / 60);
            }
            //Damos la orden de dibujar
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }
    }
}
export class ManecillasCronometro {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.radio = this.canvas.width / 2;
        this.contador = 0;
    }

    dibujarManecilla() {
        // Calcular la cantidad de horas, minutos y segundos
        let horas = Math.floor(this.contador / 360000);
        let minutos = Math.floor((this.contador % 360000) / 6000);
        let segundos = Math.floor(((this.contador % 360000) % 6000) / 100);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Limpiar el lienzo antes de redibujar
        // Dibujar la manecilla
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#00A48A';
        this.ctx.moveTo(this.radio, this.radio);

        // Calcular las coordenadas finales de la línea de la manecilla
        let anguloEnRadianes = (2 * Math.PI * this.contador) / 6000; // Convertir el ángulo a radianes
        let longitudManecilla = 0.8 * this.radio; // La manecilla puede ser el 80% del radio del círculo
        let xFin = this.radio + longitudManecilla * Math.sin(anguloEnRadianes);
        let yFin = this.radio - longitudManecilla * Math.cos(anguloEnRadianes);
        this.ctx.lineWidth = 3;
        this.ctx.lineTo(xFin, yFin);
        this.ctx.stroke();

        // Mostrar la cantidad de horas, minutos y segundos en la interfaz de usuario
        document.getElementById('horas').textContent = horas < 10 ? '0' + horas : horas;
        document.getElementById('minutos').textContent = minutos < 10 ? '0' + minutos : minutos;
        document.getElementById('segundos').textContent = segundos < 10 ? '0' + segundos : segundos;
    }
    aumentarContador() {
        this.contador = this.contador + 1; // Incrementar el contador y reiniciarlo si supera los 60 segundos
        // console.log(this.contador);
        // this.contador = (this.contador + 1) % 60; // Incrementar el contador y reiniciarlo si supera los 60 centecimas de segundos
        this.dibujarManecilla(); // Volver a dibujar la manecilla con el nuevo valor del contador
    }
}
