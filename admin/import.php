<?php
require "assets/php/init.php";

if (isset($_POST["import"])) {
    
    $fileName = $_FILES["file"]["tmp_name"];
    
    if ($_FILES["file"]["size"] > 0) {
        
        $file = fopen($fileName, "r");
        $success = "failed";
        while (($column = fgetcsv($file, 10000, ",")) !== FALSE) {
            $sqlInsert = "INSERT into profile_table
            (name, role, sublocation, whatapp, location, skils, profile_table.union, website, phone, email, address, category, country, state, pincode, type, phone2, premium, doj, employee_id)
                   values ('$column[0]','$column[1]','$column[3]','$column[6]','$column[2]','$column[16]','$column[15]','$column[12]','$column[5]','$column[8]','$column[4]','$column[14]','$column[10]','$column[9]','$column[11]','$column[13]','$column[7]',1, '$column[17]', '$column[18]')";
            $result = mysqli_query($conn, $sqlInsert);
            // echo   $sqlInsert;  
            if (! empty($result)) {
                $success = "success";
            } else {
                $success = "failed";
            }
        }
        $sql_sub_query = "update profile_table set link=CONCAT('profile.html?user_id=', id) where DATE(modified) = CURDATE();";
        mysqli_query($conn, $sql_sub_query);
        header("Location: import.html?status=".$success);
        die();
    }
}
?>