document.getElementById("form-datos").addEventListener("submit", function (event) {
    event.preventDefault();

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // ✅ Calcular el total correctamente antes de guardarlo
    let total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

    const datos = {
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value,
        direccion: document.getElementById("direccion").value,
        carrito: carrito,
        total: total.toFixed(2) // ✅ Guardamos el total formateado
    };

    localStorage.setItem("datosPedido", JSON.stringify(datos));

    window.location.href = "confirmacion.html";
});
