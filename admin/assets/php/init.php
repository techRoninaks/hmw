<?php

    // header("Access-Control-Allow-Origin: *");    
    $db_name = "u694003942_hmw";
    $username = "u694003942_hmw";
    $password = "P@ssw0rd";
    $servername = "localhost";

    $con = new mysqli($servername, $username, $password, $db_name);
    $conn = $con;
    // Check connection		
    if ($con->connect_error) {
       die("Connection failed: " . $con->connect_error);
    }
?>
