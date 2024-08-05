<?php
include("./config.php");

// global response array
$response['code'] = '';
$response['msg'] = '';

//  add new question into table after creation of the table if not exists
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

// fetch all table data from DB and send response
if($_SERVER['REQUEST_METHOD'] === "GET"){
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

####################################### delete question #################################
if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_id'])){
    $delete_id = $_POST['delete_id'];

    $sql1 = "DELETE FROM `question bank` WHERE q_id = '$delete_id'";
    $qr1 = mysqli_query($conn, $sql1);

    if($qr1){
        $response['code'] = '11';
        $response['msg'] = 'Question Deleted';
        echo json_encode($response);
    }else{
        $response['code'] = '01';
        $response['code'] = 'Question Not Delete!';
        echo json_encode($response);
    }
}

?>