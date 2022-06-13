<?php

require_once '../api/conexion.php';

$res = new StdClass();

try {
    $id = $_POST['valor'];
    
    // Preparamos consulta datos generales
    $consulta = $con->prepare("SELECT id,nombre,precio,stock,oferta,posicion FROM productos");
    // Ejecutamos
    $consulta->execute();
    // Especificamos el fetch mode antes de llamar a fetch()
    $datos = $consulta->fetchAll();
    
    // Preparamos consulta datos por id
    $info=$con->prepare("SELECT id,nombre,precio,stock,oferta,posicion FROM productos WHERE id = '$id'");
    //Ejecutamos
    $info->execute();
    // Especificamos el fetch mode antes de llamar a fetch()
    $data = $info->fetchAll();

    //preparamos la consulta para la imagen
    $imagenes=array();
    $consultaImagen = $con->prepare("SELECT imagen FROM productos");

    for($i = 0; $i < count($datos); $i++){
        //condicion para ejecutar
        if($consultaImagen->execute()){
            $imagenes[]=array("imagen"=>base64_encode($consultaImagen->fetchAll()[$i]['imagen']));
        }
    }
   // print'<pre>';print_r($imagenes);exit;
    // preparamos la consulta para la imagen
    $consultaImagen2 = $con->prepare("SELECT imagen,imagen2,imagen3 FROM productos WHERE id = '$id'");
    //$consultaImagen3 = $con->prepare("SELECT imagen2 FROM productos WHERE id = '$id'");

    $imagenes2=array();
    $imagenes3=array();
    $imagenes4=array();

    for($i = 0; $i < count($data); $i++){
        //condicion para ejecutar para imagen 1
        if($consultaImagen2->execute()){
            $imagenes2[]=array("imagen"=>base64_encode($consultaImagen2->fetchAll()[$i]['imagen']));
        }
        //condicion para ejecutar para imagen 2
        if($consultaImagen2->execute()){
            $imagenes3[]=array("imagen2"=>base64_encode($consultaImagen2->fetchAll()[$i]['imagen2']));
        }
        //condicion para ejecutar para imagen 3
        if($consultaImagen2->execute()){
            $imagenes4[]=array("imagen3"=>base64_encode($consultaImagen2->fetchAll()[$i]['imagen3']));
        }
    }

    //Si valor id es vacio muestra la consulta con todos los datos
    if($id === ''){
        $resultado = $datos;
        $resultadoImagen = $imagenes;
    }else{
        $resultado=$data;
        $resultadoImagen = $imagenes2;
    }
    $res->imagen = $resultadoImagen;
    $res->imagen2 = $imagenes3;
    $res->imagen3 = $imagenes4;
    $res->datos = $resultado;

} catch (Exception $e) {
    echo "MENSAJE :".$e->getMessage();
}
print json_encode($res);