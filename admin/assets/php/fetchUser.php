<?php
    require 'init.php';
    header("Content-Type: application/json; charset=UTF-8");
	
	$id = $_POST["id"];
    $sql = "SELECT * FROM `users` WHERE `userId`=$id";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    if($row){
        $userData = array("fName"=>$row["firstName"],"lName"=>$row["lastName"],"contact"=>$row["contact"],"eMail"=>$row["email"],"password"=>$row["password"],"userName"=>$row["userName"],"roleName"=>$row["role"]);
        $jsonData = json_encode($userData);
        echo $jsonData;
	} else {
	    echo "0";
	}
?>