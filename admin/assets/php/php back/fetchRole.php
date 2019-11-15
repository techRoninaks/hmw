<?php
    require 'init.php';
    header("Content-Type: application/json; charset=UTF-8");
	
	$id = $_POST["id"];
    $sql = "SELECT * FROM `roles` WHERE `id`=$id";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    if($row){
        $userData = array("roleName"=>$row["name"],"userManage"=>$row["userManage"],"roleManage"=>$row["roleManage"],"dataManage"=>$row["dataManage"],"catManage"=>$row["catManage"],"unionManage"=>$row["unionManage"],"custManage"=>$row["custManage"],"taskManage"=>$row["taskManage"],"contestManage"=>$row["contestManage"],"postManage"=>$row["postManage"]);
        $jsonData = json_encode($userData);
        echo $jsonData;
	} else {
	    echo "0";
	}
?>