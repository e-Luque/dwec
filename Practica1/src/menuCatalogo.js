import { es_stock_bajo } from "./catalogo.js";

// Función simple para imprimir un juego con su aviso
function imprimirJuego(juego) {
  const aviso = es_stock_bajo(juego.stock) ? "⚠️ Stock bajo" : "";
  console.log(
    "ID: ${juego.id} | ${juego.nombre} (${juego.Plataforma}) - ${juego.Precio}€ | Stock: ${juego.stock} ${aviso}",
  );
}

// Función principal del menú de catálogo
export function gestionarMenuCatalogo(catalogo) {
  console.log(
    "\n--- VER CATÁLOGO ---" +
      "\n1. Ver todo el catálogo" +
      "\n2. Filtrar por categoría" +
      "\n3. Solo productos con stock bajo",
  );

  const subopcion = parseInt(prompt("Selecciona una subopción (1-3):"));

  switch (subopcion) {
    case 1:
      console.log("\n--- TODO EL CATÁLOGO ---");
      catalogo.map((juego) => imprimirJuego(juego));
      break;

    case 2: {
      const catBuscada = prompt(
        "Introduce la categoría (RPG, Plataformas, Aventura...):",
      );

      // Filtramos la lista por categoría
      const filtrados = catalogo.filter(
        (juego) => juego.Categoria.toLowerCase() === categoriaBuscada.toLowerCase(),
      );

      if (filtrados.length === 0) {
        console.log(
          "❌ No se encontraron juegos de la categoría "${categoriaBuscada}".",
        );
      } else {
        console.log(`\n--- CATÁLOGO: ${catBuscada.toUpperCase()} ---`);
        filtrados.map((juego) => imprimirJuego(juego));
      }
      break;
    }

    case 3: {
      console.log("\n--- PRODUCTOS CON STOCK BAJO ---");
      const conStockBajo = catalogo.filter((juego) =>
        es_stock_bajo(juego.stock),
      );

      if (conStockBajo.length === 0) {
        console.log("✅ No hay ningún producto con stock bajo.");
      } else {
        conStockBajo.map((juego) => imprimirJuego(juego));
      }
      break;
    }

    default:
      console.log("❌ Subopción no válida.");
      break;
  }
}
