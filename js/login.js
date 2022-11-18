function inputVacio(inputID){
    let input=document.getElementById(inputID)
    input.classList+=" vacio"
}
function guardarDatos(mail,contrasenna){
    let usuarios=localStorage.getItem("usuarios") 
    // En caso de que hayan usuarios en el LocalStorage 
    if (usuarios) { 
        usuarios=JSON.parse(usuarios)
        // Si ya existe algún usuario con ese correo le actualiza la contraseña
        // y si no existe crea una propiedad con el mail del usuario con sus datos
        if (usuarios[mail]) {
            usuarios[mail].contrasenna=contrasenna
        }else{
            usuarios[mail]={
                "mail":mail,
                "contrasenna":contrasenna,
                "carrito":[]
            }
        }
    // Si no hay ningún usuario en el LocalStorage
    }else{ 
        // Crea un objeto vacío
        usuarios={
        }
        // y le asigna a ese objeto una propiedad con el nombre del mail con
        // sus datos.
        usuarios[mail]={
            "mail":mail,
            "contrasenna":contrasenna,
            "carrito":[]
        }
    }
    // Y finalmente lo guarda en el LocalStorage.
    usuarios=JSON.stringify(usuarios)
    localStorage.setItem("usuarios",usuarios)
}

function Ingresar(){
    // Toma los valores que el usuario ingresó.
    let mail=document.getElementById("mail").value
    let contrasenna=document.getElementById("contrasenna").value

    if(mail!="" && contrasenna!=""){
        // Guarda esos valores en el localStorage.
        guardarDatos(mail,contrasenna)
        localStorage.setItem("mail",mail)
        localStorage.setItem("contrasenna",contrasenna)

        // En caso de que el usuario haya estado en una página y cerrado sesión
        // se le devuelve a esa página, y sino, a index.
        if(sessionStorage.getItem("ultimaPagina")!=null){
            window.location=sessionStorage.getItem("ultimaPagina")
        }else{
            window.location="index.html";
        }
        
    }else{
        // Se le solicita que ingrese en el o los inputs que haya dejado vacíos.
        if(mail==""){
            inputVacio("mail");
            document.getElementById("mailVacio").innerHTML=`Ingresa tu contraseña`
        };
        if(contrasenna==""){
            inputVacio("contrasenna")
            document.getElementById("contrasennaVacia").innerHTML=`Ingresa tu contraseña`
        }
    }
}
document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("Ingresar").addEventListener("click",function(){
        Ingresar()
    });
    // Si el usuario da enter estando en el input del mail,
    // se lo lleva al de la contraseña.
    document.getElementById("mail").addEventListener("keydown",function(letra){
        if(letra.key=="Enter"){
            document.getElementById("contrasenna").focus()
        }
    });

    document.getElementById("contrasenna").addEventListener("keydown",function(letra){
        if(letra.key=="Enter"){
            Ingresar()
        }
    })

    //Si el usuario escribe algo en alguno de los inputs que había dejado vacío,
    //el mensaje y el formato del input desaparecen

    /* let inputs=document.getElementsByTagName("input")

    for (const input of inputs) {
        input.addEventListener("input",function(){
            if(input.value!=""){
                input.classList=undefined;
                input.nextSibling.innerHTML="";
            }  
        })
    } */

    document.getElementById("mail").addEventListener("input",function(){
        let mail=document.getElementById("mail").value
        if(mail!=""){
            document.getElementById("mail").classList.remove("vacio");
            document.getElementById("mailVacio").innerHTML="";
        };
    })
    document.getElementById("contrasenna").addEventListener("input",function(){
        let contrasenna=document.getElementById("contrasenna").value
        if(contrasenna!=""){
            document.getElementById("contrasenna").classList.remove("vacio");
            document.getElementById("contrasennaVacia").innerHTML="";
        };
    })
})