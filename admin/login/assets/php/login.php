<?php
    require 'init.php';
    header("Content-Type: application/json; charset=UTF-8");
	
	$dataJSON = $_POST["jsonObj"];
    $data = json_decode($dataJSON);
    
    $sql = "SELECT * FROM users WHERE password='$data->userPassword' AND email='$data->userEmail'";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
	if($row !== NULL){
        $userData = array("userName"=>$row["userName"],"userId"=>$row["userId"]);
        $jsonData = json_encode($userData);
        echo $jsonData;
	} else {
	    echo "0";
	}
?>