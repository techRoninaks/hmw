<?php

        $id = $_POST["id"];
        require "init.php";//needed for connection with database
        
        $sql_sub_query = "SELECT p.name,c.* from comments c join profile_table p on c.u_id = p.id where c.p_id = $id and c.isactive = 1 LIMIT 15;";
        $sub_result = mysqli_query($con, $sql_sub_query);
        $comments = array();
        $sub_count = 0;
        while($row1=mysqli_fetch_assoc($sub_result)){
            $comments[$sub_count++] = array("name"=>$row1["name"],"id"=>$row1["id"],"u_id"=>$row1["u_id"],"p_id"=>$row1["p_id"],"comment"=>$row1["comment"],"IsReported"=>$row1["IsReported"],"IsActive"=>$row1["IsActive"]);
        }
        echo json_encode($comments);
?>