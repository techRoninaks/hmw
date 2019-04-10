<?php
    require "init.php";
    $success = "unsuccessful";
    $srchKey = $_POST["searchKey"];
    $sql_query = "select * from profile_table where name LIKE '%$srchKey%' OR role LIKE '%$srchKey%' OR skils LIKE '%$srchKey%' OR profile_table.union LIKE '%$srchKey%' OR location LIKE '%$srchKey%' OR sublocation LIKE '%$srchKey%' order by doj desc;";
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