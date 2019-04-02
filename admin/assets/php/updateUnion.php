<?php
	require "init.php";
	header("Content-Type: application/json; charset=UTF-8");
	
	$dataJSON = $_POST["jsonObj"];
    $data = json_decode($dataJSON);
    
    $sql = "SELECT * FROM `unions` WHERE `name`='$data->cookieName'";
    $result1 = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result1);
    
    // echo "-1-".$sql;var_dump($row);
    if($row !== NULL){
        $sql = "UPDATE `unions` SET `name`='$data->unionName' WHERE `name`='$data->cookieName'";
    // echo "-2-".$sql;
    } else {
        $sql = "INSERT INTO `unions` (`name`) VALUES ('$data->unionName')";
    // echo "-3-".$sql;
    }
    $result = mysqli_query($conn,$sql);
    // var_dump($result);
    if($result){
        echo '1';
    }
?>