const BOTON_CARRITO=document.getElementById("agregarAlCarrito")
const BOTON_ENVIAR=document.getElementById("Enviar")
const BOTON_CANCELAR=document.getElementById("Cancelar")
const TEXTAREA_COMENTARIOS=document.getElementById("opinion")
const PUNTUACION=document.getElementsByTagName("select")[0]
const COMENTARIOS=document.getElementById("comentarios")
let IdDelProducto = localStorage.getItem("ProdID")
let producto_url = PRODUCT_INFO_URL+IdDelProducto+EXT_TYPE
let comentarios_url = PRODUCT_INFO_COMMENTS_URL+IdDelProducto+EXT_TYPE
let comentarios1 = []
//let clicknt = true

function estrellas(n) {
    let htmlContentToAppend = ""
    for (let i = 0; i < n; i++) {
        htmlContentToAppend += `<span class="fa fa-star checked"></span>`
    }
    for (let i = n; i < 5; i++) {
        htmlContentToAppend += `<span class="fa fa-star"></span>`
    }
    return htmlContentToAppend
}

function insertarComentarios() {
    let htmlContentToAppend = ""
    for (let comentario of comentarios1) {
        htmlContentToAppend +=
            `<div class="col-lg-6 border border-gray rounded">
                <div class="row justify-content-between">
                    <div class="col-8"><p><span class="negrita">${comentario.user}</span> 
                        ${estrellas(comentario.score)}</p></div>
                    <div class="col-4"><p class="fecha">${comentario.dateTime}</p></div>
                </div>
                <p>${comentario.description}</p>
            </div>`
    }
    COMENTARIOS.innerHTML += htmlContentToAppend
}
function deshabilitarBotones() {
    BOTON_ENVIAR.disabled = true
    BOTON_CANCELAR.disabled = true
}

