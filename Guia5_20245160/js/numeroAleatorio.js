//Generamos un numero aleatorio que se encuentre en el rango del 1 al 25
const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
// Máximo de intentos
const numeroIntentos = 3;
// Guardara el numero de intentos que realiza el usuario (comienza en 1)
let intentos = 1;

function generarNumeroAleatorio() {
  const parrafo = document.querySelector("#idParrafo");
  let mensaje = "";

  // Si ya excedió los intentos, informamos y no hacemos más prompts
  if (intentos > numeroIntentos) {
    mensaje = `Su numero de intentos ha terminado. El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
    parrafo.innerHTML = mensaje;
    return;
  }

  // Pedimos el número al usuario
  let entrada = prompt("¿Qué número se ha generado (Intento " + intentos + " de " + numeroIntentos + ")?");

  // Si el usuario presionó "Cancelar" (entrada === null)
  if (entrada === null) {
    mensaje = "Juego cancelado por el usuario. Refresque la página para jugar de nuevo.";
    parrafo.innerHTML = mensaje;
    return;
  }

  // Convertimos a número entero
  const numero = parseInt(entrada.trim(), 10);

  // Validamos que sea un número válido dentro del rango
  if (Number.isNaN(numero) || numero < 1 || numero > 25) {
    mensaje = "Por favor ingrese un número válido entre 1 y 25. Este intento no se contará.";
    parrafo.innerHTML = mensaje;
    // no incrementamos intentos para que el usuario no pierda un intento por escribir mal
    return;
  }

  // Comparación con el número aleatorio
  if (numero === numeroAleatorio) {
    mensaje = `¡Es sorprendente! Pudiste adivinar el número oculto (${numeroAleatorio}). Refresque la página para volver a jugar.`;
    parrafo.innerHTML = mensaje;
    // opcional: bloquear botón o cambiar texto del botón.
  } else {
    // Si falla, damos pista "más alto" o "más bajo"
    const pista = numero < numeroAleatorio ? "más alto" : "más bajo";
    // Si es el último intento
    if (intentos === numeroIntentos) {
      mensaje = `Su numero de intentos ha terminado. El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
    } else {
      mensaje = `Incorrecto. El número buscado es ${pista}. Quedan ${numeroIntentos - intentos} intento(s).`;
    }
    parrafo.innerHTML = mensaje;
    // aumentamos intentos sólo cuando el usuario dio una entrada válida
    intentos++;
  }
}
