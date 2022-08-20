let ID= localStorage.getItem("catID")
const productos_url = `https://japceibal.github.io/emercado-api/cats_products/${ID}.json`;
let arregloInicial=[];

function insertarProductos(){
    let htmlContentToAppend = "";
    for (elemento of arregloInicial.products) {
        htmlContentToAppend += `
            <div onclick="setCatID(${elemento.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${elemento.image}" alt="${elemento.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${elemento.name} - ${elemento.currency} - ${elemento.cost}</h4>
                            <small class="text-muted">${elemento.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${elemento.description}</p>
                    </div>
                </div>
            </div>
            `
        document.getElementsByClassName("container")[1].innerHTML +=htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function(){;
    getJSONData(productos_url).then(function(productos){
        document.getElementsByClassName("text-center p-4")[0].innerHTML=
            `<h2>Productos</h2>
            <p class="lead">Verás aquí todos los productos de la categoría ${localStorage.getItem("categoría")}.</p>`
        if(productos.status === "ok"){
            arregloInicial=productos.data;
            insertarProductos()
        }
    })
});

