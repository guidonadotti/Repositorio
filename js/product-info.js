let IdDelProducto=localStorage.getItem("ProdID")
var producto_url=`https://japceibal.github.io/emercado-api/products/${IdDelProducto}.json`
var comentarios_url=`https://japceibal.github.io/emercado-api/products_comments/${IdDelProducto}.json`
let comentarios1=[]


function estrellas(n) {
    htmlContentToAppend=""
    for (let i = 0; i < n; i++) {
        htmlContentToAppend+=`<span class="fa fa-star checked"></span>`
    }
    for (let i = n; i < 5; i++) {
        htmlContentToAppend+=`<span class="fa fa-star"></span>`
    }
    return htmlContentToAppend
}
function insertarComentarios(){
    let htmlContentToAppend = ""
            for (const comentario of comentarios1) {
                htmlContentToAppend+=
                `<div class="col-6 border border-gray rounded">
                    <p><span class="negrita">${comentario.user}</span> - ${comentario.dateTime} - 
                        ${estrellas(comentario.score)}</p>
                    <p>${comentario.description}</p>
                </div>`
            }

            document.getElementById("comentarios").innerHTML+=htmlContentToAppend
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
            comentarios1=comentarios.data
            if(localStorage.getItem(`comentariosDelUsuario${IdDelProducto}`)!=null){
                comentarios1=comentarios1.concat(JSON.parse(localStorage.getItem(`comentariosDelUsuario${IdDelProducto}`)))
            }
            console.log(comentarios1);
            insertarComentarios()
        }     
    })
    document.getElementById("Enviar").addEventListener("click",function(){
        let comentario=document.getElementById("opinion").value
        let puntuacion=document.getElementsByTagName("select")[0].value
        puntuacion=parseInt(puntuacion)
        let usuario=localStorage.getItem("mail")
        let fecha="juan"

        let comentarioDelUsuario={
            "product": parseInt(IdDelProducto),
            "score": puntuacion,
            "description": comentario,
            "user": usuario,
            "dateTime": fecha
        }

        comentarios1=[comentarioDelUsuario]
        insertarComentarios()

        if(localStorage.getItem(`comentariosDelUsuario${IdDelProducto}`)==null){
            localStorage.setItem(`comentariosDelUsuario${IdDelProducto}`,JSON.stringify([comentarioDelUsuario]))
        }else{
            let comentarios2=JSON.parse(localStorage.getItem(`comentariosDelUsuario${IdDelProducto}`))
            comentarios2=comentarios2.concat([comentarioDelUsuario])
            localStorage.setItem(`comentariosDelUsuario${IdDelProducto}`,JSON.stringify(comentarios2))
        }
        

        document.getElementById("opinion").value=null
        document.getElementsByTagName("select")[0].selectedIndex=0
    })
    document.getElementById("Cancelar").addEventListener("click",function(){
        document.getElementById("opinion").value=null
        document.getElementsByTagName("select")[0].selectedIndex=0
    })

    /* document.getElementById("opinion").addEventListener("input",function(){
        for (let i = 1; i < document.getElementsByTagName("button").length; i++) {
            const element = document.getElementsByTagName("button")[i];
            if(document.getElementById("opinion").value==""){
                element.disabled=true
            }else{
                element.disabled=false
            }           
        }
    }) */
})