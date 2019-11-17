var page =0;
function loadCatList(catObj){

    var catCards = "";
    if(catObj[0].count>0){
        for(j = 1; j<=catObj[0].count; j++){
            
            popBox1 = catObj[j].userPhone+"a";
            popBox2 = catObj[j].userPhone+"b";
            popBox3 = catObj[j].userPhone+"c";
            var whatdata = "No number";
            var phonedata = "No number";
            var emaildata = "No email";
            if(catObj[j].userWPhone!=""){
                whatdata = catObj[j].userWPhone;
            }
            if(catObj[j].userMail!=""){
                phonedata = catObj[j].userMail;
            }
            if(catObj[j].userPhone!=""){ 
                emaildata = catObj[j].userPhone;
            }
            if(catObj[j].premium == 1){ 
            catCards += '<div class="col-md-3"><div class="card-box" onclick="javascript:myFunction(&quot;cardClick&quot;,&quot;'+catObj[j].userId+'&quot;)">'+
                            '<div id="imgCard" style="text-align:center;">'+
                            // '<div class="circBtn popup" onclick="javascript:myFunction(&quot;'+popBox1+'&quot;);">'+
                            //     '<img class="circImg" src="assets/img/icon/ic_whatsapp_bnw-min.png"><span class="popuptext" id= "'+popBox1+'"  >'+whatdata+'</span></div>'+
                            // '<div class="circBtn popup" style="left:45%;" onclick="javascript:myFunction(&quot;'+popBox2+'&quot;)">'+
                            //     '<img class="circImg" src="assets/img/icon/ic_phone_bnw-min.png"><span class="popuptext" id='+popBox2+'>'+phonedata+'</span></div>'+
                            // '<div class="circBtn popup" style="left:60%;" onclick="javascript:myFunction(&quot;'+popBox3+'&quot;)">'+
                            //     '<img class="circImg" src="assets/img/icon/ic_email_bnw-min.png"><span class="popuptext" id='+popBox3+'>'+emaildata+'</span></div>'+
                            '<img class="hmwCard" src="'+catObj[j].card+'"  onerror="this.src='+"'assets/img/images/profile.png'"+' ">'+
                            // '<div class="searchPadding"></div>'+
                            '</div><div class="profileListPosition">'+
            				'<div class="circBtn popup" onclick="javascript:myFunction(&quot;'+popBox1+'&quot;);">'+
                                '<img class="circImg" src="assets/img/icon/ic_whatsapp_bnw-min.png"><span class="popuptext" id= "'+popBox1+'"  >'+whatdata+'</span></div>'+
                            '<div class="circBtn popup" style="left:45%;" onclick="javascript:myFunction(&quot;'+popBox2+'&quot;)">'+
                                '<img class="circImg" src="assets/img/icon/ic_phone_bnw-min.png"><span class="popuptext" id='+popBox2+'>'+phonedata+'</span></div>'+
                            '<div class="circBtn popup" style="left:60%;" onclick="javascript:myFunction(&quot;'+popBox3+'&quot;)">'+
                                '<img class="circImg" src="assets/img/icon/ic_email_bnw-min.png"><span class="popuptext" id='+popBox3+'>'+emaildata+'</span></div>'+
                            '<div style="padding-left:20px;padding-top:0;"><br>'+
                                '<h5  style="font-size:1.1rem;"><b>'+catObj[j].userName+'</b></h5><p id="userJob" style="color:grey;">'+catObj[j].userRole+'<br>'+catObj[j].userSubLoc+', '+catObj[j].userLoc+'</p>'+
                            '</div>'+
                            '<div style="padding-left:20px;display:inline-block;">';
            }
        	else if(catObj[j].premium == 0){
            	            catCards += '<div class="col-md-3"><div class="card-box" onclick="javascript:myFunction(&quot;cardClick&quot;,&quot;'+catObj[j].userId+'&quot;)">'+
                            '<div id="imgCard" style="text-align:center;">'+
//                             '<div class="circBtn popup" onclick="javascript:myFunction(&quot;'+popBox1+'&quot;)">'+
//                                 '<img style="position:absolute;top:0;left:0;height:25px;width:25px;display:inline-block;z-index:111;" src="assets/img/icon/ic_whatsapp_bnw-min.png"><span class="popuptext" id= "'+popBox1+'"  >'+whatdata+'</span></div>'+
//                             '<div class="circBtn popup" style="left:45%;" onclick="javascript:myFunction(&quot;'+popBox2+'&quot;)">'+
//                                 '<img style="position:absolute;top:0;left:0;height:25px;width:25px;display:inline-block;z-index:111;" src="assets/img/icon/ic_phone_bnw-min.png"><span class="popuptext" id='+popBox2+'>'+phonedata+'</span></div>'+
//                             '<div class="circBtn popup" style="left:60%;" onclick="javascript:myFunction(&quot;'+popBox3+'&quot;)">'+
//                                 '<img style="position:absolute;top:0;left:0;height:25px;width:25px;display:inline-block;z-index:111;" src="assets/img/icon/ic_email_bnw-min.png"><span class="popuptext" id='+popBox3+'>'+emaildata+'</span></div>'+
                       
                            '<img class="hmwCard" src="'+catObj[j].card+'"  onerror="this.src='+"'assets/img/images/profile.png'"+' ">'+
                            // '<div class="searchPadding1"></div>'+
                            '</div><div class="profileListPosition">'+
                            '<div class="circBtn popup" onclick="javascript:myFunction(&quot;'+popBox1+'&quot;)">'+
                                '<img style="position:absolute;top:0;left:0;height:25px;width:25px;display:inline-block;z-index:1;" src="assets/img/icon/ic_whatsapp_bnw-min.png"><span class="popuptext" id= "'+popBox1+'"  >'+whatdata+'</span></div>'+
                            '<div class="circBtn popup" style="left:45%;" onclick="javascript:myFunction(&quot;'+popBox2+'&quot;)">'+
                                '<img style="position:absolute;top:0;left:0;height:25px;width:25px;display:inline-block;z-index:1;" src="assets/img/icon/ic_phone_bnw-min.png"><span class="popuptext" id='+popBox2+'>'+phonedata+'</span></div>'+
                            '<div class="circBtn popup" style="left:60%;" onclick="javascript:myFunction(&quot;'+popBox3+'&quot;)">'+
                                '<img style="position:absolute;top:0;left:0;height:25px;width:25px;display:inline-block;z-index:1;" src="assets/img/icon/ic_email_bnw-min.png"><span class="popuptext" id='+popBox3+'>'+emaildata+'</span></div>'+
                            '<div style="padding-left:20px;padding-top:0;"><br>'+
                                '<h5  style="font-size:1.1rem;"><b>'+catObj[j].userName+'</b></h5><p id="userJob" style="color:grey;">'+catObj[j].userRole+'<br>'+catObj[j].userSubLoc+', '+catObj[j].userLoc+'</p>'+
                            '</div>'+
                            '<div style="padding-left:20px;display:inline-block;">';
            }
                        
                    for(i = 0; i< 5; i++){
                        
                        if(i<catObj[j].rating){
                            catCards += '<img src="assets/img/icon/star-gold.png" height="25" width="25">';
                        } else {
                            catCards += '<img src="assets/img/icon/star-black.png" height="25" width="25" style = "opacity:0.3;">';
                        }
                    }
                catCards += '<br>'+catObj[j].rating+' ('+catObj[j].toRating+' ratings)<p style="color:grey;">'+catObj[j].review+' reviews</p></div></div></div></div>';
        }
    	
        var totalPages  = Math.ceil(catObj[0].totalpageNo/catObj[0].pageLimit);
        if(totalPages != null){
            document.getElementById("nopagination").style.display= "block";
            pagenationConditions(totalPages);

        }
    	
    document.getElementById("resultsHere").innerHTML = catCards;
    } else {
        document.getElementById("resultsHere").innerHTML = "<div class='col-md-12' style='font-family:defaultBarlowBold;'><h2>Sorry, we could not find what you were looking for...</h2><h2>Try a different keyword!</h2></div>";
    }
    // document.getElementById("catCount").innerHTML = catObj[0].count+" results found!";
}


