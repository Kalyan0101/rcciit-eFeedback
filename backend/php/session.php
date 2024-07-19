<?php
    include("./config.php");

    // print_r($_GET);

    //  this will provide initial data from database to start interaction trigger on first load
    if($_SERVER['REQUEST_METHOD'] === 'GET'){        
        $sql = "SELECT * FROM program_master";
        $qr = mysqli_query($conn, $sql) or die(mysqli_connect_error($qr));
        $noc = mysqli_fetch_all($qr, MYSQLI_NUM);
        
        // print_r($noc);
        echo json_encode($noc);        
    }

    // this will take course data as input and fetch >>sem duration<< according input from database
    if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['course']) && !isset($_POST['sem']) )  {
        // print_r($_POST);
        $course = $_POST['course'];

        $sql = "SELECT p_sem FROM program_master WHERE p_name = '$course'";
        $qr = mysqli_query($conn, $sql) or die(mysqli_connect_errno($conn));
        $noc = mysqli_fetch_array($qr, MYSQLI_NUM);
        // print_r($noc);

        echo json_encode($noc);
    }
    
    // if( $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['sem']) && $_POST['sem'] && isset($_POST['slot']) && $_POST['slot'] ){
    if( $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['sem']) && isset($_POST['slot'])){

        // creating response array
        $response['code'] = 0;
        $response['msg'] = '';
        
        $year = $_POST['year']; // session year
        $course = $_POST['course']; // session course
        $sem = $_POST['sem'];   // session semester
        $slot = $_POST['slot']; // session slot
        $s_date = $_POST['s_date']; // session start date
        $e_date = $_POST['e_date']; // session end date

        $sql1 = "CREATE TABLE IF NOT EXISTS `e_feedback_rcciit`.`session master`(
            `s_id` VARCHAR(25) NOT NULL COMMENT 'session id',
            `s_desc` VARCHAR(50) NOT NULL COMMENT 'session description',
            `s_srt_date` VARCHAR(10) NOT NULL COMMENT 'session start date',
            `s_end_date` VARCHAR(10) NOT NULL COMMENT 'session end date',
            PRIMARY KEY(`s_id`) 
            )";
        $qr1 = mysqli_query($conn, $sql1);
        
        $id = $course.$sem.$slot;
        $desc_value = $year.'_'.$course.'_'.$sem.'_'.$slot;

        $sql2 = "INSERT INTO `session master` 
        VALUES ('$id', '$desc_value', '$s_date', '$e_date')";
        $qr2 = mysqli_query($conn, $sql2);

        // if insert query was not executed sucessfully
        if(!$qr2){
            $response['msg'] = 'Duplicate Entry';
            echo json_encode($response);
        }else{
            $response['code'] = 1;            
            $response['msg'] = 'New Session Created';
            echo json_encode($response);
        }
    }
        
?>