<?php 
	session_start();
	include_once 'api/conexion.php';
	// AL HACER CLICK EN EL BOTON CERRAR SESION ENTRA Y DESTRUYE LA SESION
	if(isset($_POST['destroy'])){
		session_destroy();
		header('Location: insertar_datos.php');
		die();
	}
    //preparamos la consulta para traer la clave
    $consultaClave = $con->prepare('SELECT usuario,clave FROM usuario WHERE id = 1');

    if($consultaClave->execute()){
        $clave = $consultaClave->fetchAll()[0]['clave'];
    }
    if($consultaClave->execute()){
        $usuarioo = $consultaClave->fetchAll()[0]['usuario'];
    }
	
	if(isset($_POST['usuario'])){
		$usuario = $_POST['usuario'];
		$clave_post = $_POST['clave'];
	}else{
		$usuario = '';
		$clave_post = '';
	}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="wdth=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" type="image/x-icon" href="img/logo.jpg"> 
    <title>Insertar datos</title>
    <!-- Bootstrap CSS-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
    <!--BootStrap MODAL-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <!-- Alertify -->
    <script src="libs/alertifyjs/alertify.min.js"></script>
    <script src="libs/alertifyjs/settings.js?41541"></script>
    <link rel="stylesheet" href="libs/alertifyjs/css/alertify.min.css" />
    <link rel="stylesheet" href="libs/alertifyjs/css/themes/default.min.css" />
    <!-- Datepicker -->
    <link rel="stylesheet" href="libs/datepicker/jquery-ui.1.12.1.css">
    <script src="libs/datepicker/jquery-ui.1.12.1.js"></script>
    <script src="libs/datepicker/jquery-351.min.js" type="text/javascript"></script>
</head>
<body>
<div class="p-5">
    <a href="index.php" target="_blank" class="btn btn-success">Ir a cañamo</a>
    <a href="correo.php" target="_blank" class="btn btn-success">Enviar correo</a>

