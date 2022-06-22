/////////////////////////////// CREAR LOADER /////////////////////////////////////////////////
function crearLoader() {
    var div_1 = document.createElement('div'),
        div_2 = document.createElement('div'),
        p = document.createElement('p');

    div_1.name = 'loader'
    div_1.valign = 'middle'
    div_1.align = 'center'

    div_2.classList.add('spinner')
    p.classList.add('text-light')
    
    div_1.appendChild(p)
    div_1.appendChild(div_2)
    p.innerText = 'Cargando...'
    
    return div_1
}
function eliminarLoader(elemento) {
    var padre = elemento

    for (var i = 0; i < padre.childNodes.length; i++) {
        var ele = padre.childNodes[i];
        (ele.name === 'loader') && padre.removeChild(ele)
    }
}
    let contador = 1;
$(document).ready(function(){
    //////////////////// INPUT RADIO ///////////////////////////////////////
    $('#stocksi').attr('checked', true);
    /////////// FUNCION PARA CARGAR TODOS LOS DATOS DE LA BASE ////////////////////
    var param = {
        'valor': '' 
    }
    var div = document.getElementById('loader');

    $.ajax({
        url: "./ajax/ajax_datos_base.php",
        type: "POST",
        dataType : 'JSON',
        data: param,
        beforeSend: function () {
            div.innerHTML = '';
            div.appendChild(crearLoader());
        },
        success: cargarDatos,
        error: function() {
            //Fallo al buscar datos
            alertify.alert('Carga de datos','Fallo la carga de datos, por favor intente mas tarde.'); 
        }
    });
    function cargarDatos(data) {
        eliminarLoader(div);
        var datos = data.datos,
        imagenes = Object.values(data.imagen);
        //let contadorPrincipal = 0;
        let contadorSecundario = 0;

        for (var i = 0; i < datos.length; i++) {
            var dato = datos[i],
            imagenesFor = imagenes[i],
            divBuscador = document.createElement("div");
            if(imagenesFor.imagen == ''){
                var imagen = 'img/blanco.jpg';
            }else{
                var imagen = 'data:image/jpeg;base64,'+imagenesFor.imagen+'';
            }
            // SI NO ES OFERTA ENTRA ACAA
            if(dato.oferta == '' || dato.oferta == 'f' || dato.oferta != 't'){
                //var contPrincipal = contadorPrincipal++;
               if(dato.nombre.length > 32){
                    divBuscador.innerHTML = `
                    <div class="col-md-3 float-left border">
                        <img src="`+imagen+`" class="bor-img rounded-circle pointer p-4 " id="accesorio_imagen_`+dato.id+`" onclick="funcionModal(`+dato.id+`,'`+dato.stock+`')" height="100%" width="100%" >
                        <br><h5 id="accesorios_id_`+dato.id+`" style="display:none;" class="f-l text-center text-light mt-1">`+dato.id+`</h5>
                        <h5 id="accesorios_nombre_`+dato.id+`" class="f-l text-center text-light mt-1">`+dato.nombre+`</h5>
                        <hr>
                        <p id="accesorios_precio_`+dato.id+`" class="f-l text-center text-light">$`+dato.precio+`</p>
                    </div>`;
                }else{
                    divBuscador.innerHTML = `
                    <div class="col-md-3 float-left border">
                        <img src="`+imagen+`" class="bor-img rounded-circle pointer p-4 " id="accesorio_imagen_`+dato.id+`" onclick="funcionModal(`+dato.id+`,'`+dato.stock+`')" height="100%" width="100%" >
                        <br><h5 id="accesorios_id_`+dato.id+`" style="display:none;" class="f-l text-center text-light mt-1">`+dato.id+`</h5>
                        <h5 id="accesorios_nombre_`+dato.id+`" style="padding-bottom:12px;padding-top:10px;" class="f-l text-center text-light mt-1">`+dato.nombre+`</h5>
                        <hr>
                        <p id="accesorios_precio_`+dato.id+`" class="f-l text-center text-light">$`+dato.precio+`</p>
                    </div>`;
                }
                if(dato.posicion == 'a'){
                    document.getElementById("acaDiv1").appendChild(divBuscador);
                }else if(dato.posicion == 'p'){
                    document.getElementById("acaDiv2").appendChild(divBuscador);
                }else if(dato.posicion == 'i'){
                    document.getElementById("acaDiv3").appendChild(divBuscador);
                }else if(dato.posicion == 'c'){
                    document.getElementById("acaDiv4").appendChild(divBuscador);
                }
            }else{
                if(dato.nombre.length > 32){
                    divBuscador.innerHTML = `
                    <div class="col-md-3 float-left border">
                        <img src="`+imagen+`" class="bor-img rounded-circle pointer p-4 " id="accesorio_imagen_`+dato.id+`" onclick="funcionModal(`+dato.id+`,'`+dato.stock+`')" height="100%" width="100%" >
                        <br><h5 id="accesorios_id_`+dato.id+`" style="display:none;" class="f-l text-center text-light mt-1">`+dato.id+`</h5>
                        <h5 id="accesorios_nombre_`+dato.id+`" class="f-l text-center text-light mt-1">`+dato.nombre+`</h5>
                        <hr>
                        <p id="accesorios_precio_`+dato.id+`" class="f-l text-center text-light">$`+dato.precio+`</p>
                    </div>`;
                }else{
                    divBuscador.innerHTML = `
                    <div class="col-md-3 float-left border">
                        <img src="`+imagen+`" class="bor-img rounded-circle pointer p-4 " id="accesorio_imagen_`+dato.id+`" onclick="funcionModal(`+dato.id+`,'`+dato.stock+`')" height="100%" width="100%" >
                        <br><h5 id="accesorios_id_`+dato.id+`" style="display:none;" class="f-l text-center text-light mt-1">`+dato.id+`</h5>
                        <h5 id="accesorios_nombre_`+dato.id+`" style="padding-bottom:12px;padding-top:10px;" class="f-l text-center text-light mt-1">`+dato.nombre+`</h5>
                        <hr>
                        <p id="accesorios_precio_`+dato.id+`" class="f-l text-center text-light">$`+dato.precio+`</p>
                    </div>`;
                }
                document.getElementById("acaOfertas").appendChild(divBuscador);
                /////////////// DIBUJA DIV DE OFERTAS EN LA PARTE SUPERIOR /////////////////////////////////
                var contSecundario = contadorSecundario++;
                var imagOferta = document.createElement("div");
                imagOferta.innerHTML = `<img src="`+imagen+`" id="accesorio_imagen_oferta`+contSecundario+`" class="pointer bor-img rounded-circle" height="100px" width="100px">
                <h5 class="text-center text-light" style="width:200px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;" id="nombre_oferta`+contSecundario+`">`+dato.nombre+`<p class="text-center text-light"> $`+dato.precio+`</p></h5>`;
                document.getElementById("ofertas").appendChild(imagOferta);
                if(contSecundario >= 1){
                    $('#accesorio_imagen_oferta'+contSecundario).css("display", "none")
                    $('#nombre_oferta'+contSecundario).css("display", "none")
                }
            }
            if($('#nombre_oferta0').text() != ''){
                $('#ofertas').show();
            }
            if($('#var_sesion').val() != ''){
                $('#accesorios_id_'+dato.id).show()
            }
        }
    }
    ///////////////////// CAMBIAR OFERTAS CADA 5 SEGUNDOS //////////////////////////////////////////
    setInterval(cambiarImagen, 5000);
    function cambiarImagen() {
        if($('#nombre_oferta0').css("display") == "block" && $('#nombre_oferta1').text() != ''){
            $("#accesorio_imagen_oferta1").css("display", "block")
            $("#nombre_oferta1").css("display", "block")
            $("#accesorio_imagen_oferta0").css("display", "none")
            $("#nombre_oferta0").css("display", "none")
        }else if($('#nombre_oferta1').css("display") == "block" && $('#nombre_oferta2').text() != ''){
            $("#accesorio_imagen_oferta2").css("display", "block")
            $("#nombre_oferta2").css("display", "block")
            $("#accesorio_imagen_oferta1").css("display", "none")
            $("#nombre_oferta1").css("display", "none")
        }else if($('#nombre_oferta2').css("display") == "block" && $('#nombre_oferta3').text() != ''){
            $("#accesorio_imagen_oferta3").css("display", "block")
            $("#nombre_oferta3").css("display", "block")
            $("#accesorio_imagen_oferta2").css("display", "none")
            $("#nombre_oferta2").css("display", "none")
        }else if($('#nombre_oferta3').css("display") == "block" && $('#nombre_oferta4').text() != ''){
            $("#accesorio_imagen_oferta4").css("display", "block")
            $("#nombre_oferta4").css("display", "block")
            $("#accesorio_imagen_oferta3").css("display", "none")
            $("#nombre_oferta3").css("display", "none")
        }else if($('#nombre_oferta4').css("display") == "block" && $('#nombre_oferta5').text() != ''){
            $("#accesorio_imagen_oferta5").css("display", "block")
            $("#nombre_oferta5").css("display", "block")
            $("#accesorio_imagen_oferta4").css("display", "none")
            $("#nombre_oferta4").css("display", "none")
        }else{
            $("#accesorio_imagen_oferta0").css("display", "block")
            $("#nombre_oferta0").css("display", "block")
            $("#accesorio_imagen_oferta1").css("display", "none")
            $("#nombre_oferta1").css("display", "none")
            $("#accesorio_imagen_oferta2").css("display", "none")
            $("#nombre_oferta2").css("display", "none")
            $("#accesorio_imagen_oferta3").css("display", "none")
            $("#nombre_oferta3").css("display", "none")
            $("#accesorio_imagen_oferta4").css("display", "none")
            $("#nombre_oferta4").css("display", "none")
            $("#accesorio_imagen_oferta5").css("display", "none")
            $("#nombre_oferta5").css("display", "none")
        }
    }
    //////////////////// FUNCION AGREGAR CARRO /////////////////////////////////////
    $('#ag_carro').click(function(){
        $('#div_carrito').css("display", "block");
        var div_id = document.createElement('div'),
        titulo_cantidad = document.createElement('div'),
        titulo_nombre = document.createElement('div'),
        titulo_precio = document.createElement('div'),
        div_producto = document.createElement('div'),
        div_precio = document.createElement('div'),
        div_carro = document.getElementById('divCarro'),
        agmas = document.createElement('i'),
        cabecera = document.createElement('div'),
        agmen = document.createElement('i'),
        input_can = document.createElement('input'),
        input_pre = document.createElement('input'),
        p_can = document.createElement('p'),
        p_pre = document.createElement('p'),
        bot_el = document.createElement('i');
        
        ///// NUEVO
        titulo_cantidad.setAttribute("class", "col-md-4 ajustes_carro p-2")
        titulo_nombre.setAttribute("class", "col-md-4 ajustes_carro p-2")
        titulo_precio.setAttribute("class", "col-md-4 ajustes_carro p-2")
        ////
        /*
        titulo_cantidad.classList.add('col-md-4')
        titulo_cantidad.classList.add('ajustes_carro')
        titulo_cantidad.classList.add('p-2')
        titulo_nombre.classList.add('col-md-4')
        titulo_nombre.classList.add('ajustes_carro')        BORRAR SI ANDA LO NUEVO
        titulo_nombre.classList.add('p-2')
        titulo_precio.classList.add('col-md-4')
        titulo_precio.classList.add('ajustes_carro')
        titulo_precio.classList.add('p-2')*/

        var precio = $('#precioModal').text().split('$'),
        precioNum = Number(precio[1]),
        precioTot = $('#totalPrecio').text().split('$'),
        precioTotal = 0
        if(precioTot[1]){
            precioTotal = Number(precioTot[1])
        }
        var totalPrecio = parseFloat(precioNum)+parseFloat(precioTotal);

        //Elimina el carro y cuando volver a agregar te pone el contador en 1 y el precio total en 0
        if($('#destruir').val() == '1'){
            contador = 1
            totalPrecio = precioNum
            $('#destruir').val('');
        }
        var cont = contador++;

        ////NUEVO
        agmas.setAttribute("class", "bi bi-cart-plus-fill pointer2 sumar-car")
        bot_el.setAttribute("class", "bi bi-trash-fill pointer2 elim-car")
        agmen.setAttribute("class", "bi bi-cart-dash-fill pointer2 restar-car")
        //////
        /*agmas.classList.add('bi')
        agmas.classList.add('bi-cart-plus-fill')
        agmas.classList.add('pointer2')       BORRAR SI ANDA LO NUEVO
        agmas.classList.add('sumar-car')*/
        agmas.setAttribute("onclick", "clickMas("+cont+");")
       /* bot_el.classList.add('bi')
        bot_el.classList.add('bi-trash-fill')
        bot_el.classList.add('pointer2')            BORRAR SI ANDA LO NUEVO
        bot_el.classList.add('elim-car')*/
        bot_el.setAttribute("onclick", "bot_elim("+cont+");")
        /*agmen.classList.add('bi')
        agmen.classList.add('bi-cart-dash-fill')
        agmen.classList.add('pointer2')            BORRAR SI ANDA LO NUEVO
        agmen.classList.add('restar-car')*/
        agmen.setAttribute("onclick", "clickMen("+cont+");")
        p_can.classList.add('pad-cant-pre')
        p_pre.classList.add('pad-cant-pre')

        input_can.setAttribute("type", "hidden")
        input_can.setAttribute("id", "inpCan_"+cont)
        input_pre.setAttribute("type", "hidden")
        input_pre.setAttribute("id", "inpPre_"+cont)
        $('#inpElim').val(cont)

        p_can.setAttribute("id", "divId"+cont)
        cabecera.setAttribute("id", "cabecera_"+cont)
        //NUEVO
        div_id.setAttribute("class", "col-md-4 griss border border-dark f-l")
        div_producto.setAttribute("class", "col-md-4 griss border border-dark f-l")
        div_precio.setAttribute("class", "col-md-4 griss border border-dark f-l")
        //
        /*div_id.classList.add('col-md-4')
        div_id.classList.add('griss')
        div_id.classList.add('border')
        div_id.classList.add('border-dark')
        div_id.classList.add('f-l')
        div_producto.classList.add('col-md-4')
        div_producto.classList.add('griss')            BORRAR SI ANDA LO NUEVO
        div_producto.classList.add('border')
        div_producto.classList.add('border-dark')
        div_producto.classList.add('f-l')
        div_precio.classList.add('col-md-4')
        div_precio.classList.add('griss')
        div_precio.classList.add('border')
        div_precio.classList.add('border-dark')
        div_precio.classList.add('f-l')*/
        //Cuando el nombre del producto es mayor a 32 letras entra y ajusta el diseño
        if($('#nombreModal').text().length > 32){
            agmas.classList.add('sum-res-pad')
            agmen.classList.add('sum-res-pad')
            bot_el.classList.add('sum-res-pad')
            div_id.classList.add('pad-mod')
            div_precio.classList.add('pad-mod')
            div_id.classList.add('heig-mod')
            div_producto.classList.add('heig-mod')
            div_precio.classList.add('heig-mod')
        }else{
            div_producto.classList.add('hei-prod')
            div_id.classList.add('hei-prod')
            div_precio.classList.add('hei-prod')
            div_id.classList.add('p-2')
            div_producto.classList.add('p-3')
            div_precio.classList.add('p-2')
        }
        p_pre.setAttribute("id", "idPrecio"+cont);
        div_producto.setAttribute("id", "idProducto"+cont);
        
        titulo_cantidad.innerText = 'Cantidad en carrito'
        titulo_nombre.innerText = 'Producto'
        titulo_precio.innerText = 'Precio'

        div_producto.innerText = $('#nombreModal').text()
        p_pre.innerText = $('#precioModal').text()
        input_pre.setAttribute("value", $('#precioModal').text());
        p_can.innerText = '1'
        input_can.setAttribute("value", '1');
        div_id.appendChild(p_can)
        div_precio.appendChild(bot_el) 
        div_precio.appendChild(p_pre)
        div_id.appendChild(agmas)
        div_id.appendChild(agmen)
        $('#totalPrecio').text('$'+totalPrecio)
        if(cont > 10){
            alertify.alert('Carrito de compras','No puede agregar mas de 10 productos al carro.');
            return false
        }else{
            cabecera.appendChild(input_pre)
            cabecera.appendChild(input_can)
            cabecera.appendChild(titulo_cantidad)
            cabecera.appendChild(div_id)
            cabecera.appendChild(titulo_nombre)
            cabecera.appendChild(div_producto)
            cabecera.appendChild(titulo_precio)
            cabecera.appendChild(div_precio)

            div_carro.appendChild(cabecera)
        }
        //////////// FUNCION FOCUS PARA ENFOCAR CARRO ///////////////      
        var target = jQuery("#display");
        if (target.length) {
            $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1200, function(){ 
                   $("#display").focus();
             });
         }
    });

    /////////////// ELIMINAR CARRO //////////////////////
    $('#eliminar_carrito').click(function(){
        document.getElementById('divCarro').innerHTML = '';
        $('#div_carrito').css("display", "none");
        $('#destruir').val('1');
    });
    ////////////// COMPRAR CARRO  ///////////////////////
    $('#comprar_modal').click(function(){
        alertify.confirm('Compra de productos', 'Acordar esta compra por whatsapp.', function(){ alertify.success('Compra aprobada')
            if($('#nombreModal').text() != '' && $('#precioModal').text()){ var info = $('#nombreModal').text()+' = '+$('#precioModal').text();}else{var info =''}
            var texCompra = 'Hola!%20Quisiera%20hacer%20esta%20compra%20'+info;
            window.open("https://api.whatsapp.com/send?phone=5492345447270&text="+texCompra, '_blank');
        }, function(){ alertify.error('Compra cancelada')});
    });
    $('#hacer_compra').click(function(){
        alertify.confirm('Compra de productos', 'Acordar esta compra por whatsapp.', function(){ alertify.success('Compra aprobada')
        if($('#idProducto1').text() != '' && $('#idPrecio1').text()){ var info1 = $('#idProducto1').text()+'X'+$('#divId1').text()+'='+$('#idPrecio1').text();}else{var info1 ='';}
        if($('#idProducto2').text() != '' && $('#idPrecio2').text()){ var info2 = ', '+$('#idProducto2').text()+'X'+$('#divId2').text()+'='+$('#idPrecio2').text();}else{var info2 =''}
        if($('#idProducto3').text() != '' && $('#idPrecio3').text()){ var info3 = ', '+$('#idProducto3').text()+'X'+$('#divId3').text()+'='+$('#idPrecio3').text();}else{var info3 =''}
        if($('#idProducto4').text() != '' && $('#idPrecio4').text()){ var info4 = ', '+$('#idProducto4').text()+'X'+$('#divId4').text()+'='+$('#idPrecio4').text();}else{var info4 =''}
        if($('#idProducto5').text() != '' && $('#idPrecio5').text()){ var info5 = ', '+$('#idProducto5').text()+'X'+$('#divId5').text()+'='+$('#idPrecio5').text();}else{var info5 =''}
        if($('#idProducto6').text() != '' && $('#idPrecio6').text()){ var info6 = ', '+$('#idProducto6').text()+'X'+$('#divId6').text()+'='+$('#idPrecio6').text();}else{var info6 =''}
        if($('#idProducto7').text() != '' && $('#idPrecio7').text()){ var info7 = ', '+$('#idProducto7').text()+'X'+$('#divId7').text()+'='+$('#idPrecio7').text();}else{var info7 =''}
        if($('#idProducto8').text() != '' && $('#idPrecio8').text()){ var info8 = ', '+$('#idProducto8').text()+'X'+$('#divId8').text()+'='+$('#idPrecio8').text();}else{var info8 =''}
        if($('#idProducto9').text() != '' && $('#idPrecio9').text()){ var info9 = ', '+$('#idProducto9').text()+'X'+$('#divId9').text()+'='+$('#idPrecio9').text();}else{var info9 =''}
        if($('#idProducto10').text() != '' && $('#idPrecio10').text()){ var info10 = ', '+$('#idProducto10').text()+'X'+$('#divId10').text()+'='+$('#idPrecio10').text();}else{var info10 =''}
        var texCompra = 'Hola!%20Quisiera%20hacer%20esta%20compra%20('+info1+info2+info3+info4+info5+info6+info7+info8+info9+info10+').%20El%20valor%20total%20es%20'+$('#totalPrecio').text();
        window.open("https://api.whatsapp.com/send?phone=5492345447270&text="+texCompra, '_blank');
    }, function(){ alertify.error('Compra cancelada')});
    });
    ////////////// BUSCADOR DE PRODUCTOS /////////////////
    $('#boton_buscar').click(function(e){
        e.preventDefault();
        var buscar = {
            'valor': $('#input_buscar').val()
        }
        if($('#input_buscar').val() === ''){
            alertify.alert('Buscador de productos','El campo de busqueda esta vacio!');
            return false;
        }
        $.ajax({
            url: "./ajax/ajax_buscador.php",
            type: "POST",
            dataType : 'JSON',
            data: buscar,
            beforeSend: function () {
                $('#buscando').show();
            },
            success: cargarBusqueda,
            error: function() {
                //Fallo al buscar datos
                $('#buscando').hide();
                alertify.alert('Busqueda de datos','Fallo la busqueda de datos, por favor intente mas tarde.');
            }
        });
    });
    function cargarBusqueda(data){
        $('#buscando').hide();
        var datos = data.datos,
        imagenes = Object.values(data.imagen);
        if(datos == ''){
            alertify.alert('Buscador de productos','No se encontraron productos con esos datos!');
            return false
        }
        document.getElementById("resultadoBusqueda2").innerHTML = '';
        for (var i = 0; i < datos.length; i++) {
            var dato = datos[i],
            imagenesFor = imagenes[i],
            divBuscador = document.createElement("div");
            if(imagenesFor.imagen == ''){
                var imagen = 'img/blanco.jpg';
            }else{
                var imagen = 'data:image/jpeg;base64,'+imagenesFor.imagen+'';
            }
               if(dato.nombre.length > 32){
                    divBuscador.innerHTML = `
                    <div class="col-md-3 float-left border">
                        <img src="`+imagen+`" class="bor-img rounded-circle pointer p-4 " id="accesorio_image_`+dato.id+`" onclick="funcionModal(`+dato.id+`,'`+dato.stock+`','`+'M'+`')" height="100%" width="100%" >
                        <br><h5 id="accesorios_id_`+dato.id+`" style="display:none;" class="f-l text-center text-light mt-1">`+dato.id+`</h5>
                        <h5 id="accesorios_nombre_`+dato.id+`" class="f-l text-center text-light mt-1">`+dato.nombre+`</h5>
                        <hr>
                        <p id="accesorios_precio_`+dato.id+`" class="f-l text-center text-light">$`+dato.precio+`</p>
                    </div>`;
                }else{
                    divBuscador.innerHTML = `
                    <div class="col-md-3 float-left border">
                        <img src="`+imagen+`" class="bor-img rounded-circle pointer p-4 " id="accesorio_image_`+dato.id+`" onclick="funcionModal(`+dato.id+`,'`+dato.stock+`','`+'M'+`')" height="100%" width="100%" >
                        <br><h5 id="accesorios_id_`+dato.id+`" style="display:none;" class="f-l text-center text-light mt-1">`+dato.id+`</h5>
                        <h5 id="accesorios_nombre_`+dato.id+`" style="padding-top:22.60px;" class="f-l text-center text-light mt-1">`+dato.nombre+`</h5>
                        <hr>
                        <p id="accesorios_precio_`+dato.id+`" class="f-l text-center text-light">$`+dato.precio+`</p>
                    </div>`;
                }
            document.getElementById("resultadoBusqueda2").appendChild(divBuscador);
            if($('#var_sesion').val() != ''){
                $('#accesorios_id2_'+dato.id).show()
            }
        }
        $('#resultadoBusqueda').show();
        //////////// FUNCION FOCUS PARA ENFOCAR LUGAR///////////////      
        var target = jQuery("#focusBusqueda");
        if (target.length) {
            $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1200, function(){ 
                   $("#focusBusqueda").focus();
             });
         }
        $('#acaOfertas').hide();
        $('#acaDiv1').hide();
        $('#acaDiv2').hide();
        $('#acaDiv3').hide();
        $('#acaDiv4').hide();
        $('#acaBot1').css("background-color", "#6c757d");
        $('#acaBot2').css("background-color", "#6c757d");
        $('#acaBot3').css("background-color", "#6c757d");
        $('#acaBot4').css("background-color", "#6c757d");
    }
    /////////// MANIPULA DIVS /////////////////////////
    $('#ofertas').click(function(){
        $('#acaOfertas').show();
        //////////// FUNCION FOCUS PARA ENFOCAR LUGAR///////////////      
        var target = jQuery("#focusOfertas");
        if (target.length) {
            $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1200, function(){ 
                   $("#focusOfertas").focus();
             });
         }
        $('#resultadoBusqueda').hide();
        $('#acaDiv1').hide();
        $('#acaDiv2').hide();
        $('#acaDiv3').hide();
        $('#acaDiv4').hide();
        $('#acaBot1').css("background-color", "#6c757d");
        $('#acaBot2').css("background-color", "#6c757d");
        $('#acaBot3').css("background-color", "#6c757d");
        $('#acaBot4').css("background-color", "#6c757d");
    });
    $('#acaBot1').click(function(){
        $('#resultadoBusqueda').hide();
        $('#acaOfertas').hide();
        $('#acaDiv1').show();
        $('#acaDiv2').hide();
        $('#acaDiv3').hide();
        $('#acaDiv4').hide();
        $('#acaBot1').css("background-color", "transparent");
        $('#acaBot2').css("background-color", "#6c757d");
        $('#acaBot3').css("background-color", "#6c757d");
        $('#acaBot4').css("background-color", "#6c757d");
    });
    $('#acaBot2').click(function(){
        $('#resultadoBusqueda').hide();
        $('#acaOfertas').hide();
        $('#acaDiv2').show();
        $('#acaDiv1').hide();
        $('#acaDiv3').hide();
        $('#acaDiv4').hide();
        $('#acaBot2').css("background-color", "transparent");
        $('#acaBot1').css("background-color", "#6c757d");
        $('#acaBot3').css("background-color", "#6c757d");
        $('#acaBot4').css("background-color", "#6c757d");
    });
    $('#acaBot3').click(function(){
        $('#resultadoBusqueda').hide();
        $('#acaOfertas').hide();
        $('#acaDiv3').show();
        $('#acaDiv1').hide();
        $('#acaDiv2').hide();
        $('#acaDiv4').hide();
        $('#acaBot3').css("background-color", "transparent");
        $('#acaBot1').css("background-color", "#6c757d");
        $('#acaBot2').css("background-color", "#6c757d");
        $('#acaBot4').css("background-color", "#6c757d");
    });
    $('#acaBot4').click(function(){
        $('#resultadoBusqueda').hide();
        $('#acaOfertas').hide();
        $('#acaDiv4').show();
        $('#acaDiv1').hide();
        $('#acaDiv2').hide();
        $('#acaDiv3').hide();
        $('#acaBot4').css("background-color", "transparent");
        $('#acaBot1').css("background-color", "#6c757d");
        $('#acaBot2').css("background-color", "#6c757d");
        $('#acaBot3').css("background-color", "#6c757d");
    });
    //////////////////// CHATT  ////////////////////////////////
    $('#chat1').click(function(){
        $('#chat2').show();
        $('#chat1').hide();
    });
    $('#cerrarChat').click(function(){
        $('#chat1').show();
        $('#chat2').hide();
    });
    $('#enviarChat').click(function(e){
        e.preventDefault();
        var msj = {
            'msj': $('#textChat').val()
        }
        $.ajax({
            url: "./api/chatt.php",
            type: "POST",
            dataType : 'JSON',
            data: msj,
            success: function(data) {
                alertify.alert('Corner Shop','Mensaje enviado con exito!');
            }
        });
        $('#textChat').val('');
    })
    //////////////////// CAMBIAR FOTO DE MODAL /////////////////////////////
    $('#imgModal').click(function(){
        $('#div_img').hide();
        $('#div_img2').show();
    });
    $('#imgModal2').click(function(){
        $('#div_img2').hide();
        $('#div_img3').show();
    });
    $('#imgModal3').click(function(){
        $('#div_img3').hide();
        $('#div_img').show();
    });
});

