let IdDelProducto=localStorage.getItem("ProdID")
var producto_url=`https://japceibal.github.io/emercado-api/products/${IdDelProducto}.json`
var comentarios_url=`https://japceibal.github.io/emercado-api/products_comments/${IdDelProducto}.json`

document.addEventListener("DOMContentLoaded",() => {
    getJSONData(producto_url).then(function (producto) {
        if (producto.status === "ok") {
            producto=producto.data
            console.log(producto)
            document.getElementsByTagName("h2")[0].innerHTML=producto.name
            document.getElementById("precio").innerHTML=producto.currency+" "+producto.cost
            document.getElementById("descripcion").innerHTML=producto.description
            document.getElementById("categoria").innerHTML=producto.category
            document.getElementById("vendidos").innerHTML=producto.soldCount
            let img=document.getElementsByTagName("img") 
            for (let i = 0; i < img.length; i++) {
                img[i].src=producto.images[i]
            }
        }
    })
    getJSONData(comentarios_url).then(function (comentarios) {
        if(comentarios.status==="ok"){

        }     
    })

})