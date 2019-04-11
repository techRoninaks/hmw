<?php
	require "init.php";
	header("Content-Type: application/json; charset=UTF-8");
	
	$dataJSON = $_POST["jsonObj"];
    $data = json_decode($dataJSON);
    
    $sql = "SELECT * FROM `roles` WHERE `name`='$data->cookieName'";
    $result1 = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result1);
    
    // echo "-1-".$sql;var_dump($row);
    if($row !== NULL){
        $sql = "UPDATE `roles` SET `name`='$data->roleName' WHERE `name`='$data->cookieName'";
    // echo "-2-".$sql;
    } else {
        $sql = "INSERT INTO `roles` (`name`,`userManage`,`roleManage`,`catManage`,`unionManage`,`dataManage`,`custManage`,`taskManage`,`contestManage`,`postManage`) VALUES ('$data->roleName',$data->userManage,$data->roleManage,$data->catManage,$data->unionManage,$data->dataManage,$data->custManage,$data->taskManage,$data->contestManage,$data->postManage)";
    // echo "-3-".$sql;
    }
    $result = mysqli_query($conn,$sql);
    // var_dump($result);
    if($result){
        echo '1';
    }
?>