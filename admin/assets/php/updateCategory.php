<?php
	require "init.php";
	header("Content-Type: application/json; charset=UTF-8");
	
	$dataJSON = $_POST["jsonObj"];
    $data = json_decode($dataJSON);
    $sql = "SELECT * FROM `category` WHERE `name`='$data->cookieName'";
    $result1 = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result1);
    // echo "-1-".$sql;var_dump($row);
    
    if($data->image!=null || $data->image!= "" ){
        $path = "../../../assets/img/cate_icons/";
        $img = explode(",", $data->image);
        define('UPLOAD_DIR', $path);
        $img[1] = str_replace(' ', '+', $img[1]);
        $imgData = base64_decode($img[1]);
        $file = UPLOAD_DIR.$data->catName.'.png';
        $success = file_put_contents($file, $imgData);
    }
    if($row !== NULL){
        if($success){
            $address = "assets/img/cate_icons/"."$data->catName".".png";
            $sql = "UPDATE `category` SET `name`='$data->catName',`tag`='$data->labelName',`union_name`='$data->unionName',image_address='$address' WHERE `name`='$data->cookieName'";
        } else {
        $sql = "UPDATE `category` SET `name`='$data->catName',`tag`='$data->labelName',`union_name`='$data->unionName' WHERE `name`='$data->cookieName'";
        }
    // echo "-2-".$sql;
    } else {
        if($success){
            $address = "assets/img/cate_icons/"."$data->catName".".png";
            $sql = "INSERT INTO `category` (`name`,`tag`,`union_name`,`image_address`) VALUES ('$data->catName','$data->labelName','$data->unionName','$address')";
        } else {
        $sql = "INSERT INTO `category` (`name`,`tag`,`union_name`) VALUES ('$data->catName','$data->labelName','$data->unionName')";
        }
    // echo "-3-".$sql;
    }
    $result = mysqli_query($conn,$sql);
    // var_dump($result);
    if($result){
        echo '1';
    }
?>