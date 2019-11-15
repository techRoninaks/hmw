<?php
        require "init.php";//needed for connection with database
        $userId = $_GET["user_id"];
        $sql_query =  "SELECT u.id FROM unions u where u.name = (select pt.union from profile_table pt where pt.id = $userId);";//SQL command
        $response = array();
        $data = array();
        $success = "unsuccessful";
        $count = 0;
        $result = mysqli_query($con,$sql_query);
        while($row=mysqli_fetch_array($result)){
            //  echo  nl2br($row[0] .":". $row[1].":".$row[2].":".$row[3].":".$row[4]."\n");//returning results   ,"image_address"=>$row[2],"link"=>$row[3], "frequency"=>$row[4]
            $success = "successful";
            $count = $count + 1;
            $response[0] = array("response"=>$success);  
            $response[$count] = array("union_id"=>$row[0]);
        }
        echo json_encode($response);
?> 