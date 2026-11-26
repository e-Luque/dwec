// app.js — Bloque B · ✍️ B4, B5 y B6. Conecta el modelo (el tablero) con la página: pinta, escucha y avisa.
// Usa tus piezas: crearTarjeta/pintarLista, leerFormulario/mostrarErrores y delegar.
// La estructura de la página (ids, data-*) está en index.html y NO se cambia: la usan los tests.
import { ErrorTablero } from "../modelo/errores.js";
import { delegar } from "./delegacion.js";
import { leerFormulario, mostrarErrores } from "./formulario.js";
import { crearTarjeta, pintarLista } from "./tarjeta.js";

/** Botones de cada tarjeta según su columna: [texto, data-accion] */
const ACCIONES = {
  "Por hacer": [["Empezar →", "empezar"],
                ["Renombrar →", "renombrar"]],
  "En curso": [
    ["← Volver", "volver"],
    ["✓ Completar", "completar"],
  ],
  Hecho: [],
};
// Crear Boton (Parece que no lo tenía creado, asi que he echo uno nuevo, ni lo he probado)
const crearBoton = (texto, accion) => {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.dataset.accion = accion;
  boton.textContent = texto;
  return boton;
};

// ✍️ B6 · validar(datos) → { campo: "mensaje" } con los errores (objeto vacío si todo está bien)
//   - titulo: obligatorio y como mucho 80 caracteres
//   - cadaDias (si viene): entero mayor que 0. Si es correcto pero no hay limite, el error va
//     en «limite»: una tarea que se repite necesita fecha límite
export function validar(datos) {
  const errores = {};

  if (datos.titulo.length === 0 || datos.titulo.length > 80) {
    errores.titulo = "Escribe un título de 1 a 80 caracteres";
  }
  if (datos.cadaDias !== undefined) {
    if (!Number.isInteger(datos.cadaDias) || datos.cadaDias <= 0) {
      errores.cadaDias = "Escribe un número entero mayor que 0";
    }
  }
  if (datos.cadaDias !== undefined && !errores.cadaDias && !datos.limite) {
    errores.limite = "Una tarea que se repite necesita fecha límite";
  }
  return errores;
}

/**
 * Arranca la interfaz dentro de raiz (el <main id="app">). Los listeners se ponen UNA vez aquí;
 * pintar() solo cambia nodos, así que repintar no los duplica.
 * opciones.hoy: fecha fija para los tests · opciones.alCambiar(tablero): tras cada cambio (UD6)
 */
