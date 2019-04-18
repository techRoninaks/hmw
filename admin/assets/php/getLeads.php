<?php
    require "init.php";
    $id = $_POST["id"];
    $success = "unsuccessful";
    $sql_query = "select * from profile_table where employee_id=$id and isLead=1 order by id desc";
    $result = mysqli_query($conn, $sql_query);
    $response = array();
    $count = 0;
    while($row = mysqli_fetch_array($result)){
        $success = "successful";
        $response[$count++] = array("id"=>$row["id"], "name"=>$row["name"],"skills"=>$row["skils"],"contact"=>$row["phone"],"email"=>$row["email"],"isProspect"=>$row["isProspect"],"isActive"=>$row["isActive"]);
    }
    $result = array("success"=>$success, "result"=>$response);
    echo json_encode(array("data"=>$result));
?>