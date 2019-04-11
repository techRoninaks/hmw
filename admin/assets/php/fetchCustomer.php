<?php
    require 'init.php';
    header("Content-Type: application/json; charset=UTF-8");
	
	$id = $_POST["id"];
    $sql = "SELECT * FROM `profile_table` WHERE `id`=$id";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    if($row){
        $userData = array("custName"=>$row["name"],"roleName"=>$row["role"],"typeName"=>$row["type"],"catName"=>$row["category"],"unionName"=>$row["union"],"addName"=>$row["address"],"locName"=>$row["location"],"subLocName"=>$row["sublocation"],"stateName"=>$row["state"],"countryName"=>$row["country"],"pincode"=>$row["pincode"],"primaryPhone"=>$row["phone"],"secondaryPhone"=>$row["phone2"],"whatsappPhone"=>$row["whatapp"],"webSite"=>$row["website"],"eMail"=>$row["email"],"password"=>$row["password"],"skillName"=>$row["skils"],"id"=>$row["id"]);
        $jsonData = json_encode($userData);
        echo $jsonData;
	} else {
	    echo "0";
	}
?>