import { videojuegos_retro } from "./catalogo.js";
import { gestionarMenuCatalogo } from "./menuCatalogo.js";
import { buscarProducto } from "./menuCatalogo.js"
import { registrarVenta } from "./ventas.js";
import { añadirStock } from "./sumaStock.js";

let opcion = 0;

do {
  console.log(
    "\n--- RETROSTOCK ---" +
    "\n1) Ver catálogo" +
    "\n2) Buscar producto" +
    "\n3) Registrar venta" +
    "\n4) Reponer stock" +
    "\n5) Informe de caja" +
    "\n6) Salir"
  );

  opcion = parseInt(prompt("Selecciona una opción (1-6):"));

  switch (opcion) {
    case 1:
      // Llamamos a la función que maneja el submenú del catálogo
      gestionarMenuCatalogo(videojuegos_retro);
      break;

    case 2:
      buscarProducto(videojuegos_retro)
      break;

    case 3:
      registrarVenta(videojuegos_retro)
      break;

    case 4:
      añadirStock(videojuegos_retro)
      break;

    case 5:
      console.log("OPCION AUN NO DISPONIBLE");
      break;

    case 6:
      console.log("👋 Finalizando programa. ¡Hasta pronto!");
      break;

    default:
      console.log("❌ Opción no válida. Introduce un número del 1 al 6.");
      break;
  }

} while (opcion !== 6);