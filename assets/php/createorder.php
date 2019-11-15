<?php

require "init.php";
$amount = $_POST["amount"];
$user_id = $_POST["user_id"];
$receipt_id = "rcptid_".$user_id;
$ch = curl_init();
$curlConfig = array(
    CURLOPT_URL => "https://api.razorpay.com/v1/orders",
    CURLOPT_POST => true,
    CURLOPT_USERPWD => "rzp_test_uRgCs7LLpX03vQ:1qIXri4Z56SX4rrbM5LkZKJi",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POSTFIELDS => array(
        'amount' => $amount,
        'currency' => 'INR',
        'receipt' => "$receipt_id",
        'payment_capture' => '0'
    )
);
curl_setopt_array($ch, $curlConfig);
$result = curl_exec($ch);
curl_close($ch);
echo $result;


?>