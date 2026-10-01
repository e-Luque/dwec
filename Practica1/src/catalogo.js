export const videojuegos_retro = [
  {
    id: 1,
    nombre: "Pokemon Fire Red",
    Plataforma: "Game Boy Advance",
    Categoria: "RPG",
    Precio: 30,
    Estado_Conservacion: "nuevo-precintado",
    stock: 10,
  },
  {
    id: 2,
    nombre: "Persona 5",
    Plataforma: "PlayStation 3",
    Categoria: "RPG",
    Precio: 40,
    Estado_Conservacion: "usado-como-nuevo",
    stock: 5,
  },
  {
    id: 3,
    nombre: "Super Mario 64",
    Plataforma: "Nintendo 64",
    Categoria: "Plataformas",
    Precio: 50,
    Estado_Conservacion: "usado-caja-danada",
    stock: 2,
  },
  {
    id: 4,
    nombre: "The Legend of Zelda: Ocarina of Time",
    Plataforma: "Nintendo 64",
    Categoria: "Aventura",
    Precio: 60,
    Estado_Conservacion: "solo-cartucho",
    stock: 3,
  },
  {
    id: 5,
    nombre: "Final Fantasy VII",
    Plataforma: "PlayStation",
    Categoria: "RPG",
    Precio: 35,
    Estado_Conservacion: "usado-como-nuevo",
    stock: 4,
  },
  {
    id: 6,
    nombre: "Street Fighter II",
    Plataforma: "Super Nintendo",
    Categoria: "Lucha",
    Precio: 25,
    Estado_Conservacion: "usado-como-nuevo",
    stock: 6,
  },
  {
    id: 7,
    nombre: "Donkey Kong Country",
    Plataforma: "Super Nintendo",
    Categoria: "Plataformas",
    Precio: 30,
    Estado_Conservacion: "solo-cartucho",
    stock: 5,
  },
  {
    id: 8,
    nombre: "Castlevania: Symphony of the Night",
    Plataforma: "PlayStation",
    Categoria: "Aventura",
    Precio: 40,
    Estado_Conservacion: "usado-como-nuevo",
    stock: 3,
  },
  {
    id: 9,
    nombre: "Metroid Prime",
    Plataforma: "GameCube",
    Categoria: "Aventura",
    Precio: 45,
    Estado_Conservacion: "usado-caja-danada",
    stock: 2,
  },
  {
    id: 10,
    nombre: "The Legend of Zelda: Twilight Princess",
    Plataforma: "GameCube/Wii",
    Categoria: "Aventura",
    Precio: 50,
    Estado_Conservacion: "usado-como-nuevo",
    stock: 4,
  },
  {
    id: 11,
    nombre: "Super Smash Bros. Melee",
    Plataforma: "GameCube",
    Categoria: "Lucha",
    Precio: 35,
    Estado_Conservacion: "usado-como-nuevo",
    stock: 5,
  },
  {
    id: 12,
    nombre: "Resident Evil 4",
    Plataforma: "GameCube/PlayStation 2",
    Categoria: "Survival Horror",
    Precio: 40,
    Estado_Conservacion: "usado-como-nuevo",
    stock: 3,
  },
  {
    id: 13,
    nombre: "Halo: Combat Evolved",
    Plataforma: "Xbox",
    Categoria: "Shooter",
    Precio: 30,
    Estado_Conservacion: "usado-como-nuevo",
    stock: 6,
  },
  {
    id: 14,
    nombre: "Grand Theft Auto III",
    Plataforma: "PlayStation 2",
    Categoria: "Acción",
    Precio: 35,
    Estado_Conservacion: "usado-caja-danada",
    stock: 4,
  },
  {
    id: 15,
    nombre: "The Elder Scrolls III: Morrowind",
    Plataforma: "Xbox/PC",
    Categoria: "RPG",
    Precio: 40,
    Estado_Conservacion: "solo-cartucho",
    stock: 3,
  },
];

//TABLA A
export function recargo_descuento(precioBase, estado) {
  let ajuste = 0;

  switch (estado) {
    case "nuevo-precintado":
      ajuste = 0.25; // +25%
      break;
    case "usado-como-nuevo":
      ajuste = 0.00; // 0%
      break;
    case "usado-caja-danada":
      ajuste = -0.15; // -15%
      break;
    case "solo-cartucho":
      ajuste = -0.30; // -30%
      break;
    default:
      ajuste = 0;
  }
  //CALCULO DEL PRECIO BASE
  const precioAjustado = precioBase * (1 + ajuste);
  return precioAjustado;
}
//TABLA B
export const descuento_volumen = (cantidad) => {
  if (cantidad >= 4) {
    return 0.10; // 10% de descuento
  } else if (cantidad >= 2) {
    return 0.05; // 5% de descuento
  } else {
    return 0.00; // 0% de descuento
  }
};
// TABLA C
export const es_stock_bajo = (stock) => stock < 3;

//FINAL (LA MEZCLA DE LOS 3)
export function calculo_final{
        
} 
