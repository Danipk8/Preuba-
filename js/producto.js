document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get("id");

    if (!productoId) {
        document.getElementById("producto-detalle").innerHTML = "<p>Producto no encontrado</p>";
        return;
    }

    fetch("data/productos.json")
        .then(response => response.json())
        .then(data => {
            const producto = data.find(p => p.id == productoId);
            if (!producto) {
                document.getElementById("producto-detalle").innerHTML = "<p>Producto no encontrado</p>";
                return;
            }

            document.title = producto.nombre + " - Tienda Virtual";

            document.getElementById("producto-detalle").innerHTML = `
                <div class="producto-detalle-contenedor">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
                    <div class="producto-info">
                        <h1>${producto.nombre}</h1>
                         <p>${producto.descripcion}</p>
                        <label for="peso-seleccion">Selecciona el peso:</label>
                        <select id="peso-seleccion">
                            <option value="unidad" data-precio="${producto.precioUnidad}">Unidad - $${producto.precioUnidad}</option>
                            <option value="libra" data-precio="${producto.precioLibra}">Libra - $${producto.precioLibra}</option>
                            <option value="kilo" data-precio="${producto.precioKilo}">Kilo - $${producto.precioKilo}</option>
                        </select>
                        <div class="cantidad-seleccion">
                            <button class="btn-cantidad disminuir">-</button>
                            <input type="number" id="cantidad" value="1" min="1">
                            <button class="btn-cantidad aumentar">+</button>
                        </div>
                        <a href="#" class="agregar-carrito btn-2" data-id="${producto.id}">Agregar al carrito</a>
                    </div>
                </div>
            `;

            // ✅ Funcionalidad de cantidad en `producto.html`
            document.querySelector(".aumentar").addEventListener("click", function () {
                let cantidad = parseInt(document.getElementById("cantidad").value);
                document.getElementById("cantidad").value = cantidad + 1;
            });

            document.querySelector(".disminuir").addEventListener("click", function () {
                let cantidad = parseInt(document.getElementById("cantidad").value);
                if (cantidad > 1) document.getElementById("cantidad").value = cantidad - 1;
            });

            manejarCarrito();
        })
        .catch(error => console.error("Error al cargar el producto:", error));
});
