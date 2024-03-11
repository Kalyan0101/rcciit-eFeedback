<?php
// echo '<pre>';
// print_r($_REQUEST);
// print_r($_FILES);
    if(isset($_REQUEST['submit'])){
        require('./PHPExcel/PHPExcel.php');
        require('./PHPExcel/PHPExcel/IOFactory.php');

        $file = $_FILES['file']['tmp_name'];
    }
?>