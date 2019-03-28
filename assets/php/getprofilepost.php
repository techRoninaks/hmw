<?php

        // $id = $_POST["id"];
        require "init.php";//needed for connection with database
        
       
        $sql_query =  "SELECT * FROM `posts_table` ORDER BY date DESC;";//SQL command
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
            $response[$count] = array("id"=>$row[0],"u_id"=>$row[1],"postimage"=>$row[2],"des"=>$row[3],"date"=>$row[4],"likes"=>$row[5],"comments"=>$row[6],"offer"=>$row[7]);
        }
        echo json_encode($response);
?> 