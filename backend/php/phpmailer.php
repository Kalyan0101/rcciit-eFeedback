<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require './composer/vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
function sendMail($otp, $stu_name, $stu_mail){

    $mail = new PHPMailer(true);

    try {
        //Server settings
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'naskarkalyan1999@gmail.com';                     //SMTP username
        $mail->Password   = 'ycyheeqpqwifzepp';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom('naskarkalyan1999@gmail.com', 'RCCIIT e-Feedback');
        $mail->addAddress($stu_mail, $stu_name);     //Add a recipient

        //Attachments
        // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
        // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'e-Feedback OTP';
        $mail->Body    = 'Hello '.$stu_name.'<br> Your OTP for e_Feedback<br><b><span style="color: green; font-size: large;">'.$otp.'<Span></b>';

        $mail->send();
    } catch (Exception $e) {
        // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";  // this line of code is preventing return to send data properly ***must not be uncomment***
        return 0;
    }
    return 1;
}
?>