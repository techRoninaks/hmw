<?php
	require "init.php";
	header("Content-Type: application/json; charset=UTF-8");
	
	$dataJSON = $_POST["jsonObj"];
    $data = json_decode($dataJSON);
    
    $sql = "select u.userName, t.* from users u join tasks t on u.userId='$data->cookieTaskId'";
    $result1 = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result1);
    
    // echo "-1-".$sql;var_dump($row);
    if($row !== NULL){
        $sql = "UPDATE tasks SET PROSPECT_TARGET=$data->targetPros,LEADS_TARGET=$data->targetLeads,DATE_START=$data->startDate,DATE_END=$data->endDate WHERE ID='$data->cookieTaskId'";
    // echo "-2-".$sql;
    } else {
        $sql = "INSERT INTO tasks (`USER_ID`,`PROSPECT_TARGET`,`LEADS_TARGET`,`DATE_START`,`DATE_END`) VALUES ('$data->mainUserId',$data->targetPros,$data->targetLeads,$data->startDate,$data->endDate)";
    // echo "-3-".$sql;
    }
    $result = mysqli_query($conn,$sql);
    // var_dump($result);
    if($result){
        echo '1';
    }
?>