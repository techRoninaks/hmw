<?php
  require "init.php";//needed for connection with database

$link = $_POST['link'];
$disc = $_POST['disc'];
$adcon = $_POST['adcon'];
$base64_img = $_POST['img'];

$sql_query= "SELECT * FROM `ad_table` ORDER BY `id` DESC LIMIT 1";
$result1 = mysqli_query($con,$sql_query); 
$row=mysqli_fetch_array($result1);
$id = $row['id'];
echo $id;


$img =explode(",", $base64_img);
define('UPLOAD_DIR', '../../../assets/img/images/');
$img[1] = str_replace(' ', '+', $img[1]);
$data = base64_decode($img[1]);
$id=$id+1;
$file = UPLOAD_DIR.$id.'.png';
$success = file_put_contents($file, $data);

// echo $id;


$sql_query= "INSERT INTO `ad_table`(`link`,`discount`,`advertisment`,`image_back`)VALUES('$link','$disc','$adcon','assets/img/images/$id.png')";
$result1 = mysqli_query($con,$sql_query);
// echo $sql_query;
if($result1){
    echo "success";
}
else
    echo "failed";
?>

