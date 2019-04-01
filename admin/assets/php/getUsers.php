<?php
    require "init.php";
    $success = "unsuccessful";
    $sql_query = "select * from users;";
    $result = mysqli_query($conn, $sql_query);
    $response = array();
    $count = 0;
    while($row = mysqli_fetch_array($result)){
        $success = "successful";
        $response[$count++] = array("id"=>$row[0], "name"=>$row[1], "pass"=>$row[2], "first"=>$row[3], "last"=>$row[4], "type"=>$row[5]);
    }
    $result = array("success"=>$success, "result"=>$response);
    echo json_encode(array("data"=>$result));
?>