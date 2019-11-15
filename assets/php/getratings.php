<?php
    
    require 'init.php';
    
    $profileId = $_GET["u_id"];
    $userId = $_GET["c_id"];
	$pageNo = 1;
	$offset_count = 25;
    $i=0;
	$totalPageNo = 0;
	$userData = array();
	$masterData = array();
	$pageNo = ($pageNo -1)* $offset_count;
    $sql = "SELECT rating, (SELECT avg(rating) from ratings where profile_id = $profileId) as avg_rating, (SELECT count(*) from ratings where profile_id = $profileId and review IS NOT NULL and review NOT LIKE '') as total_review, (SELECT count(*) from ratings where profile_id = $profileId) as total_rating from ratings where profile_id = $profileId and user_id = $userId;";
    // echo $sql;
    $totalPageNo = 1;
    $result = mysqli_query($con,$sql);
    $row = mysqli_fetch_array($result);
    $masterData = array("count"=>mysqli_num_rows($result),"totalpageNo"=>$totalPageNo,"pageLimit"=>$offset_count, "rating"=>$row[0], "avg_rating"=>$row[1], "total_reviews"=>$row[2], "total_ratings"=>$row[3]);
    $sql = "SELECT r.*, pt.name from ratings r inner join profile_table pt on r.user_id = pt.id where r.profile_id = $profileId ORDER BY r.id DESC;";
    $result = mysqli_query($con,$sql);
    while($row = mysqli_fetch_array($result)){
        $userData[$i] = array("id"=>$row[0], "user_id"=>$row[1], "rating"=>$row[3], "review"=>$row[4], "user_name"=>$row[5], "profile_id"=>$profileId);
        $i+=1;

    }
    echo json_encode(array("master"=>$masterData, "data"=>$userData));
?>