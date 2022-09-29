const shopContent = document.getElementById('shopContent');
const verCarrito = document.getElementById('verCarrito');
const modalContainer = document.getElementById('modal-container')

const productos = [
    {
        "id": 1,
        "nombre": "Yerba",
        "precio": 500,
        "img": 'https://jumboargentina.vtexassets.com/arquivos/ids/609099/Yerba-Mate-Playadito-Suave-X500gr-1-854543.jpg?v=637388478795030000',
        "cantidad": 1,
    },
    {
        id: 2,
        nombre: "Coca",
        precio: 350,
        img: 'https://www.pngall.com/wp-content/uploads/2016/04/Coca-Cola-PNG-Clipart.png',
        "cantidad": 1,
    },
    {
        id: 3,
        nombre: "Papas-Fritas",
        precio: 500,
        img: 'https://www.martinezydiezsl.com/wp-content/uploads/2018/03/lays_al_punto_de_sal-web2.png',
        "cantidad": 1,
    },
    {
        id: 4,
        nombre: "Mermelada",
        precio: 300,
        img: 'https://www.pngmart.com/files/10/Jam-PNG-HD.png',
        "cantidad": 1,
    },
    {
        id: 5,
        nombre: "Patitas",
        precio: 750,
        img: 'https://www.granjadelsol.com.ar/wp-content/uploads/2017/10/patitas-400g.png.webp',
        "cantidad": 1,
    },
]

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((producto) => {
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
        let agregarProducto = productos.find(p => p.id === producto.id);
        let existe = carrito.find(elemento => elemento.id === producto.id)
        if (existe){
            existe.cantidad++;
            console.log(carrito);
            alert(`El producto ${producto.nombre} fue agregada nuevamente al carrito.`)
        } else{
            agregarProducto.cantidad = 1;
            carrito.push(agregarProducto);
            console.log(carrito);
            alert(`Producto agregado correctamente al carrito.`);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        
        
    });
});

verCarrito.addEventListener("click", () => {
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

    carrito.forEach((producto) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${producto.img}">
            <h3>${producto.nombre}</h3>
            <p>${producto.precio} $</p>
            <p class="cantidad">Cantidad: ${producto.cantidad}</p>
        `;
        
    modalContainer.append(carritoContent)
    });
    

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalComprado = document.createElement("div");
    totalComprado.className = "total-content";
    totalComprado.innerHTML = `Total a pagar: ${total} $`;
    modalContainer.append(totalComprado);

});