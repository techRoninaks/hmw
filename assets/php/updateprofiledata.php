<?php

        $name = $_POST["name"];
        $email = $_POST["email"];
        $phone = $_POST["phone"];
        $pass = $_POST["password"];
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
        $unqId="";
        require "init.php";//needed for connection with database

        $sql_query = "SELECT uniqueId FROM `profile_table` WHERE id = $id ";
        $result = mysqli_query($con,$sql_query);
        while($row=mysqli_fetch_array($result)){
            $unqId = $row['uniqueId'];
        }
    //     echo $unqId;
    // // echo json_encode(array($row["uniqueId"]));
        if($image == 1){
            // echo "null";
        }else{
            define('UPLOAD_DIR', '../img/profile/userimage/');
            $img =explode(",", $image);
            $img[1] = str_replace(' ', '+', $img[1]);
            $data = base64_decode($img[1]);
            $file = UPLOAD_DIR.$unqId.'.png';
            $success = file_put_contents($file, $data);
        }

        if($privatetag == 1){
            $sql_query = "UPDATE `profile_table` SET `privatestat`= 1 WHERE id = $id ";
            $result = mysqli_query($con,$sql_query);
        }
        
        $sql_query = "SELECT doj FROM `profile_table` WHERE id = $id";
		$result = mysqli_query($con,$sql_query);
		$row = mysqli_fetch_assoc($result);
		$tempdate = $row["doj"];
		$sql_query = "SELECT * FROM `profile_table` WHERE id = $id";
		$result = mysqli_query($con,$sql_query);
		$row = mysqli_fetch_assoc($result);
		$tempCard = explode("?",$row["card"]);
		$type = $row["premium"];
		$cardUrl = $tempCard[0];
		$timeCode = date("Yh:i:sA");
        // $sql_query =  "UPDATE `profile_table` SET `name`=$name,`role`=$role,`sublocation`=$sublocation,`whatapp`=$whatsapp,`location`=$location,`skils`=$skills,`union`=$unionlist,`website`=$website,`phone`=$phone,`email`=$email,`address`=$address,`password`=$password,`category`=$category,`country`=$country,`state`=$state,`pincode`=$pincode,`type`=$type,`phone2`=$phone2 WHERE `id` = $id";//SQL command
        $sql_query = "UPDATE `profile_table` SET `name`='$name',`card`='$cardUrl?timecode=$timeCode',`role`='$role',`sublocation`='$sublocation',`whatapp`='$whatsapp',`location`='$location',`skils`='$skills',`union`='$unionlist',`website`='$website',`phone`='$phone',`email`='$email',`address`=\"$address\",`password`='$pass',`category`='$category',`country`='$country',`state`='$state',`pincode`='$pincode',`type`='$type',`phone2`='$phone2' WHERE `id` = $id ";
        $result = mysqli_query($con,$sql_query);
        if($result){
            echo "success";
        			$tempname = str_replace(' ', '_', $name);
					$temprole = $role;
					$temprole = str_replace(' ', '_', $temprole);
					$tempdate = explode(" ",$tempdate)[0];
					$tempunion = str_replace(' ', '_', $unionlist);
					$tempcat = str_replace(' ', '_', $category);
        			$tempaddress = $address.",_".$sublocation.",_".$location.",_".$pincode;
					$tempaddress = str_replace(' ', '_', $tempaddress);
        			if($phone2 != null){
        				$tempphone = str_replace(' ', '_', $phone).",".str_replace(' ', '_', $phone2);
            		}
        			else if($phone2 == null){
            			$tempphone = str_replace(' ', '_', $phone);
            		}
        			if($image != 1){
        			$output = shell_exec("java -cp ../../  java $tempname~$tempunion~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Phone:_$tempphone $unqId $id Address:_$tempaddress type2 2>&1");
                    // echo $output;
                    // echo "java -cp ../../  java $tempname~$tempunion~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Phone:_$tempphone $unqId $id Address:_$tempaddress type2 2>&1";
            		}
        			// else{
                    // // $output = shell_exec("java -cp /var/www/html/  javadefault $tempname~$tempunion~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Address:_$tempaddress $unqId $id 2>&1");
            		// // $output = shell_exec("java -cp /var/www/html/   $tempname~WOODWORKER~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Address:_$tempaddress $uniqeCode $id 2>&1");
            		// // echo $output;
                    // }
        			// // $output = shell_exec("java -cp /var/www/html/  java $tempname~WOODWORKER~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Address:_$tempaddress $unqId $id 2>&1");
            
        }
        if(!$result){
            echo "fail";
        }

?> 