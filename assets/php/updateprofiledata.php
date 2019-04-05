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
        $id = $_POST["id"];
        $privatetag = $_POST["privatetag"];
        require "init.php";//needed for connection with database

        if($privatetag == 1){
            $sql_query = "UPDATE `profile_table` SET `privatestat`= 1 WHERE id = $id ";
            $result = mysqli_query($con,$sql_query);
        }
        

        // $sql_query =  "UPDATE `profile_table` SET `name`=$name,`role`=$role,`sublocation`=$sublocation,`whatapp`=$whatsapp,`location`=$location,`skils`=$skills,`union`=$unionlist,`website`=$website,`phone`=$phone,`email`=$email,`address`=$address,`password`=$password,`category`=$category,`country`=$country,`state`=$state,`pincode`=$pincode,`type`=$type,`phone2`=$phone2 WHERE `id` = $id";//SQL command
        $sql_query = "UPDATE `profile_table` SET `name`='$name',`role`='$role',`sublocation`='$sublocation',`whatapp`='$whatsapp',`location`='$location',`skils`='$skills',`union`='$unionlist',`website`='$website',`phone`='$phone',`email`='$email',`address`='$address',`password`='$password',`category`='$category',`country`='$country',`state`='$state',`pincode`='$pincode',`type`='$type',`phone2`='$phone2' WHERE `id` = $id ";
        $result = mysqli_query($con,$sql_query);
        if($result){
            echo "success";
            
        }
        if(!$result){
            echo "fail";
        }

?> 