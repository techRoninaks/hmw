<?php
$id = $_POST["id"];
$action = $_POST["action"];
// queryAction
        require "init.php";//needed for connection with database
        
       if($action == "queryAction"){
          // $sql_query =  "SELECT posts_table.id,posts_table.postimage,posts_table.des,posts_table.likes,posts_table.comments, posts_table.offer,posts_table.date,posts_table.u_id,profile_table.name,profile_table.location,profile_table.role,(SELECT(IF(EXISTS(SELECT '*' FROM likes L WHERE posts_table.u_id = L.userid AND posts_table.id = L.postid),'1','0'))) AS isLiked FROM `posts_table` LEFT JOIN `profile_table` ON posts_table.u_id = profile_table.id WHERE `profile_table`.`id` = (SELECT id FROM profile_table pt WHERE pt.union =(SELECT name FROM unions u WHERE u.id = $id LIMIT 1) LIMIT 1) LIMIT 15 ";//SQL command
            $sql_query = "SELECT posts_table.id,posts_table.postimage,posts_table.des,posts_table.likes,posts_table.comments, posts_table.offer,posts_table.date,posts_table.u_id,profile_table.name,profile_table.location,profile_table.role,(SELECT(IF(EXISTS(SELECT '*' FROM likes L WHERE posts_table.u_id = L.userid AND posts_table.id = L.postid),'1','0'))) AS isLiked,(SELECT(IF(EXISTS(select '*' from bookmarks b where b.type = 'posts' and b.user_id= profile_table.id and b.mapping_id = posts_table.id), 1, 0))) AS IsBookmarked FROM `posts_table` LEFT JOIN `profile_table` ON posts_table.u_id = profile_table.id WHERE `profile_table`.`union` = (SELECT name FROM unions u WHERE u.id = $id )  ORDER BY `posts_table`.`id` DESC LIMIT 15 ";
            $response = array();
            $data = array();
            $success = "unsuccessful";
            $count = 0;
       		$sql_subQ = "SELECT name FROM unions u WHERE u.id = $id";
            $sub_resultQ = mysqli_query($con, $sql_subQ);
            $row2=mysqli_fetch_assoc($sub_resultQ);
            $response[0] = array("unionName"=>$row2["name"]);
            $result = mysqli_query($con,$sql_query);
            while($row=mysqli_fetch_array($result)){
                $sql_sub_query = "SELECT p.name,c.* from comments c join profile_table p on c.u_id = p.id where c.p_id = " . $row["id"]  . " and c.isactive = 1 LIMIT 3;";
                $sub_result = mysqli_query($con, $sql_sub_query);
                $comments = array();
                $sub_count = 0;
                $count++;
                while($row1=mysqli_fetch_assoc($sub_result)){
                    $comments[$sub_count++] = array("name"=>$row1["name"],"id"=>$row1["id"],"u_id"=>$row1["u_id"],"p_id"=>$row1["p_id"],"comment"=>$row1["comment"],"IsReported"=>$row1["IsReported"],"IsActive"=>$row1["IsActive"]);
                }    
                // echo $str;
                $response[$count] = array("id"=>$row['id'],"u_id"=>$row['u_id'],"name1"=>$row[2],"postimage"=>$row['postimage'],"des"=>$row['des'],"date"=>$row['date'],"sublocation"=>$row[6],"likes"=>$row['likes'],"commentnumber"=>$row['comments'],"offer"=>$row['offer'],"name"=>ucwords(strtolower($row['name'])),"location"=>ucwords(strtolower($row["location"])),"role"=>$row['role'], "comments"=>$comments, "isLiked"=>$row["isLiked"],"IsBookmarked"=>$row["IsBookmarked"]);
            }
            echo json_encode($response); 
       }
      if($action == "userAction"){
          // $sql_query =  "SELECT posts_table.id,posts_table.postimage,posts_table.des,posts_table.likes,posts_table.comments, posts_table.offer,posts_table.date,posts_table.u_id,profile_table.name,profile_table.location,profile_table.role,(SELECT(IF(EXISTS(SELECT '*' FROM likes L WHERE posts_table.u_id = L.userid AND posts_table.id = L.postid),'1','0'))) AS isLiked  FROM `posts_table` LEFT JOIN `profile_table` ON posts_table.u_id = profile_table.id WHERE `profile_table`.`id` = (SELECT id FROM profile_table pt WHERE pt.union =(SELECT name FROM unions u WHERE u.id = (SELECT Id from unions u where u.name = (SELECT pt.union from profile_table pt where pt.id = $id)) LIMIT 1) LIMIT 1) LIMIT 15 ";//SQL command
            $sql_query = "SELECT posts_table.id,posts_table.postimage,posts_table.des,posts_table.likes,posts_table.comments, posts_table.offer,posts_table.date,posts_table.u_id,profile_table.name,profile_table.location,profile_table.role,(SELECT(IF(EXISTS(SELECT '*' FROM likes L WHERE posts_table.u_id = L.userid AND posts_table.id = L.postid),'1','0'))) AS isLiked FROM `posts_table` LEFT JOIN `profile_table` ON posts_table.u_id = profile_table.id WHERE `profile_table`.`union` =(SELECT pt.union from profile_table pt where pt.id = $id) ORDER BY `posts_table`.`id` DESC LIMIT 15 ";
            $data = array();
            $success = "unsuccessful";
            $count = 0;
      		$sql_subQ = "SELECT pt.union from profile_table pt where pt.id = $id ";
           	$sub_resultQ = mysqli_query($con, $sql_subQ);
            $row2=mysqli_fetch_assoc($sub_resultQ);
            $response[0] = array("unionName"=>$row2["union"]); 
            $result = mysqli_query($con,$sql_query);
            while($row=mysqli_fetch_array($result)){
                $sql_sub_query = "SELECT p.name,c.* from comments c join profile_table p on c.u_id = p.id where c.p_id = " . $row["id"]  . " and c.isactive = 1 LIMIT 3;";
                $sub_result = mysqli_query($con, $sql_sub_query);
                $comments = array();
                $sub_count = 0;
                $count++;
                while($row1=mysqli_fetch_assoc($sub_result)){
                    $comments[$sub_count++] = array("name"=>$row1["name"],"id"=>$row1["id"],"u_id"=>$row1["u_id"],"p_id"=>$row1["p_id"],"comment"=>$row1["comment"],"IsReported"=>$row1["IsReported"],"IsActive"=>$row1["IsActive"]);
                }    
                // echo $str;
                $response[$count] = array("id"=>$row['id'],"u_id"=>$row['u_id'],"name1"=>$row[2],"postimage"=>$row['postimage'],"des"=>$row['des'],"date"=>$row['date'],"sublocation"=>$row[6],"likes"=>$row['likes'],"commentnumber"=>$row['comments'],"offer"=>$row['offer'],"name"=>ucwords(strtolower($row["name"])),"location"=>ucwords(strtolower($row["location"])),"role"=>$row['role'], "comments"=>$comments, "isLiked"=>$row["isLiked"]);
            }
            echo json_encode($response); 
       }
        
?> 