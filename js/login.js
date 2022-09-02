function mailVacio(){
    let mail=document.getElementById("mail")
    mail.classList="vacio"
    document.getElementById("mailVacio").innerHTML=`Ingresa tu contraseña`
}

function contrasennaVacia(){
    let contrasenna=document.getElementById("contrasenna")
    contrasenna.classList="vacio"
    document.getElementById("contrasennaVacia").innerHTML=`Ingresa tu contraseña`
}

function Ingresar(){
    let mail=document.getElementById("mail").value
    let contrasenna=document.getElementById("contrasenna").value
    if(mail!="" && contrasenna!==""){
        localStorage.setItem("mail",mail);
        localStorage.setItem("contrasenna",contrasenna);
        window.location="index.html";
    }else{
        if(mail==""){
            mailVacio()
        };
        if(contrasenna==""){
            contrasennaVacia()
        }
    }
}
document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("Ingresar").addEventListener("click",Ingresar);
    
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
    document.getElementById("mail").addEventListener("input",function(){
        let mail=document.getElementById("mail").value
        if(mail!=""){
            document.getElementById("mailVacio").innerHTML="";
            document.getElementById("mail").classList=undefined;
        };
    })
    document.getElementById("contrasenna").addEventListener("input",function(){
        let contrasenna=document.getElementById("contrasenna").value
        if(contrasenna!=""){
            document.getElementById("contrasennaVacia").innerHTML="";
            document.getElementById("contrasenna").classList=undefined;
        };
    })
})


