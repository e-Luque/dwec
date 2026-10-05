import { calculo_final, es_stock_bajo } from "./catalogo.js";

export function registrarVenta(catalogo) {
  console.log("\n--- REGISTRAR VENTA ---");

  // 1. (PEDIMOS ID DEL JUEGO)
  const idJuego = parseInt(prompt("Introduce el ID del producto a comprar:"));
  const juego = catalogo.find((item) => item.id === idJuego);

  // (BUSCAMOS SI EL JUEGO EXISTE)
  if (!juego) {
    console.log("❌ Error: Producto no encontrado.");
    return;
  }

  //PEDIR CANTIDAD Y COMPRUEBA QUE NO SE HAN METIDO DATOS BASURA 
  const cantidad = parseInt(prompt(`¿Cuántas unidades de "${juego.nombre}" vas a comprar?`));

  if (isNaN(cantidad) || cantidad <= 0) {
    console.log("❌ Cantidad no válida.");
    return;
  }

  //MIRAR STOCK
  if (cantidad > juego.stock) {
    console.log(`❌ No hay suficiente stock. Solo quedan ${juego.stock} unidades.`);
    return;
  }

  //CALCULAR EL PRECIO FINAL
  const precioUnitarioFinal = calculo_final(juego.Precio, juego.Estado_Conservacion, cantidad);
  const totalCobrar = precioUnitarioFinal * cantidad;

  // ACTUALIZAMOS EL STOCK
  juego.stock -= cantidad;

  //PEQUEÑO TICKET PARA VER EL PRECIO PAGADO 
  console.log("\n✅ ¡VENTA REGISTRADA CON ÉXITO!");
  console.log(`-----------------------------------`);
  console.log(`Producto:        ${juego.nombre}`);
  console.log(`Unidades:        ${cantidad}`);
  console.log(`Precio unitario: ${precioUnitarioFinal.toFixed(2)} € (con descuentos/recargos)`);
  console.log(`TOTAL A COBRAR:  ${totalCobrar.toFixed(2)} €`);
  console.log(`Stock restante:  ${juego.stock}`);

  
  if (es_stock_bajo(juego.stock)) {
    console.log("⚠️ ATENCIÓN: El producto se ha quedado con STOCK BAJO.");
  }
  console.log(`-----------------------------------`);
}