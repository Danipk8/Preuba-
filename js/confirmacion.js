document.addEventListener("DOMContentLoaded", function () {
    const datosPedido = JSON.parse(localStorage.getItem("datosPedido"));

    if (!datosPedido) {
        document.getElementById("detalle-pedido").innerHTML = "<p>No hay información del pedido.</p>";
        return;
    }

    let contenido = `
        <p>Pedido #: ${Math.floor(Math.random() * 10000)}</p>
        <p>Fecha: ${new Date().toLocaleDateString()}</p>        
        <p>Correo electrónico: ${datosPedido.correo}</p>
        <p>Pago: Contra entrega</p>
        <h2>Detalles del Pedido:</h2>
      
        <ul>
    `;

    datosPedido.carrito.forEach(producto => {
        contenido += `<li>${producto.nombre} × ${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)} <p><strong>Total: $${datosPedido.total}</strong></p></li>`;
    });

    contenido += `</ul>
        <h2>Dirección de Envío:</h2>
        <p>${datosPedido.nombre}</p>
        <p>${datosPedido.direccion}</p>
        <p>${datosPedido.telefono}</p>
    `;

    document.getElementById("detalle-pedido").innerHTML = contenido;

    // ✅ Vaciar el carrito después de completar el pedido
    localStorage.removeItem("carrito");
    localStorage.removeItem("totalCarrito");
});
