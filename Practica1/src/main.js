import { videojuegos_retro } from "./catalogo";

console.log(
  "RETROSTOCK\n---------------------\n1)Ver catalogo\n2)Buscar producto\n3)Registrar venta\n4)Reponer stock\n5)Informe de caja\n6)Salir",
);
let opcion = prompt("Selecciona una opcion:");

switch(opcion){
    case(1):
    console.log(videojuegos_retro);
    case(2):
    console.log("Busca el producto");
    case(3):
    console.log("Registrando venta");
    case(4):
    console.log("Reponiendo stock");
    case(5):
    console.log("El informe aun no esta disponible");
    case(6):
    console.log("Finalizando programa")
}