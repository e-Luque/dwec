// TareaConMateriales.js - Defensa

import { Tarea } from "./Tarea.js";

export class TareaConMateriales extends Tarea {
    #materiales = []
    constructor(titulo, prioridad, limite, materiales) {
        super(titulo, prioridad, limite);
        if (materiales.length === 0){
            throw new Error("No hay materiales")
        }
        this.#materiales = materiales.map((nombre) => ({ nombre, unidades: 0 }));
  }

  get materiales(){
    return this.#materiales
  }
  
  contar(nombre, unidades) {
    const material = this.#materiales.find((m) => m.nombre === nombre);
    if (!material) {
      throw new RangeError(`Material desconocido: ${nombre}`);
    }
    if (!Number.isInteger(unidades) || unidades < 0) {
      throw new RangeError("Las unidades deben ser un entero de 0 o más");
    }
    material.unidades = unidades;
  }
}

