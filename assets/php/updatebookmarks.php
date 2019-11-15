<?php
    
    require 'init.php';
    // $catType = 1;
    // $srchType = "carpentry";
    // $locType = 1;
    $success = "unsuccessful";
    $userId = $_POST["userId"];
    $type = $_POST["type"];
    $mappingId = $_POST["mapping_id"];
    $isActive = $_POST["is_active"];
    $sql = "";
    if($isActive == 1){
        $sql = "DELETE from bookmarks where user_id = $userId and mapping_id = $mappingId and type = '$type';";
    }else if($isActive == 0){
        $sql = "INSERT into bookmarks (type, mapping_id, user_id) values('$type', $mappingId, $userId);";
    }
    $result = mysqli_query($con, $sql);
    if($result){
        $success = "successful";
    }

    if($success == "successful"){
	    echo '1';
    } else {
        echo '0';
    }
?>