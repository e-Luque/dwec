export function añadirStock(catalogo) {
  console.log("\n--- AÑADIR STOCK ---");

  // 1. (PEDIMOS ID DEL JUEGO)
  const idJuego = parseInt(prompt("Introduce el ID del producto a comprar:"));
  const juego = catalogo.find((item) => item.id === idJuego);

  // (BUSCAMOS SI EL JUEGO EXISTE)
  if (!juego) {
    console.log("❌ Error: Producto no encontrado.");
    return;
  }

  //PEDIR CANTIDAD Y COMPRUEBA QUE NO SE HAN METIDO DATOS BASURA 
  const cantidad = parseInt(prompt(`¿Cuántas unidades de "${juego.nombre}" vas a añadir?`));

  if (isNaN(cantidad) || cantidad <= 0) {
    console.log("❌ Cantidad no válida.");
    return;
  }


  // ACTUALIZAMOS EL STOCK
  juego.stock += cantidad;


    console.log("\n✅ ¡STOCK AÑADIDO CON ÉXITO!");
  console.log(`-----------------------------------`);
  console.log(`Producto:        ${juego.nombre}`);
  console.log(`Unidades:        ${cantidad}`);
  console.log(`Stock total actual:  ${juego.stock}`);
  
}