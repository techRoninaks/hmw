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
        $union = $_POST["union"];
        $whatsapp = $_POST["whatsapp"];
        $website = $_POST["website"];
        $image = $_POST["image"];
        $skills = $_POST["skills"];
        $phone2 = $_POST["phone2"];
        $privatetag = $_POST["privatetag"];
        $employId = $_POST["employId"];

        $count = 0;
        require "init.php";//needed for connection with database

        $sql_query =  "SELECT * FROM `profile_table` ORDER BY `profile_table`.`id`ASC ";//SQL command
        $response = array();
        $data = array();
        $success = "unsuccessful";
        $count = 0;
        $result = mysqli_query($con,$sql_query);
        while($row=mysqli_fetch_array($result)){
            $count = $row["id"];
        }
        $count = $count+1;

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
        // echo $uniqeCode;
        define('UPLOAD_DIR', '../img/profile/userimage/');
        $img =explode(",", $image);
        $img[1] = str_replace(' ', '+', $img[1]);
        $data = base64_decode($img[1]);
        $file = UPLOAD_DIR.$uniqeCode.'.png';
        $success = file_put_contents($file, $data);
        // print $success ? $file : 'Unable to save the file.';
        
        $sql_query =  "INSERT INTO `profile_table`(`id`, `profile_image`, `name`, `role`, `rating`, `link`, `sublocation`, `whatapp`, `location`, `skils`, `union`, `website`, `phone`, `email`, `address`, `card`, `privatestat`, `password`, `category`, `country`, `state`, `pincode`, `type`, `phone2`, `primium`, `uniqueId`, `employee_id`)  VALUES ('$count','assets/img/profile/userimage/$uniqeCode.png','$name','$role','0','profile.html?cat_type=$count.png','$sublocation','$whatsapp','$location','$skills','$union','$website','$phone','$email','$address','assets/img/profile/card/$uniqeCode.png','0','$password','$category','$country','$state','$pincode','$type','$phone2','$count','$uniqeCode','$employId');";//SQL command
        $result = mysqli_query($con,$sql_query);
        echo mysqli_query($con,$sql_query);

        if($privatetag == 1){
            $sql_query = "UPDATE `profile_table` SET `privatestat`= 1 WHERE id = $count ";
            $result = mysqli_query($con,$sql_query);
        }
        if($result){
            echo "success";
            
        }
        if(!$result){
            echo "fail";
        }

?> 