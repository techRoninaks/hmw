<?php
  $number = $_POST["number"];
  $pass = $_POST["password"];
  require "init.php";//needed for connection with database
  
  $sql_query = "UPDATE `profile_table` SET `password` = '$pass' WHERE phone = '$number' ";
  $result = mysqli_query($con, $sql_query);
  if($result){
    echo "1";
  }
  else{
      echo "0";
  }
  // echo ($sql_query);
?>