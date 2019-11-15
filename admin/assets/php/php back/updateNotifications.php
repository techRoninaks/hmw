<?php
	require "init.php";
	header("Content-Type: application/json; charset=UTF-8");
	
	$dataJSON = $_POST["jsonObj"];
    $data = json_decode($dataJSON);
    
    $sql = "SELECT * FROM `notifications` WHERE `id`='$data->cookieId'";
    $result1 = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result1);
    
    // echo "-1-".$sql;var_dump($row);
    if($row !== NULL){
        $sql = "UPDATE `notifications` SET headline='$data->headline',content='$data->content' WHERE `id`='$data->cookieId'";
    // echo "-2-".$sql;
    } else {
        $sql = "INSERT INTO `notifications` (`headline`,`content`) VALUES ('$data->headline','$data->content')";
    // echo "-3-".$sql;
    }
    $result = mysqli_query($conn,$sql);
    // var_dump($result);
    if($result){
        echo '1';
    }
?>