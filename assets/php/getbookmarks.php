<?php
    
    require 'init.php';
    // $catType = 1;
    // $srchType = "carpentry";
    // $locType = 1;

    $userId = $_GET["userId"];
    $type = $_GET["type"];
    // $userId = "";
    // $type = "profiles";
	$pageNo = 1;
	$offset_count = 25;
    $i=0;
	$totalPageNo = 0;
	$pageNo = ($pageNo -1)* $offset_count;
	if($type == "posts"){
	    $sql = "SELECT pt.*,pr.location, pr.name,'1' as IsBookmarked,(SELECT(IF(EXISTS(SELECT '*' FROM likes L WHERE pt.u_id = L.userid AND pt.id = L.postid),'1','0'))) AS isLiked from posts_table pt join profile_table pr on pr.id = pt.u_id where pt.ID in (SELECT b.mapping_id from bookmarks b where b.user_id = $userId and b.type like '$type');";
	}else{
        $sql = "SELECT pt.*, '1' as IsBookmarked from profile_table pt where ID in (SELECT b.mapping_id from bookmarks b where b.user_id = $userId and b.type like '$type');";
	}
    $totalPageNo = 1;
    $result = mysqli_query($con,$sql);
    $userData[$i++] = array("count"=>mysqli_num_rows($result),"totalpageNo"=>$totalPageNo,"pageLimit"=>$offset_count);
    if($type == "posts"){
        while($row = mysqli_fetch_array($result)){
            
            $userData[$i] = array("name"=>$row["name"],"postimage"=>$row["postimage"],"des"=>$row["des"],"date"=>$row["date"],"likes"=>$row["likes"],"commentsnumber"=>$row["comments"],"offer"=>$row["offer"],"id"=>$row["id"],"is_bookmarked"=>$row["IsBookmarked"],"isLiked"=>$row["isLiked"],"location"=>$row["location"]);
            $i+=1;
        }
    }
    else{
        while($row = mysqli_fetch_array($result)){
            
            $userData[$i] = array("userName"=>$row["name"],"userRole"=>$row["role"],"userLoc"=>$row["location"],"userSubLoc"=>$row["sublocation"],"userWPhone"=>$row["whatapp"],"userMail"=>$row["email"],"userPhone"=>$row["phone"],"userId"=>$row["id"],"rating"=>$row["rating"],"review"=>$row["review"],"toRating"=>$row["totRating"],"card"=>$row["card"],"premium"=>$row["premium"], "is_bookmarked"=>$row["IsBookmarked"], "org_type"=>$row["org_type"]);
            $i+=1;
        }
    }
    if($i != 0){
	    $jsonData = json_encode($userData);
        echo $jsonData;
    } else {
        echo '0';
    }
?>