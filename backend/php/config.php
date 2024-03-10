<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$database = "e_feedback_rcciit";
$conn = mysqli_connect($servername, $username, $password, $database);

if(!$conn){
    die("Connection Failed" . mysqli_connect_error());
}


?>