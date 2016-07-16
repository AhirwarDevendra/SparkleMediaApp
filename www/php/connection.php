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
            //echo 'success';
        }
        catch(PDOException $e){
            echo 'PDO Error is: '.$e->getMessage();
        }

?>