<?php

        $postid = $_POST["postid"];
        require "init.php";//needed for connection with database
        
        $sql_query= "DELETE FROM `posts_table` WHERE  id = $postid";
        $result = mysqli_query($con, $sql_query);
        if($result){
            echo "1";
        }
        else{
            echo "0";
        }
        
?> 