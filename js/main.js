
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll('.boton-agregar')
const numerito = document.querySelector('#numerito')

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";

  productosElegidos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto", "card");
    div.innerHTML = `
      <img class="card-img-top img-productos" src="${producto.img}"  alt="${producto.nombre}">
      <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">$${producto.precio}</p>            
        <button class="btn btn-dark boton-agregar" id="${producto.id}">Agregar</button>
      </div>      
      `;

    contenedorProductos.append(div)
  });
  actualizarBotonesAgregar()
  console.log(botonesAgregar);
}

cargarProductos(productos);

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      const productoCategria = productos.find(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      tituloPrincipal.innerText = productoCategria.categoria.nombre;

      const productosBoton = productos.filter(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      cargarProductos(productosBoton);
    } else {
      tituloPrincipal.innerText = "Todos los Productos";
      cargarProductos(productos);
    }
  });
});

function actualizarBotonesAgregar(){
  botonesAgregar = document.querySelectorAll('.boton-agregar')
  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
  })
}

let productosEnCarrito; 


let productosEnCarritoLS = localStorage.getItem('productos-en-carrito')

if(productosEnCarritoLS){
  productosEnCarrito = JSON.parse(productosEnCarritoLS)
  actializarNumerito()
} else {
  productosEnCarrito = [];
}


function agregarAlCarrito(e) {

  const idBoton = e.currentTarget.id
  const productoAgregado = productos.find(producto => producto.id === idBoton)
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Producto agregado correctamente',
    showConfirmButton: false,
    timer: 1000
  })

  if (productosEnCarrito.some(producto => producto.id === idBoton)){
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
    productosEnCarrito[index].cantidad++
  } else{
    productoAgregado.cantidad = 1
    productosEnCarrito.push(productoAgregado)
  }

  actializarNumerito()
  
  localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito))
}

function actializarNumerito(){
  let nuevoNumerito = productosEnCarrito.reduce((acc, producto)=> acc + producto.cantidad, 0) 
  numerito.innerText = nuevoNumerito
}