<?php

    $message = $_POST["message"];
    $number = $_POST["number"];
    $OTP = $_POST["OTP"];
	 require "init.php";
	$curl = curl_init();
	$sql_query = "SELECT phone,isActive,id FROM profile_table WHERE phone = $number ";
	$result = mysqli_query($con, $sql_query);
	$fetchNumber = 0;
	$fetchIsActive = 9;
	$fetchUserId = 0;
	if($result){
		$row=mysqli_fetch_assoc($result);
		$fetchNumber = $row["phone"];
		$fetchIsActive = $row["isActive"];
		$fetchUserId = $row["id"];
	// echo $fetchNumber.$fetchIsActive;
	}
if($fetchNumber !=0 && $fetchIsActive == 1){
curl_setopt_array($curl, array(
  CURLOPT_URL => "http://control.msg91.com/api/sendotp.php?otp_length=6&authkey=269790ALl2GMM95c9cc510&message=$message&sender=HelloMyWork&mobile=$number&otp=$OTP",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "",
  CURLOPT_SSL_VERIFYHOST => 0,
  CURLOPT_SSL_VERIFYPEER => 0,
));

$response = curl_exec($curl);
$err = curl_error($curl);
}
curl_close($curl);

if($fetchNumber == 0 || $fetchIsActive == 0){
	echo "0";
}

if ($err) {
  echo "0";
} else {
  echo $response;
//   header("Location: http://understandable-blin.hostingerapp.com/hmw-repo/index.html");
//   die();
}
?>