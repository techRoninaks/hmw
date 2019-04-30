<?php
    require 'init.php';
    header("Content-Type: application/json; charset=UTF-8");
	
    $dataJSON = $_POST["jsonObj"];
    // echo $dataJSON;
    $data = json_decode($dataJSON);
    
    $sql = "SELECT * FROM `profile_table` WHERE (`password`= '$data->userPassword') AND (`phone` ='$data->userPhone')";
    $result = mysqli_query($con,$sql);
    // echo "\n".$sql."\n";
    // if (!$check1_res) {
    // printf("Error: %s\n", mysqli_error($con));
    // exit();
    // }
    $row = mysqli_fetch_array($result);
	if($row){
        $userName = array("userName"=>$row["name"],"userId"=>$row["id"]);
        $jsonData = json_encode($userName);
        echo $jsonData;
	} else {
	    echo "0";
    }
    
?>