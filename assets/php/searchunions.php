<?php
        require "init.php";//needed for connection with database
        
        $srch_key = $_GET["srch_key"];
        $pageNo = 1;
        $offset_count = 24;
        if(isset($_GET["pageNo"])){
              $pageNo = $_GET["pageNo"];
        }
        $sql_total = "SELECT COUNT(*) FROM `unions` where name like '%$srch_key%' ORDER BY `unions`.`click_freq` DESC;";
        $result_total = mysqli_query($con,$sql_total);
        $resTol = mysqli_fetch_array($result_total);
        $total_pages = (ceil($resTol[0] / $offset_count));
        $last_pages = $total_pages+1;
        $current_page = $pageNo;
        
	    $pageNo = ($pageNo -1)* $offset_count;
        $sql_query =  "SELECT * FROM `unions` where name like '%$srch_key%' ORDER BY `unions`.`click_freq` DESC LIMIT $offset_count OFFSET $pageNo;";//SQL command
        $response = array();
        $data = array();
        $success = "unsuccessful";
        $count = 0;
        $result = mysqli_query($con,$sql_query);
        if($current_page == $last_pages){
            $last_page = "last-page";
            $response[0] = array("response" =>$last_page);
        }
        else{
            while($row=mysqli_fetch_array($result)){
            //  echo  nl2br($row[0] .":". $row[1].":".$row[2].":".$row[3].":".$row[4]."\n");//returning results   ,"image_address"=>$row[2],"link"=>$row[3], "frequency"=>$row[4]
                $success = "successful";
                $count = $count + 1;
                $response[0] = array("response"=>$success);  
                $response[$count] = array("union_id"=>$row['id'],"name"=>$row['name'],"link"=>$row["link"]);
            }
        }
        echo json_encode($response);
?> 