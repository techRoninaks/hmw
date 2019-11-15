<?php
    require "init.php";
    $success = "unsuccessful";
    $response = array();
    $userId = $_POST["c_id"];
    $profileId = $_POST["u_id"];
    $rating = $_POST["rating"];
    $review = $_POST["review"];
    
    $sql_sub = "SELECT '*' from ratings where profile_id = $profileId and user_id = $userId;";
    $sql = "";
    $result = mysqli_query($con, $sql_sub);
    if(mysqli_num_rows($result) == 0){
        $sql = "INSERT into ratings(user_id, profile_id, rating, review) values($userId, $profileId, $rating, '$review');";
    }else{
        $sql = "UPDATE ratings set rating = $rating, review = '$review' where profile_id=$profileId and user_id=$userId;";
    }
    $result = mysqli_query($con, $sql);
    if($result){
        $success = "successful";
    }
    echo $success;
    
?>