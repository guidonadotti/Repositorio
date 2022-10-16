const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function cerrarSesion (){
  localStorage.removeItem("mail");
  localStorage.removeItem("contrasenna");
  sessionStorage.setItem("ultimaPagina",document.location.href)
  window.location="login.html"
}

document.addEventListener("DOMContentLoaded",function(){
  document.getElementsByClassName("nav-item")[3].innerHTML=
  `
    <div class="dropdown">
      <a class="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        ${localStorage.getItem("mail")}
      </a>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
        <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
        <li><a class="dropdown-item" href="" onclick="cerrarSesion()">Cerrar sesión</a></li>
      </ul>
    </div>
  `
})

if((localStorage.getItem("mail")==null) || (localStorage.getItem("contrasenna")==null)){
  window.location="login.html"
};
function setProdID(id){
  localStorage.setItem("ProdID",id)
  window.location=`product-info.html`
}

document.head.innerHTML+=`
<link rel="shortcut icon" href="img/jap.png">
`

function darEspacios(numero){
  return numero.toLocaleString("en-US").replaceAll(","," ")
}

function quitarEspacios(numero){
  return numero.split(" ").join("")
}
