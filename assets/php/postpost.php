<?php

        $image = $_POST["image"];
        $des = $_POST["des"];
        $tag = $_POST["tag"];
        $u_id = $_POST["u_id"];
        require "init.php";//needed for connection with database
        
       
        $sql_query =  "SELECT * FROM `posts_table` ORDER BY `posts_table`.`id`ASC ";//SQL command
        $response = array();
        $data = array();
        $success = "unsuccessful";
        $count = 0;
        $mob = 0;
        if(isset($_POST['mob'])){
            $mob = 1;
        }
        $result = mysqli_query($con,$sql_query);
        while($row=mysqli_fetch_array($result)){
            $count = $row["id"];
        }
        $count = $count+1;
        // echo $count;
        if($tag == ""){
            $tag = "assets/img/icon/ic_random.png";
            // echo $tag;
        }
        $data;
        $address = "assets/img/posts/".$count.".png";
        $like = 0;
        $comments = 0;
        $sql_query =  "INSERT INTO `posts_table`(`id`, `u_id`, `postimage`, `des`, `likes`, `comments`, `offer`) VALUES ('$count','$u_id','$address','$des','$like','$comments','$tag')";//SQL command
        $result = mysqli_query($con,$sql_query);
        if($result){
            // echo "suss";
            // $img =explode(",", $image);
            define('UPLOAD_DIR', '../img/posts/');
            // // $img = str_replace('data:image/png;base64,', '', $img[1]);
            // $img[1] = str_replace(' ', '+', $img[1]);
            if($mob == 0){
                $img =explode(",", $image);
                $img[1] = str_replace(' ', '+', $img[1]);
                $data = base64_decode($img[1]);
            }else{
                $data = base64_decode($image);
            }
            // $data = base64_decode($img[1]);
            // $file = UPLOAD_DIR . uniqid() . '.png';
            $file = UPLOAD_DIR.$count.'.png';
            $success = file_put_contents($file, $data);
            // print $success ? $file : 'Unable to save the file.';
            $success = "successful";
        	echo $success;
        }
		

        // echo json_encode($response);

        // echo $image.$des.$tag;
        
?> 