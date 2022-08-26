if((localStorage.getItem("mail")==null) || (localStorage.getItem("contraseña")==null)){
    window.location="login.html"
};

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        localStorage.setItem("categoría","autos");
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        localStorage.setItem("categoría","juguetes");
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("categoría","muebles")
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

