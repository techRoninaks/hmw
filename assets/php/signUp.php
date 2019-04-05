<?php
	require "init.php";
	header("Content-Type: application/json; charset=UTF-8");
	
	$dataJSON = $_POST["jsonObj"];
    $data = json_decode($dataJSON);
    
    if($data->userType == 'premium'){
        $sql = "INSERT INTO `profile_table` (`name`,`phone`,`premium`) VALUES ('$data->newName','$data->newPhone','1');";  
    } else {
        $sql = "INSERT INTO `profile_table` (`name`,`phone`,`password`) VALUES ('$data->newName','$data->newPhone','$data->newPassword');";  
    }
    
    $result = mysqli_query($con,$sql);
    if($result){
        echo '1';
    }
?>