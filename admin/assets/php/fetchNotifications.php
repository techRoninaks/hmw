<?php
    require 'init.php';
    header("Content-Type: application/json; charset=UTF-8");
	
	$id = $_POST["id"];
    $sql = "SELECT * FROM `notifications` WHERE `id`=$id";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    if($row){
        $userData = array("id"=>$row["id"],"headline"=>$row["headline"],"content"=>$row["content"]);
        $jsonData = json_encode($userData);
        echo $jsonData;
	} else {
	    echo "0";
	}
?>