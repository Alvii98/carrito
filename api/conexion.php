<?php
	$database="epiz_30533450_canamo";
	$user='epiz_30533450';
	$password='b77PtRZ3AQmpX';


try {
	
	$con=new PDO('mysql:host=sql308.epizy.com;dbname=epiz_30533450_canamo','epiz_30533450','b77PtRZ3AQmpX');

} catch (PDOException $e) {
	echo "Error".$e->getMessage();
}

?>