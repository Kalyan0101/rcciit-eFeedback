<?php
    include("./config.php");

    // creating response array
    $response['code'] = '0';
    $response['msg'] = '';

    // data showing
    if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['session_data_call'])){

        $qr = mysqli_query($conn, 'SELECT 1 FROM `session master`');
        if($qr){
            // if table found with enties
            
            $sql3 = 'SELECT * FROM `session master`';
            $qr3 = mysqli_query($conn, $sql3);
            $noc = mysqli_fetch_all($qr3);
            if($noc){
                echo json_encode($noc);
            }else{
                // found table with 0 records \less chance/
                $response['code'] = '10';
                $response['msg'] = 'Empty Table';
                echo json_encode($response);
            }
            
        }else{
            // if table not created yet
            $response['code'] = '00';
            // $response['msg'] = 'Table Not Found';
            $response['msg'] = mysqli_error($conn);
            echo json_encode($response);
        }
    }

    //  this will provide initial data from database to start interaction trigger on first load
    if($_SERVER['REQUEST_METHOD'] === 'GET'){        
        $sql = "SELECT * FROM program_master";
        $qr = mysqli_query($conn, $sql) or die(mysqli_connect_error($qr));
        $noc = mysqli_fetch_all($qr);
        
        // print_r($noc);
        echo json_encode($noc);        
    }

    // this will take course data as input and fetch >>>sem duration<<< according input from database
    if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['course']) && !isset($_POST['sem']) )  {
        // print_r($_POST);
        $course = $_POST['course'];

        $sql = "SELECT p_sem FROM program_master WHERE p_name = '$course'";
        $qr = mysqli_query($conn, $sql) or die(mysqli_connect_errno($conn));
        $noc = mysqli_fetch_array($qr);
        // print_r($noc);

        echo json_encode($noc);
    }
    
    // if( $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['sem']) && $_POST['sem'] && isset($_POST['slot']) && $_POST['slot'] ){
    if( $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['sem']) && isset($_POST['slot'])){
        
        $year = $_POST['year']; // session year
        $course = $_POST['course']; // session course
        $sem = $_POST['sem'];   // session semester
        $slot = $_POST['slot']; // session slot
        $s_date = $_POST['s_date']; // session start date
        $e_date = $_POST['e_date']; // session end date
        $s_cre_date = $_POST['s_cre_date']; // session creation date

        $sql1 = "CREATE TABLE IF NOT EXISTS `e_feedback_rcciit`.`session master`(
            `s_id` VARCHAR(25) NOT NULL COMMENT 'session id',
            `s_desc` VARCHAR(50) NOT NULL COMMENT 'session description',
            `s_srt_date` VARCHAR(10) NOT NULL COMMENT 'session start date',
            `s_end_date` VARCHAR(10) NOT NULL COMMENT 'session end date',
            `s_cre_date` VARCHAR(25) NOT NULL COMMENT 'session creation date',
            PRIMARY KEY(`s_id`) 
            )";
        $qr1 = mysqli_query($conn, $sql1);
        // if table created
        if($qr1){           
            
            $format_course = join("", explode(" ",$course)); // remove white spaceses from the string

            $id = substr($year, 2, 2).$format_course.$sem.$slot;
            $desc_value = $year.'_'.$course.'_'.$sem.'_'.$slot;
            
            $sql2 = "INSERT INTO `session master`
            VALUES ('$id', '$desc_value', '$s_date', '$e_date', '$s_cre_date')";
            $qr2 = mysqli_query($conn, $sql2);
            
            // if insert query is not execute sucessfully
            if(!$qr2){
                $response['code'] = '02';
                $response['msg'] = mysqli_error($conn);
                echo json_encode($response);
            }else{
                $response['code'] = '12';            
                $response['msg'] = 'New Session Created';
                echo json_encode($response);
            }
        //  if table not created
        }else{
            $response['code'] = '01';
            $response['msg'] = mysqli_error($conn);
            echo json_encode($response);
        }
    }
        
?>