// FUNCION ONCLICK DEL MODAL //
function funcionModal(id,stock,M){
    $('#modalVista').hide();
    $('#ag_carro').prop('disabled', true);
    $('#compra').prop('disabled', true);
    if(stock == 'f'){
        alertify.alert('Stock de productos','No hay stock de este producto, no se puede comprar o agregar al carro!');
        return false
    }
    // Entra por M cuando es una div buscada se le agrega el parametro M 
    if(M == 'M'){
        document.getElementById('accesorio_image_'+id).setAttribute("data-toggle", "modal")
        document.getElementById('accesorio_image_'+id).setAttribute("data-target", "#myModal")
    }else{
        document.getElementById('accesorio_imagen_'+id).setAttribute("data-toggle", "modal")
        document.getElementById('accesorio_imagen_'+id).setAttribute("data-target", "#myModal")
    }
    var parametros = {
        'valor': id
    }
    $.ajax({
        url: "./ajax/ajax_datos_base.php",
        type: "POST",
        dataType : 'JSON',
        data: parametros,
        beforeSend: function () {
            div = document.getElementById('loader2');
            div.innerHTML = '';
            div.appendChild(crearLoader());
        },
        success: function(data) {
            eliminarLoader(div);
            var datos = data.datos,
            imagenes = Object.values(data.imagen),
            imagenes2 = Object.values(data.imagen2),
            imagenes3 = Object.values(data.imagen3);
            if(imagenes[0].imagen == ''){
                var imagen = 'img/blanco.jpg';
            }else{
                var imagen = 'data:image/jpeg;base64,'+imagenes[0].imagen+'';
            }
            if(imagenes2[0].imagen2 == ''){
                var imagen2 = 'img/blanco.jpg';
            }else{
                var imagen2 = 'data:image/jpeg;base64,'+imagenes2[0].imagen2+'';
            }
            if(imagenes3[0].imagen3 == ''){
                var imagen3 = 'img/blanco.jpg';
            }else{
                var imagen3 = 'data:image/jpeg;base64,'+imagenes3[0].imagen3+'';
            }
            $("#imgModal").attr("src", imagen);
            $("#imgModal2").attr("src", imagen2);
            $("#imgModal3").attr("src", imagen3);
            $('#idCarro').val(datos[0].id);
            $('#nombreModal').text(datos[0].nombre);
            $('#precioModal').text('$'+datos[0].precio);
            $('#ag_carro').prop('disabled', false);
            $('#compra').prop('disabled', false);
            $('#modalVista').show();
        },
        error: function() {
            //Fallo al buscar datos
            document.getElementById('accesorio_imagen_'+id).setAttribute("data-dismiss", "modal");
            alertify.alert('Carga de datos','Fallo la carga de datos, por favor intente mas tarde.');
        }
    });
}

