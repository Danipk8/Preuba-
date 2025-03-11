document.addEventListener("DOMContentLoaded", () => {
    fetch("data/productos.json")
        .then(response => response.json())
        .then(data => {
            const destacados = data.filter(p => p.destacado); 
            mostrarProductosDestacados(destacados);
        })
        .catch(error => console.error("Error cargando productos destacados:", error));
});

function mostrarProductosDestacados(productos) {
    const contenedor = document.getElementById("productos-destacados");
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <a href="producto.html?id=${producto.id}">
                <img src="${producto.imagen}" alt="${producto.nombre}" title="${producto.nombre}" height="100" width="100">
            </a> 
            <div class="producto-texto">
                <a href="producto.html?id=${producto.id}">
                    <h1>${producto.nombre}</h1>
                </a>
                <label for="peso-${producto.id}">Selecciona el peso:</label>
                <select id="peso-${producto.id}" class="peso-seleccion">
                    <option value="unidad" data-precio="${producto.precioUnidad}">Unidad - $${producto.precioUnidad}</option>
                    <option value="libra" data-precio="${producto.precioLibra}">Libra - $${producto.precioLibra}</option>
                    <option value="kilo" data-precio="${producto.precioKilo}">Kilo - $${producto.precioKilo}</option>
                </select>
                <div class="cantidad-seleccion">
                    <button class="btn-cantidad disminuir" data-id="${producto.id}">-</button>
                    <input type="number" id="cantidad-${producto.id}" value="1" min="1">
                    <button class="btn-cantidad aumentar" data-id="${producto.id}">+</button>
                </div>
                <a href="#" class="agregar-carrito btn-2" data-id="${producto.id}">Agregar</a>                                         
            </div>
        `;
        contenedor.appendChild(div);
    });

    // ✅ Agregar funcionalidad para aumentar/disminuir cantidad
    document.querySelectorAll(".btn-cantidad").forEach(boton => {
        boton.addEventListener("click", function () {
            const productoId = this.getAttribute("data-id");
            const cantidadInput = document.getElementById(`cantidad-${productoId}`);
            let cantidad = parseInt(cantidadInput.value);

            if (this.classList.contains("aumentar")) {
                cantidad++;
            } else if (this.classList.contains("disminuir") && cantidad > 1) {
                cantidad--;
            }

            cantidadInput.value = cantidad;
        });
    });

    manejarCarrito();
}