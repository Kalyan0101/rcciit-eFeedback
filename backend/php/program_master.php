<?php
include("./config.php");

$pro_name = $_POST['name'];
$no_sem = $_POST['no_sem'];

// echo "<pre>";
// print_r($_POST);
// echo $_POST['name'];

// die;
// check request is empty or not
if($_POST['name'] && $_POST['no_sem']){

    // check program name already used or not
    $sql = "SELECT p_id FROM e_feedback_rcciit.program_master WHERE p_name = '$pro_name';";
    $qr = mysqli_query($conn, $sql) or die(mysqli_error($qr));
    $noc = mysqli_num_rows($qr);
    if(!$noc){
        // insert new record
        $sql1 = "INSERT INTO e_feedback_rcciit.program_master (p_name, p_sem)
        VALUES ('$pro_name', '$no_sem');";
        $qr1 = mysqli_query($conn, $sql1) or die(mysqli_error($qr1));
        echo "data Inserted";
    }else{
        echo "Name already in used";
    }
}else{
    echo "Data not found";
}

// close the database connection
mysqli_close($conn);
?>