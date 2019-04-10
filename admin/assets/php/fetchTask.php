<?php
    require 'init.php';
    header("Content-Type: application/json; charset=UTF-8");
	
	$id = $_POST["id"];
    $sql = "SELECT * FROM `tasks` WHERE `ID`=$id";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    if($row){
        $userId = $row["USER_ID"];
        $sql = "SELECT * FROM users WHERE userId=$userId";
        $result = mysqli_query($conn,$sql);
        $row2 = mysqli_fetch_array($result);
        $userData = array("taskId"=>$row["ID"],"userId"=>$row["USER_ID"],"userName"=>$row2["userName"],"targetPros"=>$row["PROSPECT_TARGET"],"targetLeads"=>$row["LEADS_TARGET"],"startDate"=>$row["DATE_START"],"endDate"=>$row["DATE_END"],"conversions"=>$row["CONVERSIONS"],"ConvLeads"=>$row["CONVERSIONS_TARGET"]);
        $jsonData = json_encode($userData);
        echo $jsonData;
	} else {
	    echo "0";
	}
?>