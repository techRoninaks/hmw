<?php
        $u_id = $_POST["id"];
        $em_id = $_POST["emid"];
        require "init.php";//needed for connection with database

        if($em_id != 0){
                $sql_query = "UPDATE `profile_table` SET `primium`=0,`employee_id`= $em_id ,`isActive`=1 WHERE  id = $u_id ;";
                $result = mysqli_query($con,$sql_query);
                echo $u_id;
        }
        else if($em_id == 0){
                $sql_query = "UPDATE `profile_table` SET `primium`=0,`isActive`=1 WHERE  id = $u_id ;";
                $result = mysqli_query($con,$sql_query);
                echo $u_id;   
        }
?> 