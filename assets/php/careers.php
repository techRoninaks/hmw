<?php

require "init.php";
$curl = curl_init();


$name=$_POST['name'];
$address=$_POST['address'];
$primaryPhone = $_POST['primaryphone'];
$whatsappOne = $_POST['whatsapp'];
$email = $_POST['email'];
$secondaryPhone = $_POST['secondaryphone'];
$contacted = $_POST['contacted'];

$sql = "INSERT INTO `careers` (`name`,`address`,`primaryPhone`,`whatsappOne`,`email`,`secondaryPhone`,`contacted`) VALUES ('$name','$address','$primaryPhone','$whatsappOne','$email','$secondaryPhone','$contacted');";  

$result = mysqli_query($con,$sql);
if($result){
    echo "successful";
}
else{ 
    echo "unsuccessful";
    
}


?>