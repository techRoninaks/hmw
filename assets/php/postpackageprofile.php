<?php
        $u_id = $_POST["id"];
        $em_id = $_POST["emid"];
        $month = $_POST["month"];
		$callAction = $_POST["callAction"];
        require "init.php";//needed for connection with database
        $type = "type1";

        if($em_id != 0){
            $sql_query = "SELECT uniqueId FROM `profile_table` WHERE id = $u_id ";
            $result = mysqli_query($con,$sql_query);
            $row = mysqli_fetch_assoc($result);
        	if($callAction == "company"){
                $type = "type2";
            }
        	else if($callAction == "personel"){
                $type = "type3";
            }
        	if($month == 0){
            	$sql_query = "UPDATE `profile_table` SET `premium`=1,`employee_id`= $em_id ,`isActive`=1, `org_type`='$callAction' WHERE  id = $u_id ;";
            }
        	else{
            	$sql_query = "UPDATE `profile_table` SET `premium`=1,`employee_id`= $em_id ,`isActive`=1, `org_type`='$callAction', `doe` = DATE_ADD(CURRENT_DATE, INTERVAL $month MONTH) WHERE  id = $u_id ;";
            }
            $result = mysqli_query($con,$sql_query);

            echo $u_id;
        }
        else if($em_id == 0 || $em_id == ""){
            $sql_query = "SELECT uniqueId FROM `profile_table` WHERE id = $u_id ";
            $result = mysqli_query($con,$sql_query);
            $row = mysqli_fetch_assoc($result);
            if($callAction == "company"){
                $type = "type2";
            }
        	else if($callAction == "personel"){
                $type = "type3";
            }
        	if($month == 0){
            	$sql_query = "UPDATE `profile_table` SET `premium`=1,`isActive`=1, `org_type`='$callAction' WHERE id = $u_id ;";
            }
        	else{
            	$sql_query = "UPDATE `profile_table` SET `premium`=1,`isActive`=1, `org_type`='$callAction', `doe` = DATE_ADD(CURRENT_DATE, INTERVAL $month MONTH) WHERE id = $u_id ;";	
            }
            $result = mysqli_query($con,$sql_query);
            if($month == 0){
                // $type = "type1";
            }

            echo $u_id;   
        }
			
            if($result){

                $sql_query =  "SELECT * FROM `profile_table` WHERE `id` = $u_id";//SQL command
                $result = mysqli_query($con,$sql_query);
                $flag;
                $name;
                $role;
                $unionlist;
                $category;
                $address;
                $location;
                $pincode;
                $tempdate;
                $phone;
                $phone2;
            	$unqId;

                while($row=mysqli_fetch_array($result)){
                    $name = $row['name'];
                    $role = $row['role'];
                    $unionlist = $row['union'];
                    $category = $row['category'];
                    $address = $row['address'];
                    $location = $row['location'];
                    $pincode = $row['pincode'];
                    $tempdate = $row['doj'];
                    $phone = $row['phone'];
                    $phone2 = $row['phone2'];
                	$unqId = $row['uniqueId'];
                }


                    $tempname = str_replace(' ', '_', $name);
					$temprole = $role;
					$temprole = str_replace(' ', '_', $temprole);
					$tempdate = explode(" ",$tempdate)[0];
					$tempunion = str_replace(' ', '_', $unionlist);
					$tempcat = str_replace(' ', '_', $category);
        			$tempaddress = $address.",_".$address.",_".$location.",_".$pincode;
					$tempaddress = str_replace(' ', '_', $tempaddress);
            		$tempaddress = str_replace(' ', '_', $tempaddress);
                    if($phone2 != null){
                        $tempphone = str_replace(' ', '_', $phone).",".str_replace(' ', '_', $phone2);
                    }
                    else if($phone2 == null){
                        $tempphone = str_replace(' ', '_', $phone);
                    }
        			// if($image != 1){
        			$output = shell_exec("java -cp ../../  java $tempname~$tempunion~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Phone:_$tempphone $unqId $u_id Address:_$tempaddress $type 2>&1");
                    // echo $output;
                    // echo "java -cp /var/www/html/  java $tempname~$tempunion~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Phone:_$tempphone $unqId $u_id Address:_$tempaddress $type 2>&1";
            		// }
        			// else{
                    // $output = shell_exec("java -cp /var/www/html/  javadefault $tempname~$tempunion~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Address:_$tempaddress $unqId $id 2>&1");
            		// $output = shell_exec("java -cp /var/www/html/   $tempname~WOODWORKER~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Address:_$tempaddress $uniqeCode $id 2>&1");
            		// echo $output;
                    // }
        			// $output = shell_exec("java -cp /var/www/html/  java $tempname~WOODWORKER~Designation:_$temprole~Joining:_$tempdate~Category:_$tempcat~Address:_$tempaddress $unqId $id 2>&1");
            }
?> 