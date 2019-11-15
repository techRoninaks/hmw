<?php
    require 'init.php';
    header("Content-Type: application/json; charset=UTF-8");
	
	$id = $_POST["id"];
	$base64_img = $_POST["img"];
	$adcon = $_POST["adcon"];
	$link = $_POST["link"];
	$disc = $_POST["disc"];
  
    if($base64_img == ""){

    }
    else{
        $img =explode(",", $base64_img);
        define('UPLOAD_DIR', '../../../assets/img/images/');
        $img[1] = str_replace(' ', '+', $img[1]);
        $data = base64_decode($img[1]);
        $file = UPLOAD_DIR.$id.'.png';
        $success = file_put_contents($file, $data);
    }


    $sql = "UPDATE `ad_table` SET `link`='$link',`discount`='$disc',`advertisment`='$adcon' WHERE id = $id";
    // echo $sql;
    $result = mysqli_query($conn,$sql);
    if($result){
        echo "1";
    }
    else{
        echo "0";
    }
?>