export function iniciarApp(raiz, tablero, { hoy = null, alCambiar = () => {} } = {}) {
  const form = raiz.querySelector("#form-alta");
  const aviso = raiz.querySelector("#aviso");
  const columnas = raiz.querySelector("#columnas");
  const resumen = raiz.querySelector("#resumen");

  // ✍️ B4 · pintar(): deja la página igual que el modelo cada vez que se llama, y NO pone listeners
  //   - cada columna ([data-columna="…"]): sus tareas en el orden de ordenadas(), con pintarLista en su
  //     .lista, y en cada .tarjeta sus botones según ACCIONES: <button type="button" data-accion="…">
  //   - el .contador de cada columna: (n), o (n/límite) en la que tiene límite WIP
  //   - [data-dato="progreso"]: hechas ÷ total en %, redondeado (con el tablero vacío, 0 %)
  //   - [data-dato="vencidas"]: las vencidas de tablero.resumen(ahora)
  //   La fecha de hoy: const ahora = hoy ?? new Date();  (los tests pasan una fija)
  function pintar() {
    const ahora = hoy ?? new Date();
    for (const columna of tablero.columnas) {
      const zona = raiz.querySelector(`[data-columna="${columna.nombre}"]`);
      const lista = zona.querySelector(".lista");
      const contador = zona.querySelector(".contador");

      pintarLista(lista, columna.ordenadas(), ahora);   

      const n = columna.tareas.length;               
      contador.textContent = columna.limiteWip === null ? `(${n})` : `(${n}/${columna.limiteWip})`;
      
      for (const tarjeta of lista.querySelectorAll(".tarjeta")) {
        for (const [texto, accion] of ACCIONES[columna.nombre]){
          const boton = document.createElement("button");
          boton.type = "button";
          boton.dataset.accion = accion;
          boton.textContent = texto;
          tarjeta.append(boton);
        }
      }
    }
    const hechas = tablero.columna("Hecho").tareas.length;
    const total = tablero.columnas.reduce((suma, acc) => suma + acc.tareas.length, 0);
    const progreso = total === 0 ? 0 : Math.round((hechas / total) * 100);
    raiz.querySelector('[data-dato="progreso"]').textContent = `${progreso} %`;
    const { vencidas } = tablero.resumen(ahora);
    raiz.querySelector('[data-dato="vencidas"]').textContent = vencidas;
  }

  // 👀 Resuelto: avisar("texto") enseña el aviso; avisar("") lo esconde
  function avisar(mensaje) {
    aviso.textContent = mensaje;
    aviso.hidden = mensaje === "";
  }

  // ✍️ B5 · UN listener, puesto UNA vez aquí (nunca dentro de pintar): clic en los botones de las
  //   tarjetas, con delegar sobre `columnas`. empezar → «En curso», volver → «Por hacer», completar.
  //   Tras cada cambio que sale bien: avisar(""), pintar() y alCambiar(tablero).
  //   Si el tablero lanza un ErrorTablero → avisar(error.message) y no se repinta.
  //   Cualquier otro error → se relanza (es un fallo del programa).
  //   Pista: una función cambiar(accion) con el try/catch te sirve también para el B6.
  function cambiar(hacerCambio) {
    try {
      hacerCambio();
      avisar("");
      pintar()
      alCambiar(tablero)
    }  catch (error) {
    if (error instanceof ErrorTablero) {
      avisar(error.message);
    } else {
      throw error
    }
  }
}
  delegar(columnas, "click", "button[data-accion]", (boton) => {
    const tarjeta = boton.closest(".tarjeta");
    const id = Number(tarjeta.dataset.id);
    if (boton.dataset.accion === "empezar") {
      cambiar(() => tablero.mover(id, "En curso"));
    }
    if (boton.dataset.accion === "completar") {
      cambiar(() => tablero.completar(id));
    }
    if (boton.dataset.accion === "volver") {
      cambiar(() => tablero.mover(id, "Por hacer"));
    }
    if (boton.dataset.accion === "renombrar") {
      crearFormulario(tarjeta.dataset.datos)
    }
  });

  // ✍️ B6 · submit de `form`: preventDefault, leerFormulario, validar y mostrarErrores. Si hay errores,
  //   no se crea nada. Si no, tablero.crearTarea(datos) (como un cambio más) y form.reset().
  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const datos = leerFormulario(form);
    const errores = validar(datos);
    mostrarErrores(form, errores);

    if (Object.keys(errores).length > 0) {
      return;
    }

    cambiar(() => tablero.crearTarea(datos));
    form.reset();
  });
  pintar();
  return { pintar };
}
const crear = (etiqueta, datos) => Object.assign(document.createElement(etiqueta), datos);
function crearFormulario(tarea) {
  const form = crear("form", { noValidate: true });
  form.dataset.form = "renombrar";
  const etiqueta = crear("label", { textContent: `Título nuevo de «${tarea.titulo}»` });
  etiqueta.append(crear("input", { name: "titulo", type: "text", value:tarea.titulo }));
  const error = crear("p", { className: "error" });
  error.dataset.errorDe = "titulo";
  const enviar = crear("button", { type: "submit", textContent: "Guardar" });
  form.append(etiqueta, error, enviar, crearBoton("Cancelar", "cancelar"));
  return form;
}

(void ACCIONES, ErrorTablero, delegar, leerFormulario, mostrarErrores, pintarLista); // (borra esta línea cuando los uses)
