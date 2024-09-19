<?php
include("./config.php");

// global response array
$response['code'] = '';
$response['msg'] = '';

//  insert new question into table after creation the table if not exists
if ($_SERVER['REQUEST_METHOD'] === "POST" && isset($_POST['question'])) {

    $question = $_POST['question'];

    //  creating question bank table
    $sql1 = "CREATE TABLE IF NOT EXISTS `e_feedback_rcciit`.`question bank`(
        `q_id` INT(5) NOT NULL AUTO_INCREMENT COMMENT 'question id',
        `q_desc` LONGTEXT NOT NULL COMMENT 'question',
        PRIMARY KEY(`q_id`))";    
    $qr1 = mysqli_query($conn, $sql1);

    if ($qr1) {
        // insert question into DB
        $sql2 = "INSERT INTO `question bank` (`q_desc`) VALUES('$question')";
        $qr2 = mysqli_query($conn, $sql2);
        if ($qr2) {
            $response['code'] = '12';
            $response['msg'] = 'Data Inserted.';
            echo json_encode($response);

        } else {
            $response['code'] = '02';
            $response['msg'] = 'Data not inserted!';
            echo json_encode($response);
        }
    } else {
        $response['code'] = '01';
        $response['msg'] = 'Table not Created!';
        echo json_encode($response);
    }
}

//  creating session table
if($_SERVER['REQUEST_METHOD'] === "POST" && isset($_POST['id'])){

    $id = $_POST['id'];
    $name = 'session_'.$id;

    $sql4 = "CREATE TABLE IF NOT EXISTS `e_feedback_rcciit`.`$name`(
        `s_id` INT(5) NOT NULL AUTO_INCREMENT COMMENT 'session id',
        `roll` VARCHAR(15) NOT NULL COMMENT 'student roll',
        `sub_code` VARCHAR(15) NOT NULL COMMENT 'subject code',
        `sub_name` VARCHAR(20) NOT NULL COMMENT 'subject name',
        `t_id` VARCHAR(15) NOT NULL COMMENT 'teacher id',
        `t_name` VARCHAR(20) NOT NULL COMMENT 'teacher name',
        PRIMARY KEY(`s_id`)
    )";
    $qr4 = mysqli_query($conn, $sql4);
    if($qr4){
        $response['code'] = '14';
        $response['msg'] = 'Session table is ready for taking inputs.';
        echo json_encode($response);
    }else{
        $response['code'] = '04';
        $response['msg'] = 'Table not created!';
        echo json_encode($response);
    }
}

// creating questions set
if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['q_set_name'])){


    $sql1 = "CREATE TABLE IF NOT EXISTS `e_feedback_rcciit`.`question set` (
        `q_s_id` INT NOT NULL AUTO_INCREMENT COMMENT 'question set id',
        `q_name` VARCHAR(15) NOT NULL COMMENT 'question set name',
        `question_id` VARCHAR(150) NOT NULL COMMENT 'questions id',
        PRIMARY KEY(`q_s_id`))";
    $qr1 = mysqli_query($conn, $sql1);

    if($qr1){       
        
        $s_name = $_POST['q_set_name'];
        $q_list = $_POST['q_list'];

        $sql2 = "INSERT INTO `e_feedback_rcciit`.`question set` (`q_name`, `question_id`)
        values('$s_name', '$q_list')";
        $qr2 = mysqli_query($conn, $sql2);

        if($qr2){

            $response['code'] = '12';
            $response['msg'] = 'Question set Created.';

        }else{
            $response['code'] = '02';
            $response['msg'] = 'Error! Data Not Inserted';
        }

    }else{
        $response['code'] = '01';
        $response['msg'] = 'Error! Table not Created';
    }
    echo json_encode($response);
}

####################################### delete question #################################
if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_id'])){
    $delete_id = $_POST['delete_id'];

    $sql1 = "DELETE FROM `question set` WHERE q_s_id = '$delete_id'";
    $qr1 = mysqli_query($conn, $sql1);

    if($qr1){
        $response['code'] = '11';
        $response['msg'] = 'Question Deleted';
    }else{
        $response['code'] = '01';
        $response['code'] = 'Question Not Delete!';
    }
    echo json_encode($response);
}

####################################### show data #################################

// fetch all question data from DB and send response
if($_SERVER['REQUEST_METHOD'] === "GET" && isset($_GET['qns']) ){
    $sql3 = "SELECT * FROM `question bank`";
    $qr3 = mysqli_query($conn, $sql3);

    if($qr3){
        $data = mysqli_fetch_all($qr3);
        echo json_encode($data);

    }else{
        $response['code'] = '03';
        $response['msg'] = 'Table Empty';
        echo json_encode($response);
    }
}

// fetch all question set data from DB and send response
if($_SERVER['REQUEST_METHOD'] === "GET" && isset($_GET['questionSet'])){

    $sql1 = "SELECT * FROM `question set`";
    $qr1 = mysqli_query($conn, $sql1);

    if($qr1){
        $data = mysqli_fetch_all($qr1);
        echo json_encode($data);

    }else{
        $response['code'] = '01';
        $response['msg'] = 'Table Empty';
        echo json_encode($response);
    }
}


?>