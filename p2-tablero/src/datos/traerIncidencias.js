// traerIncidencias.js - Defensa
import { obtenerJSON } from "./red.js";
import { guardarTablero } from "./persistencia.js";

// La tabla del enunciado: valor de «gravedad» → prioridad de la tarea
const PRIORIDAD = {
  // TU TURNO: las tres parejas, por ejemplo  "valor": "alta",
};

// Un elemento del fichero (TODO son strings) → los datos para crearTarea. Si no vale, LANZA.
function aDatos(elemento) {
  if(!elemento.asunto){
    throw new Error("Sin asunto");
  }
  const prioridad = PRIORIDAD[elemento.gravedad];
  // TU TURNO: si prioridad es undefined (no está en la tabla) → throw new Error("…")
  if(prioridad === undefined){
    throw new Error("Prioridad no está en la tabla")
  }
  // TU TURNO: parte «plazo» por "/" (split) y monta el texto "AAAA-MM-DD" (¡el orden cambia!)
  // TU TURNO: monta el título con el formato del enunciado («asunto» con trim)
  return { titulo, prioridad, limite };
}

export async function traerIncidencias(tablero, { url, fetchFn, storage }) {
  const lista = await obtenerJSON(url, fetchFn);   // si la descarga falla, lanza: NO lo captures aquí
  let nuevas = 0, repetidas = 0, noValidas = 0;

  for (const elemento of lista) {
    try {
      const datos = aDatos(elemento);
        if(tablero.columnas == datos.titulo){
            repetidas++
            continue
        }
      tablero.crearTarea(datos);   // si la fecha no existe (31/02…), parsearFecha lanza aquí
      nuevas++;
    } catch {
      noValidas++;                  // cualquier cosa que haya lanzado: este elemento no vale
    }
  }

  guardarTablero(tablero, storage); // alCambiar no se entera de esto: guarda tú
  return { nuevas, repetidas, noValidas };
}
