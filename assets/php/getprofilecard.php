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
        	$tempwhatsappno = $row["7"];
        	$tempemail = $row["email"];
        	if($row["7"] == ""){
            	$tempwhatsappno = "No Number";
            }
           	if($row["email"] == ""){
            	$tempemail = "No Email";
            }
            $response[$count] = array("profile_id"=>$row[0],"profile_image"=>$row[1],"name"=>ucwords(strtolower($row[2])),"role"=>$row[3],"rating"=>$row[4],"profile_link"=>$row[5],"sublocation"=>ucwords(strtolower($row[6])),"whatapp"=>$tempwhatsappno,"location"=>ucwords(strtolower($row[8])),"skills"=>ucwords(strtolower($row[9])),"union"=>ucwords(strtolower($row[10])),"website"=>$row["11"],"phone"=>$row[12],"email"=>$tempemail,"address"=>ucwords(strtolower($str)),"card"=>$row[15],"password"=>$row["password"],"pincode"=>$row["pincode"],"phone2"=>$row["phone2"],"state"=>ucwords(strtolower($row["state"])),"country"=>ucwords(strtolower($row["country"])),"type"=>$row["type"],"privatetag"=>$row["privatestat"],"isActive"=>$row["isActive"],"isProspect"=>$row["isProspect"],"uniqueId"=>$row["uniqueId"],"category"=>$row["category"]);
        }
        echo json_encode($response);
        // echo $flag;
        // if($flag==0){
        //     echo json_encode($response);
        // }
        // else if($flag==1){
        //     echo "1~index.html";
        // }
        
?> 