const CARRITO_USUARIO = CART_INFO_URL + 25801 + EXT_TYPE
const CONVERSOR = "https://api.currencyapi.co m/v3/latest?apikey=6u3UtVi1QNOaxst1peouonYkgs0xTu6LrLo06AJA"
const SUBTOTAL_GENERAL = document.getElementById("subtotalGeneral")
const CARRITO = document.getElementById("productostabla")
const ENVIO = document.getElementsByName("tipoDeEnvio")
const TOTAL = document.getElementById("total")
const FORMA_DE_PAGO = document.getElementsByName("pago")
const FORMULARIO = document.getElementById("enviar")
const CARRITO_VACIO = `
    <hr>
    <h3 class="text-center">Tu carrito está vacío</h3>
    <p class="text-center"><small>¿No sabes qué comprar? ¡Miles de productos te esperan!</small></p>
    <div class="invalid-feedback invalido">
        El carrito no puede estar vacío para comprar.
    </div>
`
const ALERTA = document.getElementById("alerta")

let carrito = []
let convert
let porcentajeEnvio
let usuarioActivo = localStorage.getItem("mail")
let usuarios = localStorage.getItem("usuarios")
usuarios = JSON.parse(usuarios)

function agregarAlCarrito(producto) {
    CARRITO.innerHTML += `
    <tr id="producto_${producto.id}">    
        <th scope="row" class="primera"><img src="${producto.image}" class="img-fluid rounded-1"></th>
        <td>${producto.name}</td>
        <td>${producto.currency} <span id="costo_${producto.id}">${darEspacios(producto.unitCost)}</span></td>
        <td class="col-2"><div class="col-8 col-sm-6 col-md-5">
            <input type="number" class="form-control" min="1" value="${producto.count}" 
                oninput="cambiarSubtotal(${producto.id},this.value)" 
                name="cantidad_${producto.id}" required></div></td>
        <td class="col-3 fw-bold">${producto.currency} 
            <span id="subtotal_${producto.id}">${darEspacios(producto.unitCost * producto.count)}</span></td>
        <td class="col-1"><button onclick="eliminarProducto(${producto.id})" class="btn-close"></button></td>
    </tr>
    `
}

function eliminarProducto(id) {
    let filas = CARRITO.getElementsByTagName("tr")
    for (let fila of filas) {
        if (fila.id == "producto_" + id) {
            CARRITO.removeChild(fila)
            break
        }
    }
    for (let producto of carrito) {
        if (producto.id == id) {
            let indice = carrito.indexOf(producto)
            carrito.splice(indice, 1)
        }
    }

    usuarios[usuarioActivo]["carrito"] = carrito
    localStorage.setItem("usuarios", JSON.stringify(usuarios))

    if (carrito.length == 0) {
        document.getElementsByClassName("table-responsive-sm")[0].innerHTML = CARRITO_VACIO
    }

    subtotalGeneral()
    actualizarEnvio()
    total()
}

function cambiarSubtotal(id, cantidad) {
    cantidad = parseInt(cantidad);
    let costo = document.getElementById("costo_" + id)
    costo = parseInt(quitarEspacios(costo.innerHTML));
    let subtotal = document.getElementById("subtotal_" + id)
    subtotal.innerHTML = darEspacios(cantidad * costo)

    cambiarCantidad(id, cantidad)
    subtotalGeneral()
    actualizarEnvio()
    total()
}

function cambiarCantidad(id, valor) {
    for (const producto of carrito) {
        if (producto.id == id) {
            producto.count = valor
            break
        }
    }
    usuarios[usuarioActivo]["carrito"] = carrito
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
}

function subtotalGeneral() {
    let subtotal = 0
    for (const producto of carrito) {
        if (producto.currency == "UYU") {
            subtotal += producto.unitCost * producto.count / convert
        } else {
            subtotal += producto.unitCost * producto.count
        }
    }
    subtotal = Math.trunc(subtotal)
    SUBTOTAL_GENERAL.innerHTML = darEspacios(subtotal)
}

function envio() {
    for (const input of ENVIO) {
        input.addEventListener("click", function () {
            let valor = input.dataset.value
            valor = parseInt(valor)
            porcentajeEnvio = valor
            actualizarEnvio()
        })
    }
}

function actualizarEnvio() {
    if (porcentajeEnvio) {
        let subtotalGeneral = SUBTOTAL_GENERAL.innerHTML
        subtotalGeneral = quitarEspacios(subtotalGeneral)
        subtotalGeneral = parseInt(subtotalGeneral)
        let costo_del_envio = document.getElementById("envio")
        costo_del_envio.innerHTML = darEspacios(Math.trunc(subtotalGeneral * (porcentajeEnvio / 100)))
        total()
    }
}

