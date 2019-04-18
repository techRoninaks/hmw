<?php
    require "init.php";
    $table = $_GET["table"];
    $sql_query = "";
    $filename = "";
    if($table == "customer"){
        $sql_query = "select * from profile_table;";
        $filename = "customer_".date("Y-m-d") . ".csv";
    }else if($table == "union"){
        $sql_query = "select * from unions;";
        $filename = "union_".date("Y-m-d") . ".csv";
    }else if($table == "category"){
        $sql_query = "select * from category;";
        $filename = "category_".date("Y-m-d") . ".csv";
    }
    $result = mysqli_query($con, $sql_query);
    if (mysqli_num_rows($result) == 0) {
        echo "no rows";
        die();
    }else{
        // disable caching
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
        $first = true;
        while ($row = mysqli_fetch_assoc($result)) {
            if($first){
                $first = false;
                $keys = array_keys($row);
                // $keyLine = "";
                // foreach($keys as $key){
                //     $keyLine .= $key . ",";
                // }
                // $keyLine = rtrim($keyLine, ",") . PHP_EOL;
                // echo $keyLine;
                fputcsv($df, $keys);
            }
            fputcsv($df, $row);
        }
        fclose($df);
        die();
    }
?>