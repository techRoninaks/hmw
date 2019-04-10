<?php
    require "init.php";
    $success = "unsuccessful";
    $sql_query = "select u.userName,u.userId, t.* from users u join tasks t on u.userId = t.USER_ID order by DATE_MODIFIED DESC";
    $result = mysqli_query($conn, $sql_query);
    $response = array();
    $count = 0;
    while($row = mysqli_fetch_array($result)){
        $success = "successful";
        $response[$count++] = array("id"=>$row["ID"], "userId"=>$row["USER_ID"],"realUserId"=>$row["userId"],"userName"=>$row["userName"],"targetPros"=>$row["PROSPECT_TARGET"],"targetLeads"=>$row["LEADS_TARGET"],"startDate"=>$row["DATE_START"],"endDate"=>$row["DATE_END"],"modDate"=>$row["DATE_MODIFIED"],"ConvLeads"=>$row["CONVERSIONS_TARGET"]);
    }
    $result = array("success"=>$success, "result"=>$response);
    echo json_encode(array("data"=>$result));
?>