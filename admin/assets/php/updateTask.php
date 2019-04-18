<?php
	require "init.php";
	header("Content-Type: application/json; charset=UTF-8");
	
	$dataJSON = $_POST["jsonObj"];
    $data = json_decode($dataJSON);
    $flag = 0;
    $sql = "select u.userName, t.* from users u join tasks t on u.userId=t.USER_ID where u.userId='$data->cookieUserId'";
    $row2 = array();
    $result = '';
    $result1 = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result1);
    
    // echo "-1-".$sql;
    if($row !== NULL){
        $ID = $row['ID'];
        $sql = "UPDATE tasks SET PROSPECT_TARGET='$data->targetPros',LEADS_TARGET='$data->targetLeads',DATE_START='$data->startDate',DATE_END='$data->endDate',NOTES='$data->notes',CONVERSIONS_TARGET='$data->ConvLeads' WHERE ID='$ID'";
        $result = mysqli_query($conn,$sql);

    // echo "-2-".$sql;
    } else {
        $sql_validate = "SELECT t.ID FROM users u, tasks t where t.DATE_END>='$data->endDate' AND t.USER_ID=u.userId AND u.userId='$data->mainUserId'";
        $result2 = mysqli_query($conn,$sql_validate);
        $row2 = mysqli_fetch_array($result2);

        if($row2 == NULL){
            $sql = "INSERT INTO tasks (`USER_ID`,`PROSPECT_TARGET`,`LEADS_TARGET`,`DATE_START`,`DATE_END`,`CONVERSIONS_TARGET`,`NOTES`) VALUES ('$data->mainUserId','$data->targetPros','$data->targetLeads','$data->startDate','$data->endDate','$data->ConvLeads','$data->notes')";
            $result = mysqli_query($conn,$sql);
        } else {
            $result = false;
            $flag = 1;
        }
    }
    if($result && $flag == 0){
        echo '1';
    } else {
        echo '-'.$row2[0];
    }
?>