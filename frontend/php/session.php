<?php include("../../backend/php/config.php"); ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Session</title>
</head>

<body>
    <form action="#">
        <div class="year">
            <label for="">Choose Session:</label>
            <select name="" id="">
                <option value="0"></option>
            </select>
        </div>
        <div class="program">
            <label for="">Choose Course:</label>
            <select name="" id="">
                <option value=""></option>
                <?php
                $sql = "SELECT * FROM program_master";
                $qr = mysqli_query($conn, $sql) or die(mysqli_error($conn));
                // print_r($row);
                // die();
                while ($row = mysqli_fetch_array($qr)) {
                ?>
                    <option value="<?php echo $row['p_id'] ?>"><?php echo $row['p_name'] ?></option>
                <?php
                }
                ?>
            </select>
        </div>
        <div class="program">
            <label for="">Choose Semester:</label>
            <select name="" id="">
                <option value=""></option>
                <?php
                $sql = "SELECT p_sem FROM program_master";
                $qr = mysqli_query($conn, $sql) or die(mysqli_error($conn));
                // print_r($row);
                // die();
                while ($row = mysqli_fetch_array($qr)) {
                    $sem = $row['p_sem'];
                ?>
                    <option value="<?php echo $row['p_id'] ?>"><?php echo $row['p_sem'] ?></option>
                <?php
                }
                ?>
            </select>
        </div>
    </form>
</body>

</html>