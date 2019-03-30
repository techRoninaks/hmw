<?php
    require 'init.php';
    header("Content-Type: application/json; charset=UTF-8");
	
	$id = $_POST["id"];
    $sql = "SELECT * FROM `category` WHERE `id`=$id";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    if($row){
        $userData = array("catName"=>$row["name"],"labelName"=>$row["tag"],"unionName"=>$row["union_name"]);
        $jsonData = json_encode($userData);
        echo $jsonData;
	} else {
	    echo "0";
	}
?>