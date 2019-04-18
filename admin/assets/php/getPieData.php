<?php
    require "init.php";
    $success = "unsuccessful";
    $id = $_POST["userId"];
    $sql_query = "select u.userName,u.userId, t.* from users u join tasks t on u.userId = t.USER_ID where u.userId=$id AND WEEK(NOW()) <= WEEK(t.DATE_END) order by t.DATE_END";

    $result = mysqli_query($conn, $sql_query);
    $response = array();
    $count = 0;
    while($row = mysqli_fetch_array($result)){
        $success = "successful";
        $response[$count++] = array("targetPros"=>$row["PROSPECT_TARGET"],"targetLeads"=>$row["LEADS_TARGET"],"targetConversions"=>$row["CONVERSIONS_TARGET"],"finalPros"=>$row["PROSPECT_FINAL"],"finalLeads"=>$row["LEADS_FINAL"],"conversions"=>$row["CONVERSIONS"],"notes"=>$row["NOTES"]);
    }
    $result = array("success"=>$success, "result"=>$response);
    echo json_encode(array("data"=>$result));
?>