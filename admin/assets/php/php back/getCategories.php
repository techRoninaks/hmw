<?php
    require "init.php";
    $success = "unsuccessful";
    $sql_query = "select * from category order by id;";
    $result = mysqli_query($conn, $sql_query);
    $response = array();
    $count = 0;
    while($row = mysqli_fetch_array($result)){
        $success = "successful";
        if(strpos($row["tag"],"_")!==false){
            $row["tag"] = str_replace("_"," ",$row["tag"]);
        }
        $response[$count++] = array("id"=>$row["id"], "name"=>$row["name"], "image"=>$row["image_address"], "tags"=>$row["tag"], "union"=>$row["union_name"]);
    }
    $result = array("success"=>$success, "result"=>$response);
    echo json_encode(array("data"=>$result));
?>