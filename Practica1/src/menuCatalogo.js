import { es_stock_bajo } from "./catalogo.js";

function imprimirJuego(juego) {
  const aviso = es_stock_bajo(juego.stock) ? "⚠️ Stock bajo" : "";
  console.log(
    "ID: ${juego.id} | ${juego.nombre} (${juego.Plataforma}) - ${juego.Precio}€ | Stock: ${juego.stock} ${aviso}",
  );
}

//OPCION 1
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
      const categoriaBuscada = prompt(
        "Introduce la categoría (RPG, Plataformas, Aventura...):",
      );

      const filtrados = catalogo.filter(
        (juego) =>
          juego.Categoria.toLowerCase() === categoriaBuscada.toLowerCase(),
      );

      if (filtrados.length === 0) {
        console.log(
          '❌ No se encontraron juegos de la categoría "' +
            categoriaBuscada +
            '".',
        );
      } else {
        console.log(`\n--- CATÁLOGO: ${categoriaBuscada.toUpperCase()} ---`);
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

// OPCION 2
export function buscarProducto(catalogo) {
  console.log("\n--- BUSCAR PRODUCTO ---");
  console.log("1. Buscar por ID");
  console.log("2. Buscar por título (nombre parcial)");

  const tipoBusqueda = parseInt(prompt("¿Cómo quieres buscar? (1 o 2):"));

  let productoEncontrado = null;

  if (tipoBusqueda === 1) {
    const idBuscado = parseInt(prompt("Introduce el ID del producto:"));

    // BUSCAR POR ID
    productoEncontrado = catalogo.find((juego) => juego.id === idBuscado);
  } else if (tipoBusqueda === 2) {
    const textoBuscado = prompt(
      "Introduce el título (o parte del título):",
    ).toLowerCase();

    // BUSCAR POR NOMBRE
    productoEncontrado = catalogo.find((juego) =>
      juego.nombre.toLowerCase().includes(textoBuscado),
    );
  } else {
    console.log("❌ Opción de búsqueda no válida.");
    return;
  }

  // Quitar el UNDEFINED
  if (!productoEncontrado) {
    console.log(
      "❌ No se ha encontrado ningún producto que coincida con la búsqueda.",
    );
  } else {
    const aviso = es_stock_bajo(productoEncontrado.stock)
      ? "⚠️ Stock bajo"
      : "OK";

    console.log("\n✅ ¡Producto encontrado!");
    console.log(`-----------------------------------`);
    console.log(`ID:           ${productoEncontrado.id}`);
    console.log(`Nombre:       ${productoEncontrado.nombre}`);
    console.log(`Plataforma:   ${productoEncontrado.Plataforma}`);
    console.log(`Categoría:    ${productoEncontrado.Categoria}`);
    console.log(`Precio Base:  ${productoEncontrado.Precio} €`);
    console.log(`Estado:       ${productoEncontrado.Estado_Conservacion}`);
    console.log(
      `Stock:        ${productoEncontrado.stock} unidades (${aviso})`,
    );
    console.log(`-----------------------------------`);
  }
}
