if((localStorage.getItem("mail")==null) || (localStorage.getItem("contrasenna")==null)){
    window.location="login.html"
};

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        localStorage.setItem("categoria","autos");
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        localStorage.setItem("categoria","juguetes");
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("categoria","muebles")
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

