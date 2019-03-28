<?php 
    $dbname = "hmw";
    $username = "root";
    $password = "root";
    $servername = "localhost";
    // Create connection
    $con = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($con->connect_error) {
       die("Connection failed: " . $con->connect_error);
    }
?>
