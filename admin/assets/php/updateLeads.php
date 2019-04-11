<?php
	require "init.php";
	header("Content-Type: application/json; charset=UTF-8");
	
	$dataJSON = $_POST["jsonObj"];
    $data = json_decode($dataJSON);
    $newLead = 0;
    $sql = "SELECT * FROM `profile_table` WHERE `id`='$data->leadId' ORDER BY doj DESC";
    $result1 = mysqli_query($conn,$sql);
    
    $row = mysqli_fetch_array($result1);
    // echo "-1-".$sql;
    $address = "assets/img/profile/userimage/default.png";
    
    if($row == NULL){
        $newLead = 1;
        $sql = "INSERT INTO profile_table (`name`,`role`,`sublocation`,`location`,`type`,`category`,`union`,`address`,`state`,`country`,`pincode`,`phone`,`phone2`,`whatapp`,`email`,`website`,`skils`,`profile_image`,`isLead`,`employee_id`) VALUES ('$data->custName','$data->roleName','$data->subLocName','$data->locName','$data->typeName','$data->catName','$data->unionName','$data->addName','$data->stateName','$data->countryName','$data->pincode','$data->primaryPhone','$data->secondaryPhone','$data->whatsappPhone','$data->eMail','$data->webSite','$data->skillName','$address','1','$data->userId')";
    } else {
        $sql = "UPDATE profile_table SET name='$data->custName',role='$data->roleName',sublocation='$data->subLocName',location='$data->locName',type='$data->typeName',category='$data->catName',profile_table.union='$data->unionName',address='$data->addName',state='$data->stateName',country='$data->countryName',pincode='$data->pincode',phone='$data->primaryPhone',phone2='$data->secondaryPhone',whatapp='$data->whatsappPhone',email='$data->eMail',website='$data->webSite',skils='$data->skillName',profile_image='$address',isLead='1',employee_id='$data->userId' WHERE id='$data->leadId'";
    }
    // echo "->".$sql;
    $result = mysqli_query($conn,$sql);
    if($result){
        if($newLead == 1){
            $sql = "UPDATE tasks SET LEADS_FINAL = LEADS_FINAL+1 WHERE USER_ID='$data->userId AND WEEK(NOW()) = WEEK(DATE_END)'";
            $result = mysqli_query($conn,$sql);
        }
        echo '1';
    }
?>