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
    if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['course']) && $_POST['course'] ){
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
        $response['status'] = 0;
        
        $year = $_POST['year'];
        $year = $_POST['sem'];
        $year = $_POST['slot'];
        $year = $_POST['s_date'];
        $year = $_POST['e_date'];

        $sql1 = "CREATE TABLE IF NOT EXISTS `e_feedback_rcciit`.`session master`(
            `s_id` VARCHAR(5) NOT NULL COMMENT 'session id',
            `desc` VARCHAR(50) NOT NULL COMMENT 'session description',
            PRIMARY KEY(`s_id`) 
            )";
        $qr1 = mysqli_query($conn, $sql1);
        
        if(!$qr1){
            echo json_encode($response);
            // die(mysqli_connect_error($conn));
        }
    }
        
?>