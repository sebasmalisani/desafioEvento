const shopContent = document.getElementById('shopContent');
const verCarrito = document.getElementById('verCarrito');
const modalContainer = document.getElementById('modal-container');
const cantidadCarrito = document.getElementById('cantidadCarrito');
// Swal.fire('sweetalert');

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const pedirProductos = async () => {
    const response = await fetch('./js/productos.json')
    const data = await response.json();


    data.forEach((producto) => {
        let content = document.createElement("div")
        content.className = "card";
        content.innerHTML = `
    <img src="${producto.img}">
    <h3>${producto.nombre}</h3>
    <p class="price">${producto.precio} $</p>
    `;

        shopContent.append(content);

        let comprar = document.createElement("button")
        comprar.innerText = "Comprar";
        comprar.className = "comprar";

        content.append(comprar);

        comprar.addEventListener("click", () => {
            let agregarProducto = data.find(p => p.id === producto.id);
            let existe = carrito.find(elemento => elemento.id === producto.id)
            existe ? (existe.cantidad++, Swal.fire({
                icon: 'success',
                title: 'Felicidades',
                text: `${producto.nombre} fue agregado nuevamente al carrito!`
            }))
                : (agregarProducto.cantidad = 1, carrito.push(agregarProducto), Swal.fire({
                    icon: 'success',
                    title: 'Felicidades',
                    text: `${producto.nombre} fue agregado al carrito`
                }))

            // alert(`Producto agregado correctamente al carrito.`)
            // if (existe) {
            //     existe.cantidad++;
            //     console.log(carrito);
            //     alert(`El producto ${producto.nombre} fue agregada nuevamente al carrito.`)
            // } else {
            //     agregarProducto.cantidad = 1;
            //     carrito.push(agregarProducto);
            //     console.log(carrito);
            //     alert(`Producto agregado correctamente al carrito.`);
            // }
            localStorage.setItem("carrito", JSON.stringify(carrito));

            carritoCounter();
        });
    });
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    cantidadCarrito.innerText = carrito.length;
}

pedirProductos();
carritoCounter();
