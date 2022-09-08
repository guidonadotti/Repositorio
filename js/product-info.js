let IdDelProducto = localStorage.getItem("ProdID")
var producto_url = `https://japceibal.github.io/emercado-api/products/${IdDelProducto}.json`
var comentarios_url = `https://japceibal.github.io/emercado-api/products_comments/${IdDelProducto}.json`
let comentarios1 = []
let clicknt = true
console.log(comentarios_url);

function estrellas(n) {
    htmlContentToAppend = ""
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
    for (const comentario of comentarios1) {
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

    document.getElementById("comentarios").innerHTML += htmlContentToAppend
}
function deshabilitarBotones() {
    document.getElementById("Enviar").disabled = true
    document.getElementById("Cancelar").disabled = true
}

document.addEventListener("DOMContentLoaded", () => {
    getJSONData(producto_url).then(function (producto) {
        if (producto.status === "ok") {
            producto = producto.data
            document.getElementsByTagName("h2")[0].innerHTML = producto.name
            document.getElementById("precio").innerHTML = producto.currency + " " + producto.cost
            document.getElementById("descripcion").innerHTML = producto.description
            document.getElementById("categoria").innerHTML = producto.category
            document.getElementById("vendidos").innerHTML = producto.soldCount

            let img = document.getElementsByTagName("img")
            for (let i = 0; i < img.length; i++) {
                img[i].src = producto.images[i]
            }
        }
    })
    getJSONData(comentarios_url).then(function (comentarios) {
        if (comentarios.status === "ok") {
            comentarios1 = comentarios.data
            //Si el usuario ingresó algún comentario, se llama a la función con los del usuario 
            //y los de comentarios_url, sino solo se le llama con los de comentarios_url
            if (localStorage.getItem(`comentariosDelUsuario${IdDelProducto}`) != null) {
                comentarios1 = comentarios1.concat(JSON.parse(localStorage.getItem(`comentariosDelUsuario${IdDelProducto}`)))
            }
            insertarComentarios()
        }
    })
    document.getElementById("Enviar").addEventListener("click", function () {

        //Toma los valores ingresados por el usuario
        let comentario = document.getElementById("opinion").value
        let puntuacion = document.getElementsByTagName("select")[0].value
        puntuacion = parseInt(puntuacion)
        let usuario = localStorage.getItem("mail")
        let fecha = new Date
        fecha = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()} 
            ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
        //Los introduce en un objeto
        let comentarioDelUsuario = {
            "product": parseInt(IdDelProducto),
            "score": puntuacion,
            "description": comentario,
            "user": usuario,
            "dateTime": fecha
        }

        //Llama inserta el comentario 
        comentarios1 = [comentarioDelUsuario]
        insertarComentarios()

        //Si el usuario no ingresó ningún comentario, se define un item 
        //en el local Storage con el que acaba de ingresar
        if (localStorage.getItem(`comentariosDelUsuario${IdDelProducto}`) == null) {
            localStorage.setItem(`comentariosDelUsuario${IdDelProducto}`, JSON.stringify([comentarioDelUsuario]))
        } else {
            //Si el usuario ya había ingresado un comentario, se llama a ese localStorage,
            //se le agrega el nuevo comentario y se le guarda nuevamente para que queden cargados
            //la próxima vez que entre
            let comentarios2 = JSON.parse(localStorage.getItem(`comentariosDelUsuario${IdDelProducto}`))
            comentarios2 = comentarios2.concat([comentarioDelUsuario])
            localStorage.setItem(`comentariosDelUsuario${IdDelProducto}`, JSON.stringify(comentarios2))
        }

        //Se devuelven los inputs a su estado original
        document.getElementById("opinion").value = null
        document.getElementsByTagName("select")[0].selectedIndex = 0

        //Se deshabilitan los botones nuevamente
        deshabilitarBotones()
    })
    document.getElementById("Cancelar").addEventListener("click", function () {
        //Se devuelven los inputs a su estado original
        document.getElementById("opinion").value = null
        document.getElementsByTagName("select")[0].selectedIndex = 0
        deshabilitarBotones()
    })

    document.getElementById("opinion").addEventListener("input", function () {
        //Se seleccionan los botones de Enviar y Cancelar
        for (let i = 1; i < document.getElementsByTagName("button").length; i++) {
            const element = document.getElementsByTagName("button")[i];
            let texto = document.getElementById("opinion").value
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
    let fecha = new Date
    console.log(fecha);

    console.log(fecha.getDate());
    console.log(fecha.getFullYear());
    console.log(fecha.getMonth());
    console.log(fecha.getDay());
    console.log(fecha.getHours());

    /* let estrellas = document.getElementById("estrellas").getElementsByClassName("fa fa-star")

    for (let i = 0; i < estrellas.length; i++) {
        estrellas[i].addEventListener("mouseover", function () {
            for (let k = 0; k <= i; k++) {
                estrellas[k].className = `fa fa-star checked`
            }
        })
        estrellas[i].addEventListener("click", function () {
            clicknt == false
            for (let k = 0; k <= i; k++) {
                estrellas[k].className = `fa fa-star checked`
            }
            console.log(clicknt);
        })
        if(clicknt){
            estrellas[i].addEventListener("mouseout", function () {
                for (let k = 0; k <= i; k++) {
                    estrellas[k].className = `fa fa-star`
                }
            })
        }
    } */
})