<?php
        require "init.php";//needed for connection with database
        
        $sql_query =  "SELECT * FROM `profile_table` ORDER BY `profile_table`.`rating` DESC  LIMIT 6 ";//SQL command
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
            $response[$count] = array("profile_id"=>$row[0],"profile_image"=>$row[1],"name"=>$row[2],"role"=>$row[3],"rating"=>$row[4],"profile_link"=>$row[5]);
        }
        echo json_encode($response);
?> 