<?php
    require "init.php";
    $success = "unsuccessful";
    $sql_query = "select * from profile_table where isActive = 1 order by id desc;";
    $result = mysqli_query($conn, $sql_query);
    $response = array();
    $count = 0;
    while($row = mysqli_fetch_array($result)){
        $success = "successful";
        $response[$count++] = array("id"=>$row["id"], "name"=>$row["name"],"role"=>$row["role"],"union"=>$row["union"],"location"=>$row["location"],"phone"=>$row["phone"],"skills"=>$row["skils"],"doj"=>$row["doj"],"premium"=>$row["premium"]);
    }
    $result = array("success"=>$success, "result"=>$response);
    echo json_encode(array("data"=>$result));
?>
