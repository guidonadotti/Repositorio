let IDdelaCategoría = localStorage.getItem("catID")
var productos_url = `https://japceibal.github.io/emercado-api/cats_products/${IDdelaCategoría}.json`;
console.log(productos_url);
let arregloInicial = [];
let minCount = undefined;
let maxCount = undefined;
let Busqueda = undefined;
const ORDER_ASC_BY_COST = "$Up";
const ORDER_DESC_BY_COST = "$Down";
const ORDER_BY_SOLD_COUNT = "Rel.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            return aCount-bCount;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            return -(aCount-bCount);
        });
    } else if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            return aCount-bCount;
        });
    }
    return result;
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;
    if (categoriesArray != undefined) {
        arregloInicial.products = categoriesArray;
    }
    arregloInicial.products = sortCategories(currentSortCriteria, arregloInicial.products);

    insertarProductos();
}

function insertarProductos() {
    let htmlContentToAppend = "";
    for (elemento of arregloInicial.products) {
        elemento.cost = darEspacios(elemento.cost)
        if (((minCount == undefined) || (minCount != undefined && parseInt(elemento.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(elemento.cost) <= maxCount)) &&
            ((Busqueda == undefined) || (Busqueda != undefined &&
                (elemento.name.toLocaleLowerCase().includes((Busqueda))
                    || elemento.description.toLocaleLowerCase().includes(Busqueda))))) {
            htmlContentToAppend += `
                    <div onclick="setProdID(${elemento.id})" 
                        class="list-group-item list-group-item-action cursor-active d-none d-md-block">
                        <div class="row">
                            <div class="col-3">
                                <img src="${elemento.image}" alt="${elemento.description}" class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">${elemento.name}</h4>
                                    <h4 class="mb-1">${elemento.currency} ${elemento.cost}</h4>
                                </div>
                                <p class="mb-1">${elemento.description}</p>
                                <small class="text-muted">${elemento.soldCount} vendidos</small>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 mb-3">
                        <div onclick="setProdID(${elemento.id})" 
                            class="card list-group-item-action cursor-active d-block d-md-none">
                            <img src="${elemento.image}" alt="${elemento.name}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${elemento.name}</h5>
                                <p class="m-0">${elemento.currency} ${elemento.cost}</p>   
                                <p><small class="text-muted">${elemento.description}</small></p>
                                <p><small class="text-muted">${elemento.soldCount} vendidos</small></p>
                            </div>
                        </div>
                    </div>
                    `
        }
        document.getElementById("Lista").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    //Fetch
    getJSONData(productos_url).then(function (productos) {
        if (productos.status === "ok") {
            arregloInicial = productos.data;
            insertarProductos()
            console.log(productos);
        }
        //Título
        document.getElementsByClassName("text-center p-4")[0].
            getElementsByTagName("span")[0].innerHTML = `${productos.data.catName}`;
        document.title=`${productos.data.catName} en eMercado`
    });
    //Ordenar
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_SOLD_COUNT);
    });

    //Filtrar
    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
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

    // Cada que se modifiquen los filtros del precio se le cambia el
    // mínimo o el máximo de el otro input según corresponda.
    let minimo=document.getElementById("rangeFilterCountMin")
    let maximo=document.getElementById("rangeFilterCountMax")

    minimo.addEventListener("input", function () {
        maximo.min = 100 + parseInt(minimo.value)
    })
    maximo.addEventListener("input", function () {
        minimo.max = parseInt(maximo.value) - 100
    })

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        minimo.value = "";
        maximo.value = "";
        maximo.min = 0
        minimo.max = undefined

        minCount = undefined;
        maxCount = undefined;

        insertarProductos()
    });

    document.getElementById("Buscar").addEventListener("input", function () {
        Busqueda = document.getElementById("Buscar").value;
        Busqueda = String(Busqueda).toLocaleLowerCase()
        if (Busqueda == null) {
            Busqueda = undefined
        }
        insertarProductos()
    })
});