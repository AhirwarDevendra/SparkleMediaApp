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

        if (isset($_GET['getType']) && $_GET['getType'] == "GetEventList" )
        {
	    
            $query = "SELECT * FROM event_category";
            $res= $connection->prepare($query);
            $res->execute();
            $josndata=array();
            while($record =$res->fetch(PDO::FETCH_ASSOC)) {
                $josndata[]=$record;
            }
            $jsonDataEncoded= json_encode($josndata);
        }

        if (isset($_GET['getType']) && $_GET['getType'] == "GetVideos")
        {
            $EventID = $_GET['eventID'];
            
            $query = "SELECT * FROM video_content where category = '".$EventID."'";
            
            
            $res= $connection->prepare($query);
            $res->execute();
            $josndata=array();
            while($record =$res->fetch(PDO::FETCH_ASSOC)) {
                $josndata[]=$record;
            }
            $jsonDataEncoded= json_encode($josndata);
        }

        if (isset($_GET['getType']) && $_GET['getType'] == "GetImages")
        {
            $EventID = $_GET['eventID'];
            
            $query = "SELECT * FROM image_content where category ='".$EventID."'";
            $res= $connection->prepare($query);
            $res->execute();
            $josndata=array();
            while($record =$res->fetch(PDO::FETCH_ASSOC)) {
                $josndata[]=$record;
            }
            $jsonDataEncoded= json_encode($josndata);
        }
            
        header("Content-Type: application/json; charset=UTF-8");
        echo $jsonDataEncoded;
?>	