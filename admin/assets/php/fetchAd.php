<?php
    require 'init.php';
    header("Content-Type: application/json; charset=UTF-8");
	
	$id = $_POST["id"];
    $sql_query =  "SELECT * FROM `ad_table` WHERE id = $id"; 
    $response = array();
    $data = array();
    $success = "unsuccessful";
    $count = 0;
    $result = mysqli_query($con,$sql_query);
    while($row=mysqli_fetch_array($result)){
        //  echo  nl2br($row[0] .":". $row[1].":".$row[2].":".$row[3].":".$row[4]."\n");//returning results   ,"image_address"=>$row[2],"link"=>$row[3], "frequency"=>$row[4]
        $success = "successful";
        $count = $count + 1;
        if($count > 6){
            break;
        }
        $response[0] = array("response"=>$success);  
        $response[$count] = array("ad_id"=>$row[0],"ad_image"=>$row[1],"ad_link"=>$row[2],"ad_discount"=>$row[3],"ad_data"=>$row[4]);
    }
    echo json_encode($response);
?>