<?php
include("config.php");

// response array
$response['status'] = 0;
$response['email'] = '';

if(isset($_REQUEST['roll']) && $_REQUEST['roll']){
    // print_r($_REQUEST['roll']);

    $roll = $_REQUEST['roll'];

    // check roll number exists or not
    $sql = "SELECT * FROM student WHERE s_roll = '$roll'";
    // $qr = mysqli_query($conn, $sql) or die(mysqli_error($conn));
    $qr = mysqli_query($conn, $sql) or die(mysqli_error($conn));

    $nor = mysqli_num_rows($qr);
    print_r($nor);

    if($nor){
        // if roll number match then find email address
        $rows = mysqli_fetch_array($qr);
        $response['status'] = 1000;
        $response['email'] = $rows['s_email'];

    }else{
        $response['status'] = 0;
    }
}
echo json_encode($response);
?>