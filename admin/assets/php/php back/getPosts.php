<?php
    require "init.php";
    $success = "unsuccessful";
    $sql_query = "select p.des, c.*, u.name from profile_table u, comments c, posts_table p where p.id = c.p_id and u.id = c.u_id and c.IsReported='1'";
    $result = mysqli_query($conn, $sql_query);
    $response = array();
    $count = 0;
    while($row = mysqli_fetch_array($result)){
        $success = "successful";
        $response[$count++] = array("id"=>$row["id"],"post"=>$row["des"],"comment"=>$row["comment"],"user"=>$row["name"],"comDate"=>$row["date"]);
    }
    $result = array("success"=>$success, "result"=>$response);
    echo json_encode(array("data"=>$result));
?>