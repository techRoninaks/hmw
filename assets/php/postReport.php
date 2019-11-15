<?php

        $id = $_POST["postid"];
        require "init.php";//needed for connection with database
        
        // $sql_query =  "UPDATE `profile_table` SET `name`=$name,`role`=$role,`sublocation`=$sublocation,`whatapp`=$whatsapp,`location`=$location,`skils`=$skills,`union`=$unionlist,`website`=$website,`phone`=$phone,`email`=$email,`address`=$address,`password`=$password,`category`=$category,`country`=$country,`state`=$state,`pincode`=$pincode,`type`=$type,`phone2`=$phone2 WHERE `id` = $id";//SQL command
        $sql_query = "UPDATE `posts_table` SET `isReported`= 1 WHERE id = $id";
        $result = mysqli_query($con,$sql_query);
        if($result){
            echo "success";
            
        }
        if(!$result){
            echo "fail";
        }
        // echo $id;

?> 