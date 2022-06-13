<?php
session_start();

/************************************
    * CERRAR SESION DESPUES DE UN TIEMPO
    ***********************************/
if(isset($_SESSION['tiempo'])){
    if (time() - $_SESSION['tiempo'] > 320) {
        session_destroy();
        header('Location: insertar_datos.php?sesion');
        die();
    }
    $_SESSION['tiempo']=time();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="wdth=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="icon" href="img/logo.jpg" class="rounded-lg border-dark">
    <title>Cañamo</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="libs/bootstrap4.6.1/css/bootstrap.css">
    <link rel="stylesheet" href="libs/bootstrap4.6.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.0/font/bootstrap-icons.css">
    <!--BootStrap MODAL-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <!-- Alertify -->
    <script src="libs/alertifyjs/alertify.min.js"></script>
    <script src="libs/alertifyjs/settings.js?{$NO_CACHE}"></script>
    <link rel="stylesheet" href="libs/alertifyjs/css/alertify.min.css" />
    <link rel="stylesheet" href="libs/alertifyjs/css/themes/default.min.css" />
    <!-- Datepicker -->
    <link rel="stylesheet" href="libs/datepicker/jquery-ui.1.12.1.css">
    <script src="libs/datepicker/jquery-ui.1.12.1.js"></script>
    <script src="libs/datepicker/jquery-351.min.js" type="text/javascript"></script>
    <!-- JS -->
    <script type="text/javascript" src="js/funciones.js?=<?php echo time();?>"></script>
    <!-- CSS -->
    <link rel="stylesheet" href="css/estilos.css?=<?php echo time();?>"/>
</head>
<body id="body">
    <div id="display"></div>
    <header class="sticky-top">
        <div class="container-fluid color-canamo">
            <a href="https://api.whatsapp.com/send?phone=5492345447270" target="_blank" class="float-right"><i class="text-light ml-3 bi bi-whatsapp"> 2345-447270</i></a>
            <a href="https://www.instagram.com/canamo_growshop/" target="_blank" class="float-right"><i class="text-light ml-4 bi bi-instagram"> canamo_growshop</i></a>
            <?php if(!empty($_SESSION['usuario']) && !empty($_SESSION['clave'])){ ?>
            <a href="insertar_datos.php" target="_blank" style="font-size:20px;" class="text-light text-center px-5 float-right"><img src="img/logito.jpg"><br><?php echo $_SESSION['usuario'];?></a>
            <input type="hidden" id="var_sesion" value="<?php echo $_SESSION['usuario']; ?>">
            <?php }else{ ?>
            <input type="hidden" id="var_sesion" value="">
            <?php } ?>
            <div class="float-left border" id="ofertas" align="center">
                <div>    
                    <h5 class="text-light f-l">Ofertas de la semana</h5>
                </div>
            </div>
            <div class="row justify-content-center rounded-lg">
                <img src="img/logo.jpg" onclick="window.open('https://www.instagram.com/canamo_growshop/', '_blank');" id="logo_1" class="pointer" height="150px" width="350px">
            </div>
            <div class="row justify-content-center float-right px-5 mb-3">
                <form>
                    <input type="text" class="gris border p-3 rounded-lg border-dark" id="input_buscar" value="">
                    <button type="submit" id="boton_buscar" class="btn btn-secondary p-3 gris border border-dark">Buscar</button>
                    <p class="text-light px-1" id="buscando" style="display:none;">Buscando..</p>
                </form>
            </div>
            <br><br><br>
        </div>
    </header>
    <div class="container-fluid text-center p-4" id="div_carrito" style="display:none;">
        <div>
            <div class="f-l col-md-12 text-light p-2 border border-dark">CARRITO DE COMPRAS   <i class="bi bi-cart-check"></i></div>
        </div>
        <div>
            <div class="f-l col-md-4 ajustes_titulos p-2 ocultar">Cantidad de producto <i class="bi bi-cart-check"></i></div>
            <div class="f-l col-md-4 ajustes_titulos p-2 ocultar">Nombre</div>
            <div class="f-l col-md-4 ajustes_titulos p-2 ocultar">Precio</div>
        </div>
        <input type="hidden" id="inpElim" value="0">
        <div id="divCarro">
            <!-- CARRO ARMADO EN JS-->
        </div>
        <div id="divcarro2">
            <input type="hidden" id="destruir" value="">
            <div class="f-l col-md-6 text-light p-2 gris border border-dark">Precio total de compra  <i class="bi bi-cart-check"></i></div>
            <div class="f-l col-md-6 p-2 griss border border-dark" id="totalPrecio" ></div>
        </div>
        <div>
            <div class="f-l btn-danger col-md-6 p-2 border border-dark" id="eliminar_carrito" role="button">Eliminar carrito   <i class="bi bi-cart-x"></i></div>
            <div class="f-l btn-success col-md-6 p-2 border border-dark" id="hacer_compra" role="button">Hacer compra   <i class="bi bi-cart-check"></i></div>
        </div>
    </div>
    <div class="container-fluid" id="div_compra">   
        <div class="row justify-content-center">
            <div class="col-md-12 pt-4 ">
                <div id="acaBot1" role="button" class="f-l border  col-md-3 globo">Accesorios</div>
                <div id="acaBot2" role="button" class="f-l border gris col-md-3 globo">Productos</div>
                <div id="acaBot3" role="button" class="f-l border gris col-md-3 globo">Indumentaria</div>
                <div id="acaBot4" role="button" class="f-l border gris col-md-3 globo">Comidas</div>
            </div>
        </div>
        <div id="loader"></div>
        <div class="row justify-content-center">
            <!-- **********************       ACCESORIOS        *****************************-->
            <div class="col-md-12 " id="acaDiv1">

            </div>
            <!-- **********************       PRODUCTOS        *****************************-->
            <div class="col-md-12 " id="acaDiv2" style="display:none;">

            </div>
            <!-- **********************       INDUMENTARIA        *****************************-->
            <div class="col-md-12 " id="acaDiv3" style="display:none;">

            </div>
            <!-- **********************       COMIDA        *****************************-->
            <div class="col-md-12 " id="acaDiv4" style="display:none;">

            </div>
            <!-- **********************       OFERTAS        *****************************-->
            <div class="col-md-12 " id="acaOfertas" style="display:none;"><input type="hidden" id="focusOfertas">
            <div class="col-md-12 f-l border text-center text-light  p-2">Ofertas de la semana</div>
            </div>
            <div class="col-md-12 " id="resultadoBusqueda" style="display:none;"><input type="hidden" id="focusBusqueda">
                <div class="col-md-12 f-l border text-center text-light  p-2">Resultado de busqueda</div>
                <!-- ACA RESULTADO DE BUSQUEDA -->
                <div  id="resultadoBusqueda2"></div>
            </div>
        </div>
    </div>
    <br><br>
    <div class="container-fluid color-canamo">
        <div class="row justify-content-center rounded-lg">
            <img src="img/logo.jpg" onclick="window.open('https://www.instagram.com/canamo_growshop/', '_blank');" class="pointer" height="20%" width="20%">
        </div>
        <a href="https://www.instagram.com/canamo_growshop/" target="_blank"><i class="text-light ml-4 bi bi-instagram"> canamo_growshop</i></a>
        <a href="https://api.whatsapp.com/send?phone=5492345447270" target="_blank"><i class="text-light ml-3 bi bi-whatsapp"> 2345-447270</i></a>
    </div>
    <!-- ////////////////////// MODAL ///////////////////////////////-->
    <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-body color-canamo">
                    <div id="loader2"></div>
                    <div class="container" id="modalVista">
                        <div class="row">
                            <div class="col-md-5">
                                <button type="button" class="close float-right" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h3 class="f-l text-center text-light" id="nombreModal"></h3>
                                <hr>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5">
                                <div id="div_img"align="center">
                                    <img id="imgModal" class="bor-img rounded-circle mx-auto d-block pointer" height="80%" width="60%">
                                    <input class="form-check-input position-static mx-auto" type="radio"checked="checked">
                                    <input class="form-check-input position-static mx-auto" type="radio" disabled>
                                    <input class="form-check-input position-static mx-auto" type="radio" disabled>
                                </div>
                                <div id="div_img2" style="display:none;"align="center">
                                    <img id="imgModal2" class="bor-img rounded-circle mx-auto d-block pointer" height="80%" width="60%">
                                    <input class="form-check-input position-static mx-auto" type="radio" disabled>
                                    <input class="form-check-input position-static mx-auto" type="radio"checked="checked">
                                    <input class="form-check-input position-static mx-auto" type="radio" disabled>
                                </div>
                                <div id="div_img3" style="display:none;" align="center">
                                    <img id="imgModal3" class="bor-img rounded-circle mx-auto d-block pointer" height="80%" width="60%">
                                    <input class="form-check-input position-static mx-auto" type="radio" disabled>
                                    <input class="form-check-input position-static mx-auto" type="radio" disabled>
                                    <input class="form-check-input position-static mx-auto" type="radio"checked="checked">
                                </div>
                                <h4 class="f-l text-center text-light" id="precioModal"></h4>
                            </div>
                        </div>
                        <input type="hidden" id="idCarro" value="">
                        <div class="row">
                            <div class="modal-footer col-md-5">
                                <input type="button" class="btn btn-default" id="ag_carro" data-dismiss="modal" value="Agregar al carro">
                                <input type="submit" class="btn btn-success" id="comprar_modal" data-dismiss="modal" value="Comprar">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<!---///////////////// FIN MODAL ///////////////////////////////////-->

</body>
</html>