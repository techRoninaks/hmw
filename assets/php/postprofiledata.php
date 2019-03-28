<?php

        $name = $_POST["name"];
        $email = $_POST["email"];
        $phone = $_POST["phone"];
        $password = $_POST["password"];
        $category = $_POST["category"];
        $role = $_POST["role"];
        $country = $_POST["country"];
        $type = $_POST["type"];
        $address = $_POST["address"];
        $state = $_POST["state"];
        $location = $_POST["location"];
        $sublocation = $_POST["sublocation"];
        $pincode = $_POST["pincode"];
        $union = $_POST["union"];
        $whatsapp = $_POST["whatsapp"];
        $website = $_POST["website"];
        $image = $_POST["image"];

        $count = 0;
        require "init.php";//needed for connection with database

        $sql_query =  "SELECT * FROM `profile_table` ORDER BY `profile_table`.`id`ASC ";//SQL command
        $response = array();
        $data = array();
        $success = "unsuccessful";
        $count = 0;
        $result = mysqli_query($con,$sql_query);
        while($row=mysqli_fetch_array($result)){
            $count = $row["id"];
        }
        $count = $count+1;
        // echo $count;
        $img = $image;
        define('UPLOAD_DIR', '../img/profile/userimage/');
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        // $file = UPLOAD_DIR . uniqid() . '.png';
        $file = UPLOAD_DIR.$count.'.png';
        $success = file_put_contents($file, $data);
        // print $success ? $file : 'Unable to save the file.';

        $JAVA_HOME = "\jdk-9.0.4";
        $PATH = "$JAVA_HOME/bin:".getenv('PATH');
        putenv("JAVA_HOME=$JAVA_HOME");
        putenv("PATH=$PATH");
        // $PATH="C:/program Files/Java/jdk-9.0.4/bin";
        echo shell_exec('java -version 2>&1');
        
        
       
   

        // $address = "assets/img/posts/".$count.".png";
        // $like = 0;
        // $comments = 0;
        // $sql_query =  "INSERT INTO `posts_table`(`id`, `u_id`, `postimage`, `des`, `likes`, `comments`, `offer`) VALUES ('$count','$u_id','$address','$des','$like','$comments','$tag')";//SQL command
        // $result = mysqli_query($con,$sql_query);
        // if($result){
        //     echo "suss";
        //     $img = $image;
        //     define('UPLOAD_DIR', '../img/posts/');
        //     $img = str_replace('data:image/png;base64,', '', $img);
        //     $img = str_replace(' ', '+', $img);
        //     $data = base64_decode($img);
        //     // $file = UPLOAD_DIR . uniqid() . '.png';
        //     $file = UPLOAD_DIR.$count.'.png';
        //     $success = file_put_contents($file, $data);
        //     print $success ? $file : 'Unable to save the file.';
        // }

            // echo $name.        $email .
            // $phone .
            // $password .
            // $category .
            // $role.
            // $country .
            // $type  .
            // $address .
            // $state .
            // $location .
            // $sublocation .
            // $pincode.
            // $union .
            // $whatsapp .
            // $website .
            // $image;
        // echo json_encode($response);

        // echo $image.$des.$tag;
?> 