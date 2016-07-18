<?php

        header("Access-Control-Allow-Origin: *");
    
        $PDOservername = "localhost";
        $PDOusername = "dreamwood";
        $PDOpassword = "Admin123!@#";
        $PDOdatabase = "ritaharia_db_app";
        $connection = "";
        try{
            $connection = new PDO("mysql:host=$PDOservername;dbname=$PDOdatabase",$PDOusername,$PDOpassword);
            $connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION); 
            
            
                
                $name = $_POST['requesterName'];
                $email = $_POST['requesterEmail'];
                $mobile =$_POST['requesterMobile'];
                $message =$_POST['requesterMessage'];
                $event =$_POST['requestEvent'];
                $location =$_POST['requesterLocation'];
                $dataTime = date("l jS \of F Y h:i:s A");
                
                $sql = "INSERT INTO `request_event`(`requester_name`, `requester_mobileno`, `requester_email`, `requester_message`,`requester_event`,`requester_location`, `requester_time`) VALUES ('$name','$mobile','$email','$message','$event','$location','$dataTime')";

                $stmt = $connection->prepare($sql);

                $stmt->execute(); 
                if($stmt){
                    echo $_POST['requesterName'];
                    echo "INsode";
                    echo 'success';
                }
                else{
                    echo 'failed';
                }
            
        }
        catch(PDOException $e){
            echo 'PDO Error is: '.$e->getMessage();
        }

    
?>	