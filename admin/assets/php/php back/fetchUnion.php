<?php
    require 'init.php';
    header("Content-Type: application/json; charset=UTF-8");
	
	$id = $_POST["id"];
    $sql = "SELECT * FROM `unions` WHERE `id`=$id";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    if($row){
        if(strpos($row["name"],"&#32;")!==false){
            $row["name"] = str_replace("&#32;"," ",$row["name"]);
        }
        $userData = array("unionName"=>$row["name"]);
        $jsonData = json_encode($userData);
        echo $jsonData;
	} else {
	    echo "0";
	}
?>