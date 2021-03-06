<?php

        require "init.php";//needed for connection with database
    	if(isset($_POST["userid"])){

            //pagination
            $userid = $_POST["userid"];
            $pageNo =$_POST["pageNo"];
            $offset_count = 15;

            //sql query for finding total pages
            $sql_total= "SELECT count(*) FROM `posts_table` LEFT JOIN `profile_table` ON posts_table.u_id = profile_table.id WHERE `profile_table`.`id`= $userid ORDER BY `posts_table`.`id` DESC";

            //calculate total pages
            $result_total = mysqli_query($con,$sql_total);
            $resTol = mysqli_fetch_array($result_total);
            $total_pages = (ceil($resTol[0] / $offset_count));
            $last_pages = $total_pages+1;
            $current_page = $pageNo;
        
	        $pageNo = ($pageNo -1)* $offset_count;

	        $sql_query =  "SELECT posts_table.id,posts_table.postimage,posts_table.des,posts_table.likes,posts_table.comments, posts_table.offer,posts_table.date,posts_table.u_id,profile_table.name, profile_table.location,profile_table.role, (SELECT(IF(EXISTS(SELECT '*' FROM likes L WHERE L.userid = $userid AND posts_table.id = L.postid),'1','0'))) AS isLiked,(SELECT(IF(EXISTS(select '*' from bookmarks b where b.type = 'posts' and b.user_id= $userid and b.mapping_id = posts_table.id), 1, 0))) AS IsBookmarked FROM `posts_table` LEFT JOIN `profile_table` ON posts_table.u_id = profile_table.id WHERE `profile_table`.`id`= $userid ORDER BY `posts_table`.`id` DESC LIMIT $offset_count OFFSET $pageNo;";//SQL command
        }
        else{
            $id = $_POST["id"];
            //pagination
            if(isset($_POST["pageNo"])){
            	$pageNo =$_POST["pageNo"];
            }
        	else{
            	$pageNo = 1;
        	}
            $offset_count = 15;

            //sql query for finding total pages
            $sql_total= "SELECT count(*) FROM `posts_table` LEFT JOIN `profile_table` ON posts_table.u_id = profile_table.id WHERE `profile_table`.`id`= $id ORDER BY `posts_table`.`id` DESC";

            //calculate total pages
            $result_total = mysqli_query($con,$sql_total);
            $resTol = mysqli_fetch_array($result_total);
            $total_pages = (ceil($resTol[0] / $offset_count));
            $last_pages = $total_pages+1;
            $current_page = $pageNo;
        
	        $pageNo = ($pageNo -1)* $offset_count;

            $sql_query = "SELECT posts_table.id,posts_table.postimage,posts_table.des,posts_table.likes,posts_table.comments, posts_table.offer,posts_table.date,posts_table.u_id,profile_table.name,profile_table.location,profile_table.role, (SELECT(IF(EXISTS(SELECT '*' FROM likes L WHERE posts_table.u_id = L.userid AND posts_table.id = L.postid),'1','0'))) AS isLiked, (SELECT(IF(EXISTS(select '*' from bookmarks b where b.type = 'posts' and b.user_id= $id and b.mapping_id = posts_table.id), 1, 0))) AS IsBookmarked FROM `posts_table` LEFT JOIN `profile_table` ON posts_table.u_id = profile_table.id WHERE `profile_table`.`id`= $id ORDER BY `posts_table`.`id`";//SQL command
        }
        
        $response = array();
        $data = array();
        $success = "unsuccessful";
        $count = 0;
        $result = mysqli_query($con,$sql_query);
        // echo $sql_query;
        if($current_page == $last_pages){
            $last_page = "last-page";
            $response[0] = array("response" =>$last_page);
        }
        else{
            while($row=mysqli_fetch_assoc($result)){
                $success = "successful";
                $count = $count + 1;
                if($count > 15){
                    break;
                }
                $sql_sub_query = "SELECT p.name,c.* from comments c join profile_table p on c.u_id = p.id where c.p_id = " . $row["id"]  . " and c.isactive = 1 LIMIT 3;";
                $sub_result = mysqli_query($con, $sql_sub_query);
                $comments = array();
                $sub_count = 0;
                while($row1=mysqli_fetch_assoc($sub_result)){
                    $comments[$sub_count++] = array("name"=>$row1["name"],"id"=>$row1["id"],"u_id"=>$row1["u_id"],"p_id"=>$row1["p_id"],"comment"=>$row1["comment"],"IsReported"=>$row1["IsReported"],"IsActive"=>$row1["IsActive"]);
                }
                $response[0] = array("response"=>$success);  
                $response[$count] = array("id"=>$row["id"],"u_id"=>$row["u_id"],"postimage"=>$row["postimage"],"des"=>$row["des"],"date"=>$row["date"],"likes"=>$row["likes"],"commentnumber"=>$row["comments"],"offer"=>$row["offer"],"name"=>ucwords(strtolower($row["name"])),"location"=>ucwords(strtolower($row["location"])),"role"=>$row["role"], "comments"=>$comments, "isLiked"=>$row["isLiked"],"IsBookmarked"=>$row["IsBookmarked"]);
            }
        }
        echo json_encode($response);
        // echo json_encode($result_total);
?> 

