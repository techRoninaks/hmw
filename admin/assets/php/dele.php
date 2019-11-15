<?php
    require 'init.php';
	
	$id = $_POST["id"];
    $sql = "DELETE FROM `ad_table` WHERE `id`=$id";
    $result = mysqli_query($conn,$sql);
    // echo $sql;
    if($result){
        echo "1";
    }
    else{
        echo "0";
    }
?>