const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-title"> Carrito </h1>
    `;

    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");

    modalButton.innerText = "X";
    modalButton.className = "modal-header-button";
    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });


    modalHeader.append(modalButton);

    carrito.forEach((producto, index) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${producto.img}">
            <h3>${producto.nombre}</h3>
            <p>${producto.precio} $</p>
            <p class="cantidad">Cantidad: ${producto.cantidad}</p>
            <p>Total: ${producto.cantidad * producto.precio}</p>
        `;

        modalContainer.append(carritoContent);

        console.log(carrito.length);

        let eliminar = document.createElement("span");
        eliminar.innerText = "❌";
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", () => {
            eliminarProducto(index)
        });
    });


    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalComprado = document.createElement("div");
    totalComprado.className = "total-content";
    totalComprado.innerHTML = `Total a pagar: ${total} $`;
    modalContainer.append(totalComprado);

};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (index) => {
    carrito[index].cantidad--
     carrito[index].cantidad == 0 && carrito.splice(index, 1)
     localStorage.setItem("carrito", JSON.stringify(carrito));
    
    Swal.fire({
        icon: 'success',
        title: 'Elimino su producto',
    })
    carritoCounter();
    pintarCarrito();
}
