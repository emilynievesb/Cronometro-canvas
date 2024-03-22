import { BaseCronometro, ManecillasCronometro } from './classes.js';

let inicio = false; // Estado inicial del cronómetro
let intervalID = null; // Inicialmente, no hay intervalo activo
let baseCronometro = new BaseCronometro('baseCronometro');
baseCronometro.dibujar();

let manecillasCronometro = new ManecillasCronometro('manecillasCronometro');
manecillasCronometro.dibujarManecilla();

document.getElementById('botonReset').addEventListener('click', function (e) {
    e.preventDefault();
    inicio = !inicio; // Alternar el estado de inicio
    this.classList.toggle('pressed'); // Alternar la clase pressed en el botón de reset

    if (inicio) {
        if (!intervalID) {
            // Si no hay un intervalo activo, crea uno
            intervalID = setInterval(() => {
                manecillasCronometro.aumentarContador();
            }, 10);
        }
    } else {
        clearInterval(intervalID); // Si se pausa, detiene el intervalo pero lo mantiene activo para reanudación
        intervalID = null; // Limpia el ID del intervalo para indicar que está en pausa
    }
});

document.getElementById('botonInicio').addEventListener('click', function (e) {
    e.preventDefault();
    clearInterval(intervalID); // Detiene el intervalo
    this.classList.toggle('pressed'); // Alternar la clase pressed en el botón de reset
    intervalID = null; // Limpia el ID del intervalo
    manecillasCronometro.contador = 0; // Restablece el contador del cronómetro
    manecillasCronometro.dibujarManecilla(); // Vuelve a dibujar la manecilla
});

function actualizarReloj() {
    // Obtener la fecha y hora actual
    let ahora = new Date();

    // Obtener los componentes de la fecha y hora
    let dia = ahora.getDate();
    let mes = ahora.getMonth() + 1; // Los meses comienzan desde 0
    let año = ahora.getFullYear();

    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();

    // Formatear los componentes de la fecha y hora para que tengan siempre dos dígitos
    dia = dia < 10 ? '0' + dia : dia;
    mes = mes < 10 ? '0' + mes : mes;
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;

    // Construir las cadenas de fecha y hora
    let fechaActual = dia + '/' + mes + '/' + año;
    let horaActual = horas + ':' + minutos + ':' + segundos;

    // Actualizar el contenido de los elementos HTML
    document.getElementById('fecha').textContent = fechaActual;
    document.getElementById('hora').textContent = horaActual;
}

// Actualizar el reloj cada segundo
setInterval(actualizarReloj, 1000);
