<?php

        $p_id = $_POST["p_id"];
        $comment = $_POST["comment"];
        $u_id = $_POST["u_id"];
        require "init.php";//needed for connection with database
        
       
        $sql_query =  "SELECT * FROM `comments` ORDER BY `comments`.`id` ASC ";//SQL command
        $response = array();
        $data = array();
        $success = "unsuccessful";
        $count = 0;
        $result = mysqli_query($con,$sql_query);
        while($row=mysqli_fetch_array($result)){
            $count = $row["id"];
        }
        $count = $count+1;
        $sql_query =  "INSERT INTO `comments`(`id`, `p_id`, `u_id`, `comment`, `IsReported`, `IsActive`) VALUES ('$count','$p_id','$u_id','$comment','0','1')";//SQL command
        $result = mysqli_query($con,$sql_query);

        $count = 0;
        if($result){
            $sql_query =  "SELECT comments FROM `posts_table` WHERE id = $p_id ";//SQL command
            $result = mysqli_query($con,$sql_query);
            while($row=mysqli_fetch_array($result)){
                $count = $row["comments"];
            }
            $count += 1;
            $sql_query =  "UPDATE `posts_table` SET `comments`= $count WHERE id = $p_id  ";//SQL command
            $result = mysqli_query($con,$sql_query);

        }



        // while($row=mysqli_fetch_array($result)){
        //     $count = $row["id"];
        // }
        echo "Success";
?> 