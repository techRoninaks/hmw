<?php
require "init.php";//needed for connection with database
    $action = $_POST["action"];
    $userId = $_POST["userid"];
    $postId = $_POST["postid"];
    // echo $action."\n".$userId."\n".$postId."\n";
    if($action == "add"){
        // echo "like++"; 
        $sql_query = "INSERT INTO `likes`(`userid`, `postid`) VALUES ( $userId , $postId )";
        $result = mysqli_query($con,$sql_query);
        // echo $sql_query;
    	if($result){
        	echo "1";
        }
    	else{
        	echo "0";
        }
    }
     else if($action == "delete"){
        // echo "like--"; 
        $sql_query = "DELETE FROM `likes` WHERE userid = $userId AND postid = $postId";
        $result = mysqli_query($con,$sql_query);
        if($result){
        	echo "2";
        }
    	else{
        	echo "0";
        }
    }
?>