////////////////// SUMAR O RESTAR OTRO PRODUCTO EN EL CARRO ///////////////////
   function clickMas(cont){
        var idCant = document.getElementById('inpCan_'+cont).value,
            idPrec = document.getElementById('inpPre_'+cont).value.split('$'),
            idPrec1 = document.getElementById('idPrecio'+cont).innerText.split('$'),
            idCant1 = document.getElementById('divId'+cont).innerText,
            cantNum1 = Number(idCant1),
            cantNum = Number(idCant),
            precioNum1 = Number(idPrec1[1]),
            precioNum = Number(idPrec[1]);
            
       var totalPrecio = parseFloat(precioNum)+parseFloat(precioNum1),
            totalCant = parseFloat(cantNum)+parseFloat(cantNum1),
            precioTot = document.getElementById('totalPrecio').innerText.split('$');
 
        document.getElementById('idPrecio'+cont).innerText = '$'+totalPrecio;
        document.getElementById('divId'+cont).innerText = totalCant;

        var precioTotal = 0;
        if(precioTot[1]){
            precioTotal = Number(precioTot[1]);
        }
        var totalPrecio2 = parseFloat(precioTotal)+parseFloat(precioNum)

        document.getElementById('totalPrecio').textContent = '$'+totalPrecio2;


    }
   function clickMen(cont){
        var idCant = document.getElementById('inpCan_'+cont).value,
        idPrec = document.getElementById('inpPre_'+cont).value.split('$'),
        idPrec1 = document.getElementById('idPrecio'+cont).innerText.split('$'),
        idCant1 = document.getElementById('divId'+cont).innerText,
        cantNum1 = Number(idCant1),
        cantNum = Number(idCant),
        precioNum1 = Number(idPrec1[1]),
        precioNum = Number(idPrec[1]);
        if(cantNum1 == 1){
            return false;
        }
       var totalPrecio = parseFloat(precioNum1)-parseFloat(precioNum),
            totalCant = parseFloat(cantNum1)-parseFloat(cantNum),
            precioTot = document.getElementById('totalPrecio').innerText.split('$');
 
        document.getElementById('idPrecio'+cont).innerText = '$'+totalPrecio;
        document.getElementById('divId'+cont).innerText = totalCant;

        var precioTotal = 0;
        if(precioTot[1]){
            precioTotal = Number(precioTot[1]);
        }
        var totalPrecio2 = parseFloat(precioTotal)-parseFloat(precioNum)

        document.getElementById('totalPrecio').textContent = '$'+totalPrecio2;

   }
//////////////////  ELIMINAR PRODUCTOS EN EL CARRO DE A UNO ///////////////////
   function bot_elim(cont){
        var cantElim = document.getElementById('inpElim').value,
        cantElimi = parseFloat(Number(cantElim))-1,
        precio_elim = document.getElementById('idPrecio'+cont).innerText.split('$'),
        total_pre = document.getElementById('totalPrecio').innerText.split('$'),
        totalPrecioElim = parseFloat(Number(total_pre[1]))-parseFloat(Number(precio_elim[1]));

        if(document.getElementById('inpElim').value != '1'){
            contador--
            var y = document.getElementById('cabecera_'+cont),
                x = document.getElementById('divCarro');
            document.getElementById('totalPrecio').textContent = '$'+totalPrecioElim;
            document.getElementById('inpElim').value = cantElimi;
            x.removeChild(y);
        }else{
            return false;
        }
   }
///////////////////////////////////////////////////////////////////////////////