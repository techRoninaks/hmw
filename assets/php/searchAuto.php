<?php
    $searchWord = $_POST["search"];
    require "init.php";//needed for connection with database
    
    $sql_query = "SELECT e.NAME,e.CATEGORY, e.CATEGORY_ID, l.name as LOC_NAME, l.id as LOC_ID FROM `elastic_search` as e join `location` as l WHERE e.NAME LIKE '%$searchWord%' and e.location = l.name ORDER BY e.NAME ASC LIMIT 10";
    $result = mysqli_query($con, $sql_query);
    $response = '';
    while($row = mysqli_fetch_array($result)){
        $response = $response.$row["NAME"]." [".$row["CATEGORY"]."]~".$row["CATEGORY_ID"]."~".$row["LOC_ID"].',';
    }
    $response = substr($response,0,(strlen($response)-1));
    $response = explode(',', $response);
  echo json_encode($response);
?>