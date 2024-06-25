//  Se cargan los juegos en un array para luego ser mostrados en la página principal, provenientes de un archivo JSON

const productos = fs.readFileSync("./productos.json", "utf-8"); 

const juegos = JSON.parse(productos);




const contenedorProductos = document.querySelector("contenedor-productos");

function cargarProductos(juegosElegidos){
    contenedorProductos.innerHTML = "";
    juegosElegidos.forEach(juego => {
    
        const div = document.createElement("div");
        div.classList.add("juego");
        div.innerHTML= `
        <img src ="${juego.imagen}" alt="${juego.titulo}">
            <div class="info">
            <p class="nombre"${juego.titulo}</p>
            <p class="precio">${juego.precio}</p>
            <a class="boton" href="./construccion.html" id="${juego.id}">Ver</a>
        
        `
        contenedorProductos.append(div);

    })

    actualizarBotonesAgregar();
}
const botonesAgregar = document.querySelectorAll(".boton");

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".boton");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

const juegosEnCarrito = [];

function agregarAlCarrito(){
    const idBoton = e.currentTarget.id;
    const juegoAgregado = productos.find(juego => juego.id === idBoton);
}