function inputVacio(inputID){
    let input=document.getElementById(inputID)
    input.classList="vacio"
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


