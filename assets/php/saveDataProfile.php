<?php

        $name = $_POST["name"];
        $email = $_POST["email"];
        $phone = $_POST["phone"];
        $password = $_POST["password"];
        $category = $_POST["category"];
        $role = $_POST["role"];
        $country = $_POST["country"];
        $type = $_POST["type"];
        $address = $_POST["address"];
        $state = $_POST["state"];
        $location = $_POST["location"];
        $sublocation = $_POST["sublocation"];
        $pincode = $_POST["pincode"];
        $unionlist = $_POST["union"];
        $whatsapp = $_POST["whatsapp"];
        $website = $_POST["website"];
        $image = $_POST["image"];
        $skills = $_POST["skills"];
        $phone2 = $_POST["phone2"];
        $privatetag = $_POST["privatetag"];
        $employId = $_POST["employId"];
        $prospectTag = $_POST["prospectTag"];
        $userId = $_POST["userId"];
        $isLead ;
        require "init.php";//needed for connection with database


        $count = 0;

        // echo $userId;
        if($userId == "=null"){
        
        }
        else{
            echo $userId;
            $sql_query =  "SELECT * FROM `profile_table` WHERE id = $userID";//SQL command
            $response = array();
            $data = array();
            $success = "unsuccessful";
            $count = 0;
            $result = mysqli_query($con,$sql_query);
            while($row=mysqli_fetch_array($result)){
                $count = $row["id"];
            }
            // $count = $count+1;

            $countUni = 100000 + $count;
            $countUni = substr($countUni, 1, 5);
            $uniqeCode = "HMW";
            $tempname = str_replace(' ', '', $name);
            $tempname = strtoupper($tempname);
            $tempLoca = strtoupper($location);
            $tempLoca = substr($tempLoca, 0, 3);
            $tempRole = strtoupper($category);
            $tempRole = substr($tempRole, 0, 3);
            if(strlen($tempname)>=6){
                $temp = substr($tempname, 0, 6);
                $uniqeCode = $uniqeCode.$temp;
            }
            else if(strlen($tempname)<6){
                // echo 6-strlen($tempname);
                $i = 6-strlen($tempname);
                $uniqeCode = $uniqeCode.$tempname;
                for($i;$i>0;$i--){
                    $uniqeCode = $uniqeCode."X";
                }       
            }
            $uniqeCode = $uniqeCode.$countUni.$tempRole.$tempLoca;
            if($image == "undefined"){
                
            }
            else{
                // echo $uniqeCode;
                define('UPLOAD_DIR', '../img/profile/userimage/');
                $img =explode(",", $image);
                $img[1] = str_replace(' ', '+', $img[1]);
                $data = base64_decode($img[1]);
                $file = UPLOAD_DIR.$uniqeCode.'.png';
                $success = file_put_contents($file, $data);
                // print $success ? $file : 'Unable to save the file.';
            }
            $sql_query = "SELECT id FROM profile_table WHERE id = $userId";
            $result = mysqli_query($con,$sql_query);
            $row=mysqli_fetch_array($result);
            echo $row["id"];
            if($row["id"]!=""){
                $sql_query =  "UPDATE `profile_table` SET `name`='$name',`profile_image`='assets/img/images/card/$uniqeCode.png',`link`='profile.html?user_id=$userId',`role`='$role',`sublocation`='$sublocation',`whatapp`='$whatsapp',`location`='$location',`skils`='$skills',`union`='$unionlist',`website`='$website',`phone`='$phone',`email`='$email',`address`='$address',`password`='$password',`category`='$category',`country`='$country',`state`='$state',`pincode`='$pincode',`type`='$type',`phone2`='$phone2',`isProspect`='$prospectTag',`privatestat`='$privatetag',`uniqueId`='$uniqeCode'  WHERE `id` = $userId;";//SQL command
                $result = mysqli_query($con,$sql_query);
            }
            // if($privatetag == 1){
            //     $sql_query = "UPDATE `profile_table` SET `privatestat`= 1 WHERE id = $count ";
            //     $result = mysqli_query($con,$sql_query);
            // }
            // else{

            // }

        }
        


?> 