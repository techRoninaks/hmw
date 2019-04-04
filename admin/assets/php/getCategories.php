<?php
    require "init.php";
    $success = "unsuccessful";
    $sql_query = "select * from category order by id;";
    $result = mysqli_query($conn, $sql_query);
    $response = array();
    $count = 0;
    while($row = mysqli_fetch_array($result)){
        $success = "successful";
        $response[$count++] = array("id"=>$row[0], "name"=>$row[1], "image"=>$row[2], "tags"=>$row[6], "union"=>$row[7]);
    }
    $result = array("success"=>$success, "result"=>$response);
    echo json_encode(array("data"=>$result));
?>