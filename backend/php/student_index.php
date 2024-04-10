<?php
include("./config.php");
include("./phpmailer.php");

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
if(isset($_REQUEST['optradio']) && $_REQUEST['optradio']){
    $stu_mail = $_REQUEST['optradio'];
    $stu_name = $_REQUEST['name'];
    
    // echo"<pre>";
    // print_r($_REQUEST);
    // die;

    if(strpbrk($stu_mail, "@")){

        $otp = getotp();

        if(sendMail($otp, $stu_name, $stu_mail)){
            // status code 100 mean mail send successful
            $response['status'] = 100;            
            $_SESSION['sendotp'] = $otp;
            
        }else{
            // status code 104 mean mail not send
            $response['status'] = 104;
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