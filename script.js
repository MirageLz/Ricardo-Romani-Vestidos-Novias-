const productos = [
    { id: 1, nombre: "Vestido de novia 1", precio: 1200 },
    { id: 2, nombre: "Vestido de novia 2", precio: 1500 },
    { id: 3, nombre: "Vestido de novia 3", precio: 950 },
    { id: 4, nombre: "Vestido de novia 4", precio: 1350 },
    { id: 5, nombre: "Vestido de novia 5", precio: 1100 },
    { id: 6, nombre: "Vestido de novia 6", precio: 890 },
    { id: 7, nombre: "Vestido de novia 7", precio: 1250 },
    { id: 8, nombre: "Vestido de novia 8", precio: 1400 },
    { id: 9, nombre: "Vestido de novia 9", precio: 1600 },
    { id: 10, nombre: "Vestido de novia 10", precio: 1150 },
    { id: 11, nombre: "Vestido de novia 11", precio: 1750 },
    { id: 12, nombre: "Vestido de novia 12", precio: 990 },
    { id: 13, nombre: "Vestido de novia 13", precio: 1300 },
    { id: 14, nombre: "Vestido de novia 14", precio: 1050 },
    { id: 15, nombre: "Vestido de novia 15", precio: 1200 },
    { id: 16, nombre: "Vestido de novia 16", precio: 1450 },
    { id: 17, nombre: "Vestido de novia 17", precio: 1900 },
    { id: 18, nombre: "Vestido de novia 18", precio: 850 },
    { id: 19, nombre: "Vestido de novia 19", precio: 1550 },
    { id: 20, nombre: "Vestido de novia 20", precio: 2100 }
];

let carrito = [];
const carritoElementos = document.getElementById("carrito-elementos");
const carritoTotal = document.getElementById("carrito-total");
const carritoContador = document.getElementById("carrito-contador");
const btnVaciar = document.getElementById("btn-vaciar");

function agregarAlCarrito(idProducto) {
    const existente = carrito.find(item => item.id === idProducto);
    if (existente) {
        existente.cantidad++;
    } else {
        const producto = productos.find(item => item.id === idProducto);
        if (!producto) return;
        carrito.push({ id: producto.id, nombre: producto.nombre,
            precio: producto.precio, cantidad: 1 });
    }
    actualizarInterfazCarrito();
}

function cambiarCantidad(idProducto, cambio) {
    const producto = carrito.find(item => item.id === idProducto);
    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) {
            eliminarDelCarrito(idProducto);
            return;
        }
    }
    actualizarInterfazCarrito();
}

function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    actualizarInterfazCarrito();
}

btnVaciar.addEventListener("click", () => {
    carrito = [];
    actualizarInterfazCarrito();
});

function actualizarInterfazCarrito() {
    carritoElementos.innerHTML = "";
    let total = 0;
    let cantidadTotal = 0;

    if (carrito.length === 0) {
        carritoElementos.innerHTML = "<p>El carrito está vacío.</p>";
    }

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        cantidadTotal += item.cantidad;
        const fila = document.createElement("div");
        fila.className = "item-carrito";
        fila.innerHTML = `
            <h3>${item.nombre}</h3>
            <p>S/ ${item.precio.toFixed(2)} c/u</p>
            <button class="btn-cantidad" aria-label="Reducir cantidad de ${item.nombre}" onclick="cambiarCantidad(${item.id}, -1)">−</button>
            <span>${item.cantidad}</span>
            <button class="btn-cantidad" aria-label="Aumentar cantidad de ${item.nombre}" onclick="cambiarCantidad(${item.id}, 1)">+</button>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
            <p>Subtotal: S/ ${subtotal.toFixed(2)}</p>
        `;
        carritoElementos.appendChild(fila);
    });
    carritoTotal.textContent = total.toFixed(2);
    carritoContador.textContent = cantidadTotal;
}

actualizarInterfazCarrito();
