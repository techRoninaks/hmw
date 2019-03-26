<?
    require 'init.php';
    header("Content-Type: application/json; charset=UTF-8");
	
	$dataJSON = $_POST["jsonObj"];
    $data = json_decode($dataJSON);
    
    $sql = "SELECT `name` FROM `profile_table` WHERE (`password`= $data->userPassword) AND (`phone` =$data->userPhone)";
    $result = mysqli_query($con,$sql);
    $row = mysqli_fetch_array($result);
	if($row){
        $userName = array("userName"=>$row["name"]);
        $jsonData = json_encode($userName);
        echo $jsonData;
	} else {
	    echo "0";
	}
?>