# RetroStock - Gestor de Inventario y Ventas
Cristian Luque Ruiz (e-luque) - 2º Desarrollo de Aplicaciones Web

Aplicación de consola en JavaScript para la gestión de inventario y ventas de una tienda de videojuegos retro. Proyecto desarrollado con Vite.

---

## 🚀 Cómo Ejecutar el Proyecto

1. Asegúrate de tener **Docker** y **Docker Desktop** instalados y en ejecución.
2. Clona el repositorio o descarga los archivos.
3. Levanta el contenedor con Docker Compose:
   ```bash
   docker compose up --build




4. Abre la consola de desarrollador en tu navegador en localhost:5173 (`F12` -> pestaña **Consola**) para interactuar con el menú principal.



## 🏗️ Decisiones de Diseño y Organización del Código

El código se ha modularizado en diferentes ficheros JavaScript para mantener responsabilidades claras e independientes, evitando un único archivo monolítico:

* **`catalogo.js`**: Contiene el modelo de datos inicial (`videojuegos_retro`) con los 12 productos base y la función de la regla de negocio para comprobar stock bajo (`es_stock_bajo`).


* **`funcionesCatalogo.js`**: Implementa la lógica de la Opción 1 (Ver catálogo) con sus 3 subvistas, haciendo uso de `.map()` para el formato de salida y `.filter()` para los filtros por categoría y stock bajo sin mutar el array original, tambien implementa la Opción 2 utilizando `.find()` para localizar productos por ID exacto o coincidencia parcial de título.


* **`ventas.js`**: Contiene la lógica de la Opción 3 (Registrar venta). Aplica los cálculos del precio (Tabla A + Tabla B) y actualiza las unidades de stock, ademas contiene la logica de la Opción 4, que es muy similar a la de actualizar las unidades de stock de la Opcion 3, pero a la inversa.


* **`main.js`**: Punto de entrada principal. Coordina la aplicación mediante un bucle `do...while` y un control de flujo por `switch`.



---

## 📦 Modelo de Datos

Cada videojuego en el catálogo está representado por un objeto con la siguiente estructura:

```javascript
{
  id: 2,                                   // Number: Identificador único
  nombre: "Persona 5",                     // String: Título del videojuego
  Plataforma: "PlayStation 3",             // String: Consola/Plataforma
  Categoria: "RPG",                        // String: Género del juego
  Precio: 40.00,                           // Number: Precio base antes de aplicar la Tabla A
  Estado_Conservacion: "usado-como-nuevo", // String: Clave exacta para Tabla A
  stock: 5                                 // Number: Unidades disponibles
}

```

---

## 🐛 Depuración y Resolución de Bugs (Breakpoint)

### Descripción del Bug Detectado

Durante el desarrollo del módulo de registro de ventas (`ventas.js`), al solicitar al usuario la cantidad de unidades a vender mediante `prompt()`, si se introducía un texto (*String*) en lugar de un número o si se cancelaba la ventana, el programa continuaba el flujo intentando realizar cálculos matemáticos con valores inválidos (`NaN`), lo que provocaba comportamientos erróneos en la aplicación.

### Depuración con Breakpoint

1. Se estableció un **breakpoint** en las herramientas de desarrollo del navegador (DevTools) en la línea donde se recibe la entrada de la cantidad.
2. Al inspeccionar la variable `cantidad` en el panel de variables local/watch, se observó que al ingresar texto la variable tomaba el valor `NaN` (Not-a-Number).
3. Pese a tener el valor `NaN`, la ejecución avanzaba hacia la validación de stock, provocando un fallo en la lógica de negocio.

### Solución Implementada

Con la ayuda de Gemini (IA), se añadió un control de validación utilizando la función integrada `isNaN()` en combinación con un salto de control (`return`):

```javascript
const cantidad = parseInt(prompt(`¿Cuántas unidades deseas comprar?`));

// Validación de seguridad para evitar errores al meter un String o un valor <= 0
if (isNaN(cantidad) || cantidad <= 0) {
  console.log("❌ Cantidad no válida.");
  return;
}

```

Esta comprobación frena de inmediato la ejecución de la venta si el dato introducido no es un número entero positivo válido.

```

```
