let IDdelaCategoría= localStorage.getItem("catID")
const productos_url = `https://japceibal.github.io/emercado-api/cats_products/${IDdelaCategoría}.json`;
let arregloInicial=[];
let minCount = undefined;
let maxCount = undefined;

function insertarProductos(){
    let htmlContentToAppend = "";
    for (elemento of arregloInicial.products) {
        if (((minCount == undefined) || (minCount != undefined && parseInt(elemento.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(elemento.cost) <= maxCount))){
                /* onclick="setCatID(${elemento.id})" */
                htmlContentToAppend += `
                    <div class="list-group-item list-group-item-action cursor-active">
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
}

document.addEventListener("DOMContentLoaded", function(){
    //Título
    document.getElementsByClassName("text-center p-4")[0].innerHTML=
            `<h2>Productos</h2>
            <p class="lead">Verás aquí todos los productos de la categoría ${localStorage.getItem("categoría")}.</p>`;

    //Fetch
    getJSONData(productos_url).then(function(productos){
        if(productos.status === "ok"){
            arregloInicial=productos.data;
            insertarProductos()
        }
    });
    
    //Filtrar
    /* document.getElementById("rangeFilterCount").addEventListener("click", function(){
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
            console.log(minCount)

        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        insertarProductos();
    }); */
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        console.log("click")
    })
    document.getElementById("clearRangeFilter").addEventListener("click",function(){
        console.log("click")
    })
});

