<?php
    require "init.php";
    $success = "unsuccessful";
    $sql_query = "SELECT U.userName,T.* FROM tasks T JOIN users U ON T.USER_ID = U.userId ORDER BY `T`.`CONVERSIONS` DESC LIMIT 6 ;";
    $result = mysqli_query($conn, $sql_query);
    $response = array();
    $count = 0;
    while($row = mysqli_fetch_array($result)){
        $success = "successful";
        $response[$count++] = array("id"=>$row["ID"], "userId"=>$row["USER_ID"],"targetConversions"=>$row["CONVERSIONS_TARGET"] ,"conversions"=>$row["CONVERSIONS"], "userName"=>$row["userName"],"targetPros"=>$row["PROSPECT_TARGET"],"finalPros"=>$row["PROSPECT_FINAL"],"targetLeads"=>$row["LEADS_TARGET"],"finalLeads"=>$row["LEADS_FINAL"]);
    }
    $result = array("success"=>$success, "result"=>$response);
    echo json_encode(array("data"=>$result));
?>