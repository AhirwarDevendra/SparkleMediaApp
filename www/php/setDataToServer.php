<?php

    include 'connection.php';
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    date_default_timezone_set("Asia/Kolkata");


    /*if($_POST['AMDflag'] == "0")
    {*/
        $sql = "INSERT INTO `visitor_feedback`(`feedback_name`, `feedback_email`, `feedback_mobile`,`feedback_message`,`feedback_location`, `feedback_time`) VALUES (:userName,:userEmail,:userMobile,:userMessage,:userLoc,:userTime))";

        $stmt = $connection->prepare($sql);

        $name = $_POST['feedbackName'];
        $email = $_POST['feedbackEmail'];
        $mobile = $_POST['feedbackMobile'];
        $message = $_POST['feedbackMessage'];
        $location = $_POST['feedbackLocation'];
        $dataTime = date("l jS \of F Y h:i:s A");



        $stmt->bindParam(':userName', $name, PDO::PARAM_STR); 
        $stmt->bindParam(':userEmail', $email, PDO::PARAM_STR);
        $stmt->bindParam(':userMobile', $mobile PDO::PARAM_STR);
        $stmt->bindParam(':userMessage', $message, PDO::PARAM_STR);
        $stmt->bindParam(':userLoc', $location, PDO::PARAM_STR);
        $stmt->bindParam(':userTIme', $dataTime, PDO::PARAM_STR);

        $stmt->execute(); 
        if($stmt){
            echo 'success';
        }
        else{
            echo 'failed';
        }
    /*}
    if($_POST['AMDflag'] == "1")
    {
        $sql = "INSERT INTO `request_event`(`requester_name`, `requester_mobileno`, `requester_email`, `requester_message`,`requester_event`,`requester_location`, `requester_time`) VALUES (:userName,:userMobile,:userEmail,:userMessage,:userEvent,:userLoc,:userTime))";

        $stmt = $connection->prepare($sql);

        $name = $_POST['requesterName'];
        $email = $_POST['requesterEmail'];
        $mobile = $_POST['requesterMobile'];
        $message = $_POST['requesterMessage'];
        $event = $_POST['requestEvent'];
        $location = $_POST['requesterLocation'];
        $dataTime = $_POST['requesterDateTime'];
        


        $stmt->bindParam(':userName', $name, PDO::PARAM_STR); 
        $stmt->bindParam(':userEmail', $email, PDO::PARAM_STR);
        $stmt->bindParam(':userMobile', $mobile PDO::PARAM_STR);
        $stmt->bindParam(':userMessage', $message, PDO::PARAM_STR);
        $stmt->bindParam(':userEvent', $event PDO::PARAM_STR);
        $stmt->bindParam(':userLoc', $location, PDO::PARAM_STR);
        $stmt->bindParam(':userTIme', $dataTime, PDO::PARAM_STR);

        $stmt->execute(); 
        if($stmt){
            echo 'success';
        }
        else{
            echo 'failed';
        }
    }*/
    
?>	