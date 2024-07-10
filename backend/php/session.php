<?php
    include("./config.php");

    // print_r($_GET);

    if($_SERVER['REQUEST_METHOD'] === 'GET'){

        
        $sql = "SELECT * FROM program_master";
        $qr = mysqli_query($conn, $sql) or die(mysqli_connect_error($qr));
        $noc = mysqli_fetch_all($qr, MYSQLI_NUM);
        
        // print_r($noc);
        echo json_encode($noc);
        
    }

    if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['course'])){
        // print_r($_POST);
        $course = $_POST['course'];

        $sql = "SELECT p_sem FROM program_master WHERE p_name = '$course'";
        $qr = mysqli_query($conn, $sql) or die(mysqli_connect_errno($conn));
        $noc = mysqli_fetch_array($qr, MYSQLI_NUM);
        // print_r($noc);

        echo json_encode($noc);
    }
        
        
?>