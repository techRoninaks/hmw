<?php
	require "init.php";
	header("Content-Type: application/json; charset=UTF-8");
	
	$dataJSON = $_POST["jsonObj"];
    $data = json_decode($dataJSON);
    // echo $dataJSON;
    $sql = "SELECT * FROM `profile_table` WHERE `id`='$data->cookieName' ORDER BY doj DESC";
    $result1 = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result1);
    
    if($row !== NULL){
        $address = "assets/img/profile/userimage/"."$data->cookieName".".png";
        $sql = "UPDATE profile_table SET name='$data->custName',role='$data->roleName',sublocation='$data->subLocName',location='$data->locName',type='$data->typeName',category='$data->catName',profile_table.union='$data->unionName',address='$data->addName',state='$data->stateName',country='$data->countryName',pincode='$data->pincode',phone='$data->primaryPhone',phone2='$data->secondaryPhone',whatapp='$data->whatsappPhone',email='$data->eMail',website='$data->webSite',skils='$data->skillName',password='$data->password',profile_image='$address' WHERE id='$data->cookieName'";
    }
    if($data->image!=null || $data->image!= "" ){
        $path = "../../../assets/img/profile/userimage/";
        $img = explode(",", $data->image);
        define('UPLOAD_DIR', $path);
        $img[1] = str_replace(' ', '+', $img[1]);
        $imgData = base64_decode($img[1]);
        $file = UPLOAD_DIR.$data->cookieName.'.png';
        $success = file_put_contents($file, $imgData);
        if($success){
            // echo "img";
        }
    }
    $result = mysqli_query($conn,$sql);
    // var_dump($result);
    if($result){
        echo '1';
    }
?>