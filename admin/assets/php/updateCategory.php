<?php
	require "init.php";
	header("Content-Type: application/json; charset=UTF-8");
	
	$dataJSON = $_POST["jsonObj"];
    $data = json_decode($dataJSON);
    $sql = "SELECT * FROM `category` WHERE `name`='$data->cookieName'";
    $result1 = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result1);
    $linkData = 'profileList.html?cat_type=';
    // echo "-1-".$sql;var_dump($row);
    $success = "";
    if($data->image!=null || $data->image!= "" ){
        $path = "../../../assets/img/cate_icons/";
        $img = explode(",", $data->image);
        define('UPLOAD_DIR', $path);
        $img[1] = str_replace(' ', '+', $img[1]);
        $imgData = base64_decode($img[1]);
        $file = UPLOAD_DIR.$data->catName.'.png';
        $success = file_put_contents($file, $imgData);
        $address = "assets/img/cate_icons/"."$data->catName".".png";
    } else {
        $address = "assets/img/cate_icons/defaultCat.png";
    }
    if($row !== NULL){
        if($success){
            $sql = "UPDATE `category` SET `name`='$data->catName',`tag`='$data->labelName',`union_name`='$data->unionName',image_address='$address' WHERE `name`='$data->cookieName'";
        } else {
        $sql = "UPDATE `category` SET `name`='$data->catName',`tag`='$data->labelName',`union_name`='$data->unionName' WHERE `name`='$data->cookieName'";
        }
    // echo "-2-".$sql;
    } else {
        $sql = "INSERT INTO `category` (`name`,`tag`,`union_name`,`image_address`) VALUES ('$data->catName','$data->labelName','$data->unionName','$address')";
        $result = mysqli_query($conn,$sql);
        $sql2 = "SELECT id FROM category WHERE name='$data->catName' order by id DESC LIMIT 1";
        $result2 = mysqli_query($conn,$sql2);
        $row = mysqli_fetch_array($result2);
        $linkData = $linkData.$row[0];
        $sql3 = "UPDATE `category` SET `link`='$linkData' where `id`='$row[0]'";
        $result3 = mysqli_query($conn,$sql3);
    // echo "-3-".$sql3;
    
    }
    
    // var_dump($result);
    if($result){
        echo '1';
    }
?>