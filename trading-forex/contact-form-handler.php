<?php

$firstName = filter_var($_POST['first'], FILTER_SANITIZE_STRING);
$lastname = filter_var($_POST['last'], FILTER_SANITIZE_STRING);
$phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);
$info = filter_var($_POST['info'], FILTER_SANITIZE_STRING);





$referer = $_SERVER['HTTP_REFERER'];
$referer .= "?";
$sent = "sent=";
try {
    $message = "    First Name: $firstName
     Last Name: $lastname
     Email: $email
     Phone Number: $phone
     Other Information: $info";
    mail('support@tradingforexusa.com', 'TradingForexUSA', $message);
    $sent .='truecontact';
    // header('Location: $referer&$sent');
} catch (Exception $e) {
     $sent .='false';
}



