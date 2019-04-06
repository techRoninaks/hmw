<?php 
    $dbname = "u694003942_test";
    $username = "u694003942_test";
    $password = "P@ssw0rd";
    $servername = "localhost";
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
       die("Connection failed: " . $conn->connect_error);
    }
?>
