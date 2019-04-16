<?php
$id = $_POST["id"];
        require "init.php";//needed for connection with database
        
       
        $sql_query =  "SELECT pt.*,prt.name,prt.role,prt.location FROM posts_table pt JOIN profile_table prt on pt.u_id = prt.id where u_id in (select id from profile_table prt where prt.union = (select name from unions u where u.id = $id))";//SQL command
        $response = array();
        $data = array();
        $success = "unsuccessful";
        $count = 0;
        $result = mysqli_query($con,$sql_query);
        while($row=mysqli_fetch_array($result)){
            //  echo  nl2br($row[0] .":". $row[1].":".$row[2].":".$row[3].":".$row[4]."\n");//returning results   ,"image_address"=>$row[2],"link"=>$row[3], "frequency"=>$row[4]
            $success = "successful";
            $count = $count + 1;
            $response[0] = array("response"=>$success);  

            // echo $str;
            $response[$count] = array("id"=>$row['id'],"u_id"=>$row['u_id'],"name"=>$row[2],"postimage"=>$row['postimage'],"des"=>$row['des'],"date"=>$row['date'],"sublocation"=>$row[6],"likes"=>$row['likes'],"comments"=>$row['comments'],"offer"=>$row['offer'],"name"=>$row['name'],"location"=>$row['location'],"role"=>$row['role']);
        }
        echo json_encode($response);
?> 