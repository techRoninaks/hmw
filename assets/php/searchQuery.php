<?php
    
    require 'init.php';
    // $catType = 1;
    // $srchType = "carpentry";
    // $locType = 1;

    $catType = $_POST["catType"];
    $srchType = $_POST["srchType"];
    $locType = $_POST["locType"];
    $i=0;
    if($catType != null){
        if($srchType != ""){
            $sql = "SELECT * FROM `profile_table` WHERE `category`= (SELECT `name` FROM `category` WHERE `id`=$catType) AND `location` = (SELECT `name` FROM `location` WHERE `id`=$locType) AND (`name` LIKE '%$srchType%' OR `role` LIKE '%$srchType%' OR `skils` LIKE '%$srchType%');";
        } else {
            $sql = "SELECT * FROM `profile_table` WHERE `category`= (SELECT `name` FROM `category` WHERE `id`=$catType)";
        }
    } else if($srchType != ""){
        $sql = "SELECT * FROM `profile_table` WHERE `location` = (SELECT `name` FROM `location` WHERE `id`=$locType) AND (`category` LIKE '%$srchType%' OR `name` LIKE '%$srchType%' OR `role` LIKE '%$srchType%' OR `skils` LIKE '%$srchType%');";
    }
    // echo $sql;
    $result = mysqli_query($con,$sql);
    $userData[$i++] = array("count"=>mysqli_num_rows($result));
    while($row = mysqli_fetch_array($result)){
        
        $userData[$i] = array("userName"=>$row["name"],"userRole"=>$row["role"],"userLoc"=>$row["location"],"userSubLoc"=>$row["sublocation"],"userWPhone"=>$row["whatapp"],"userMail"=>$row["email"],"userPhone"=>$row["phone"],"userId"=>$row["id"],"rating"=>$row["rating"],"review"=>$row["review"],"card"=>$row["card"]);
        $i+=1;

    }
    if($i != 0){
	    $jsonData = json_encode($userData);
        echo $jsonData;
    } else {
        echo '0';
    }
?>