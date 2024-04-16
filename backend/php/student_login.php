<?php
include("./config.php");
include("./phpmailer.php");

// response JSON obbject
$response['status'] = 404;      // 404 mean student data not found
$response['email'] = 'null';
$response['mobile'] = 'null';
$response['name'] = 'null';

// for debugging purpose >>>>

// ob_start(); // starts output buffering
// print_r($_POST); 
// $content = ob_get_clean(); // gets the contents of the output buffer and then cleans it
// file_put_contents('request_log.txt', $content); // writes the content to a file named ‘request_log.txt’.

// <<<<

if(isset($_POST['roll']) && $_POST['roll']){
    // print_r($_POST['roll']);

    $roll = $_POST['roll'];

    // check roll number exists or not
    $sql = "SELECT * FROM student WHERE s_roll = '$roll'";
    $qr = mysqli_query($conn, $sql) or die(mysqli_error($conn));

    $nor = mysqli_num_rows($qr);
    // print_r($nor);

    if($nor){
        // if roll number match then find email address
        $rows = mysqli_fetch_array($qr);

        // status code 200 mean data found on database
        $response['status'] = 200;
        $response['email'] = $rows["s_email"];
        $response['mobile'] = $rows["s_number"];
        $response['name'] = $rows["s_name"];
        
    }else{
        $response['status'] = 0;        
    }
}


// sending otp via selected mode (email)
if(isset($_POST['otpMode']) && $_POST['otpMode']){
    $stu_mail = $_POST['otpMode'];
    $stu_name = $_POST['name'];

    if(strpbrk($stu_mail, "@")){

        $otp = getotp();

        // $result = sendMail($otp, $stu_name, $stu_mail);

        // if($result){
        if(1){
            // status code 100 mean mail send successful
            $response['status'] = 100;            
            $response['sendotp'] = $otp;

            // debuging purpose >>>>

            // ob_start(); // starts output buffering
            // print_r($_SESSION); 
            // print_r($_SESSION["sendotp"]); 
            // $content = ob_get_clean(); // gets the contents of the output buffer and then cleans it
            // file_put_contents('session_log.txt', $content); // writes the content to a file named ‘request_log.txt’.

            // <<<<
            
        }else{
            // status code 104 mean mail not send
            $response = ['status' => 104];
        }
    }

    // for sending otp vai mobile number
    if(!strpbrk($stu_mail, "@")){}
}

// function to generate otp
function getotp(){
    $code = '0123456789';
    $otp = '';
    for($i = 0; $i < 6; $i++){
        $index = rand(0, strlen($code)-1);
        $otp .= $code[$index];
    }
    return $otp;
}

echo json_encode($response);
?>