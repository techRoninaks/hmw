<?php

    // header("Access-Control-Allow-Origin: *");    
    $db_name = "hmw";
    $username = "root";
    $password = "";
    $servername = "localhost";
    // $db_name = "hmw";
    // $username = "root";
    // $password = "";
    // $servername = "localhost";

    $con = new mysqli($servername, $username, $password, $db_name);
    $conn = $con;
    // Check connection		
    if ($con->connect_error) {
       die("Connection failed: " . $con->connect_error);
    }
?>
