<?php
	require "init.php";
	header("Content-Type: application/json; charset=UTF-8");
	
	$dataJSON = $_POST["jsonObj"];
    $data = json_decode($dataJSON);
    $data->unionName = str_replace(" ","&#32;",$data->unionName);
    $data->cookieName = str_replace(" ","&#32;",$data->cookieName);
    $sql = "SELECT * FROM `unions` WHERE `name`='$data->cookieName'";
    $result1 = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result1);
    $linkData = "services.html?union_type=";
    
     // echo "-1-".$sql;var_dump($row);
    if($row !== NULL){
        $sql = "UPDATE `unions` SET `name`='$data->unionName' WHERE `name`='$data->cookieName'";
        $result = mysqli_query($conn,$sql);
    // echo "-2-".$sql;
    } else {
        $sql = "INSERT INTO `unions` (`name`,`click_freq`,`link`) VALUES ('$data->unionName',1,'$linkData')";
        $result = mysqli_query($conn,$sql);
        $sql2 = "SELECT id FROM unions WHERE name='$data->unionName' order by id DESC LIMIT 1";
        $result2 = mysqli_query($conn,$sql2);
        $row = mysqli_fetch_array($result2);
        $linkData = $linkData.$row[0];
        $sql3 = "UPDATE `unions` SET `link`='$linkData' where `id`='$row[0]'";
        $result3 = mysqli_query($conn,$sql3);
    // echo "-3-".$sql;
    }
    
    // var_dump($result);
    if($result){
        echo '1';
    }
?>