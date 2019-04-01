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
        define('UPLOAD_DIR', '../img/profile/userimage/');
        $img =explode(",", $image);
        $img[1] = str_replace(' ', '+', $img[1]);
        $data = base64_decode($img[1]);
        $file = UPLOAD_DIR.$count.'.png';
        $success = file_put_contents($file, $data);
        // print $success ? $file : 'Unable to save the file.';
        
        $sql_query =  "INSERT INTO `profile_table`(`id`, `profile_image`, `name`, `role`, `rating`, `link`, `sublocation`, `whatapp`, `location`, `skils`, `union`, `website`, `phone`, `email`, `address`, `card`, `privatestat`, `password`, `category`, `country`, `state`, `pincode`, `type`, `phone2`, `primium`) VALUES ('$count','assets/img/profile/userimage/$count.png','$name','$role','0','profile.html?cat_type=$count.png','$sublocation','$whatsapp','$location','$skills','$union','$website','$phone','$email','$address','assets/img/profile/card/$count.png','$count','$password','$category','$country','$state','$pincode','$type','$phone2','$count')";//SQL command
        $result = mysqli_query($con,$sql_query);
        if($result){
            echo "success";
            
        }
        if(!$result){
            echo "fail";
        }

?> 