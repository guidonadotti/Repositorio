const CARRITO_USUARIO=CART_INFO_URL+25801+EXT_TYPE
const CARRITO=document.getElementById("productostabla")

function cambiarSubtotal(id,cantidad){
    cantidad=parseInt(cantidad);
    let costo=document.getElementById("costo_"+id)
    costo=parseInt(quitarEspacios(costo.innerHTML));
    let subtotal=document.getElementById("subtotal_"+id)
    subtotal.innerHTML=darEspacios(cantidad*costo)

}

function agregarAlCarrito(producto){
    CARRITO.innerHTML+=`
    <tr>    
        <th scope="row" class="primera"><img src="${producto.image}" class="img-fluid rounded-1"></th>
        <td>${producto.name}</td>
        <td>${producto.currency} <span id="costo_${producto.id}">${darEspacios(producto.unitCost)}</span></td>
        <td class="col-2"><div class="col-8 col-sm-6 col-md-5">
            <input type="number" class="form-control" min="0" value="${producto.count}" 
                oninput="cambiarSubtotal(${producto.id},this.value)"></td>
        <td class="col-3 fw-bold">${producto.currency} 
            <span id="subtotal_${producto.id}">${darEspacios(producto.unitCost)}</span></td>
    </tr>
    `    
}

document.addEventListener("DOMContentLoaded",function(){
    getJSONData(CARRITO_USUARIO).then(function(productos){
        if(productos.status==="ok"){
            agregarAlCarrito(productos.data.articles[0])
            let productosAgregados=JSON.parse(localStorage.getItem("carrito"))
            for (const producto of productosAgregados) {
                agregarAlCarrito(producto)
            }
           /*  let filas =document.getElementById("productostabla").getElementsByTagName("tr")
            for (const fila of filas) {
                let cantidad = fila.getElementsByTagName("input")[0]
                let precio = fila.getElementsByTagName("span")[0]
                precio=precio.innerHTML.split(" ").join("")
                precio=parseInt(precio)
                let subtotal= fila.getElementsByTagName("span")[1]

                cantidad.addEventListener("input",function(){
                    subtotal.innerHTML=`${darEspacios(
                        parseInt(cantidad.value)*precio)}`
                })
                
            } */
        }
    })
})
