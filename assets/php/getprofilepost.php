<?php

        // $id = $_POST["id"];
        require "init.php";//needed for connection with database
        
       
        $sql_query =  "SELECT posts_table.id,posts_table.postimage,posts_table.des,posts_table.likes,posts_table.comments, posts_table.offer,posts_table.date,posts_table.u_id,profile_table.name,profile_table.location,profile_table.role FROM `posts_table` LEFT JOIN `profile_table` ON posts_table.u_id = profile_table.id ORDER BY posts_table.date DESC;";//SQL command
        $response = array();
        $data = array();
        $success = "unsuccessful";
        $count = 0;
        $result = mysqli_query($con,$sql_query);
        while($row=mysqli_fetch_array($result)){
            //  echo  nl2br($row[0] .":". $row[1].":".$row[2].":".$row[3].":".$row[4]."\n");//returning results   ,"image_address"=>$row[2],"link"=>$row[3], "frequency"=>$row[4]
            $success = "successful";
            $count = $count + 1;
            if($count > 15){
                break;
            }
            $response[0] = array("response"=>$success);  
            // $str = $row[14];
            // $str = str_replace(' ', '&#32;', $str);
            // echo $str;
            $response[$count] = array("id"=>$row["id"],"u_id"=>$row["u_id"],"postimage"=>$row["postimage"],"des"=>$row["des"],"date"=>$row["date"],"likes"=>$row["likes"],"comments"=>$row["comments"],"offer"=>$row["offer"],"name"=>$row["name"],"location"=>$row["location"],"role"=>$row["role"]);
        }
        echo json_encode($response);
?> 