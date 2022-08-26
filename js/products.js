let IDdelaCategoría = localStorage.getItem("catID")
const productos_url = `https://japceibal.github.io/emercado-api/cats_products/${IDdelaCategoría}.json`;
let arregloInicial = [];
let minCount = undefined;
let maxCount = undefined;
const ORDER_ASC_BY_COST = "$Up";
const ORDER_DESC_BY_COST = "$Down";
const ORDER_BY_SOLD_COUNT = "Rel.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount < bCount ){ return -1; }
            if ( aCount > bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;
    if(categoriesArray != undefined){
        arregloInicial.products = categoriesArray;
    }
    arregloInicial.products = sortCategories(currentSortCriteria, arregloInicial.products);

    insertarProductos();
}

function insertarProductos() {
    let htmlContentToAppend = "";
    for (elemento of arregloInicial.products) {
        if (((minCount == undefined) || (minCount != undefined && parseInt(elemento.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(elemento.cost) <= maxCount)) &&
            ((Busqueda == undefined) || (Busqueda != undefined && String(elemento.name).includes(String(Busqueda))))) {
            /* onclick="setCatID(${elemento.id})" */
            htmlContentToAppend += `
                    <div class="list-group-item list-group-item-action cursor-active">
                        <div class="row">
                            <div class="col-3">
                                <img src="${elemento.image}" alt="${elemento.description}" class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">${elemento.name} - ${elemento.currency} ${elemento.cost}</h4>
                                    <small class="text-muted">${elemento.soldCount} vendidos</small>
                                </div>
                                <p class="mb-1">${elemento.description}</p>
                            </div>
                        </div>
                    </div>
                    `
        }
        document.getElementById("Lista").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    //Título
    document.getElementsByClassName("text-center p-4")[0].
        getElementsByTagName("span")[0].innerHTML = ` ${localStorage.getItem("categoría")}`;

    //Fetch
    getJSONData(productos_url).then(function (productos) {
        if (productos.status === "ok") {
            arregloInicial = productos.data;
            insertarProductos()
        }
    });
    //Ordenar
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_SOLD_COUNT);
    });

    //Filtrar
    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
            console.log(minCount)
        }
        else {
            minCount = undefined;
        };

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        };

        insertarProductos();
    });

/*     document.getElementById("rangeFilterCountMin").addEventListener("input",function(){
        minCount = document.getElementById("rangeFilterCountMin").value
        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
            console.log(minCount)

        }
        else {
            minCount = undefined;
        };
        insertarProductos()
    });
    document.getElementById("rangeFilterCountMax").addEventListener("input",function(){
        maxCount = document.getElementById("rangeFilterCountMax").value;
        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        };

        insertarProductos()
    })
     */
    document.getElementById("clearRangeFilter").addEventListener("click",function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        insertarProductos()
    });

    document.getElementById("Buscar").addEventListener("input",function(){
        Busqueda =document.getElementById("Buscar").value;
        console.log(Busqueda)
        if(Busqueda==undefined || Busqueda==""){
            Busqueda=undefined
        }
        insertarProductos()
    })
});