<?php
/**************************************************************
 * ****************************************
 * *************************************** SESION INICIADA
***************************************************************/
//password_verify($clave_post, $clave) == 1 
if($usuarioo == $usuario || !empty($_SESSION['usuario']) && !empty($_SESSION['clave'])){
	/**************************************
	 * CERRAR SESION DESPUES DE UN TIEMPO *
	 *************************************/
	if (!isset($_SESSION['tiempo'])) {
		$_SESSION['tiempo'] = time();
	}else if (time() - $_SESSION['tiempo'] > 320) {
		session_destroy();
		header('Location: insertar_datos.php?sesion');
		die();
	}
	$_SESSION['tiempo']=time();
	$_SESSION['usuario'] = $usuarioo;
	$_SESSION['clave'] = $clave;
	
	////////////////////////// INSERT DE DATOS /////////////////////////////////////////////
	if(empty($_SESSION['nombre']) && empty($_SESSION['precio'])){
		$nombreInsert = '';
		$precioInsert = '';
	}else{
		$nombreInsert = $_SESSION['nombre'];
		$precioInsert = $_SESSION['precio'];
	}
	if(isset($_POST['guardar']) && $nombreInsert != $_POST['nombre'] && $precioInsert != $_POST['precio']){
		$nombre=$_POST['nombre'];
		$precio=$_POST['precio'];
        $lugar=$_POST['lugarIns'];
		$_SESSION['nombre'] = $nombre;
		$_SESSION['precio'] = $precio;
		$imagen1 = $_FILES['imagen1']['tmp_name'];
		$imagen2 = $_FILES['imagen2']['tmp_name'];
		$imagen3 = $_FILES['imagen3']['tmp_name'];
		if(!empty($nombre) && !empty($precio) && !empty($imagen1) && !empty($imagen2) && !empty($imagen3)){
			$imgContent1 = file_get_contents($imagen1);
			$imgContent2 = file_get_contents($imagen2);
			$imgContent3 = file_get_contents($imagen3);
			$consulta_insert=$con->prepare('INSERT IGNORE INTO productos(nombre,precio,imagen,stock,imagen2,imagen3,oferta,posicion)
            VALUES(:nombre,:precio,:imagen1,:stock,:imagen2,:imagen3,:oferta,:posicion)');
			$consulta_insert->execute(array(
				':nombre' =>$nombre,
				':precio' =>$precio,
				':imagen1' =>$imgContent1,
				':stock' =>'t',
				':imagen2' =>$imgContent2,
				':imagen3' =>$imgContent3,
				':oferta' =>'f',
				':posicion' =>$lugar
			));
            echo "<script>alertify.alert('INSERTAR DATOS','La carga de datos fue afectuada.');</script>";
		}else{
            echo "<script>alertify.alert('INSERTAR DATOS','Los campos no pueden estar vacios para hacer el insert.');</script>";
		}
	}
	//////////////////////////////// UPDATE DE DATOS ////////////////////////////////////////
	if(isset($_POST['guardar2'])){
		$nombre2=$_POST['nombre2'];
		$precio2=$_POST['precio2'];
		$imagenE1 = $_FILES['imagenE1']['tmp_name'];
		$imagenE2 = $_FILES['imagenE2']['tmp_name'];
		$imagenE3 = $_FILES['imagenE3']['tmp_name'];
		$id = $_POST['id'];
		$stock = $_POST['stock'];
		$oferta = $_POST['oferta'];
		$lugar = $_POST['lugar'];
        $img1 = '';
        $img2 = '';
        $img3 = '';
        $pre = '';
        $nom = '';
        $sto = '';
        $ofe = '';
        $pos = '';
		if(!empty($id)){
			if($imagenE1){
				$imgContentE1 = file_get_contents($imagenE1);
				$consulta_insert=$con->prepare('UPDATE IGNORE productos SET imagen = :imagen1 WHERE id = :id');
				$consulta_insert->execute(array(
					':imagen1' =>$imgContentE1,
					':id' =>$id
				));
                $img1 = 'La primera imagen fue editada.';
			}
			if($imagenE2){
				$imgContentE2 = file_get_contents($imagenE2);
				$consulta_insert=$con->prepare('UPDATE IGNORE productos SET imagen2 = :imagen2 WHERE id = :id');
				$consulta_insert->execute(array(
					':imagen2' =>$imgContentE2,
					':id' =>$id
				));
                $img2 = 'La segunda imagen fue editada.';
			}
			if($imagenE3){
				$imgContentE3 = file_get_contents($imagenE3);
				$consulta_insert=$con->prepare('UPDATE IGNORE productos SET imagen3 = :imagen3 WHERE id = :id');
				$consulta_insert->execute(array(
					':imagen3' =>$imgContentE3,
					':id' =>$id
				));
                $img3 = 'La tercera imagen fue editada.';
			}
			if(!empty($nombre2)){
				$consulta_insert=$con->prepare('UPDATE IGNORE productos SET nombre = :nombre WHERE id = :id');
				$consulta_insert->execute(array(
					':nombre' =>$nombre2,
					':id' =>$id
				));
                $nom = 'El nombre del producto fue editado.';
			}
			if(!empty($precio2)){
				$consulta_insert=$con->prepare('UPDATE IGNORE productos SET precio = :precio WHERE id = :id');
				$consulta_insert->execute(array(
					':precio' =>$precio2,
					':id' =>$id
				));
                $pre = 'El precio del producto fue editado.';
			}
			if(!empty($stock)){
				$consulta_insert=$con->prepare('UPDATE IGNORE productos SET stock = :stock WHERE id = :id');
				$consulta_insert->execute(array(
					':stock' =>$stock,
					':id' =>$id
				));
                $sto = 'El stock del producto fue editado.';
			}
			if(!empty($oferta)){
				$consulta_insert=$con->prepare('UPDATE IGNORE productos SET oferta = :oferta WHERE id = :id');
				$consulta_insert->execute(array(
					':oferta' =>$oferta,
					':id' =>$id
				));
                $ofe = 'La oferta del producto fue editada.';
			}
			if(!empty($lugar)){
				$consulta_insert=$con->prepare('UPDATE IGNORE productos SET posicion = :posicion WHERE id = :id');
				$consulta_insert->execute(array(
					':posicion' =>$lugar,
					':id' =>$id
				));
                $pos = 'La posicion del producto fue editada.';
			}
            echo "<script>alertify.alert('EDICION DE DATOS','".$img1." ".$img2." ".$img3." ".$nom." ".$pre." ".$sto." ".$ofe." ".$pos."');</script>";
		}else{
            echo "<script>alertify.alert('EDICION DE DATOS','El campo ID no puede estar vacios para hacer la edicion.');</script>";
		}
	}
	///////////////////////////////// UPDATE DE DATOS USUARIO ADMINISTRADOR ////////////////////////////////////
	if(empty($_SESSION['nombre_usuario']) && empty($_SESSION['clave_usuario'])){
		$nombreIf = '';
		$claveIf = '';
	}else{
		$nombreIf = $_SESSION['nombre_usuario'];
		$claveIf = $_SESSION['clave_usuario'];
	}
	if(isset($_POST['guardarUsuario']) && $nombreIf != $_POST['nombre_usuario'] && $claveIf != $_POST['clave_usuario']){
		$nombreUsuario = $_POST['nombre_usuario'];
		$claveUsuario = $_POST['clave_usuario'];
		$_SESSION['nombre_usuario'] = $nombreUsuario;
		$_SESSION['clave_usuario'] = $claveUsuario;
		if(!empty($nombreUsuario) && !empty($claveUsuario)){
			if(!empty($nombreUsuario)){
				$consulta_update=$con->prepare('UPDATE IGNORE usuario SET usuario = :usuario WHERE id = 1');
				$consulta_update->execute(array(
					':usuario' =>$nombreUsuario
				));
				echo "<script>alertify.alert('EDICION DE USUARIO','El nombre del usuario fue editado.');</script>";
			}
			if(!empty($claveUsuario)){
				$passHash = password_hash($claveUsuario, PASSWORD_BCRYPT);
				$consulta_update=$con->prepare('UPDATE IGNORE usuario SET clave = :clave WHERE id = 1');
				$consulta_update->execute(array(
					':clave' =>$passHash
				));
				echo "<script>alertify.alert('EDICION DE USUARIO','La contraseña del usuario fue editada.');</script>";
			}
		}else{
			echo "<script>alertify.alert('EDICION DE USUARIO','Los campo de contraseña y el usuario estan vacios.');</script>";
		}
	}
?>
<form action="" method="post" class="float-right">
	<input type="submit" name="destroy" value="Cerrar sesion" class="btn btn-danger">
</form>
</div>
	<div class="container border p-5">
		<form action="" method="post" enctype="multipart/form-data" class="border p-5">
			<div align="center">
				<h2>Insertar datos</h2>
			</div>
			<hr>
			<div class="row">
				<div class="col-md-6">
					<label>Nombre del producto</label>
					<input type="text" name="nombre" placeholder="Nombre del producto" class="form-control" required>
					<br>
					<label>Precio del producto</label>
					<input type="text" name="precio" placeholder="Precio del producto" class="form-control" required>
                    <br><label>Lugar del producto</label><br>
                    <input class="form-check-input position-static" type="radio" name="lugarIns" checked="checked" value="a" aria-label="...">
                    <label>Accesorios</label>
                    <input class="form-check-input position-static" type="radio" name="lugarIns" value="p" aria-label="...">
                    <label>Productos</label>
                    <input class="form-check-input position-static" type="radio" name="lugarIns" value="i" aria-label="...">
					<label>Indumentaria</label>
                    <input class="form-check-input position-static" type="radio" name="lugarIns" value="c" aria-label="...">
                    <label>Comidas</label>
				</div>
				<div class="col-md-6">
					<label>Primera imagen</label>
					<div class="border p-2 rounded-lg">
						<input type="file" name="imagen1" class="form-control-file" value="imag" required>
					</div>
					<label>Segunda imagen</label>
					<div class="border p-2 rounded-lg">
						<input type="file" name="imagen2" class="form-control-file" value="imag" required>
					</div>
					<label>Tercera imagen</label>
					<div class="border p-2 rounded-lg">
						<input type="file" name="imagen3" class="form-control-file" value="imag" required>
					</div>
				</div>
			</div>
			<hr>
			<div align="center">
					<a href="" class="btn btn-success col-3">Cancelar</a>
					<input type="submit" name="guardar" value="Guardar" class="btn btn-success col-3">
			</div>
		</form>
	</div>
	<div class="container border p-5">
		<form action="" method="post" enctype="multipart/form-data" class="border p-5">
			<div align="center">
				<h2>Editar datos</h2>
			</div>
			<hr>
			<div class="row">
				<div class="col-md-6">
					<label>Id del producto que quiere editar</label>
					<input type="text" name="id" placeholder="Id del producto que quiere editar" class="form-control" required>
					<br>
					<label>Nombre del producto</label>
					<input type="text" name="nombre2" placeholder="Nombre del producto" class="form-control">
					<br>
					<label>Precio del producto</label>
					<input type="text" name="precio2" placeholder="Precio del producto" class="form-control">
                    <br>
                    <label>Stock del producto</label><br>
                    <input class="form-check-input position-static" type="radio" name="stock" id="blankRadio1" value="t" aria-label="...">
                    <label>Si</label>
                    <input class="form-check-input position-static" type="radio" name="stock" id="blankRadio1" value="f" aria-label="...">
                    <label>No</label>
				</div>
				<div class="col-md-6">
					<label>Primera imagen</label>
					<div class="border p-2 rounded-lg">
						<input type="file" name="imagenE1" class="form-control-file" value="imag">
					</div>
					<label>Segunda imagen</label>
					<div class="border p-2 rounded-lg">
						<input type="file" name="imagenE2" class="form-control-file" value="imag">
					</div>
					<label>Tercera imagen</label>
					<div class="border p-2 rounded-lg">
						<input type="file" name="imagenE3" class="form-control-file" value="imag">
					</div><br>
					<label>Oferta de producto</label><br>
                    <input class="form-check-input position-static" type="radio" name="oferta" id="blankRadio12" value="t" aria-label="...">
                    <label>Si</label>
                    <input class="form-check-input position-static" type="radio" name="oferta" id="blankRadio12" value="f" aria-label="...">
                    <label>No</label>
					<br><label>Lugar del producto</label><br>
                    <input class="form-check-input position-static" type="radio" name="lugar" value="a" aria-label="...">
                    <label>Accesorios</label>
                    <input class="form-check-input position-static" type="radio" name="lugar" value="p" aria-label="...">
                    <label>Productos</label>
                    <input class="form-check-input position-static" type="radio" name="lugar" value="i" aria-label="...">
					<label>Indumentaria</label>
                    <input class="form-check-input position-static" type="radio" name="lugar" value="c" aria-label="...">
                    <label>Comidas</label>
				</div>
			</div>
			<hr>
			<div align="center">
					<a href="" class="btn btn-success col-3">Cancelar</a>
					<input type="submit" name="guardar2" value="Guardar" class="btn btn-success col-3">
			</div>
		</form>
	</div>
	<div class="container border p-5">
		<form action="" method="post" enctype="multipart/form-data" class="border p-5">
			<div align="center">
				<h2>Editar usuario administrador</h2>
			</div>
			<hr>
			<div class="row justify-content-center">
				<div class="col-md-6">
					<label>Nombre de usuario</label>
					<input type="text" name="nombre_usuario" placeholder="Nombre de usuario" class="form-control" required>
					<br>
					<label>Contraseña de usuario</label>
					<input type="password" name="clave_usuario" maxlength="12" minlength="5" placeholder="Contraseña de usuario" class="form-control" required>
					<br>
				</div>
			</div>
			<hr>
			<div align="center">
					<a href="" class="btn btn-success col-3">Cancelar</a>
					<input type="submit" name="guardarUsuario" value="Guardar" class="btn btn-success col-3">
			</div>
		</form>
	</div>
<?php 
/**************************************************************
 * ****************************************
 * *************************************** SESION CERRADA
**************************************************************/
}else if(empty($_SESSION['usuario']) && empty($_SESSION['clave'])){
?>
<br><br>
<div class="container">
	<div class="row justify-content-center" >
			<form action="insertar_datos.php" method="post" align="center" class="border col-md-5 p-5">
				<h4>Ingrese usuario Administrador</h4>
				<hr>
				<input type="text" name="usuario" placeholder="Nombre de usuario" class="form-control " required>
				<br>
				<input type="password" name="clave" placeholder="Clave de usuario" class="form-control " required><br>
<?php
	if($clave_post != '' && $clave_post != $clave && $usuario != '' && $usuario != $usuarioo){
        echo '<p align="center" style="color:red;"> Usuario y contraseña incorrectos </p>';
	}else if($usuario != '' && $usuario != $usuarioo){
        echo '<p align="center" style="color:red;"> Usuario incorrecto </p>';
    }else if($clave_post != '' && $clave_post != $clave){
        echo '<p align="center" style="color:red;"> Contraseña incorrecta </p>';
    }
    if(isset($_GET['sesion'])){
        echo '<p align="center" style="color:red;"> La sesion caduco, inicie sesion nuevamente.</p>';
    }
?>
				<input type="submit" name="ingresar" value="Ingresar" class="col-5 btn btn-success">
			</form>
<?php
}
?>
	</div>
</div>
</body>
</html>
