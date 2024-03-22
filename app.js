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
