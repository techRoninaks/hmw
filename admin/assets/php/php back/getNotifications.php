<?php
    require "init.php";
    $success = "unsuccessful";
    $sql_query = "select * from notifications order by last_modified DESC;";
    $result = mysqli_query($conn, $sql_query);
    $response = array();
    $count = 0;
    while($row = mysqli_fetch_array($result)){
        $success = "successful";
        $response[$count++] = array("id"=>$row["id"], "headline"=>$row["headline"], "content"=>$row["content"], "modDate"=>$row["last_modified"]);
    }
    $result = array("success"=>$success, "result"=>$response);
    echo json_encode(array("data"=>$result));
?>