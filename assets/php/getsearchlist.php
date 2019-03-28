<?php
        require "init.php";//needed for connection with database
        
        $sql_query =  "SELECT * FROM `location`  ";//SQL command
        $response = array();
        $data = array();
        $success = "unsuccessful";
        $count = 0;
        $result = mysqli_query($con,$sql_query);
        while($row=mysqli_fetch_array($result)){
            //  echo  nl2br($row[0] .":". $row[1].":".$row[2].":".$row[3].":".$row[4]."\n");//returning results   ,"image_address"=>$row[2],"link"=>$row[3], "frequency"=>$row[4]
            $success = "successful";
            $count = $count + 1;
            if($count > 18){
                break;
            }
            $response[0] = array("response"=>$success);  
            $response[$count] = array("id"=>$row[0],"location"=>$row[1]);
        }
        echo json_encode($response);
?> 