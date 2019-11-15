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
        $privatetag = $_POST["privatetag"];
        $prospectTag = $_POST["prospectTag"];
        $employId = $_POST["employId"];
        $id = $_POST["id"];
        $mob = 0;
        if(isset($_POST['mob'])){
            $mob = 1;
        }
        
        // echo $pass;

        $count = 0;
        require "init.php";//needed for connection with database

        // $sql_query =  "SELECT id FROM `profile_table` WHERE id = $id ";//SQL command
        $response = array();
        $data = array();
        $success = "unsuccessful";
        $count = $id;
        // $result = mysqli_query($con,$sql_query);
        // while($row=mysqli_fetch_array($result)){
        //     $count = $row["id"];
        // }
        // $count = $count+1;

        $countUni = 100000 + $count;
        $countUni = substr($countUni, 1, 5);
        $uniqeCode = "HMW";
        $tempname = str_replace(' ', '', $name);
        $tempname = strtoupper($tempname);
        $tempLoca = strtoupper($location);
		$tempLoca = str_replace(' ', '', $location);
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
        $count = $count+1;

        $countUni = 100000 + $count;
        $countUni = substr($countUni, 1, 5);
        $uniqeCode = "HMW";
        $tempname = str_replace(' ', '', $name);
        $tempname = strtoupper($tempname);
		$tempLoca = str_replace(' ', '', $location);
		$tempLoca = strtoupper($tempLoca);
        $tempLoca = substr($tempLoca, 0, 3);
        $tempRole = strtoupper($category);
		$tempRole = str_replace(' ', '', $tempRole);
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
		$uniqeCode = strtoupper($uniqeCode);
        
    
            
        
        if($image != 1){
        define('UPLOAD_DIR', '../img/profile/userimage/');
        $file = UPLOAD_DIR.$uniqeCode.'.png';
        // echo $file.$uniqeCode;
        if($mob == 0){
            $img =explode(",", $image);
            $img[1] = str_replace(' ', '+', $img[1]);
        	// echo $img[1];
            $data = base64_decode($img[1]);
            

        }else{
            $data = base64_decode($image);
        }
		// $file = fopen($output_file, "wb");
		// fwrite($file, $data);
		// fclose($file);
        $success = file_put_contents($file, $data);
        // print $success ? $file : 'Unable to save the file. '. $file; 
        }
		
        
        // echo $pass;
		$sql_query = "SELECT doj FROM `profile_table` WHERE id = $id";
		$result = mysqli_query($con,$sql_query);
		$row = mysqli_fetch_assoc($result);
		$tempdate = $row["doj"];
		$timeCode = date("Yh:i:sA");
		// $address = str_replace("'", "&#39;", $address);
        $sql_query =  "UPDATE `profile_table` SET `name`='$name',`profile_image`='assets/img/profile/userimage/$uniqeCode.png',`card`='assets/img/profile/card/$uniqeCode.jpg?timecode=$timeCode',`link`='profile.html?user_id=$id',`role`='$role',`sublocation`='$sublocation',`whatapp`='$whatsapp',`location`='$location',`skils`='$skills',`union`='$unionlist',`website`='$website',`phone`='$phone',`email`='$email',`address`=\"$address\",`password`='$pass',`category`='$category',`country`='$country',`state`='$state',`pincode`='$pincode',`type`='$type',`phone2`='$phone2',`isProspect`='$prospectTag',`privatestat`='$privatetag',`uniqueId`='$uniqeCode'  WHERE `id` = $id ";//SQL command
		// echo $sql_query;
        $result = mysqli_query($con,$sql_query);

        // echo $sql_query;
        // echo mysqli_query($con,$sql_query);

        // if($privatetag == 1){
        //     $sql_query = "UPDATE `profile_table` SET `privatestat`= 1 WHERE id = $count ";
        //     $result = mysqli_query($con,$sql_query);
        // }

        if($result){
            echo "success";
//         	$PATH = "/var/www/html/";
// 			$tempname = str_replace(' ', '_', $name);
// 			$temprole = $role;
// 			$temprole = str_replace(' ', '_', $temprole);
// 			$tempdate = explode(" ",$tempdate)[0];
// 			$tempunion = str_replace(' ', '_', $unionlist);
// 			$tempcat = str_replace(' ', '_', $category);
//         	$tempaddress = $address.",_".$sublocation.",_".$location.",_".$pincode;
// 			$tempaddress = str_replace(' ', '_', $tempaddress);
//         	if($phone2 != null){
//         		$tempphone = str_replace(' ', '_', $phone).",".str_replace(' ', '_', $phone2);
//             }
//         	else if($phone2 == null){
//             	$tempphone = str_replace(' ', '_', $phone);
//             }
//         	if($image != 1){
//         	$output = shell_exec("java -cp /var/www/html/  java $tempname~$tempunion~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Phone:_$tempphone $uniqeCode $id Address:_$tempaddress 2>&1");
            
//             }
//         	else{
//             $output = shell_exec("java -cp /var/www/html/  javadefault $tempname~$tempunion~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Phone:_$tempphone $uniqeCode $id Address:_$tempaddress 2>&1");
//             }
            // echo $tempname."\n".$temprole."\n".$tempdate."\n".$tempunion."\n".$tempaddress."\n".$uniquecode."\n".$id;
        	// echo "java $tempname~WOODWORKER~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Address:_$tempaddress $uniqeCode $id";
        	// echo $tempphone;
        	// echo "\n\n java -cp /var/www/html/  java $tempname~WOODWORKER~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Address:_$tempaddress $uniqeCode $id 2>&1";
            // echo $output;
        }
        else if(!$result){
            echo "fail";
        }

?> 