<?php
	require "init.php";
	header("Content-Type: application/json; charset=UTF-8");
	
	$dataJSON = $_POST["jsonObj"];
    $data = json_decode($dataJSON);
    $sql = "SELECT * FROM `users` WHERE `userName`='$data->cookieName'";
    $result1 = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result1);
    
    // echo "-1-".$sql;
    // var_dump($row);
    
    if($row !== NULL){
        $sql = "UPDATE `users` SET `firstName`='$data->fName',`lastName`='$data->lName',`password`='$data->password',`email`='$data->eMail',`contact`='$data->contact',`userName`='$data->fName$data->lName',`role`='$data->roleName' WHERE `userName`='$data->cookieName'";
    // echo "-2-".$sql;
    } else {
        $sql = "INSERT INTO `users` (`email`,`contact`,`userName`,`firstName`,`lastName`,`password`,`role`) VALUES ('$data->eMail','$data->contact','$data->fName$data->lName','$data->fName','$data->lName','$data->password','$data->roleName')";
    // echo "-3-".$sql;
        
    }
    $result = mysqli_query($conn,$sql);
    // var_dump($result);
    if($result){
        echo '1';
    }
?>