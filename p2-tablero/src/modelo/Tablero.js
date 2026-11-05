// Tablero.js — Bloque A · ✍️ A3 (el tablero) y A5 (reglas).
// En el bloque C volverás aquí para ✍️ C4 (toJSON y desdeJSON).
// El tablero TIENE tres columnas: es composición, no hereda de nadie.
import { Columna } from "./Columna.js";
import { ColumnaLlenaError, MovimientoNoPermitidoError } from "./errores.js";
import { Tarea } from "./Tarea.js";
import { TareaRecurrente } from "./TareaRecurrente.js";
import { aDatos, desdeDatos } from "./serializar.js";

export class Tablero {
  static COLUMNAS = Object.freeze(["Por hacer", "En curso", "Hecho"]);
  static VERSION_DATOS = 1; // (bloque C) si algún día cambia el formato guardado, se sube

  // Privado: #columnas, un Map nombre → Columna
  #columnas = new Map();

  // ✍️ A3 ──────────────────────────────────────────────────────────────────────
  constructor(limiteEnCurso = 3) {
    // Crea las tres columnas; solo «En curso» lleva límite WIP (limiteEnCurso)
    this.#columnas.set("Por hacer", new Columna("Por hacer"));
    this.#columnas.set("En curso", new Columna("En curso", limiteEnCurso));
    this.#columnas.set("Hecho", new Columna("Hecho"));
  }

  // static desde(datos, limiteEnCurso): un Tablero con una tarea por cada objeto de datos
  static desde(datos, limiteEnCurso) {
    const tablero = new Tablero(limiteEnCurso);
    datos.forEach((dato) => {
      tablero.crearTarea(dato);
    });
    return tablero;
  }

  // columna(nombre): la Columna, o un Error si no existe
  columna(nombre) {
    const col = this.#columnas.get(nombre);
    if (!col) {
      throw new Error(`Columna no encontrada: ${nombre}`);
    }
    return col;
  }
  // get columnas: array con las tres columnas, en orden
  get columnas() {
    return Array.from(this.#columnas.values());
  }

  // crearTarea(datos): TareaRecurrente si datos trae cadaDias, Tarea si no → a «Por hacer»
  //   y la devuelve. datos es un objeto { titulo, prioridad, limite, cadaDias }: saca cada campo
  //   y pásaselo al constructor, en su orden (new Tarea(datos) NO vale: espera el título)
  crearTarea(datos) {
    let tarea;
    if (datos.cadaDias) {
      tarea = new TareaRecurrente(datos.titulo, datos.prioridad, datos.limite, datos.cadaDias);
    } else {
      tarea = new Tarea(datos.titulo, datos.prioridad, datos.limite);
    }
    this.columna("Por hacer").añadir(tarea);
    return tarea;
  }

  // buscar(id): la tarea, esté en la columna que esté, o null
  buscar(id) {
    for (const col of this.#columnas.values()) {
      const tarea = col.tareas.find((t) => t.id === id);
      if (tarea) return tarea;
    }
    return null;
  }

  // dondeEsta(id): la Columna donde está, o null
  dondeEsta(id) {
    for (const col of this.#columnas.values()) {
      if (col.tiene(id)) return col;
    }
    return null;
  }

  // mover(id, destino): Error si no existe la tarea · Error si la columna destino está llena
  mover(id, destino) {
    const tarea = this.buscar(id);
    if (!tarea) throw new Error(`No existe la tarea con id ${id}`);

    const colDestino = this.columna(destino);
    if (colDestino.llena) {
      throw new Error(`La columna ${destino} está llena`);
    }

    const colOrigen = this.dondeEsta(id);
    colOrigen.quitar(id);
    colDestino.añadir(tarea);
    return tarea;
  }

  // completar(id): la mueve a «Hecho» y añade a «Por hacer» lo que devuelva tarea.alCompletar()
  //   ⚠️ Sin preguntar si es recurrente: eso es el polimorfismo
  completar(id) {
    const tarea = this.buscar(id);
    if (!tarea) {
      throw new Error(`No existe la tarea con id ${id}`);
    }

    const colHecho = this.columna("Hecho");
    if (colHecho.llena) {
      throw new Error("La columna Hecho está llena");
    }

    const colOrigen = this.dondeEsta(id);
    colOrigen.quitar(id);
    colHecho.añadir(tarea);

    const tareasNuevas = tarea.alCompletar();
    for (const nueva of tareasNuevas) {
      this.columna("Por hacer").añadir(nueva);
    }
  }

  // resumen(hoy = new Date()): { porHacer, enCurso, hecho, vencidas }
  //   vencidas = las que estaVencida(hoy) y NO están en «Hecho»
  resumen(hoy = new Date()) {
    const resumen = {
      porHacer: this.columna("Por hacer").tareas.length,
      enCurso: this.columna("En curso").tareas.length,
      hecho: this.columna("Hecho").tareas.length,
      vencidas: 0,
    };

    for (const col of this.#columnas.values()) {
      if (col.nombre !== "Hecho") {
        for (const tarea of col.tareas) {
          if (tarea.estaVencida(hoy)) {
            resumen.vencidas++;
          }
        }
      }
    }

    return resumen;
  }
  // ✍️ A5 · Reglas (vuelves a mover y completar) ─────────────────────────────────
  //   - Columna llena → ColumnaLlenaError (en vez de un Error cualquiera)
  //   - Sacar una tarea de «Hecho», o «moverla» a la columna en la que ya está →
  //     MovimientoNoPermitidoError. Todo se comprueba ANTES de tocar nada.
  //   Pista: mover y completar hacen casi lo mismo. Un método privado #trasladar(id, destino)
  //   con las comprobaciones evita escribirlas dos veces.

  // ✍️ C4 (bloque C) ────────────────────────────────────────────────────────────
  // toJSON(): { version, limiteEnCurso, columnas: { "Por hacer": [datos…], … } }
  //   JSON.stringify(tablero) lo llama solo. Sin él sale "{}": los # no se ven. Usa aDatos.

  /** Lo contrario de toJSON: el MISMO tablero (columnas, ids y límite WIP). Lanza si no encaja. */
  static desdeJSON(datos) {
    throw new Error("Sin hacer");
  }
}
