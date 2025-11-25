let carrito = [];

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalEl = document.getElementById("total");
    lista.innerHTML = "";

    let total = 0;
    carrito.forEach((item, index) => {
        total += item.precio;
        lista.innerHTML += `
            <div class="item-carrito">
                <span>${item.nombre}</span>
                <span>$${item.precio}.00</span>
                <button onclick="eliminarItem(${index})" style="background:none;border:none;color:red;cursor:pointer;">✖</button>
            </div>
        `;
    });

    totalEl.textContent = `Total: $${total}.00 MXN`;
}

function eliminarItem(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

function toggleCarrito() {
    document.getElementById("carrito").classList.toggle("abierto");
}


function comprar() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    // Crear mensaje para WhatsApp
    let mensaje = " *Pedido*\n\n ";
    let total = 0;

    carrito.forEach(item => {
        mensaje += `• ${item.nombre} — $${item.precio}.00 MXN\n`;
        total += item.precio;
    });

    mensaje += `\n *Total:* $${total}.00 MXN`;
    mensaje += `\n\n 🎉 ¡Gracias por su compra! 🎉 `;
    mensaje += `\n\n Su pedido esta en proceso`;

    // Enviar a WhatsApp
    const numero = "528231094576"; // +52 826 169 71 82
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");

    // Limpiar carrito
    carrito = [];
    actualizarCarrito();

    // Mostrar mensaje de confirmación
    const mensajeCompra = document.getElementById("mensaje-compra");
    mensajeCompra.style.display = "block";
    setTimeout(() => mensajeCompra.style.display = "none", 2500);
}
