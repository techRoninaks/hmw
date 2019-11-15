<?php

        $count = 0;
        require "init.php";//needed for connection with database

        $sql_query =  "SELECT * FROM `profile_table` WHERE isActive = -1 ";//SQL command
        $response = array();
        $data = array();
        $success = "unsuccessful";
// echo $sql_query;
        $result = mysqli_query($con,$sql_query);
        while($row=mysqli_fetch_assoc($result)){
            $success = "successful";
            $countUni = 100000 + $row["id"];
            $countUni = substr($countUni, 1, 5);
            $uniqeCode = "HMW";
            $tempname = str_replace(' ', '', $row["name"]);
            $tempname = strtoupper($tempname);
            $tempLoca = str_replace(' ', '', $row["location"]);
            $tempLoca = strtoupper($tempLoca);
            $tempLoca = substr($tempLoca, 0, 3);
            $tempRole = strtoupper($row["category"]);
            $tempRole = str_replace(' ', '', $tempRole);
            $tempRole = substr($tempRole, 0, 3);
            if(strlen($tempname)>=6){
                $temp = substr($tempname, 0, 6);
                $uniqeCode = $uniqeCode.$temp;
            }
            else if(strlen($tempname)<6){
                $i = 6-strlen($tempname);
                $uniqeCode = $uniqeCode.$tempname;
                for($i;$i>0;$i--){
                    $uniqeCode = $uniqeCode."X";
                }       
            }
            $uniqeCode = $uniqeCode.$countUni.$tempRole.$tempLoca;
            $uniqeCode = strtoupper($uniqeCode);
            // echo $uniqeCode."\r\n";
            $PATH = "/var/www/html/";
			$tempname = str_replace(' ', '_', $row["name"]);
        	if($row["phone2"] != null){
            	$tempphone = str_replace(' ', '_', $row["phone"]).",".str_replace(' ', '_', $row["phone2"]);
            }
			else if($row["phone2"] == null){
                $tempphone = str_replace(' ', '_', $phone);
            }
        	$tempname = str_replace('&', '', $tempname);
            $temprole = str_replace(' ', '_', $row["role"]);
            $tempdate = $row["doj"];   
			$tempdate = explode(" ",$row["doj"])[0];
			$tempunion = str_replace(' ', '_', $row["union"]);
			$tempcat = str_replace(' ', '_', $row["category"]);
        	$tempaddress = $row["address"].",_".$row["sublocation"].",_".$row["location"].",_".$row["pincode"];
        	// echo nl2br($tempaddress."\r\n");
            $tempaddress = str_replace(' ', '_', $tempaddress);
        	$tempaddress = str_replace('(', '###', $tempaddress);
        	$tempaddress = str_replace(')', '#@#', $tempaddress);
            $id = $row['id'];
        	// echo "java -cp /var/www/html/  javadefault $tempname~$tempunion~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Address:_$tempaddress $uniqeCode $id  2>&1\r\n";
            // $output = shell_exec("java -cp /var/www/html/  javadefault $tempname$tempunion~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Phone:_$tempphone  $uniqeCode $id  2>&1\r\n");
        	// $output = shell_exec("java -cp /var/www/html/  javadefault $tempname~$tempunion~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Phone:_$tempphone  $uniqeCode $id Address:_$tempaddress >&1");
        	// $sql_sub_query = "UPDATE `profile_table` SET`profile_image`= 'assets/img/profile/profile/$uniqeCode.png',`card`= 'assets/img/profile/card/$uniqeCode.png',`isActive`='0',`uniqueId`= '$uniqeCode' WHERE id	= $id";
        	// $test = "java -cp /var/www/html/  javadefault $tempname~$tempunion~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Phone:_$tempphone  $uniqeCode $id Address:_$tempaddress type1 >&1\r\n";
        	// echo nl2br($output."\r\n".$test);
            $output = shell_exec("java -cp /var/www/html/  javadefault $tempname~$tempunion~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Phone:_$tempphone  $uniqeCode $id Address:_$tempaddress type1 2>&1");
            $sql_sub_query = "UPDATE `profile_table` SET`profile_image`= 'assets/img/profile/profile/$uniqeCode.png',`card`= 'assets/img/profile/card/$uniqeCode.jpg',`isActive`='0',`uniqueId`= '$uniqeCode' WHERE id	= $id";
            $test = "java -cp /var/www/html/  javadefault $tempname~$tempunion~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Phone:_$tempphone  $uniqeCode $id Address:_$tempaddress type1 2>&1";
        	echo nl2br($output."\r\n".$test);
        	$resultQ = mysqli_query($con,$sql_sub_query);
        	continue;
        }
//     $output = shell_exec("java -cp /var/www/html/  javadefault $tempname~$tempunion~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Address:_$tempaddress $uniqeCode $id 2>&1");

	// echo "ALL IS WELL"
	 
?> 