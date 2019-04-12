<?php
    require 'init.php';
    header("Content-Type: application/json; charset=UTF-8");
	
	$dataJSON = $_POST["jsonObj"];
    $data = json_decode($dataJSON);
    $sql = "SELECT u.*,r.* from users u join roles r on u.role = r.name WHERE u.email = '$data->userEmail' AND u.password = '$data->userPassword'";
    
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($result);
    // echo "row".$row."<br>";
	if($row !== NULL){
        $userData = array("userName"=>$row["userName"],"userId"=>$row["userId"],"userManage"=>$row["userManage"],"roleManage"=>$row["roleManage"],"catManage"=>$row["catManage"],"unionManage"=>$row["unionManage"],"dataManage"=>$row["dataManage"],"custManage"=>$row["custManage"],"taskManage"=>$row["taskManage"],"contestManage"=>$row["contestManage"],"postManage"=>$row["postManage"],"role"=>$row["role"]);
        $jsonData = json_encode($userData);
        echo $jsonData;
	} else {
	    echo "0";
	}
?>