document.addEventListener("DOMContentLoaded", () => {
    getJSONData(producto_url).then(function (producto) {
        if (producto.status === "ok") {
            producto = producto.data

            document.title=producto.name
            document.getElementsByTagName("h1")[0].innerHTML = producto.name
            document.getElementById("precio").innerHTML = producto.currency +" "+ producto.cost
            document.getElementById("descripcion").innerHTML = producto.description
            document.getElementById("categoria").innerHTML = producto.category
            document.getElementById("vendidos").innerHTML = producto.soldCount

            let img = document.getElementById("imagenes")
            img.innerHTML =
                `<div class="carousel-item active">
                    <img src="${producto.images[0]}" class="d-block w-100" alt="${producto.description}">
                </div>`
            for (let i = 1; i < producto.images.length; i++) {
                const imagen = producto.images[i];
                img.innerHTML +=
                    `<div class="carousel-item">
                        <img src="${imagen}" class="d-block w-100" alt="${producto.description}">
                    </div>`
            }

            for (item of producto.relatedProducts) {
                document.getElementById("productosRelacionados").innerHTML +=
                    `<div class="col-6 col-md-3">
                        <div class="card list-group-item-action cursor-active">
                            <div onclick="setProdID(${item.id})" class="col col-lg float-start">
                                <img src="${item.image}" alt="${item.name}" class="card-img-top">
                                <div class="card-body">
                                    <h5 class="card-title">${item.name}</h5>   
                                </div>
                            </div>
                        </div>
                    </div>
                    `
            }
        }
        getJSONData(comentarios_url).then(function (comentarios) {
            if (comentarios.status === "ok") {
                comentarios1 = comentarios.data
                let comentariosDelUsuario=localStorage.getItem(`comentariosDelUsuario${IdDelProducto}`) 
                // Si el usuario ingresó algún comentario, se llama a la función con los del usuario 
                // y los de comentarios_url, sino solo se le llama con los de comentarios_url
                if (comentariosDelUsuario!= null) {
                    comentarios1 = comentarios1.concat(JSON.parse(comentariosDelUsuario))
                }
                insertarComentarios()
            }
            BOTON_ENVIAR.addEventListener("click", function () {

                // Toma los valores ingresados por el usuario
                let comentario = TEXTAREA_COMENTARIOS.value
                let puntuacion = PUNTUACION.value
                puntuacion = parseInt(puntuacion)
                let usuario = localStorage.getItem("mail")
                let fecha = new Date
                fecha = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()} 
                    ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
                // Los introduce en un objeto
                let comentarioDelUsuario = {
                    "product": parseInt(IdDelProducto),
                    "score": puntuacion,
                    "description": comentario,
                    "user": usuario,
                    "dateTime": fecha
                }

                // Inserta el comentario 
                comentarios1 = [comentarioDelUsuario]
                insertarComentarios()

                // Si el usuario no ingresó ningún comentario, se define un item 
                // en el local Storage con el que acaba de ingresar
                if (localStorage.getItem(`comentariosDelUsuario${IdDelProducto}`) == null) {
                    localStorage.setItem(`comentariosDelUsuario${IdDelProducto}`, JSON.stringify([comentarioDelUsuario]))
                } else {
                    // Si el usuario ya había ingresado un comentario, se llama a ese localStorage,
                    // se le agrega el nuevo comentario y se le guarda nuevamente para que queden cargados
                    // la próxima vez que entre
                    let comentarios2 = JSON.parse(localStorage.getItem(`comentariosDelUsuario${IdDelProducto}`))
                    comentarios2 = comentarios2.concat([comentarioDelUsuario])
                    localStorage.setItem(`comentariosDelUsuario${IdDelProducto}`, JSON.stringify(comentarios2))
                }

                // Se devuelven los inputs a su estado original
                TEXTAREA_COMENTARIOS.value = null
                PUNTUACION.selectedIndex = 0

                // Se deshabilitan los botones nuevamente
                deshabilitarBotones()
            })
            BOTON_CANCELAR.addEventListener("click", function () {
                //Se devuelven los inputs a su estado original
                TEXTAREA_COMENTARIOS.value = null
                PUNTUACION.selectedIndex = 0
                deshabilitarBotones()
            })

            TEXTAREA_COMENTARIOS.addEventListener("input", function () {
                let botones=document.getElementsByTagName("button")
                // Se seleccionan los botones de Enviar y Cancelar
                for (let i = 1; i < botones.length; i++) {
                    let element = botones[i];
                    let texto = TEXTAREA_COMENTARIOS.value
                    texto = texto.trim()
                    //Si el texto del comentario está vacío ambos botones permanecen desactivados
                    //para que el usuario no envíe comentarios vacíos
                    if (texto == "") {
                        element.disabled = true
                    } else {
                        element.disabled = false
                    }
                }
            })
            // Toma los productos agregados al carrito.
            let usuarioActivo=localStorage.getItem("mail")

            let usuarios = localStorage.getItem("usuarios")
            usuarios=JSON.parse(usuarios)
            carrito=usuarios[usuarioActivo]["carrito"]

            // Declara una variable booleana
            let productoEnCarrito = false
            // Si el carrito no está vacío se fija en todos los productos 
            // si alguno tiene el mismo id que el id del producto y si
            // es así, convierte la variable en true.
            if(carrito!=null){
                for (const articulo of carrito){
                    if (articulo.id == producto.id) {
                        productoEnCarrito = true;
                        break;
                    }
                }
            }

            // Si el producto está en el carrito le pone el ícono de
            // chequeado y lo deshabilita, y sino le pone el ícono de
            // agregar al carrito.
            if (productoEnCarrito) {
                BOTON_CARRITO.innerHTML = `<i class="bi bi-cart-check-fill"></i>`
                BOTON_CARRITO.disabled = true
            } else {
                BOTON_CARRITO.innerHTML = `<i class="fas fa-cart-plus"></i>`
            }

            BOTON_CARRITO.addEventListener("click", function () {
                // Agrega una alerta.
                document.body.innerHTML +=
                    `<div class="alert alert-success alert-dismissible fade show" role="alert">
                        ¡Producto agregado al <a href="cart.html" class="alert-link">carrito</a> con éxito!                         
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;

                // Crea un objeto con el mismo formato que los del json de los
                // productos en el carrito.
                let productoAlCarrito = {
                    "id": producto.id,
                    "name": producto.name,
                    "count": 1,
                    "unitCost": producto.cost,
                    "currency": producto.currency,
                    "image": producto.images[0]
                }

                // Agrega ese producto a un array del localstorage con los demás
                // productos. 
                if (!carrito) {
                    usuarios[usuarioActivo]["carrito"]=[productoAlCarrito]
                    localStorage.setItem("usuarios",JSON.stringify(usuarios))
                } else {
                    usuarios[usuarioActivo]["carrito"]=[...carrito,productoAlCarrito]
                    localStorage.setItem(`usuarios`, JSON.stringify(usuarios))
                }

                // Deshabilita el botón y le cambia el ícono.
                document.getElementById("agregarAlCarrito").innerHTML = `<i class="bi bi-cart-check-fill"></i>`
                document.getElementById("agregarAlCarrito").disabled = true
            })

            /* let estrellas = document.getElementById("estrellas").getElementsByClassName("fa fa-star")

            for (let i = 0; i < estrellas.length; i++) {
                estrellas[i].addEventListener("click", function () {
                    clicknt = !(clicknt)
                    for (let k = 0; k <= i; k++) {
                        estrellas[k].className = `fa fa-star checked`
                    }
                    console.log(clicknt);
                })

                estrellas[i].addEventListener("mouseover", function () {
                    for (let k = 0; k <= i; k++) {
                        if(clicknt){
                            estrellas[k].className = `fa fa-star checked`
                        }
                    }
                })
                
                estrellas[i].addEventListener("mouseout", function () {
                    if (clicknt) {
                        for (let k = 0; k <= i; k++) {
                            estrellas[k].className = `fa fa-star`
                        }
                        console.log(clicknt);
                    }
                })
            } */

        })

    })

})