function total() {
    let subtotal = SUBTOTAL_GENERAL.innerHTML
    subtotal = parseInt(quitarEspacios(subtotal))
    let costo_del_envio = document.getElementById("envio").innerHTML
    if (costo_del_envio) {
        costo_del_envio = parseInt(quitarEspacios(costo_del_envio))
    } else {
        costo_del_envio = 0
    }
    TOTAL.innerHTML = darEspacios(subtotal + costo_del_envio)
}

function modal() {
    for (let i = 0; i < FORMA_DE_PAGO.length; i++) {
        //Toma todos los inputs radio dentro del modal de los métodos
        //de pago y actúa cuando se les cliquea
        FORMA_DE_PAGO[i].addEventListener("click", function () {
            for (let k = 0; k < FORMA_DE_PAGO.length; k++) {
                //Vuelve a tomar cada input radio, y declara los
                //inputs texto que sean "hijos" de él  
                let hijo = FORMA_DE_PAGO[k].dataset.hijo
                let divHijo = document.getElementById(hijo)
                let inputs = divHijo.getElementsByTagName("input")
                if (k == i) {
                    //Si el input "hijo" coincide con el radio cliqueado,
                    //se le agrega la clase "needs-validation" al div que
                    //lo contiene para que su formato cambie al darle clic
                    //a enviar, y si ya se le dio clic, se le agrega también 
                    //"was-validated" para que su formato cambie en el momento.
                    divHijo.classList.add("needs-validation")
                    if (FORMULARIO.classList.contains("was-validated")) {
                        divHijo.classList.add("was-validated")
                    }

                }
                //Deshabilita todos los inputs que no sean "hijos" del
                //radio seleccionado
                for (let input of inputs) {
                    input.disabled = k != i
                }
            }

            // Se encarga de agregarle el mensaje de validación cada que
            // se cambia de radio seleccionado
            let inputs = document.getElementById("pago").querySelectorAll(`[type="text"]`)
            inputs = Array.from(inputs)
            formaDePago(inputs)

            document.getElementById("metodo").innerHTML = FORMA_DE_PAGO[i].labels[0].innerHTML

        })
    }
}

const validar = (input) => input.checkValidity()


function formaDePago(inputs) {
    // No me dio tiempo a explicar esto en la defensa, pero lo que hace es tomar
    // los inputs de texto del modal y, si todos son válidos le quita la clase
    // "invalido"* al mensaje que aparece si falta un input, y si alguno no es válido
    // se le agrega esa clase.

    // *La clase "invalido" si está dentro de un elemento con clase "was-validated"
    // hace que el elemento que la tenga tenga un display block. Está en styles.css

    if (inputs.every(validar)) {
        document.getElementById("mensajeFormaDePago").classList.remove("invalido")
    } else {
        document.getElementById("mensajeFormaDePago").classList.add("invalido")
    }
}

function formularioEnviado() {
    CARRITO.innerHTML = null
    document.getElementsByClassName("table-responsive-sm")[0].innerHTML = CARRITO_VACIO
    localStorage.removeItem("carrito")

    ALERTA.classList.add("show")

    let validaciones = document.getElementsByClassName("was-validated")

    for (let validacion of validaciones) {
        validacion.classList.remove("was-validated")
    }
}

function validarFormulario() {
    'use strict'
    FORMULARIO.addEventListener("submit", function (event) {
        event.preventDefault()
        //Ni idea como validar un elemento que no existe así que hice que si no existe alguna 
        //tabla (con los productos del carrito) actúe como si el formulario estuviera inválido
        if (!FORMULARIO.checkValidity() || !(document.getElementsByTagName("table")[0])) {
            event.stopPropagation()
            let validaciones = document.getElementsByClassName("needs-validation")
            for (let validacion of validaciones) {
                validacion.classList.add('was-validated')
            }
        } else {
            formularioEnviado()
        }
    })


}

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CONVERSOR).then(function (conversor) {
        let carritoLocalStorage = usuarios[usuarioActivo]["carrito"]
        if (carritoLocalStorage.length > 0) {
            carrito = carritoLocalStorage
            for (const producto of carrito) {
                agregarAlCarrito(producto)
            }
        } else {
            document.getElementsByClassName("table-responsive-sm")[0].innerHTML = CARRITO_VACIO
        }

        if (conversor.status === "ok") {
            convert = conversor.data.data.UYU.value
            subtotalGeneral()
        } else {
            convert = 42.4
            subtotalGeneral()
        }

        envio()
        total()

        modal()
        validarFormulario()


        let inputs = document.getElementById("pago").querySelectorAll(`[type="text"]`)
        inputs = Array.from(inputs)
        for (let input of inputs) {
            input.addEventListener("input",function(){
                formaDePago(inputs)
            })
        }
    })
})
