let carrito = [];

function agregarProducto(event) {
  const boton = event.target;
  const contenedor = boton.closest(".consola") || boton.closest(".juego");

  if (!contenedor) return;

  const nombre = contenedor.querySelector("h2")?.textContent || contenedor.querySelector("p")?.textContent;
  const precioTexto = contenedor.querySelector("span")?.textContent || contenedor.querySelector("p:nth-of-type(2)")?.textContent;
  const precio = parseFloat(precioTexto.replace("$", ""));

  carrito.push({ nombre, precio });
  actualizarPanelCarrito();
}

let botonesInsertCoin = document.getElementsByClassName("insertCoin");

for (let boton of botonesInsertCoin) {
  boton.addEventListener("click", agregarProducto);
}

function actualizarPanelCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalTexto = document.getElementById("total-carrito");

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((producto, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
      ${producto.nombre} - $${producto.precio}
      <button class="eliminar-btn" data-index="${index}">-</button>
    `;
    lista.appendChild(item);
    total += producto.precio;
  });

  totalTexto.textContent = `Total: $${total}`;

  // Botones para eliminar individualmente
  const botonesEliminar = document.querySelectorAll(".eliminar-btn");
  botonesEliminar.forEach(boton => {
    boton.addEventListener("click", (e) => {
      const i = e.target.getAttribute("data-index");
      carrito.splice(i, 1);
      actualizarPanelCarrito();
    });
  });
}

// Evento para botón "vaciar carrito"
document.addEventListener("DOMContentLoaded", () => {
  const botonVaciar = document.getElementById("vaciarCarrito");
  if (botonVaciar) {
    botonVaciar.addEventListener("click", () => {
      carrito = [];
      actualizarPanelCarrito();
    });
  }
});

document.getElementById("botonPagar").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío. Agrega productos antes de pagar.");
    return;
  }

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  alert(`Gracias por tu compra 🕹️\nTotal pagado: $${total}`);

  carrito = [];
  actualizarPanelCarrito();
});