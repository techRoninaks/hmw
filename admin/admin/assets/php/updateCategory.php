<?php
	require "init.php";
	header("Content-Type: application/json; charset=UTF-8");
	
	$dataJSON = $_POST["jsonObj"];
    $data = json_decode($dataJSON);
    $sql = "SELECT * FROM `category` WHERE `name`='$data->cookieName'";
    $result1 = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result1);
    // echo "-1-".$sql;var_dump($row);
    if($row !== NULL){
        $sql = "UPDATE `category` SET `name`='$data->catName',`tag`='$data->labelName',`union_name`='$data->unionName' WHERE `name`='$data->cookieName'";
    // echo "-2-".$sql;
    } else {
        $sql = "INSERT INTO `category` (`name`,`tag`,`union_name`) VALUES ('$data->catName','$data->labelName','$data->unionName')";
    // echo "-3-".$sql;
    }
    $result = mysqli_query($conn,$sql);
    // var_dump($result);
    if($result){
        echo '1';
    }
?>