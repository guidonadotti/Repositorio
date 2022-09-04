let IdDelProducto=localStorage.getItem("ProdID")
var producto_url=`https://japceibal.github.io/emercado-api/products/${IdDelProducto}.json`
var comentarios_url=`https://japceibal.github.io/emercado-api/products_comments/${IdDelProducto}.json`

function estrellas(n) {
    htmlContentToAppend=""
    for (let i = 0; i < n; i++) {
        htmlContentToAppend+=`<span class="fa fa-star checked"></span>`
    }
    for (let i = n; i < 5; i++) {
        htmlContentToAppend+=`<span class="fa fa-star"></span>`
    }
}

document.addEventListener("DOMContentLoaded",() => {
    getJSONData(producto_url).then(function (producto) {
        if (producto.status === "ok") {
            producto=producto.data
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
            comentarios=comentarios.data
            let htmlContentToAppend = ""
            for (const comentario of comentarios) {
                htmlContentToAppend+=
                `<div class="col-6 border border-gray rounded">
                    <p><span class="negrita">${comentario.user}</span> - ${comentario.dateTime} - 
                        ${estrellas(comentario.score)}</p>
                    <p>${comentario.description}</p>
                </div>`
            }
            document.getElementById("comentarios").innerHTML=htmlContentToAppend
        }     
    })
    document.getElementById("Enviar").addEventListener("click",function(){
        let comentario=document.getElementById("opinion").value
        let puntuacion=document.getElementsByTagName("select")[0].value
        puntuacion=parseInt(puntuacion)
        let usuario=localStorage.getItem("mail")
        let fecha="juan"

        document.getElementById("comentarios").innerHTML +=
        `<div class="col-6 border border-gray rounded">
            <p><span class="negrita">${usuario}</span> - ${fecha} - 
                ${estrellas(puntuacion)}</p>
            <p>${comentario}</p>
        </div>`
        document.getElementById("opinion").value=""
        document.getElementsByTagName("select")[0].selectedIndex=0
    })
})