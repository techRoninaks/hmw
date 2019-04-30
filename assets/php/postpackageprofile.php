<?php
        $u_id = $_POST["id"];
        $em_id = $_POST["emid"];
        $month = $_POST["month"];
        require "init.php";//needed for connection with database

        if($em_id != 0){
            $sql_query = "SELECT uniqueId FROM `profile_table` WHERE id = $u_id ";
            $result = mysqli_query($con,$sql_query);
            $row = mysqli_fetch_assoc($result);
            $imagelink = "assets/img/profile/card/".$row["uniqueId"]."Gold.png";
            // echo $imagelink;
            $sql_query = "UPDATE `profile_table` SET `premium`=1,`employee_id`= $em_id ,`profile_image`= '$imagelink',`isActive`=1,`doe` = DATE_ADD(CURRENT_DATE, INTERVAL $month MONTH) WHERE  id = $u_id ;";
            // echo $sql_query;
            $result = mysqli_query($con,$sql_query);
            echo $u_id;
        }
        else if($em_id == 0 || $em_id == ""){
            $sql_query = "SELECT uniqueId FROM `profile_table` WHERE id = $u_id ";
            $result = mysqli_query($con,$sql_query);
            $row = mysqli_fetch_assoc($result);
            $imagelink = "assets/img/profile/card/".$row["uniqueId"]."Gold.png";
            // echo $imagelink;
            $sql_query = "UPDATE `profile_table` SET `premium`=1,`isActive`=1,`profile_image`= '$imagelink',`doe` = DATE_ADD(CURRENT_DATE, INTERVAL $month MONTH) WHERE id = $u_id ;";
            $result = mysqli_query($con,$sql_query);
            echo $u_id;   
        }
?> 