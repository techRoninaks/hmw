<?php
    require 'init.php';
    header("Content-Type: application/json; charset=UTF-8");
	
	$id = $_POST["id"];
    $sql = "UPDATE `comments` SET `isReported`='0' WHERE `id`=$id";
    $result = mysqli_query($conn,$sql);
    if(!$result){
        echo "0";
    } else {
        echo "1";
    }
?>