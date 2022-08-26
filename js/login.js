

function mailVacío(){
    let mail=document.getElementById("mail")
    mail.style.border= "1px solid rgb(220, 53, 69)"
    document.getElementById("mailVacío").innerHTML=`<p style="color:rgb(220, 53, 69)">Ingresa tu e-mail</p>`
}

function contraseñaVacía(){
    let contraseña=document.getElementById("contraseña")
    contraseña.style.border= "1px solid rgb(220, 53, 69)"
    document.getElementById("contraseñaVacía").innerHTML=`<p style="color:rgb(220, 53, 69)">Ingresa tu contraseña</p>`
}

function Ingresar(){
    let mail=document.getElementById("mail").value
    let contraseña=document.getElementById("contraseña").value
    if(mail!="" && contraseña!==""){
        localStorage.setItem("mail",mail);
        localStorage.setItem("contraseña",contraseña);
        window.location="index.html";
    }else{
        if(mail==""){
            mailVacío()
        };
        if(contraseña==""){
            contraseñaVacía()
        };
        if(mail!=""){
            document.getElementById("mailVacío").innerHTML="";
            document.getElementById("mail").style.border="";
        };
        if(contraseña!=""){
            document.getElementById("contraseñaVacía").innerHTML="";
            document.getElementById("contraseña").style.border="";
        }
    }
}
document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("Ingresar").addEventListener("click",Ingresar);
    document.getElementById("mail").addEventListener("keydown",function(letra){
        if(letra.key=="Enter"){
            document.getElementById("contraseña").focus()
        }
    });
    document.getElementById("contraseña").addEventListener("keydown",function(letra){
        if(letra.key=="Enter"){
            Ingresar()
        }
    })
})


