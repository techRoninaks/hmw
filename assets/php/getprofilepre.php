<?php

        $id = $_POST["id"];
        require "init.php";//needed for connection with database
        
       
        $sql_query =  "SELECT * FROM `profile_table` WHERE `id` = $id";//SQL command
        $response = array();
        $data = array();
        $success = "unsuccessful";
        $count = 0;
        $result = mysqli_query($con,$sql_query);
        $flag;
        while($row=mysqli_fetch_array($result)){
            //  echo  nl2br($row[0] .":". $row[1].":".$row[2].":".$row[3].":".$row[4]."\n");//returning results   ,"image_address"=>$row[2],"link"=>$row[3], "frequency"=>$row[4]
            $success = "successful";
            $count = $count + 1;
            if($count > 15){
                break;
            }
            $response[0] = array("response"=>$success);  
            $str = $row[14];
            $str = str_replace(' ', '&#32;', $str);
            // echo $str;
            $flag = $row["isActive"];
            $response[$count] = array("profile_id"=>$row[0],"profile_image"=>$row[1],"name"=>$row[2],"role"=>$row[3],"rating"=>$row[4],"profile_link"=>$row[5],"sublocation"=>$row[6],"whatapp"=>$row[7],"location"=>$row[8],"skills"=>$row[9],"union"=>$row[10],"website"=>$row[11],"phone"=>$row[12],"email"=>$row[13],"address"=>$str,"card"=>$row[15],"password"=>$row["password"],"pincode"=>$row["pincode"],"phone2"=>$row["phone2"],"state"=>$row["state"],"country"=>$row["country"],"type"=>$row["type"],"privatetag"=>$row["privatestat"],"isActive"=>$row["isActive"],"isProspect"=>$row["isProspect"]);
        }
        // echo json_encode($response);
        // echo $flag;
        if($flag==0){
            echo json_encode($response);
        }
        else if($flag==1){
            echo "1~index.html";
        }
        
?> 