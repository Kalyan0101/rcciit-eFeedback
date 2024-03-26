<?php
require './phpspreadsheet/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

if(isset($_REQUEST['btn'])){
    // echo "<pre>";
    // print_r($_FILES['file']);
    
    // die;
    $fileName = $_FILES['file']['name'];
    $check = explode(".", $fileName);
    $fileExt = end($check);

    if($fileExt == "xlsx"){
        $inputFileName = $_FILES['file']['tmp_name'];
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);
        $data = $spreadsheet->getActiveSheet()->toArray();

        foreach ($data as $row) {
            $name = $row[0];
            $roll = $row[1];
            $year = $row[2];
        }
    }



}








die;




$writer = new Xlsx($spreadsheet);
$writer->save('hello world.xlsx');
?>