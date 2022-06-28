<?php

try {
	//if($_SERVER[HTTP_HOST] == "canamogrowshop.42web.io"){
	if(gethostname() == "freeweb10-1.byetcluster.com"){
		$con=new PDO('mysql:host=sql308.epizy.com;dbname=epiz_30533450_canamo','epiz_30533450','b77PtRZ3AQmpX');
	}else{
		$con=new PDO('mysql:host=localhost;dbname=carrito','root','');
	}
} catch (PDOException $e) {
	echo "Error".$e->getMessage();
}

?>