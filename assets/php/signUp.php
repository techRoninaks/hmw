<?php
	require "init.php";
	header("Content-Type: application/json;");
	
    $dataJSON = $_POST["jsonObj"];
    $data = json_decode($dataJSON);
    if($data->userType == 'premium'){
        $sql = "INSERT INTO `profile_table` (`name`,`phone`) VALUES ('$data->newName','$data->newPhone');";  
    } else {
        $sql = "INSERT INTO `profile_table` (`name`,`phone`,`password`) VALUES ('$data->newName','$data->newPhone','$data->newPassword');";  
    }
    $emid = $data->emId;
    
    if($emid == "null" ){
        $result = mysqli_query($con,$sql);
        if($result){
            $sql = "SELECT id from profile_table WHERE phone  = '$data->newPhone';";
            $result = mysqli_query($con,$sql);
            if($result){
                $row  = mysqli_fetch_assoc($result);
                echo "1~".$row["id"];
            }
        }
    }
    else{
        $result = mysqli_query($con,$sql);
        if($result){
            $sql = "SELECT id from profile_table WHERE phone  = '$data->newPhone';";
            $result = mysqli_query($con,$sql);
            if($result){
                $row  = mysqli_fetch_assoc($result);
                echo "1~".$row["id"];
                $userid = $row["id"];
                $sql_query = "SELECT u.userName,u.userId,t.* from users u join tasks t on u.userId = t.USER_ID where WEEK(NOW()) <= WEEK(t.DATE_END) AND t.USER_ID = $emid order by DATE_MODIFIED";
                $result = mysqli_query($con,$sql_query);
                // echo $sql_query;
                $row = mysqli_fetch_assoc($result);
                $leads = $row["LEADS_FINAL"];
                $leads ++;
                $sql_query = "UPDATE `tasks` as t SET `LEADS_FINAL`= $leads where WEEK(NOW()) <= WEEK(t.DATE_END) AND t.USER_ID = $emid ";
                $result = mysqli_query($con,$sql_query);
                $sql_query = "UPDATE `profile_table` SET `employee_id`= $emid WHERE id = $userid  ";
                // echo $sql_query;
                $result = mysqli_query($con,$sql_query);
            }
        // }
    }
}

?>