function pagenationConditions(totalPages){
	var curretPage = document.URL.split('?')[1].split('pg=')[1];
	var curretURL = document.URL.split('?')[1].split('pg=')[0];
    	console.log(totalPages);
		// (curretPage - 3 < 0)?changePageValue(curretPage - 3, totalPages):(totalPages - curretPage < 3 )?changePageValue(totalPages - curretPage, totalPages):console.log("sam");
    	if(curretPage == 1 ){
    	var curretURL = document.URL.split('?')[1].split('&pg=')[0];
    	var pagenation ='<li class="page-item  disabled"><a class="page-link " href="profileList.html?'+curretURL+'pg=1">Previous</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg=1">First</a></li>'+
    						'<li class="page-item active"><a class="page-link" href="profileList.html?'+curretURL+'pg=0">1</a></li>'+
    						'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg=2">2</a></li>'+
    						'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg=3">3</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg=4">4</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg=5">5</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+totalPages+'">Last</a></li>'+
    						'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg=2">Next</a></li>';
    	document.getElementById("pagenationHere").innerHTML = pagenation;
    	}
    	if(curretPage == 2 ){
    	var pagenation ='<li class="page-item"><a class="page-link " href="profileList.html?'+curretURL+'pg=1">Previous</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg=1">First</a></li>'+
    						'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg=1">1</a></li>'+
    						'<li class="page-item active"><a class="page-link" href="profileList.html?'+curretURL+'pg=2">2</a></li>'+
    						'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg=3">3</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg=4">4</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg=5">5</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+totalPages+'">Last</a></li>'+
    						'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg=3">Next</a></li>';
    	document.getElementById("pagenationHere").innerHTML = pagenation;
    	}
    	else if(page == 1 ){
    	var curretURL = document.URL.split('?')[1].split('&pg=')[0];
    	var pagenation ='<li class="page-item  disabled"><a class="page-link " href="profileList.html?'+curretURL+'&pg=1">Previous</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'&pg=1">First</a></li>'+
    						'<li class="page-item active"><a class="page-link" href="profileList.html?'+curretURL+'&pg=1">1</a></li>'+
    						'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'&pg=2">2</a></li>'+
    						'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'&pg=3">3</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'&pg=4">4</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'&pg=5">5</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'&pg='+totalPages+'">Last</a></li>'+
    						'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'&pg=2">Next</a></li>';
    	document.getElementById("pagenationHere").innerHTML = pagenation;
    	}
    	else if(curretPage == totalPages){
    	
    	var pagenation ='<li class="page-item"><a class="page-link " href="profileList.html?'+curretURL+'pg='+(totalPages-1)+'">Previous</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg=1">First</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+(totalPages-4)+'">'+(totalPages-4)+'</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+(totalPages-3)+'">'+(totalPages-3)+'</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+(totalPages-2)+'">'+(totalPages-2)+'</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+(totalPages-1)+'">'+(totalPages-1)+'</a></li>'+
    	'<li class="page-item  active"><a class="page-link" href="profileList.html?'+curretURL+'pg='+(totalPages)+'">'+(totalPages)+'</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+totalPages+'">Last</a></li>'+
    	'<li class="page-item disabled"><a class="page-link" href="profileList.html?'+curretURL+'pg='+(totalPages)+'">Next</a></li>';
    	document.getElementById("pagenationHere").innerHTML = pagenation;
    	}
    	else if(curretPage == totalPages-1){
    	
    	console.log(curretURL);
    	var pagenation ='<li class="page-item"><a class="page-link " href="profileList.html?'+curretURL+'pg='+(totalPages-1)+'">Previous</a></li>'+
        '<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'&pg=1">First</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+(totalPages-4)+'">'+(totalPages-4)+'</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+(totalPages-3)+'">'+(totalPages-3)+'</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+(totalPages-2)+'">'+(totalPages-2)+'</a></li>'+
    	'<li class="page-item active"><a class="page-link" href="profileList.html?'+curretURL+'pg='+(totalPages-1)+'">'+(totalPages-1)+'</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+(totalPages)+'">'+(totalPages)+'</a></li>'+
        '<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+totalPages+'">Last</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+(totalPages)+'">Next</a></li>';
    	document.getElementById("pagenationHere").innerHTML = pagenation;
    	}
    	else{
    	
    	console.log(curretURL);
    	var cp = parseInt(curretPage);
    	var pagenation ='<li class="page-item"><a class="page-link " href="profileList.html?'+curretURL+'pg='+(curretPage-1)+'">Previous</a></li>'+
        '<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'&pg=1">First</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+(curretPage-2)+'">'+(curretPage-2)+'</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+(curretPage-1)+'">'+(curretPage-1)+'</a></li>'+
    	'<li class="page-item active"><a class="page-link" href="profileList.html?'+curretURL+'pg='+(curretPage)+'">'+(curretPage)+'</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+(parseInt(curretPage)+1)+'">'+(parseInt(curretPage)+1)+'</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+(parseInt(curretPage)+2)+'">'+(parseInt(curretPage)+2)+'</a></li>'+
        '<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+totalPages+'">Last</a></li>'+
    	'<li class="page-item"><a class="page-link" href="profileList.html?'+curretURL+'pg='+(parseInt(curretPage)+1)+'">Next</a></li>';
    	document.getElementById("pagenationHere").innerHTML = pagenation;
    	}
}

function changePageValue(value, totalPages){
	value = parseInt(value);
	var curretPage = document.URL.split('?')[1].split('pg=')[1];
	 var curretURL = document.URL.split('?')[1].split('pg=')[0];
	if(value = 1){
    	document.getElementById("page0").innerHTML = '<a class="page-link" href="profileList.html?'+curretURL+'pg='+(curretPage)+'">Next</a>';
    }
}

function getQueryString(){
    if(document.URL.includes("?")){
        return document.URL.split('?')[1].split('&');
    }
    else{
        return "null";
    }  
}

function searchQuery(qryCatType=null,qrySrchType=null,qryLocType=null,qryPageNo=0){
    page = qryPageNo;
    var params = "catType="+qryCatType+"&srchType="+qrySrchType+"&locType="+qryLocType+"&pageNo="+qryPageNo;
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