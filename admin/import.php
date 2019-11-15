<?php
require "assets/php/init.php";

if (isset($_POST["import"])) {
    
    $fileName = $_FILES["file"]["tmp_name"];
    
    if ($_FILES["file"]["size"] > 0) {
        
        $file = fopen($fileName, "r");
    	$filename =  "UnsavedImports".date("Y-m-d") . ".csv";
        $success = "success";
        $now = gmdate("D, d M Y H:i:s");
        header("Expires: Tue, 03 Jul 2001 06:00:00 GMT");
        header("Cache-Control: max-age=0, no-cache, must-revalidate, proxy-revalidate");
        header("Last-Modified: {$now} GMT");
    
        // force download  
        header("Content-Type: application/force-download");
        header("Content-Type: application/octet-stream");
        header("Content-Type: application/download");
    
        // disposition / encoding on response body
        header("Content-Disposition: attachment;filename={$filename}");
        header("Content-Transfer-Encoding: binary");
    
        
        ob_start();
        $df = fopen("php://output", 'w');
        while (($column = fgetcsv($file, 10000, ",")) !== FALSE) {
            $sqlInsert = "INSERT into profile_table
            (name, role, sublocation, whatapp, location, skils, profile_table.union, website, phone, email, address, category, country, state, pincode, type, phone2, isActive, doj, employee_id)
                   values (\"$column[0]\",'$column[1]','$column[3]','$column[6]','$column[2]','$column[16]','$column[15]','$column[12]','$column[5]','$column[8]',\"$column[4]\",'$column[14]','$column[10]','$column[9]','$column[11]','$column[13]','$column[7]',-1, '$column[17]', '$column[18]')";
            $result = mysqli_query($conn, $sqlInsert);
            //echo   $sqlInsert;  
            if (! empty($result)) {

            } else {
            	// $rowCSV = $column[0].$column[1].$column[3].$column[6].$column[2].$column[16].$column[15].$column[12].$column[5].$column[8].$column[4].$column[14].$column[10].$column[9].$column[11].$column[13].$column[7].$column[17].$column[18]. PHP_EOL;
                $success = "failed";
            	// echo $sqlInsert."~~~~~";
            	fputcsv($df, $column);
            }
        }
    	fclose($df);
        
        $sql_sub_query = "update profile_table pt set pt.link=CONCAT('profile.html?user_id=', pt.id), pt.union=(SELECT c.union_name from category c where c.name = pt.category) where isActive = -1;";
    	// UPDATE profile_table pt set pt.union = (SELECT c.union_name from category c where c.name = pt.category)
        mysqli_query($conn, $sql_sub_query);
    	if($success == "success"){
        	header("Location: import.html?status=".$success);
			// $to_email = 'ashishkamal17@gamil.com';
			// $subject = 'Image Creation Update';
			// $message = 'This mail is sent to inform that the Batch imgae creation have finished';
			// $headers = 'From: Admin@hellomywork.com';
			// mail($to_email,$subject,$message,$headers);
        }
    	die();
    }
}
?>