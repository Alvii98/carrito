<?php
include_once '../api/conexion.php';

$res = new StdClass();

try {
	// metodo buscar por nombre
	if(!empty($_POST['valor'])){
		$nombre = $_POST['valor'];
		$select_buscar=$con->prepare('SELECT id,nombre,precio,stock FROM productos WHERE nombre LIKE :campo;');

		$select_buscar->execute(array(
			':campo' =>"%".$nombre."%"
		));

		$resultado=$select_buscar->fetchAll();
		//preparamos la consulta para la imagen
		$consultaImagen = $con->prepare('SELECT imagen FROM productos WHERE nombre LIKE :campo;');
		
		$consultaImagen->execute(array(
			':campo' =>"%".$nombre."%"
		));
		$imagenes=array();
		
		for($i = 0; $i < count($resultado); $i++){
			//condicion para ejecutar
			if($consultaImagen->execute()){
				$imagenes[]=array("imagen"=>base64_encode($consultaImagen->fetchAll()[$i]['imagen']));
			}
		}
	}
	$res->imagen = $imagenes;
    $res->datos = $resultado;

} catch (Exception $e) {
    echo "MENSAJE".$e->getMessage();
}

print json_encode($res);