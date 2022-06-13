<?php
	$database="epiz_30533450_canamo";
	$user='epiz_30533450';
	$password='b77PtRZ3AQmpX';


try {
	
	$con=new PDO('mysql:host=localhost;dbname=carrito','root','');

} catch (PDOException $e) {
	echo "Error".$e->getMessage();
}

?>