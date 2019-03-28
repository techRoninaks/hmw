<?php 
    $dbname = "u694003942_hmw";
    $username = "u694003942_hmw";
    $password = "P@ssw0rd";
    $servername = "localhost";
    // Create connection
    $con = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($con->connect_error) {
       die("Connection failed: " . $con->connect_error);
    } 
?>
