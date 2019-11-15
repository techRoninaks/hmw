<?php

require "init.php";
// $curl = curl_init();

$imagebitmap=$_POST['image_bitmap'];
$imagename=$_POST['image_name'];

$sql = "SELECT max(c.id) FROM careers c;";
$result = mysqli_query($con,$sql);
$row=mysqli_fetch_array($result);

if($imagename == ""){
    echo "null";
}
else{
    define('UPLOAD_DIR', 'assets/docs/resume/');
    // $img =explode(",", $imagebitmap);
    // $img[1] = str_replace(' ', '+', $img[1]);
    $data = base64_decode($imagebitmap);
    $file = UPLOAD_DIR.$imagename.$row[0].'.png';
    $success = file_put_contents($file, $data);
    echo "success";
}

?>