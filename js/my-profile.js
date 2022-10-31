const INPUTS = document.getElementsByTagName("input")
const ALERTA = document.getElementById("alerta")
let MAIL = INPUTS.mail
let usuarioActivo = localStorage.getItem("mail")
let datos = localStorage.getItem("usuarios")
datos = JSON.parse(datos)
const FORMULARIO = document.getElementById("formulario")

function formularioEnviado() {
    FORMULARIO.classList.remove("was-validated")

    // Al enviarse el formulario se guardan los valores ingresados
    // en propiedades dentro de una variable para luego guardarse
    // en el localStorage.
    for (let input of INPUTS) {
        datos[usuarioActivo][input.id] = input.value
    }
    
    // En caso de que se haya modificado el mail del usuario:
    if (INPUTS.mail.value !== usuarioActivo) {
        // Se guarda una nueva propiedad con el nuevo mail y los mismos datos
        // y se borra la anterior (básicamente se le cambió el nombre a la propiedad) 
        datos[INPUTS.mail.value] = datos[usuarioActivo] 
        delete datos[usuarioActivo] 

        // Se guarda el nuevo mail en el localStorage y se le cambia también en la
        // barra de navegación.
        localStorage.setItem("mail", INPUTS.mail.value)
        document.getElementById("mailNavbar").innerHTML = INPUTS.mail.value

        // Y se actualiza la variable usuarioActivo para que si se quiere
        // volver a cambiar los datos se le modifique a los datos del usuario
        // con el nuevo correo electrónico 
        usuarioActivo = INPUTS.mail.value
    }
    
    let usuarios = JSON.stringify(datos)
    localStorage.setItem("usuarios", usuarios)

    ALERTA.classList.add("show")
}

function validarFormulario() {
    'use strict'
    FORMULARIO.addEventListener("submit", function (e) {
        e.preventDefault()
        if (!FORMULARIO.checkValidity()) {
            e.stopPropagation()

            FORMULARIO.classList.add("was-validated")
        } else {
            formularioEnviado()
        }
    })
}


function comprobarMail(mail){
    return MAIL.value==mail
}
function chequearMail() {
    // Pone todos los correos excpeto el del usuario ya registrado
    // en un array
    let correos=[] 
    for (let usuario in datos) {
        if (usuario != usuarioActivo) {
            correos.push(usuario)
        }
    }
    // y si el mail ingresado por el usuario es alguno de los que está
    // en el array el input queda como inválido.
    if (correos.some(comprobarMail)) {
        MAIL.setCustomValidity("Ese mail ya está en uso")
        document.getElementById("invalidMail").innerHTML = MAIL.validationMessage
    }else{
        MAIL.setCustomValidity("")
        document.getElementById("invalidMail").innerHTML = "Ingrese un e-mail válido."
    }
}


document.addEventListener("DOMContentLoaded", function () {
    // Toma todos los inputs del formulario, el localStorage con los
    // datos de los usuarios y el usuario con el que se inició sesión.  
    // Y, de existir, le coloca como valor en los inputs el valor de
    // una propiedad dentro de los datos del usuario activo que tiene
    // por nombre el mismo id que el input.
    for (let input of INPUTS) {
        if (datos[usuarioActivo][input.id]) {
            input.value = datos[usuarioActivo][input.id]
        }
    }

    // Le establece la validación customizada cuando se le modifique el mail
    // para que no acepte mails ya "registrados"
    MAIL.addEventListener("input",function(){
        chequearMail()
    })

    validarFormulario()
})