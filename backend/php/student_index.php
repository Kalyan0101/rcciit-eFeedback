<?php
include("./config.php");
include("./PHPMailer/mailcode.php");

// response JSON obbject
$response['status'] = 404;
$response['email'] = 'null';
$response['mobile'] = 'null';
$response['name'] = 'null';

if(isset($_REQUEST['roll']) && $_REQUEST['roll']){
    // print_r($_REQUEST['roll']);

    $roll = $_REQUEST['roll'];

    // check roll number exists or not
    $sql = "SELECT * FROM student WHERE s_roll = '$roll'";
    // $qr = mysqli_query($conn, $sql) or die(mysqli_error($conn));
    $qr = mysqli_query($conn, $sql) or die(mysqli_error($conn));

    $nor = mysqli_num_rows($qr);
    // print_r($nor);

    if($nor){
        // if roll number match then find email address
        $rows = mysqli_fetch_array($qr);
        $response['status'] = 200;
        $response['email'] = $rows["s_email"];
        $response['mobile'] = $rows["s_number"];
        $response['name'] = $rows["s_name"];
        
    }else{
        $response['status'] = 0;        
    }
}

// sending otp via selected mode (email)
if(isset($_REQUEST['optradio']) && $_REQUEST['optradio']){
    $mode = $_REQUEST['optradio'];
    $name = $_REQUEST['name'];
    
    $otp = getotp();
    if(sendmail($mode, $otp, $name)){
        $_SESSION['sendotp'] = $otp;
        echo $otp;
    }
}

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