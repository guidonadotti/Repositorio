

function mailVacio(){
    let mail=document.getElementById("mail")
    mail.style.border= "1px solid rgb(220, 53, 69)"
    document.getElementById("mailVacio").innerHTML=`<p style="color:rgb(220, 53, 69)">Ingresa tu e-mail</p>`
}

function contrasennaVacia(){
    let contrasenna=document.getElementById("contrasenna")
    contrasenna.style.border= "1px solid rgb(220, 53, 69)"
    document.getElementById("contrasennaVacia").innerHTML=`<p style="color:rgb(220, 53, 69)">Ingresa tu contraseña</p>`
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
        };
        
        if(contrasenna!=""){
            document.getElementById("contrasennaVacia").innerHTML="";
            document.getElementById("contrasenna").style.border="";
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
            document.getElementById("mail").style.border="";
        };
    })
    document.getElementById("contrasenna").addEventListener("input",function(){
        let contrasenna=document.getElementById("contrasenna").value
        if(contrasenna!=""){
            document.getElementById("contrasennaVacia").innerHTML="";
            document.getElementById("contrasenna").style.border="";
        };
    })
})


