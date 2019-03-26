function loadCatList(catObj){
    // console.log("obj[0].count-> "+catObj[0].count);
    var catCards = "";
    // console.log("lengthObj->"+catObj.length);
    for(j = 1; j<=catObj[0].count; j++){
        
        popBox1 = catObj[j].userPhone+"a";
        popBox2 = catObj[j].userPhone+"b";
        popBox3 = catObj[j].userPhone+"c";
        
        catCards = '<div class="col-sm-3"><div class="card-box">'+
                        '<div id="imgCard" style="text-align:center;">'+
                        '<div class="circBtn popup" onclick="javascript:myFunction(&quot;'+popBox1+'&quot;)">'+
                            '<img style="position:absolute;top:0;left:0;height:25px;width:25px;display:inline-block;" src="assets/img/icon/ic_whatsapp_bnw-min.png"><span class="popuptext" id= "'+popBox1+'"  >'+catObj[j].userWPhone+'</span></div>'+
                        '<div class="circBtn popup" style="left:45%;" onclick="javascript:myFunction(&quot;'+popBox2+'&quot;)">'+
                            '<img style="position:absolute;top:0;left:0;height:25px;width:25px;display:inline-block;" src="assets/img/icon/ic_phone_bnw-min.png"><span class="popuptext" id='+popBox2+'>'+catObj[j].userPhone+'</span></div>'+
                        '<div class="circBtn popup" style="left:60%;" onclick="javascript:myFunction(&quot;'+popBox3+'&quot;)">'+
                            '<img style="position:absolute;top:0;left:0;height:25px;width:25px;display:inline-block;" src="assets/img/icon/ic_email_bnw-min.png"><span class="popuptext" id='+popBox3+'>'+catObj[j].userMail+'</span></div>'+
                        
                        '<img class="hmwCard" src="assets/img/profile/card/'+catObj[j].userId+'.png">'+
                        '<div style="z-index:1;width:100%;height:10px;position:absolute;top:41%;background-color:#ffffff;"></div>'+
                        '</div>'+
                        '<div style="padding-left:20px;padding-top:0;"><br>'+
                            '<h5  style="font-size:1.1rem;"><b>'+catObj[j].userName+'</b></h5><p id="userJob" style="color:grey;">'+catObj[j].userRole+'<br>'+catObj[j].userSubLoc+', '+catObj[j].userLoc+'</p>'+
                        '</div>'+
                        '<div style="padding-left:20px;display:inline-block;">';
                    
                for(i = 0; i< 5; i++){
                    
                    if(i<catObj[j].rating){
                        catCards += '<img src="assets/img/icon/star-gold.png" height="25" width="25">';
                    } else {
                        catCards += '<img src="assets/img/icon/star-black.png" height="25" width="25" style = "opacity:0.3;">';
                    }
                }
            catCards += '<br>'+catObj[j].rating+' ('+catObj[j].totRating+' ratings)<p style="color:grey;">'+catObj[j].review+' reviews</p></div>';
    }
    // console.log("catCards-> "+catCards);
    document.getElementById("resultsHere").innerHTML = catCards;
    document.getElementById("catCount").innerHTML = catObj[0].count+" "+catObj[1].category+" found!";
}

function getQueryString(){
    return document.URL.split('?')[1].split('&');
}

function searchQuery(qryCatType=null,qrySrchType=null,qryLocType=null){
    
    var params = "catType="+qryCatType+"&srchType="+qrySrchType+"&locType="+qryLocType;
    // console.log("params->"+params);
    
    var xhr =  new XMLHttpRequest();
    this.responseType = 'text';
    xhr.onreadystatechange  =  function() {
        if (this.readyState == 4 && this.status == 200) {//if result successful
            if(xhr.responseText !== 0){
                var jSONObj = JSON.parse(this.responseText);
                loadCatList(jSONObj)
            } else {
                reDirect("error.html");
            }
        }
    };
    xhr.open("POST", "assets/php/searchQuery.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
}