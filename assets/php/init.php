<?php

    // header("Access-Control-Allow-Origin: *");    
    $db_name = "hmw";
    $username = "root";
    $password = "P@ssw0rd";
    $servername = "localhost";

    $con = mysqli_connect($servername,$username,$password,$db_name);
    $success = "Hello";
    
    if(!$con)
    {
        //  echo json_encode(array("response"=>"Cannot connect to database. ".mysqli_connect_error()));
    }
    else
    {
        // echo "success";
    }
?>
