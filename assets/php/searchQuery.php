<?php
    
    require 'init.php';
    // $catType = 1;
    // $srchType = "carpentry";
    // $locType = 1;

    $catType = $_POST["catType"];
    $srchType = $_POST["srchType"];
    $locType = $_POST["locType"];
	$pageNo = 1;
	$mob = "0";
	$isPrem = "";
	if(isset($_POST["mob"])){
	    $mob = $_POST["mob"];
	    $pageNo = $_POST["pageNo"];
	}
	if(isset($_POST["isPrem"])){
	    $isPrem = "AND `premium` = 1"; //add sql 
	}
	$offset_count = 24;
    $i=0;
	$totalPageNo = 0;
	$pageNo = ($pageNo -1)* $offset_count;
    if($catType != null){
        if($srchType != ""){
        	$sqlSub = "SELECT COUNT(*) FROM `profile_table` WHERE `category`= (SELECT `name` FROM `category` WHERE `id`=$catType) AND `location` = (SELECT `name` FROM `location` WHERE `id`=$locType) AND (`name` LIKE '%$srchType%' OR `role` LIKE '%$srchType%' OR `skils` LIKE '%$srchType%');";
        	$sql = "";
        	if($mob == "1"){
        	    $userId = $_POST["userId"];
        	    $sql = "SELECT pt.*,(SELECT(IF(EXISTS(select '*' from bookmarks b where b.type = 'profiles' and b.user_id='$userId' and b.mapping_id = pt.id), 1, 0))) AS IsBookmarked FROM `profile_table` pt WHERE pt.`category`= (SELECT c.`name` FROM `category` c WHERE c.`id`=$catType) AND pt.`location` = (SELECT l.`name` FROM `location` l WHERE l.`id`=$locType) AND (pt.`name` LIKE '%$srchType%' OR pt.`role` LIKE '%$srchType%' OR pt.`skils` LIKE '%$srchType%') $isPrem  LIMIT $offset_count OFFSET $pageNo;";
        	}else{
        	    $sql = "SELECT pt.* FROM `profile_table` pt WHERE pt.`category`= (SELECT c.`name` FROM `category` c WHERE c.`id`=$catType) AND pt.`location` = (SELECT l.`name` FROM `location` l WHERE l.`id`=$locType) AND (pt.`name` LIKE '%$srchType%' OR pt.`role` LIKE '%$srchType%' OR pt.`skils` LIKE '%$srchType%') LIMIT $offset_count OFFSET $pageNo;";
        	}
        } else {
        	$sqlSub = "SELECT COUNT(*) FROM `profile_table` WHERE `category`= (SELECT `name` FROM `category` WHERE `id`=$catType)";
            $sql = "";
        	if($mob == "1"){
        	    $userId = $_POST["userId"];
        	    $sql = "SELECT pt.*,(SELECT(IF(EXISTS(select '*' from bookmarks b where b.type = 'profiles' and b.user_id='$userId' and b.mapping_id = pt.id), 1, 0))) AS IsBookmarked FROM `profile_table` pt WHERE pt.`category`= (SELECT c.`name` FROM `category` c WHERE c.`id`=$catType) $isPrem  LIMIT 10 OFFSET $pageNo ";
        	}else{
        	    $sql = "SELECT pt.* FROM `profile_table` pt WHERE pt.`category`= (SELECT c.`name` FROM `category` c WHERE c.`id`=$catType) LIMIT 10 OFFSET $pageNo ";
        	}
        }
    } else if($srchType != ""){
    	$sqlSub = "SELECT COUNT(*) FROM `profile_table` WHERE `location` = (SELECT `name` FROM `location` WHERE `id`=$locType) AND (`category` LIKE '%$srchType%' OR `name` LIKE '%$srchType%' OR `role` LIKE '%$srchType%' OR `skils` LIKE '%$srchType%');";
        $sql = "";
        	if($mob == "1"){
        	    $userId = $_POST["userId"];
        	    $sql = "SELECT pt.*,(SELECT(IF(EXISTS(select '*' from bookmarks b where b.type = 'profiles' and b.user_id='$userId' and b.mapping_id = pt.id), 1, 0))) AS IsBookmarked FROM `profile_table` pt WHERE pt.`location` = (SELECT l.`name` FROM `location` l WHERE l.`id`=$locType) AND (pt.`category` LIKE '%$srchType%' OR pt.`name` LIKE '%$srchType%' OR pt.`role` LIKE '%$srchType%' OR pt.`skils` LIKE '%$srchType%') $isPrem  LIMIT $offset_count OFFSET $pageNo ;";
        	}else{
        	    $sql = "SELECT pt.* FROM `profile_table` pt WHERE pt.`location` = (SELECT l.`name` FROM `location` l WHERE l.`id`=$locType) AND (pt.`category` LIKE '%$srchType%' OR pt.`name` LIKE '%$srchType%' OR pt.`role` LIKE '%$srchType%' OR pt.`skils` LIKE '%$srchType%') LIMIT $offset_count OFFSET $pageNo ;";
        	}
    }
	else if($srchType == ""){
    	$sqlSub ="SELECT COUNT(*) FROM `profile_table` WHERE `location` = (SELECT `name` FROM `location` WHERE `id`=$locType) AND (`category` LIKE '%$srchType%' OR `name` LIKE '%$srchType%' OR `role` LIKE '%$srchType%' OR `skils` LIKE '%$srchType%');";
        $sql = "";
        	if($mob == "1"){
        	    $userId = $_POST["userId"];
        	    $sql = "SELECT pt.*,(SELECT(IF(EXISTS(select '*' from bookmarks b where b.type = 'profiles' and b.user_id='$userId' and b.mapping_id = pt.id), 1, 0))) AS IsBookmarked FROM `profile_table` pt WHERE pt.`location` = (SELECT l.`name` FROM `location` l WHERE l.`id`=$locType) AND (pt.`category` LIKE '%$srchType%' OR pt.`name` LIKE '%$srchType%' OR pt.`role` LIKE '%$srchType%' OR pt.`skils` LIKE '%$srchType%') $isPrem  LIMIT $offset_count OFFSET $pageNo;";
        	}else{
        	    $sql = "SELECT pt.* FROM `profile_table` pt WHERE pt.`location` = (SELECT l.`name` FROM `location` l WHERE l.`id`=$locType) AND (pt.`category` LIKE '%$srchType%' OR pt.`name` LIKE '%$srchType%' OR pt.`role` LIKE '%$srchType%' OR pt.`skils` LIKE '%$srchType%') LIMIT $offset_count OFFSET $pageNo;";
        	}
    	// echo $sql;
    }
    // echo $sql;
    $resultSub = mysqli_query($con,$sqlSub);
    $row = mysqli_fetch_array($resultSub);
    $totalPageNo = $row[0];
	// echo $sql;
    $result = mysqli_query($con,$sql);
    $userData[$i++] = array("count"=>mysqli_num_rows($result),"totalpageNo"=>$totalPageNo,"pageLimit"=>$offset_count);
    while($row = mysqli_fetch_array($result)){
        if($mob == "1"){
            $userData[$i] = array("userName"=>$row["name"],"userRole"=>$row["role"],"userLoc"=>$row["location"],"userSubLoc"=>$row["sublocation"],"userWPhone"=>$row["whatapp"],"userMail"=>$row["email"],"userPhone"=>$row["phone"],"userId"=>$row["id"],"rating"=>$row["rating"],"review"=>$row["review"],"toRating"=>$row["totRating"],"card"=>$row["card"],"premium"=>$row["premium"], "is_bookmarked"=>$row["IsBookmarked"], "org_type"=>$row["org_type"]);
        }else{
        
            $userData[$i] = array("userName"=>$row["name"],"userRole"=>$row["role"],"userLoc"=>$row["location"],"userSubLoc"=>$row["sublocation"],"userWPhone"=>$row["whatapp"],"userMail"=>$row["email"],"userPhone"=>$row["phone"],"userId"=>$row["id"],"rating"=>$row["rating"],"review"=>$row["review"],"toRating"=>$row["totRating"],"card"=>$row["card"],"premium"=>$row["premium"]);
        }
        $i+=1;

    }
    if($i != 0){
	    $jsonData = json_encode($userData);
        echo $jsonData;
    } else {
        echo '0';
    }
?>