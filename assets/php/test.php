<?php

    $message = $_POST["message"];
    $number = $_POST["number"];
    $OTP = $_POST["OTP"];
$curl = curl_init();

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

curl_close($curl);

if ($err) {
  echo "0";
} else {
  echo $response;
//   header("Location: http://understandable-blin.hostingerapp.com/hmw-repo/index.html");
//   die();
}
?>