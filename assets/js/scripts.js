var globeCopy = {}; //required global variable
var OTPcount = 3;
var OTP = "";
var OTPsuccess = "error";
var countkeypress = 0;
var filterdata  = "";
var countries = ["****"];
var imagedata  = 0;
var postimage  = 0;
var local =1;
var priv = "",currentUid = 1;
var arrayCatList = ["ALL"];
var cancelFlag = true;
var categoryArray = ["ALL"];
//For fetching common elements
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }; 
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
}

function customAlert(message,msgType){
	$.notify(message, {
		animate: {
        	enter: 'animated fadeInRight',
        	exit: 'animated fadeOutRight'
		}, type: msgType
	});
	setTimeout(function() {
		$.notifyClose('top-right');
	}, 3000);
}

function reDirect(loc){ //redirect to any page without storing as cache.. mainly used when logged in

    var page = window.location.protocol+"//"+window.location.hostname+"/helloMyWork/"+loc;
    window.location.replace(page);
}

function loctionHandler(){
	var locationCurrent = getCookie("location=");
	if(locationCurrent != ""){
    	locationCurrent = locationCurrent.split("~");
    	replacetext(locationCurrent[0],locationCurrent[1]);
    }
}

function dropHeader(headId) { //create dropdown
    document.getElementById(headId).style.display='block';
    document.getElementById(headId).classList.toggle("show");
}

function toggleSignUp(box1,box2,innerId){ //close unwanted popups
    
    document.getElementById(box1).style.display='block';
    document.getElementById(innerId).style.display='block';
    if(box2 !== 'all'){
        document.getElementById('loginBox').style.display='none';
        document.getElementById(box2).style.display='none';
    } else {
        document.getElementById('premiumBox').style.display='none';
        document.getElementById('nonPremiumBox').style.display='none';
    }
    // document.getElementById("myDropdown").style.display='none';
    
}

function signUp(selectBox){ //sign up form
    
    var data = [];
    var myObj = {};
    
   // if(confirm("Confirm Sign Up?")){
        if(selectBox == 'premium'){
            data[0] =  document.getElementById("premiumName").value;
            data[1] =  document.getElementById("premiumPhone").value;
            data[2] = getCookie("emId=");
            myObj = {"newName":data[0],"newPhone":data[1],"userType":selectBox,"emId":data[2]};
            globeCopy = myObj;
            toggleSignUp("otpBox","all","id04");
            sendOTP();
            return;
        } else {
            data[0] =  document.getElementById("userName").value;
            data[1] =  document.getElementById("userPhone").value;
            data[2] =  document.getElementById("userPassword").value;
            data[3] =  document.getElementById("userPassword2").value;
            if(data[2] == data[3]){ //Password check
                myObj = {"newName":data[0],"newPhone":data[1],"newPassword":data[2],"userType":selectBox};
            } else {
                document.getElementById("passError").style.display = "inline-block";
                return;
            }
        }
           
        // var jSONObj = JSON.stringify(myObj);
        // console.log("-> "+jSONObj);
        // xhr =  new XMLHttpRequest();
        // this.responseType = 'text';
        //    xhr.onreadystatechange  =  function() {
        //     if (this.readyState == 4 && this.status == 200) {
        //       var data = xhr.responseText.split("~");
        //         if(data[0] == '1'){
        //             alert("Successful!");
        //             setCookie("userName",myObj.newName);
        //             setCookie("isLogged","1");
        //             setCookie("userId",data[1]);
        //         	setCookie("isActive",0);
        //             console.log(xhr.responseText);
        //             window.location = "prepremiumsignup.html?user_id="+data[1];
        //         } else {
        //             alert("Update Failed! Try again!");
        //         }
        //     }
        // };
        // xhr.open("POST", "assets/php/signUp.php", true);
        // xhr.setRequestHeader("Content-type", "application/json");
        // xhr.send("jsonObj="+jSONObj);
    //}
}

function generateOTP() { 
    var digits = '0123456789'; 
    var OTP = ''; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
}

function sendOTP(){
    OTP = generateOTP();
	
    myObj = globeCopy;
    if(OTPcount>0){
        var message = "Your OTP is "+ OTP;
        var number = myObj.newPhone;
        var params = "number="+number+"&message="+message+"&OTP="+OTP;
        //send otp to mobile
        xhr =  new XMLHttpRequest();
        this.responseType = 'text';
        xhr.onreadystatechange  =  function() {
            if (this.readyState == 4 && this.status == 200) {
                if(xhr.responseText !== '0'){
                    var OTPObj = JSON.parse(xhr.responseText);
                	if(OTPObj.type == "success"){
                    //alert("OTP send!");
                    OTPsuccess = OTPObj.type;
                    OTPcount += -1;}
                	else if(OTPObj.number != 0){
                    	if(OTPObj.isActive == 1){
                        	document.getElementById('otpForm').innerHTML = '<div class= center > This Number Already exits, Please Login<a href= index.html?show_model=true  style="float:right;color:white;background:#333333;margin-top:15px;text-decoration:none;padding:10px;border-radius:5px;" >Login</a></div>';
                        }
                    console.log(OTPObj.number);
                        if(OTPObj.isActive == 0){
                        	document.getElementById('otpForm').innerHTML = '<div class= center > This Number Already exits, Please Login<a href= premiumsignup.html?user_id='+OTPObj.userId+' style="float:right;color:white;background:#333333;margin-top:15px;text-decoration:none;padding:10px;border-radius:5px;" >Goto SignUp</a></div>';
                        	setCookie("userId",OTPObj.userId);
                        	setCookie("isActive",0);
                        }
                    }
                } else {
                    alert("Verification Failed! Try again!");
                }
            }
        };
        xhr.open("POST", "assets/php/test.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(params);
    } else {
        document.getElementById("otpForm").style.display = "none";
        document.getElementById("limitDisplay").style.display = "block";
    }
}
function otpVerify(){ //otp verification
    
    if(OTPcount<0){
        document.getElementById("otpForm").style.display = "none";
        document.getElementById("limitDisplay").style.display = "block";
    } else {
        myObj = globeCopy; //data of the user
        var data = document.getElementById("otp").value;
        if((OTP == data) && OTPsuccess == "success"){
            var jSONObj = JSON.stringify(myObj);
            // console.log("-> "+jSONObj);
            xhr =  new XMLHttpRequest();
            this.responseType = 'text';
              xhr.onreadystatechange  =  function() {
                var ourData = xhr.response;
                if (this.readyState == 4 && this.status == 200) {
                    var data = xhr.responseText.split("~");
                    if(data[0] == '1'){
                        //alert("OTP Verified!");
                        setCookie("userName",myObj.newName);
                        OTPcount = 3;
                        setCookie("userName",myObj.newName);
                        setCookie("isLogged","1");
                        setCookie("userId",data[1]);
                    	document.getElementById('otpBox').style.display = "none";
                    	toggleSignUp("otp_confirm","all","idOTPConfirm");
                    	// document.getElementById('otp_confirm').style.display = "block";
                    	// document.getElementById('idOTPConfirm').style.display = "block";
                    	setTimeout(function(){ 
                        	window.location = "premiumsignup.html?user_id="+data[1];
                        }, 3000);
                        // reDirect("premiumsignup.html?user_id="+data[1]);
                    } else {
                        alert("Verification Failed! Try again!");
                    }
                }
            };
            xhr.open("POST", "assets/php/signUp.php", true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send("jsonObj="+jSONObj);
        } else {
            document.getElementById("otpError").style.display = "block";
        }
    }
}


function myFunction(popName, userId = "") { //To create pop up bubble in buttons
    if(getCookie("userName=")=="null"){
        toggleSignUp('loginBox','all','id01');
    } 
	else if(getCookie("userName=")==""){
        toggleSignUp('loginBox','all','id01');
    }
	else {
    	if(popName == "cardClick"){
        	window.location='profile.html?user_id=' + userId;
        }else{
        	document.getElementById(popName).style.display = 'block';
        	var popup = document.getElementById(popName);
        	popup.classList.toggle("show");
        }
    }
	event.stopPropagation();
}

//La cookie section

function setCookie(cookieName,userId = null) {

    var d = new Date();
    var exdays = 1;
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cookieName + "=" + userId + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
    
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    // console.log("decoded cookie -> "+ca);
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
            // console.log("&&&&&& "+c);
        }
        if (c.indexOf(cookieName) === 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return "";
}

function checkCookie(cookieName,signVar = null) {
    
    if(signVar !== null){       //sign out code
 
        if(confirm("Confirm Log Out?")){
            setCookie(cookieName);
            reDirect("index.html");
        } else {
            return;
        }
        
    } else {
    
        var id = getCookie(cookieName+"="); //load data
        
        if (id !== "null") {
            //Load the profile here
        }
        else {                      //session validation
            alert("Session Expired! Login again to continue");
            setCookie(cookieName);
            reDirect("index.html");
        }
    }
}

//for location button in homepage, replacing current text
function replacetext(location, id){
  document.getElementById('dropdownMenuButton').innerHTML = " <i class= image-button ></i>"+location;
  setCookie("location",location+"~"+id);
  local = id;
  return false;
}

//Search the list in home union list
function searchlist() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');
  countkeypress +=1;
  
  if(filter.length >= 2){
    ul.style.display = "block";

  }
  else if(filter.length < 2){

    ul.style.display = "";
    


  }
  

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";

    } 
    else {
       li[i].style.display = "none";

      
      
    }   


  }

  
}

//Premium Signup validation and upload
function premiumSignUp(){
  var name = document.getElementById('inputFirstname').value;
  var email = document.getElementById('inputEmail').value;
  var phone = document.getElementById('inputPhone').value;
  var password1 = document.getElementById('inputPassword').value;
  var password2 = document.getElementById('inputConfirmPassword').value;
  var category = document.getElementById('inputCategory').value;
  var role = document.getElementById('inputRoleInCompany').value;
  var country = document.getElementById('inputCountry').value;
  var type = document.getElementById('inputType').value;
  var address = document.getElementById('inputAddressLine1').value;
  var state = document.getElementById('inputState').value;
  var location = document.getElementById('inputLocation').value;
  var sublocation = document.getElementById('inputSubLocation').value;
  var pincode = document.getElementById('inputPinCode').value;
  var union = document.getElementById('inputUnion').value;
  var whatsapp = document.getElementById('inputWhatsappNumber').value;
  var website = document.getElementById('inputWebsite').value;
  var phone2 = document.getElementById('inputSecondaryContact').value;
  var skills = document.getElementById('inputSkills').value;
  var employId= 0;
  console.log(phone2);
  var privatetag = 0,prospectTag=0;
  var id = currentUid;
  cancelFlag =true;
  if(skills.charAt(0)==","){
    skills = skills.substr(1,skills.length)
  }
  if(phone2.charAt(0)==","){
    phone2 = phone2.substr(1,phone2.length)
  }
  if (document.getElementById("privateTag").checked == 1){
    privatetag = 1;
  } else {
    privatetag = 0;
  }
  if (document.getElementById("prospectTag").checked == 1){
    prospectTag = 1;
  } else {
    prospectTag = 0;
  }
  if(getCookie("isAdmin=")==1){
    employId = getCookie("empId=");
  }
  
  
  // ||phone+password1+password2+category+role
  if(name ==""|| email==""||union == ""|| phone ==""||location==""|| pincode==""|| sublocation==""|| password1 ==""||address=="" || password2 =="" || category =="" || role =="" || country == "" || state=="" || type == "")
  {
    document.getElementById('vaildation').innerHTML= "Please fill all fields.";
    document.getElementById('vaildation').style.display = "block";
    // console.log('if');	
    cancelFlag = false;
    
  }
  if(password1 != password2){
    document.getElementById('vaildation').innerHTML= "Password don't match!";
    document.getElementById('vaildation').style.display = "block";
  	cancelFlag = false;
  }
  if(imagedata == 0 ){
	imagedata = 1;
  }
  if (cancelFlag){
    document.getElementById('vaildation').style.display = "none";
    // console.log(name+"\n"+email+"\n"+phone+"\n"+password1+"\n"+password2+"\n category="+category+"\n"+role+"\n"+country+"\n type="+type+"\n"+address+"\n"+state+"\n"+location+"\n"+sublocation+"\n"+pincode+"\n union="+union+"\n"+whatsapp+"\n"+website+"\n"+phone2);
  	  document.getElementById('premiuimSubmit').innerText = "Submitting...";
  	  document.getElementById('premiuimSubmit').style.cursor = "no-drop";
  
  var xhr =  new XMLHttpRequest();
  this.responseType = 'text';
  xhr.onreadystatechange  =  function() {
      
      var ourData = xhr.response;
      if (this.readyState == 4 && this.status == 200) {//if result successful
        // var myObj = JSON.parse(this.responseText);
        if(this.responseText == "success "){
          window.location = "package.html"
        }

      }
      
  };
  // console.log(imagedata);

  var params = 'name='+name+"&email="+email+"&phone="+phone+"&password="+password1+"&category="+category+"&role="+role+"&country="+country+"&type="+type+"&address="+address+"&state="+state+"&location="+location+"&sublocation="+sublocation+"&pincode="+pincode+"&union="+union+"&whatsapp="+whatsapp+"&website="+website+"&image="+imagedata+"&phone2="+phone2+"&skills="+skills+"&privatetag="+privatetag+"&employId="+employId+"&id="+id+"&prospectTag="+prospectTag;
  xhr.open("post", "assets/php/postprofiledata.php", true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(params);

  }
  // console.log(name+"\n"+email+"\n"+phone+"\n"+password1+"\n"+password2+"\n"+category+"\n"+role+"\n"+country+"\n"+type);
  return false; 
}



//To handle skills field in signup page 

//To load all dynamic elements in home page
function loadUnionInfo(caller){
  var xhr =  new XMLHttpRequest();
  this.responseType = 'text';
  xhr.onreadystatechange  =  function() {
      
      var ourData = xhr.response;
      if (this.readyState == 4 && this.status == 200) {//if result successful
        var myObj = JSON.parse(this.responseText);
        
        switch (caller){
          case "unionlist":
              unionlistloadHome(myObj);
              break;
          case "adver":
              homeAdload(myObj);
              break;
          case "union":
              homeUnionload(myObj);
              break;
          case "profileowl":
              homeprofileload(myObj);
              break;
          case "searchlist":
              homeprosearchload(myObj);
              break;
          default:
            // homeload(myObj);
            break;
        }
      }
      
  };

  switch(caller){
    case "unionlist":
            xhr.open("GET", "assets/php/getunionlist.php", true);
            xhr.setRequestHeader("Content-type", "text/plain");
            xhr.send();
            break;
    case "union":
            xhr.open("GET", "assets/php/getunion.php", true);
            xhr.setRequestHeader("Content-type", "text/plain");
            xhr.send();
            break;
    case "profileowl":
            xhr.open("GET", "assets/php/getprofile.php", true);
            xhr.setRequestHeader("Content-type", "text/plain");
            xhr.send();
            break;
    case "adver":
            xhr.open("GET", "assets/php/getad.php", true);
            xhr.setRequestHeader("Content-type", "text/plain");
            xhr.send();
            break;
    case "searchlist":
            xhr.open("GET", "assets/php/getsearchlist.php", true);
            xhr.setRequestHeader("Content-type", "text/plain");
            xhr.send();
            break;
    default:
            break;
  }
}


function homeprosearchload(array){
  var htmltemp ="";
  var carousel ="";
  for(i = 1; i<array.length; i++){
    
      var data = array[i];
        htmltemp = htmltemp + "<a href= #  onclick= 'javascript:replacetext(&quot;"+data['location']+"&quot;,"+data['id']+");' >"+data['location']+"</a>";

  }
  document.getElementById('Slist').innerHTML = htmltemp; 
  
}
//load carusol
function homeAdload(array){
  var htmltemp ="";
  var carousel ="";
  for(i = 1; i<array.length; i++){
    if(array.length<=6){
      var data = array[i];
      if(i == 1 ){
        htmltemp = htmltemp + templatehomead(data, "carousel-item&#32;active");
        carousel = carousel +"<li data-target= #carouselExampleIndicators   data-slide-to= "+data["ad_id"]+" class= active ></li>" ;
      }
      else{
        htmltemp = htmltemp + templatehomead(data,"carousel-item");
        carousel = carousel +"<li data-target= #carouselExampleIndicators   data-slide-to= "+data["ad_id"]+" ></li>" ;
      }
    }
  }
  document.getElementById('adlist').innerHTML = htmltemp; 
  document.getElementById('carousel1').innerHTML = carousel;
  
}

//load union list
function unionlistloadHome(array){
  var htmltemp ="";
  var template = "";
  for(i = 1; i<array.length; i++){
    var data = array[i];
    if(i < array.length){
      htmltemp = htmltemp + templateunionlistHome(data, "<hr class= hr >");
      template = template + "<li><a href= "+data["link"]+" >"+data["name"]+"</a></li>";
    }
  }
  template = template +"<li>No item found</li>";
  // console.log(htmltemp+"listunion");

  // var notFound = <li>No item found</li>
  document.getElementById('unionlist').innerHTML = htmltemp; 
  document.getElementById('myUL').innerHTML = template; 
}
//load profile owl list
function homeprofileload(array){
  var htmltemp ="";
  // console.log(data);
  for(i = 1; i<array.length; i++){
      var data = array[i];
      htmltemp = htmltemp + templatehomeprofile(data);
  }
  
  document.getElementById('owl-demo').innerHTML = htmltemp;  
}
//load category page
function homeUnionload(array){
  var htmltemp = "";
  
  var template = "<li class= 'item1 active'  id= ALL  onclick= filterunion('ALL') >ALL</li>";
  var arraya = [array[1]["tag"]] ;
  var count = 1;
  for(i=1; i<array.length-1;i++){
    var data = array[i+1];
    var falg = 0;
    for(j=0;j<arraya.length;j++){
      if(data["tag"]==arraya[j]){
        falg = 1;
        break;
      }  
    }
    if(falg!=1){
      arraya[count]=data["tag"];
      count++;
    } 
  }
  for(i=0;i<arraya.length;i++){
  	arrayCatList[i+1] = arraya[i];
    template = template + "<li class= item1  id= "+arraya[i]+"  onclick= filterunion('"+arraya[i]+"')   >"+arraya[i]+"</li>";
  }
  filterdata = array;
  for(i = 1; i<array.length; i++){
      var data = array[i];
        htmltemp = htmltemp + templatehomeunion(data);
  }
  // htmltemp = htmltemp + htmltemp + htmltemp + htmltemp + htmltemp;
  template = template + "<hr>";
  document.getElementById('union').innerHTML = htmltemp; 
  document.getElementById('menu').innerHTML = template; 
  // console.log(filterdata); 
}
//template union list
function templateunionlistHome(data, extra){
  var template = "";
  template += "<li class= item >"+"<a href= "+data["link"]+" >"+data['name']+
  "<span class='tooltiptext'>"+data['name']+"</span>"+"</a>"+extra+"</li>";
  // console.log(data['name']);
    return template;
    
}

//template ad list 
function templatehomead(data, extra){
  var template = "";
  template += "<div class= "+extra+" >"+
  "<img class= d-block&#32;slider  src= "+data["ad_image"]+"  alt= First&#32;slide >"+
  "<div class= carousel-caption&#32;d-none&#32;d-md-block&#32;item3 >"+
          "<h5 class= font25 >Up to <b class= font30 >"+data["ad_discount"]+"</b>"+data["ad_data"]+"</h5>"+
          "<a href= "+data["ad_link"]+" >"+
              "<button class= carouselButton  disabled> View Offer</button>"+
          "</a>"+
      "</div>"+
  "</div>";
    return template;
}
//template profile list
function templatehomeprofile(data){
  var template = "";
  template += "<div class= item2 >"+
  "<a class= porlink  href= "+data["profile_link"]+" >"+
  "<div class='owlelements' style='width:100%' >"+
      "<img class= profilepic  src= "+data["profile_image"]+" onerror= this.src='assets/img/images/profile.png'  >"+
      "</div>"+
      "<div class='owlelements' style='width:100%'>"+
      "<h7 class= profilename >"+data["name"]+"</h7>"+
      "</div>"+
      "<div class='owlelements' style='width:100%' >"+
      "<h8 class= profileocupation >"+data["role"]+"</h8>"+
      "</div>"+
      "<div class='owlelements' style='width:100%'>"+
      "<div class= temp align='center'>"+
          "<img src= assets/img/icon/star-black.png  class= ratingicon ><span class='ratingele'>"+data["rating"]+" </span> "+
      "</div>"+
      "</div>"+
  "</a>"+
  "</div>";

  return template;
}

//template category
function templatehomeunion(data){
  var template = "";
  template += "<div class= col-lg-2 >"+
  "<a href= "+data["link"]+" >"+
      "<div class= "+data["color"]+"&#32;box&#32;shadow >"+
              "<img class= imagescate  src= "+data["image"]+" >"+
          "<p class= imagetextcate >"+data["name"]+"</p>"+
      "</div>"+
  "</a>"+
  "</div>";
  return template;
  
}
//Filter on category
function filterunion(tag){
  // filterdata = array;
  // console.log(tag);
  var htmltemp ="";
  var flag = 0;
  for(i = 1; i<filterdata.length; i++){
    var data = filterdata[i];
    if(data['tag'] == tag){
      htmltemp = htmltemp + templatehomeunion(data);
    }
    if(tag == "ALL"){
      htmltemp = htmltemp + templatehomeunion(data);
    }  
    // else{
    //   flag = 1;
    // }
  }
  for(i=0;i<arrayCatList.length;i++){
    if(tag == arrayCatList[i]){
      document.getElementById(arrayCatList[i]).classList.add("active");
    }
    else{
      document.getElementById(arrayCatList[i]).classList.remove("active");
    }
  }
  // htmltemp = htmltemp + htmltemp + htmltemp + htmltemp + htmltemp;
  document.getElementById('union').innerHTML = htmltemp; 
  // console.log(filterdata); 
}

function btnSearch(){
	autocomplete(document.getElementById("search"),countries,1);
	
}
//To show suggestions in main search box
function autocomplete(inp, arr,btn=0) {
// console.log("test"+countries);
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  var str = "",cat = "";
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false;}
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        // var datase = arr[i].substr(0, val.length)
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        str = arr[i].substr(0, val.length);
        // b.innerHTML += arr[i].substr(val.length);
        str += arr[i].substr(val.length);
        var temp1 = str.split('~');
        b.innerHTML += temp1[0].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + temp1[0]+"~" + temp1[1] + "'>";
        // console.log(temp1[0]);
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
        /*insert the value for the autocomplete text field:*/
        str = str.split(' [')[0];
        inp.value = str;
        window.location = "profileList.html?cat_type="+temp1[1]+"&srch_key="+str+"&loc="+temp1[2];
        // console.log(cat+"in click "+str);
        /*close the list of autocompleted values,
        (or any other open lists of autocompleted values:*/
        closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  if(btn == 1){
  	window.location = "profileList.html?srch_key="+inp.value+"&loc="+local;
  }
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
        else{
          window.location = "profileList.html?srch_key="+inp.value+"&loc="+local;
        }

      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    console.log(currentFocus);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
    var str1 = x[currentFocus].childNodes[2].value;
    str1 = str1.split("~");
    str = str1[0];
    cat = str1[1];
    // console.log(x[currentFocus].childNodes[2].value);
    document.getElementById('search').value = str;
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
      }
    }
    // document.getElementById('search').value = str;
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
} 

//Toload all profile page elements
function loadProfileInfo(caller, id){
  var xhr =  new XMLHttpRequest();
  this.responseType = 'text';
  xhr.onreadystatechange  =  function() {
      
      var ourData = xhr.response;
      if (this.readyState == 4 && this.status == 200) {//if result successful
        var myObj = JSON.parse(this.responseText);
        
        switch (caller){
          case "profilecard":
              uprofilecardload(myObj);

              return priv;
              break;
          case "profilepost":
              profilepostload(myObj);
              break;
          default:
            // homeload(myObj);
            break;
        }
        
      }
      
  };

  switch(caller){
    case "profilecard":
            var params = 'id='+id;
            xhr.open("post", "assets/php/getprofilecard.php", true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(params);
            break;
    case "profilepost":
            var params = 'id='+id;
            xhr.open("post", "assets/php/getprofilepost.php", true);
            xhr.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
            xhr.send(params);
            break;
    default:
            break;
  }
}

//Profile card load
function uprofilecardload(array){
  var htmltemp ="";
  var data = array[1];
  // var date = new Date();
  // // console.log(date.toString().replace(/ /g, "-"));
  // date = date.toString().replace(/ /g, "-");
  if(data["premium"] == 1){
       document.getElementById('upgradeIdBtn').style.display= "none";
     }
  htmltemp = htmltemp + "<div class= col-sm-4 >"+
  "<img src= "+data["card"]+" class= idprofile >"+
  // "<a href= "+data["card"]+"  download= "+data["uniqueId"]+".png  target= _blank  >"+
  "<img src= assets/img/icon/ic_share_white-min.png  id='sharebutton' onclick='func1();' class= shareIcon  >"+
  // "</a>"+
  "</div>"+
  "<div class= col-md-8 >"+
  "<div class= cardwhite >"+
  "<div class= 'row padding' >"+
    "<div class= col-sm-5&#32;profilelist >"+
    "<ul>"+
        "<li><b>PERSON / COMPANY NAME:</b>"+data["name"]+"</li>"+
        "<li><b>JOB TITLE/ JOB ROLE:</b>"+data["role"]+"</li>"+
        "<li><b>LOCATION:</b>"+data["sublocation"]+", "+data["location"]+"</li>"+
        "<li id= whatsappnum ><b>WHATSAPP NUMBER:</b>"+data["whatapp"]+"</li>"+
        "<li><b>CONTACT NUMBER:</b>"+data["phone"]+"</li>"+
        "<li><b>SKILLS:</b>"+data["skills"]+"</li>"+
    "</ul>"+
  "</div>"+
  "<div class= col-sm-5&#32;profilelist >"+
        "<ul>"+
            "<li><b>UNION:</b>"+data["union"]+"</li>"+
            "<li><b>WEBSITE:</b>"+data["website"]+"</li>"+
            "<li id= scnumber ><b>SECONDARY CONTACT:</b>"+data["phone2"]+"</li>"+
            "<li><b>EMAIL:</b>"+data["email"]+"</li>"+
            "<li id= addresshide ><b>ADDRESS:</b>"+data["address"]+"</li>"+
  			"<li class= upgradeBTN  id= upgradeIdBtn style= display:none; onclick= javascript:window.location='package.html'; >Upgrade</li>"+
        "</ul>"+
  "</div>"+
  "<div class= col-sm-2 >"+
    "<div class= center >"+
    "<div class= popup1 id= whatsappimg  onclick= myFunction(&quot;a&quot;)>"+
                "<img src= assets/img/icon/ic_whatsapp_profile_page-min.png class= profileicons >"+
            "<span class= popuptext1  id= a >"+data["whatapp"]+"</span>"+
            "</div>"+
        "<div class= popup1  onclick= myFunction(&quot;b&quot;)>"+
            "<img src= assets/img/icon/ic_phone_profile_page-min.png  class= profileicons >"+
        "<span class= popuptext1  id= b >"+data["phone"]+"</span>"+
        "</div>"+
        "<div class= popup1  onclick= myFunction(&quot;c&quot;)>"+
            "<img src= assets/img/icon/ic_email_profile_page-min.png  class= profileicons >"+
        "<span class= popuptext1  id= c >"+data["email"]+"</span>"+
        "</div>"+
        "<button class= profileedit  id= editButton   onclick= editProfileData();  >EDIT</button>"
    "</div>"+
  "</div></div></div></div>";

  priv =data["privatetag"];
  // console.log(priv+"in templ")
  var shareHtml = "<div id='myModal' class='modal'>"+
 "<div class='modal-content'>"+
  " <span class='close'>&times;</span>"+
   "<p>Share your profile</p>"+
   "<meta name='viewport' content='width=device-width, initial-scale=1'>"+
        "<a class='share-btn' href='https://www.facebook.com/sharer/sharer.php?app_id=389198185309782&sdk=joey&u=www.hellomywork.com/"+data["card"]+"&display=popup&ref=plugin&src=share_button' onclick='return !window.open(this.href,'Facebook','width=640,height=580')' style='text-decoration: none;padding: 7px;background: #3b5998;width: max-content;color: white;border-radius: 5px;'>facebook</a>"+
         "<iframe src='https://www.facebook.com/plugins/share_button.php?href=www.hellomywork.com/"+data["card"]+"&layout=button_count&size=large&appId=389198185309782&width=84&height=28' width='84' height='28' style='border:none;overflow:hidden' scrolling='no' frameborder='0' allowTransparency='true' allow='encrypted-media'></iframe>"+
       "<script src='https://platform.linkedin.com/in.js' type='text/javascript'>lang: en_US</script>"+
       "<script type='IN/Share' data-url='"+data["card"]+"'></script>"+
   "</div>"+
"</div>";



  document.getElementById('sharemodelcontainer').innerHTML = shareHtml; 
  document.getElementById('profilecard').innerHTML = htmltemp; 
}
function func1() {
  	var modal = document.getElementById('myModal');
	var btn = document.getElementById('sharebutton');
	var span = document.getElementsByClassName('close')[0];
	btn.onclick = function() {
	modal.style.display = 'block';
	}
	span.onclick = function() {
	 modal.style.display = 'none';
	}
	window.onclick = function(event) {
 	if (event.target == modal) {
  	 modal.style.display = 'none';
 	}
	}
}
//profile post load
function profilepostload(array){
  var htmltemp ="";
  for(i = 1; i<array.length; i++){
      var data = array[i];
      htmltemp = htmltemp + templateprofilepost(data, array);
  }
  // htmltemp = htmltemp + htmltemp + htmltemp + htmltemp + htmltemp;
    if(htmltemp == ""){
    // console.log('hell in servicepostload');
    document.getElementById('postlist').innerHTML = "<div class='center errormsg' >Oho...! Looks like this services has no posts..:-(<br>Try another service</div>"; 
  }
  else{
    document.getElementById('postlist').innerHTML = htmltemp; 
  }
//  console.log(array[16][0][1]["comment"]);
}
function formatDate(dateStr)
{
   	var dateOrg = new Date(dateStr);
	// .toLocaleString("en-US", {timeZone: "America/New_York"});
	// console.log(dateOrg);
	var dateOnly = dateOrg.toLocaleDateString();
	var timeOnly = dateOrg.toLocaleTimeString();
	return dateOnly+"  |  "+timeOnly;
	
}
//Profile post template
function templateprofilepost(data, array){
  var template = "";
  data["date"] = formatDate(data["date"]);
  
  template += "<div class= postelement >"+
  "<div class= line1 >"+
          ""+data["name"]+" "+
          "<p>"+data["location"]+" </p>"+
      "</div>"+
      "<div class= line2 >"+
          ""+data["role"]+" "+
          "<p>"+data["date"]+" </p>"+
      "</div>"+
      "<div class= overlay >"+
          "<div class= line3 >"+
              "<img src= "+data["postimage"]+"  class= itemimage >"+
          "</div>"+
          "<div class= layer1 >"+
            "<img src= "+data["offer"]+"  class= size >"+
          "</div>"+
          "<div class= layer2 >"+
              likeGetter(data["isLiked"], data)+
              "<div class= itemoverlay ><i class= commenticon ></i>"+data["commentnumber"]+"<p class='overlaytextPosts'> COMMENTS</p></div>"+
              "<div class= itemoverlaylast ><i class= shareicon ></i>SHARE</div>"+
          "</div>"+
      "</div>"+
      "<div class= line4 >"+
          "<p>"+ 
                  ""+data["des"]+""+
          "</p>"+
      "</div>"+
      "<div class= line5 >"+
          "COMMENTS"+
          "<p class= viewmore  onclick= viewMorePost('comments"+data["id"]+"'); >VIEW MORE</p>"+
      "</div>"+
      "<div id= comments"+data["id"]+"  class= comments >"+
      commentLoad(data["comments"],data["id"])+
      "<div id= hiddenPost"+data["id"]+"  style= display:none >"+getCookie("userName=")+"<span>HiidenPost</span></div>"+
      "</div>"+
      "<input type= text  placeholder= 'Write a comment'  id= 'post"+data["id"]+"'   class= commentinput   onkeypress= postComment(&quot;"+data["id"]+"&quot;); >"+
  "</div>";

  return template;
}



//Toggle Model helper
function toggleSignUp1(box1,box2,innerId){

  document.getElementById(box1).style.display='block';
  document.getElementById(innerId).style.display='block';
  if(box2 !== 'all'){
      document.getElementById('loginBox').style.display='none';
      document.getElementById(box2).style.display='none';
  } else {
      document.getElementById('premiumBox').style.display='none';
      document.getElementById('nonPremiumBox').style.display='none';
  }
  // document.getElementById("myDropdown").style.display='none';
  return false;
}

//To crop image daving to global variable 
function cropToImage(data){ 
  imagedata = data;
  // console.log(document.getElementById("file-input").value);
  if(imagedata != null){
    document.getElementById('msgupload').style.display = "block";
    setTimeout(function(){ toggle(); }, 1000);
    // console.log(imagedata);
  }
  else{
    document.getElementById('msgupload').innerHTML="Oho Upload incomplete !";
    document.getElementById('msgupload').style.display = "block";
  }
  return false;
}
//To close model helper
function toggle(){
  document.getElementById("loginBox1").style.display='none';
  return false;
}
//To read form a file
function readFile() {
  
  if (this.files && this.files[0]) {
      
      var FR= new FileReader();
      
      FR.addEventListener("load", function(e) {
      document.getElementById("img").src       = e.target.result;
      document.getElementById("result").src = e.target.result;
      postimage = e.target.result;
      // console.log(postimage); 
      }); 
      
      FR.readAsDataURL( this.files[0] );
  }
  
  document.getElementById('confrim').style.display="block";
  document.getElementById('cancel').style.display="block";
}
//To insert into tag
function insertvalue(str, colorclass){
  var colorArray = ["scarletcolor","mintcolor","bluecolor","leafcolor","trumpcolor","thanoscolor"];
	document.getElementById('tagpost').value = str;
	for(i = 0; i<colorArray.length; i++){
    	if(colorArray[i]==colorclass){
        	var myButtonClasses = document.getElementById(colorclass).classList;
        	myButtonClasses.remove(colorclass);
        	myButtonClasses.add(colorclass+"a");
    	}
    	else{
        	var myButtonClasses = document.getElementById(colorArray[i]).classList;
        	myButtonClasses.remove(colorArray[i]+"a");
        	myButtonClasses.add(colorArray[i]);
    	}
	}
}

// to Push post to the database
function postpush(u_id){
  var image = postimage;
  var despost = document.getElementById('despost').value;
  var tag  = document.getElementById('tagpost').value;
  var uid = getCookie("userId=");
  if(image == 0){
      document.getElementById('id19').style.display = "block";
  }
  else if(despost == ""){
    document.getElementById('id20').style.display = "block";
  }
  else if(tag == null){
    document.getElementById('id21').style.display = "block";
  }
  else{
    document.getElementById('buttonPostPush').innerText = "Posting...";
  	document.getElementById('buttonPostPush').style.cursor = "no-drop";
    var xhr =  new XMLHttpRequest();
    this.responseType = 'text';
    xhr.onreadystatechange  =  function() {
      
      var ourData = xhr.response;
      if (this.readyState == 4 && this.status == 200) {//if result successful
        // var myObj = JSON.parse(this.responseText);
        console.log('hell');
      if(this.responseText == "successful "){
        image = "";
        despost = "";
        tag  = "";
        document.getElementById('despost').value = "";
        document.getElementById('tagpost').value = "";
      	document.getElementById('id15').style.display='block'
        // alert("Posted Successfully!","success");
        // window.location = "profile.html";
      }
      else{
      		alert("Oho! Server issue, please try later.");
      		document.getElementById('buttonPostPush').innerText = "Post";
  			document.getElementById('buttonPostPush').style.cursor = "pointer";
      }
      }   
    };
    var params = 'image='+image +"&des="+despost+"&tag="+tag+"&u_id="+uid;
    xhr.open("post", "assets/php/postpost.php", true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(params);
  }
}

//to load sign up elements
function loadsignup(caller){
  var xhr =  new XMLHttpRequest();
  this.responseType = 'text';
  xhr.onreadystatechange  =  function() {
    var ourData = xhr.response;
    if (this.readyState == 4 && this.status == 200) {//if result successful
      var myObj = JSON.parse(this.responseText);
      
      switch (caller){
        case "category":
            categorylistload(myObj);
            break;
        case "union":
            unionlistload(myObj);
            break;

        default:
          // homeload(myObj);
          break;
      }
    }
      
  };

  switch(caller){
    case "category":
            xhr.open("GET", "assets/php/getunion.php", true);
            xhr.setRequestHeader("Content-type", "text/plain");
            xhr.send();
            break;
     case "union":
            xhr.open("GET", "assets/php/getunionlist.php", true);
            xhr.setRequestHeader("Content-type", "text/plain");
            xhr.send();
            break;

    default:
            break;
  }
}

//Load category list in signup page
function categorylistload(array){
  var htmltemp ="";
  var template = "";
  for(i = 1; i<array.length; i++){
    var data = array[i];
    htmltemp = htmltemp + templatecategorylist(data);

  }
  categoryArray = array;
  document.getElementById('inputCategory').innerHTML = htmltemp; 
  // document.getElementById('inputUnion').innerHTML = htmltemp; 
}
//Ctegory template
function  templatecategorylist(data){
  var template = "";
  template += "<option data-tokens= private   value='"+data["name"]+"'>"+data["name"]+"</option>";

  return template;
}

function unionlistload(array){
  var htmltemp ="";
  var templatea = "";
  for(i = 1; i<array.length; i++){
    var data = array[i];
    htmltemp = htmltemp + templateunionlist(data);
	// templatea = templatea + templateunionlist1(data);
  }
  document.getElementById('inputUnion').innerHTML = htmltemp; 
  // document.getElementById('unionlist').innerHTML = templatea;
// console.log("asas");
}
//Ctegory template
function  templateunionlist(data){
  var template = "";
  template += "<option data-tokens= private value='"+data["name"]+"'>"+data["name"]+"</option>";

  return template;
}

function  templateunionlist1(data){
  var template = "";
  template += '<li class="item"><a href="'+data["link"]+'"></a>'+data["name"]+'<hr class="hr"></li>';
 // console.log(template);
  return template;
}

function unionSelector(){
	// document.getElementById('inputUnion').value = document.getElementById('inputCategory').value;
	 for(i = 1; i<categoryArray.length; i++){
    	var data = categoryArray[i];
     	if(data["name"] == document.getElementById('inputCategory').value){
        	document.getElementById('inputUnion').value = data["unionName"];
        }
     }
}


function loadServices(caller, id, action){
  var xhr =  new XMLHttpRequest();
  this.responseType = 'text';
  xhr.onreadystatechange  =  function() {
      
      var ourData = xhr.response;
      if (this.readyState == 4 && this.status == 200) {//if result successful
        var myObj = JSON.parse(this.responseText);
        
        switch (caller){
          case "serviespost":
              servicepostload(myObj);
        	  // console.log(myObj[0]["unionName"]);
        	  document.getElementById('serviceUnion').innerHTML = myObj[0]["unionName"]; 
              break;
          default:
            // homeload(myObj);
            break;
        }
      }
      
  };

  switch(caller){
    case "serviespost":
            var params = 'id='+id+'&action='+action;
            xhr.open("post", "assets/php/getserviceposts.php", true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(params);
            break;
    default:
            break;
  }
}

function servicepostload(array){
  var htmltemp ="";
  filterdata = array;
  for(i = 1; i<array.length; i++){
      var data = array[i];
      htmltemp = htmltemp + serviceprofilepost(data);
  }
  //  console.log(htmltemp);
  if(htmltemp == ""){
    // console.log('hell in servicepostload');
    document.getElementById('servicepostlist').innerHTML = "<div class='center errormsg' >Oho...! Looks like this services has no posts..:-(<br>Try another service</div>"; 
  }
  else{
    document.getElementById('servicepostlist').innerHTML = htmltemp; 
  }
  
//  console.log(htmltemp);
}

function serviceprofilepost(data){
  var template = "";
  template += "<div class= postelement >"+
  "<div class= line1 >"+
          ""+data["name"]+" "+
          "<p>"+data["location"]+" </p>"+
      "</div>"+
      "<div class= line2 >"+
          ""+data["role"]+" "+
          "<p>"+data["date"]+" </p>"+
      "</div>"+
      "<div class= overlay >"+
          "<div class= line3 >"+
              "<img src= "+data["postimage"]+"  class= itemimage >"+
          "</div>"+
          "<div class= layer1 >"+
            "<img src= "+data["offer"]+"  class= size >"+
          "</div>"+
          "<div class= layer2 >"+
              likeGetter(data["isLiked"], data)+
              "<div class= itemoverlay ><i class= commenticon ></i>"+data["commentnumber"]+"<p class='overlaytextPosts' > COMMENTS</p></div>"+
              "<div class= itemoverlaylast ><i class= shareicon ></i>SHARE</div>"+
          "</div>"+
      "</div>"+
      "<div class= line4 >"+
          "<p>"+ 
                  ""+data["des"]+""+
          "</p>"+
      "</div>"+
      "<div class= line5 >"+
          "COMMENTS"+
          "<p class= viewmore  onclick= viewMorePost('comments"+data["id"]+"'); >VIEW MORE</p>"+
      "</div>"+
      "<div id= comments"+data["id"]+"  class= comments >"+
      commentLoad(data["comments"],data["id"])+
      "<div id= hiddenPost"+data["id"]+"  style= display:none >"+getCookie("userName=")+"<span>HiidenPost</span></div>"+
      "</div>"+
      "<input type= text  placeholder= 'Write a comment'  id= 'post"+data["id"]+"'   class= commentinput   onkeypress= postComment(&quot;"+data["id"]+"&quot;); >"+
  "</div>";

  return template;
}

function filterservicepage(tag, tag1, colorclass){
  // filterdata = array;
  var htmltemp ="";
  var flag = 0;
  for(i = 1; i<filterdata.length; i++){
    var data = filterdata[i];
    if(data['offer'] == tag){
      htmltemp = htmltemp + serviceprofilepost(data);

    }
    if(tag == ""){
      htmltemp = htmltemp + serviceprofilepost(data);

    }  
   
  }
  if(htmltemp == ""){
    document.getElementById('servicepostlist').innerHTML = "<div class='center errormsg' >Oho...! Looks like this services has no "+tag1+" posts..:-(<br>Try another service</div>"; 
  }
  else{
    document.getElementById('servicepostlist').innerHTML = htmltemp; 
  }
	 var colorArray = ["scarletcolor","mintcolor","bluecolor","leafcolor","trumpcolor","thanoscolor","infinitycolor"];
	for(i = 0; i<colorArray.length; i++){
    	if(colorArray[i]==colorclass){
        	var myButtonClasses = document.getElementById(colorclass).classList;
        	myButtonClasses.remove(colorclass);
        	myButtonClasses.add(colorclass+"a");
    	}
    	else{
        	var myButtonClasses = document.getElementById(colorArray[i]).classList;
        	myButtonClasses.remove(colorArray[i]+"a");
        	myButtonClasses.add(colorArray[i]);
    	}
	}  
 
}
//Ashish Changes Starts Here
function logOutProcess(){
  setCookie("userName",);
  setCookie("userId",);
  setCookie("isLogged",);
  setCookie("isEdit",);
  setCookie("isActive",);
  window.location.reload();
}

function loginManagement(){
  if(parseInt(getCookie("isLogged="))==1){
    // console.log("logged");
    if(parseInt(getCookie("isActive="))==1){
    setTimeout(function () {
        document.getElementById('loginHead').innerHTML = "<a class= nav-link  href= profile.html?user_id="+getCookie("userId=")+" >"+getCookie("userName=")+"</a>";
        document.getElementById('signUpHead').innerHTML = "<a class= nav-link  href= javascript:logOutProcess() >Log Out</a>";
        document.getElementById('MyUnion').style.display = "block";
	  }, 1500);    
    }
  }
}

function login(){ //login validation
  var data = [];
  var myObj = {};
  
  data[0] = document.getElementById("loginContact").value;
  data[1] = document.getElementById("loginPassword").value;
  myObj = {"userPhone":data[0],"userPassword":data[1]};
  var jSONObj = JSON.stringify(myObj);
  
      xhr =  new XMLHttpRequest();
      this.responseType = 'json';
      xhr.onreadystatechange  =  function() {
          var ourData = xhr.response;
          if (this.readyState == 4 && this.status == 200) {
              if(xhr.responseText !== '0'){
                  // console.log(xhr.responseText)
                  var userObj = JSON.parse(xhr.responseText);
              if(userObj.isActive ==1){
                  setCookie("userName",userObj.userName);
                  setCookie("userId",userObj.userId);
                  setCookie("isLogged",1);
              	  setCookie("isActive",1);
                  window.location.reload();
                  }else{
                  		alert('User not Registered');
                  		document.getElementById("id01").style.display= "none";
                        setCookie("userName",);
                  		setCookie("userId",);
                  		setCookie("isLogged",);
                  }
              
              } else {
                  document.getElementById("errorNote").style.display= "inline";
              }
          }
      };
      xhr.open("POST", "assets/php/login.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send("jsonObj="+jSONObj);
}

function premiumSignUpEdit(){
  var name = document.getElementById('inputFirstname').value;
  var email = document.getElementById('inputEmail').value;
  var phone = document.getElementById('inputPhone').value;
  var password1 = document.getElementById('inputPassword').value;
  var password2 = document.getElementById('inputConfirmPassword').value;
  var category = document.getElementById('inputCategory').value;
  var role = document.getElementById('inputRoleInCompany').value;
  var country = document.getElementById('inputCountry').value;
  var type = document.getElementById('inputType').value;
  var address = document.getElementById('inputAddressLine1').value;
  var state = document.getElementById('inputState').value;
  var location = document.getElementById('inputLocation').value;
  var sublocation = document.getElementById('inputSubLocation').value;
  var pincode = document.getElementById('inputPinCode').value;
  var union = document.getElementById('inputUnion').value;
  var whatsapp = document.getElementById('inputWhatsappNumber').value;
  var website = document.getElementById('inputWebsite').value;
  var phone2 = document.getElementById('inputSecondaryContact').value;
  var skills = document.getElementById('inputSkills').value;
  var privatetag = 0;
  cancelFlag =true;
  if(skills.charAt(0)==","){
    skills = skills.substr(1,skills.length)
  }
  if(phone2.charAt(0)==","){
    phone2 = phone2.substr(1,phone2.length)
  }
  else if(imagedata == null ){
        imagedata = 1;
  }
  if (document.getElementById("privateTag").checked == 1){
    privatetag = 1;
  } else {
    privatetag = 0;
  }

  
  
  // ||phone+password1+password2+category+role
  if(name ==""|| email==""||union == ""|| phone ==""||location==""|| pincode==""|| sublocation==""|| password1 ==""||address=="" || password2 =="" || category =="" || role =="" || country == "" || state=="" || type == "")
  {
    document.getElementById('vaildation').innerHTML= "Please fill all fields.";
    document.getElementById('vaildation').style.display = "block";
  	cancelFlag = false;
    // console.log('if');
    
  }
  else if(password1 != password2){
    document.getElementById('vaildation').innerHTML= "Password don't match!";
    document.getElementById('vaildation').style.display = "block";
  	cancelFlag = false;
  }
  if(cancelFlag){
    document.getElementById('vaildation').style.display = "none";
    // console.log(name+"\n"+email+"\n"+phone+"\n"+password1+"\n"+password2+"\n category="+category+"\n"+role+"\n"+country+"\n type="+type+"\n"+address+"\n"+state+"\n"+location+"\n"+sublocation+"\n"+pincode+"\n union="+union+"\n"+whatsapp+"\n"+website+"\n"+phone2);
   	document.getElementById('premiuimSubmit').innerText = "Submitting...";
  	document.getElementById('premiuimSubmit').style.cursor = "no-drop";
  
  var xhr =  new XMLHttpRequest();
  this.responseType = 'text';
  xhr.onreadystatechange  =  function() {
      
      var ourData = xhr.response;
      if (this.readyState == 4 && this.status == 200) {//if result successful
        // var myObj = JSON.parse(this.responseText);
        if(this.responseText == "success "){
          document.getElementById('id16').style.display = "block";
          window.location = "profile.html"
        }

      }
      
  };
  var id = getCookie("userId=");
  var params = 'name='+name+"&email="+email+"&phone="+phone+"&password="+password1+"&category="+category+"&role="+role+"&country="+country+"&type="+type+"&address="+address+"&state="+state+"&location="+location+"&sublocation="+sublocation+"&pincode="+pincode+"&union="+union+"&whatsapp="+whatsapp+"&website="+website+"&image="+imagedata+"&phone2="+phone2+"&skills="+skills+"&id="+id+"&privatetag="+privatetag;
  xhr.open("post", "assets/php/updateprofiledata.php", true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(params);

  }
  // console.log(name+"\n"+email+"\n"+phone+"\n"+password1+"\n"+password2+"\n"+category+"\n"+role+"\n"+country+"\n"+type);
  return false; 
}
function getPremiumData(){
  // console.log("getProfileData")
  var id = getCookie("userId=");
  var xhr =  new XMLHttpRequest();
  this.responseType = 'text';
  xhr.onreadystatechange  =  function() {
  if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      // console.log(myObj[1]);
      var data = myObj[1];
			setTimeout(function () {
        document.getElementById('inputFirstname').value = data["name"];
        document.getElementById('inputEmail').value = data["email"];
        document.getElementById('inputPhone').value = data["phone"];
        document.getElementById('inputPassword').value = data["password"];
        document.getElementById('inputConfirmPassword').value = data["password"];
        document.getElementById('inputCategory').value = data["category"];
        document.getElementById('inputRoleInCompany').value = data["role"];
        document.getElementById('inputCountry').value = data["country"].toUpperCase();
        // console.log(data["country"].toUpperCase());
        document.getElementById('inputType').value = data["type"];
        var address = data["address"];
        address = address.replace(/&#32;/g," ");
        document.getElementById('inputAddressLine1').value = address;
        document.getElementById('inputState').value = data["state"];
        document.getElementById('inputLocation').value = data["location"];
        document.getElementById('inputSubLocation').value = data["sublocation"];
        document.getElementById('inputPinCode').value = data["pincode"];
        document.getElementById('inputUnion').value = data["union"];
        document.getElementById('inputWhatsappNumber').value = data["whatapp"];
        document.getElementById('inputWebsite').value = data["website"];
        document.getElementById('inputSecondaryContact').value = data["phone2"];
        document.getElementById('inputSkills').value = data["skills"];
        // console.log(data["type"]);
        if(document.getElementById("inputSkills").value !=""){
          spanPopulate1(document.getElementById("inputSkills").value);
        }
        if(document.getElementById("inputSecondaryContact").value !=""){
          spanPopulatePhone1(document.getElementById("inputSecondaryContact").value);
        }
        
			}, 600);
    }
  }
  var params = 'id='+id;
  xhr.open("post", "assets/php/getprofilecard.php", true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(params);
  
}


//To handle skills field in signup page 
function getskillvalue(){

  var skils = document.getElementById("hide").value;
  if(skils != ""){
    document.getElementById("inputSkills").value = document.getElementById("inputSkills").value +"," +skils ;
    document.getElementById("hide").value = "";
    spanPopulate(document.getElementById("inputSkills").value);
  
  }

}
function getskillvalue2(){
  if(event.keyCode === 13){
    var skils = document.getElementById("hide").value;
    if(skils != ""){
      document.getElementById("inputSkills").value = document.getElementById("inputSkills").value +"," +skils ;
      document.getElementById("hide").value = "";
      spanPopulate(document.getElementById("inputSkills").value);
    
    }
  }
}


function postComment(p_id){
  if(event.keyCode === 13){
    // console.log(p_id+"\n"+getCookie("userId=")+"\n"+document.getElementById('post'+comment).value);
    var comment = document.getElementById('post'+p_id).value;
    var xhr =  new XMLHttpRequest();
    this.responseType = 'text';
    xhr.onreadystatechange  =  function() {
    if (this.readyState == 4 && this.status == 200) {//if result successful
      if(xhr.responseText == "Success "){
        document.getElementById('post'+p_id).value = "";
        document.getElementById('hiddenPost'+p_id).innerHTML= getCookie("userName=")+"<span>"+comment+"</span>";
        document.getElementById('hiddenPost'+p_id).style.display = "block";
      }
      } 
    };
    var u_id = getCookie("userId=");

    var params = 'p_id='+p_id +"&comment="+comment+"&u_id="+u_id;
    xhr.open("post", "assets/php/postcomment.php", true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  	if(getCookie("isActive=")==1){
    	xhr.send(params);
    }
  	else{
    	toggleSignUp('loginBox','all','id01');
    }
  }
}

function spanPopulate(data){
  data = data + ",";
  var htmltemp = ""
 
  var data1 = data.substr(1, data.length-2);
  // console.log(data1);
  data1 = data1.split(',');
  if(data1.length>10){
    alert("Maximum 10 skills")
  }
  else{
    for(i=0;i<data1.length;i++){
      var str = data1[i];
      str = str.replace(/ /g,"&#32;");
      htmltemp = htmltemp + "<div id= span"+i+"  class='tagInForm'>"+data1[i]+"<i class='closeicon' onclick='deleteFormForm(&quot;span"+i+"&quot;,&quot;"+str+"&quot;);' ></i> </div>";
  }
  htmltemp = htmltemp + "<input id='hide'  class='hide' onkeypress='getskillvalue2();'>";
  document.getElementById('spanreplace').innerHTML = htmltemp;
  document.getElementById('hide').focus();
  }

}


function spanPopulate1(data1){
  var htmltemp = "";
  data1  = data1.split(",");
    for(i=0;i<data1.length;i++){
      var str = data1[i];
      str = str.replace(/ /g,"&#32;");
      htmltemp = htmltemp + "<div id= span"+i+"  class='tagInForm'>"+data1[i]+"<i class='closeicon' onclick='deleteFormForm(&quot;span"+i+"&quot;,&quot;"+str+"&quot;);' ></i> </div>";
    }
  htmltemp = htmltemp + "<input id='hide'  class='hide' onkeypress='getskillvalue2();'>";
  document.getElementById('spanreplace').innerHTML = htmltemp;
  // document.getElementById('hide').focus();
  }


function deleteFormForm(idspan,deleteword){
  document.getElementById(idspan).style.display = "none";
  var str = document.getElementById("inputSkills").value;
  var newstr = "";
  str = str.split(',');
  for(i=0;i<str.length;i++){
    if(str[i]==deleteword){
      str[i] = str[i].replace(deleteword,'~');
      
    }
    console.log(str[i]);
  }
  for(i=0;i<str.length;i++){
    if(str[i]!=""){
      if(str[i] == "~"){
        continue;
      }
      newstr = newstr+"," + str[i];
      // str[i] = str[i].replace(deleteword,'');
      
    }
  }
  // newstr = newstr.substring(1,newstr.length)
  console.log(newstr);
  // console.log('delete\n' +deleteword +"\n"+  str);
  document.getElementById("inputSkills").value = newstr;
}

function viewMorePost(commentEle){
  // alert(commentEle);
  var p_id =commentEle.split('comments')[1];
  var xhr =  new XMLHttpRequest();
  this.responseType = 'text';
  xhr.onreadystatechange  =  function() {
      
      var ourData = xhr.response;
      if (this.readyState == 4 && this.status == 200) {//if result successful
        var myObj = JSON.parse(this.responseText);
        var htmltemp = "";
        for(i = 0; i<myObj.length; i++){
          htmltemp = htmltemp + "<div id= "+myObj[i]["id"]+" >"+myObj[i]["name"]+" <span>"+myObj[i]["comment"]+" </span><div class= reportRed onclick= reportPost(&quot;"+myObj[i]["id"]+"&quot;); >Report?</div></div>"
        }
        // console.log(htmltemp);
        document.getElementById(commentEle).innerHTML = htmltemp;
      }
      
  };
  var id = getCookie("userId=");
  var params = 'id='+p_id;
  xhr.open("post", "assets/php/getcomments.php", true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(params);
}
function reportPost(postid){
  document.getElementById(postid).style.display = "none";
  var xhr =  new XMLHttpRequest();
  this.responseType = 'text';
  xhr.onreadystatechange  =  function() {
      
      var ourData = xhr.response;
      if (this.readyState == 4 && this.status == 200) {//if result successful
        // var myObj = JSON.parse(this.responseText);
        if(this.responseText == "success "){
          // window.location = "profile.html"
        }

      }
      
  };
  var id = getCookie("userId=");
  var params = 'id='+postid;
  xhr.open("post", "assets/php/postreportedpost.php", true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(params);

}

function commentLoad(comments,post_id){
  if(comments.length == 0){
    // console.log("em");
    return "<div class= center > No comments </div>"
  }
  else if(comments.length>0){
    // console.log(parseInt(comments.length));
    if(parseInt(comments.length)== 1){
      // console.log("hell1\n");
      var htmltemp = "<div id= "+comments[0]["id"]+" >"+comments[0]["name"]+" <span>"+comments[0]["comment"]+" </span><div class= reportRed onclick= reportPost(&quot;"+comments[0]["id"]+"&quot;); >Report?</div></div>";
      // console.log(htmltemp);
      return htmltemp;
    }
    else if(parseInt(comments.length)== 2){
      var htmltemp = "<div id= "+comments[0]["id"]+" >"+comments[0]["name"]+" <span>"+comments[0]["comment"]+" </span><div class= reportRed onclick= reportPost(&quot;"+comments[0]["id"]+"&quot;); >Report?</div></div>"+
      "<div id= "+comments[1]["id"]+" >"+comments[1]["name"]+" <span>"+comments[1]["comment"]+" </span><div class= reportRed onclick= reportPost(&quot;"+comments[1]["id"]+"&quot;); >Report?</div></div>";
      // console.log("hell2\n");
      return htmltemp;
    }
    else if(parseInt(comments.length)== 3){
      var htmltemp = "<div id= "+comments[0]["id"]+" >"+comments[0]["name"]+" <span>"+comments[0]["comment"]+" </span><div class= reportRed onclick= reportPost(&quot;"+comments[0]["id"]+"&quot;); >Report?</div></div>"+
      "<div id= "+comments[1]["id"]+" >"+comments[1]["name"]+" <span>"+comments[1]["comment"]+" </span><div class= reportRed onclick= reportPost(&quot;"+comments[1]["id"]+"&quot;); >Report?</div></div>"+
      "<div id= "+comments[2]["id"]+" >"+comments[2]["name"]+" <span>"+comments[2]["comment"]+" </span><div class= reportRed onclick= reportPost(&quot;"+comments[2]["id"]+"&quot;); >Report?</div></div>";
      // console.log("hell3\n");
      return htmltemp;
    }
  }
}

//To Edit profile Data
function editProfileData(){
  setCookie("isEdit",1);
  window.location= "premiumedit.html";
}

function confrimupload(){
  document.getElementById('b64').innerHTML = "Image Uploaded!..."
  setTimeout(function(){ 
    
    document.getElementById('loginBox1').style.display="none";
  	document.getElementById('result').style.display="initial";
   }, 1000);
}

function cancelupload(){
  document.getElementById('b64').innerHTML = "Upload Canceled";
  postimage = null;
  setTimeout(function(){ 
    
    document.getElementById('loginBox1').style.display="none";
   }, 1000);
}
function postImageGetter(data) {
  postimage = data;
  console.log("hell is heaven");
}

function getphonevalue(){

  var skils = document.getElementById("hidephone").value;
  if(skils != ""){
    if(skils.length == 10){
      document.getElementById("inputSecondaryContact").value = document.getElementById("inputSecondaryContact").value +"," +skils ;
      document.getElementById("hidephone").value = "";
      spanPopulatePhone(document.getElementById("inputSecondaryContact").value);
    }

  }

}
function getphonevalue2(){
  if(event.keyCode === 13){
    var skils = document.getElementById("hidephone").value;
    if(skils != ""){
      if(skils.length == 10){
        document.getElementById("inputSecondaryContact").value = document.getElementById("inputSecondaryContact").value +"," +skils ;
        document.getElementById("hidephone").value = "";
        spanPopulatePhone(document.getElementById("inputSecondaryContact").value);
      }
      else{
        alert("Enter 10 digits for phone number.")
      }
    }
  }
}

function spanPopulatePhone(data){
  data = data + ",";
  var htmltemp = ""
 
  var data1 = data.substr(1, data.length-2);
  // console.log(data1);
  data1 = data1.split(',');
  if(data1.length>3){
    alert("Maximum 3 Number")
  }
  else if(data1 == ""){

  }
  else{
    for(i=0;i<data1.length;i++){
      var str = data1[i];
      str = str.replace(/ /g,"&#32;");
      htmltemp = htmltemp + "<div id= spanphone"+i+"  class='tagInForm'>"+data1[i]+"<i class='closeicon' onclick='deleteFromPhone(&quot;spanphone"+i+"&quot;,&quot;"+str+"&quot;);' ></i> </div>";
  }
  htmltemp = htmltemp + "<input id='hidephone'  class='hide' onkeypress='getphonevalue2();'>";
  document.getElementById('spanreplacephone').innerHTML = htmltemp;
  document.getElementById('hidephone').focus();
  }

}


function spanPopulatePhone1(data1){
  var htmltemp = "";
  data1  = data1.split(",");
    for(i=0;i<data1.length;i++){
      var str = data1[i];
      str = str.replace(/ /g,"&#32;");
      htmltemp = htmltemp + "<div id= spanphone"+i+"  class='tagInForm'>"+data1[i]+"<i class='closeicon' onclick='deleteFromPhone(&quot;spanphone"+i+"&quot;,&quot;"+str+"&quot;);' ></i> </div>";
    }
  htmltemp = htmltemp + "<input id='hidephone'  class='hide' onkeypress='getphonevalue2();'>";
  document.getElementById('spanreplacephone').innerHTML = htmltemp;
  // document.getElementById('hide').focus();
}

function deleteFromPhone(idspan,deleteword){
  document.getElementById(idspan).style.display = "none";
  var str = document.getElementById("inputSecondaryContact").value;
  var newstr = "";
  str = str.split(',');
  for(i=0;i<str.length;i++){
    if(str[i]==deleteword){
      str[i] = str[i].replace(deleteword,'~');
      
    }
    // console.log(str[i]);
  }
  for(i=0;i<str.length;i++){
    if(str[i]!=""){
      if(str[i] == "~"){
        continue;
      }
      newstr = newstr+"," + str[i];
      // str[i] = str[i].replace(deleteword,'');
      
    }
  }
  // newstr = newstr.substring(1,newstr.length)
  console.log(newstr);
  // console.log('delete\n' +deleteword +"\n"+  str);
  document.getElementById("inputSecondaryContact").value = newstr;
}
function queryHandlerProfile(){
  var qryUserId = "";
  // var success= NaN;
  var qryStrings = getQueryString();
  if(qryStrings == "null"){
      if(getCookie("userId=")!="null"){
          loadProfileInfo('profilecard',getCookie("userId="));
          loadProfileInfo('profilepost',getCookie("userId="));
      }
      else{
          alert("Login Please");
          window.location = "index.html";
      }
  }else if(qryStrings == ""){
      console.log("emptyArry");
      reDirect("error.html");
  }
  else{
      qryStrings.forEach(element => {
      if(element.startsWith('user_id')){
          qryUserId = element.split('=')[1];
          if(isNaN(parseInt(qryUserId))){
              reDirect("error.html");
          }else{
              if(qryUserId == getCookie("userId=")){
                  loadProfileInfo('profilecard',qryUserId);
                  loadProfileInfo('profilepost',qryUserId);
              }
              else{
                  // console.log(qryUserId);
                  loadProfileInfo('profilecard',qryUserId);
                  
                  loadProfileInfo('profilepost',qryUserId);
                  setTimeout(function () {
                      document.getElementById('editButton').style.display= "none";
                  	  document.getElementById('upgradeIdBtn').style.display= "none";
                      document.getElementById('divPostElement').style.display= "none";
                      if(priv == 1){
                        document.getElementById('whatsappnum').style.display= "none";
                        document.getElementById('scnumber').style.display= "none";
                        document.getElementById('addresshide').style.display= "none";
                        document.getElementById('whatsappimg').style.display= "none";
                        
                      }
                  }, 1500);
              }
          }
      } 
      else if(isNaN(parseInt(qryUserId))){
        reDirect("error.html");
    }
  });
  }
}

function queryHandlerService(){
  var qryUserId = "";
  var qryStrings = getQueryString();
  if(qryStrings == "null"){
      if(getCookie("union_type=")!="null"){
        loadServices('serviespost',getCookie("userId="),"userAction");
      }
      else{
          alert("Login Please");
          window.location = "index.html";
      }
  }else if(qryStrings == ""){
      console.log("emptyArry");
      reDirect("error.html");
  }
  else{
      qryStrings.forEach(element => {
      if(element.startsWith('union_type')){
          qryUserId = element.split('=')[1];
          if(isNaN(parseInt(qryUserId))){
              reDirect("error.html");
          }else{
              if(qryUserId == getCookie("userId=")){
                loadServices('serviespost',qryUserId,"queryAction");
              }
              else{
                  loadServices('serviespost',qryUserId,"queryAction");
              }
          }
      } 
      else if(isNaN(parseInt(qryUserId))){
        reDirect("error.html");
    }
  });
  }
}

function queryHandlerIndex(){
  var qryUserId = "";
  var qryStrings = getQueryString();
  if(qryStrings == "null"){

  }else if(qryStrings == ""){
      // console.log("emptyArry");
      reDirect("error.html");
  }
  else{
      qryStrings.forEach(element => {
      if(element.startsWith('show_model')){
          qryUserId = element.split('=')[1];
          if(qryUserId == "true"){
            console.log(qryUserId);
            setTimeout(function () {
              toggleSignUp('premiumBox','nonPremiumBox','id03');
          }, 1000);
          }
      } 
      else if(isNaN(parseInt(qryUserId))){
        reDirect("error.html");
    }
  });
  }

}

function premiumSignUpSave(){
  var name = document.getElementById('inputFirstname').value;
  var email = document.getElementById('inputEmail').value;
  var phone = document.getElementById('inputPhone').value;
  var password1 = document.getElementById('inputPassword').value;
  var password2 = document.getElementById('inputConfirmPassword').value;
  var category = document.getElementById('inputCategory').value;
  var role = document.getElementById('inputRoleInCompany').value;
  var country = document.getElementById('inputCountry').value;
  var type = document.getElementById('inputType').value;
  var address = document.getElementById('inputAddressLine1').value;
  var state = document.getElementById('inputState').value;
  var location = document.getElementById('inputLocation').value;
  var sublocation = document.getElementById('inputSubLocation').value;
  var pincode = document.getElementById('inputPinCode').value;
  var union = document.getElementById('inputUnion').value;
  var whatsapp = document.getElementById('inputWhatsappNumber').value;
  var website = document.getElementById('inputWebsite').value;
  var phone2 = document.getElementById('inputSecondaryContact').value;
  var skills = document.getElementById('inputSkills').value;
  var userId = currentUid;
  var employId= 0;
  var privatetag = 0;
  var privatetag = 0;
  if(skills.charAt(0)==","){
    skills = skills.substr(1,skills.length)
  }
  if(phone2.charAt(0)==","){
    phone2 = phone2.substr(1,phone2.length)
  }
  if (document.getElementById("privateTag").checked == 1){
    privatetag = 1;
  } else {
    privatetag = 0;
  }
  if (document.getElementById("prospectTag").checked == 1){
    prospectTag = 1;
    
  } else {
    prospectTag = 0;
    
  }
  if(getCookie("isAdmin=")==1){
    employId = getCookie("empId=");
  }
  
    document.getElementById('vaildation').style.display = "none";
  
  var xhr =  new XMLHttpRequest();
  this.responseType = 'text';
  xhr.onreadystatechange  =  function() {
      
      var ourData = xhr.response;
      if (this.readyState == 4 && this.status == 200) {//if result successful
        // var myObj = JSON.parse(this.responseText);
        // if(this.responseText == "success "){
        //   window.location = "package.html"
        // }
        alert("Information have been saved to the database.");

      }
      
  };
  var params = 'name='+name+"&email="+email+"&phone="+phone+"&password="+password1+"&category="+category+"&role="+role+"&country="+country+"&type="+type+"&address="+address+"&state="+state+"&location="+location+"&sublocation="+sublocation+"&pincode="+pincode+"&union="+union+"&whatsapp="+whatsapp+"&website="+website+"&image="+imagedata+"&phone2="+phone2+"&skills="+skills+"&privatetag="+privatetag+"&employId="+employId+"&userId="+userId+"&prospectTag="+prospectTag;
  xhr.open("post", "assets/php/saveDataProfile.php", true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(params);

  // }
  // console.log(name+"\n"+email+"\n"+phone+"\n"+password1+"\n"+password2+"\n"+category+"\n"+role+"\n"+country+"\n"+type);
  return false; 
}

function getSavedDataProfile(id){
  currentUid = id;
  var xhr =  new XMLHttpRequest();
  this.responseType = 'text';
  xhr.onreadystatechange  =  function() {
  if (this.readyState == 4 && this.status == 200) {

    if(this.responseText.split("~")[0]==1){
      window.location = this.responseText.split("~")[1];
    }
    else{
      var myObj = JSON.parse(this.responseText);
      // console.log(myObj[1]);
      var data = myObj[1];
  		setTimeout(function () {
        document.getElementById('inputFirstname').value = data["name"];
        document.getElementById('inputEmail').value = data["email"];
        document.getElementById('inputPhone').value = data["phone"];
        document.getElementById('inputPassword').value = data["password"];
        document.getElementById('inputConfirmPassword').value = data["password"];
        document.getElementById('inputCategory').value = data["category"];
        document.getElementById('inputRoleInCompany').value = data["role"];
        document.getElementById('inputCountry').value = data["country"] == null || data["country"] == "" || data["country"].toLowerCase() == "null"? "IN" : data["country"];
        document.getElementById('inputType').value = data["type"];
        var address = data["address"];
        address = address.replace(/&#32;/g," ");
        document.getElementById('inputAddressLine1').value = address;
        document.getElementById('inputState').value =  data["state"] == null || data["state"] == "" || data["state"].toLowerCase() == "null"? "Kerala" : data["state"];
        document.getElementById('inputLocation').value = data["location"];
        document.getElementById('inputSubLocation').value = data["sublocation"];
        document.getElementById('inputPinCode').value = data["pincode"];
        document.getElementById('inputUnion').value = data["union"];
        document.getElementById('inputWhatsappNumber').value = data["whatapp"];
        document.getElementById('inputWebsite').value = data["website"];
        document.getElementById('inputSecondaryContact').value = data["phone2"];
        document.getElementById('inputSkills').value = data["skills"];
        if(data["isProspect"] == 1){
          document.getElementById('prospectTag').checked = true;
        }
        // console.log(data["isProspect"]);
        
        // console.log(data["type"]);
        if(document.getElementById("inputSkills").value !=""){
          spanPopulate1(document.getElementById("inputSkills").value);
        }
        if(document.getElementById("inputSecondaryContact").value !=""){
          spanPopulatePhone1(document.getElementById("inputSecondaryContact").value);
        }
        
  		}, 600);
    }

    }
  }
  var params = 'id='+id;
  xhr.open("post", "assets/php/getprofilepre.php", true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(params);
}

function freePackageHnadler(){
  document.getElementById('successfullMessage').innerHTML = "You are selecting the free package, you will only have access to limited features, are you sure?";
  document.getElementById('confrim').style.display = "block";
  document.getElementById('cancel').style.display = "block";
  document.getElementById('toProfile').style.display = "none";
  document.getElementById('packageHeader').innerHTML = "Free Package Selected";
  toggleSignUp1('loginBox1','all','id09');
}

function cancelpackage(){
  setTimeout(function(){ 
    
    document.getElementById('loginBox1').style.display="none";
   }, 100);
}

function freePackageSelect(){
  var id = getCookie("userId=");
  var emid = getCookie("emId=");
  // console.log(id+"\n"+emid)
  if(emid=="null"){
    emid = 0;
  }
  var xhr =  new XMLHttpRequest();
  this.responseType = 'text';
  xhr.onreadystatechange  =  function() {
    if (this.readyState == 4 && this.status == 200) {
      setCookie("isActive","1");
      setCookie("isLogged","1");
      window.location = "profile.html?user_id="+this.responseText;

    }
  }

  var params = 'id='+id+'&emid='+emid;
  xhr.open("post", "assets/php/postfreeprofile.php", true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(params);
}

function premiumPackageHandler(month, callAction){
  var id = getCookie("userId=");
  var emid = getCookie("emId=");
  if(emid=="null"){
    emid = 0;
  }
  var xhr =  new XMLHttpRequest();
  this.responseType = 'text';
  xhr.onreadystatechange  =  function() {
    if (this.readyState == 4 && this.status == 200) {
    setCookie("isActive","1");
    setCookie("isLogged","1");
    // window.location = "profile.html?user_id="+this.responseText;

    
    }
  }               

  var params = 'id='+id+'&emid='+emid+'&month='+month+'&callAction='+callAction;
  xhr.open("post", "assets/php/postpackageprofile.php", true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(params);
}
//Function to download Card 
function downloadCard(path){
  console.log(path);
  var xhr =  new XMLHttpRequest();
  this.responseType = 'text';
  xhr.onreadystatechange  =  function() {
    if (this.readyState == 4 && this.status == 200) {
    // window.location = "profile.html?user_id="+this.responseText;
      window.open(this.responseURL, '_blank');
    }
  }               
  var params = 'path='+path;
  xhr.open("post", "assets/php/exportCard.php", true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(params);
}

function likePost(postId){
  var params;
  var xhr =  new XMLHttpRequest();
  this.responseType = 'text';
  xhr.onreadystatechange  =  function() {
    if (this.readyState == 4 && this.status == 200) {
	  	// if(xhr.responseText == 2){
	  	// var like = document.getElementById(postId+'like').innerText;
	  	// like = like.split(' ');
	  	// var i = parseInt(like[0]);
	  	// console.log(i+"\n");
	  	// i++;
	  	// document.getElementById(postId+'likefill').innerHTML = "<i class= filledheart ></i>"+i+" LIKES";
	  	// }
    }
  }
  if(getCookie("isLogged=")==1){
    if(document.getElementById(postId+"likefill").style.display == "none"){
      document.getElementById(postId+"like").style.display = "none";
      document.getElementById(postId+"likefill").style.display = "block";
      var like = document.getElementById(postId+'like').innerText;
      like = like.split(' ');
      var i = parseInt(like[0]);
      // console.log(i+"\n");
      i++;
	  document.getElementById(postId+'likefill').innerHTML = "<i class= filledheart ></i>"+i+" LIKES";
      params = "action=add"+"&userid="+getCookie("userId=")+"&postid="+postId;
      xhr.open("post", "assets/php/updatelike.php", true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send(params);
    }
    else{
      document.getElementById(postId+"like").style.display = "block";
      document.getElementById(postId+"likefill").style.display = "none";
      // console.log("Like--");
      params = "action=delete"+"&userid="+getCookie("userId=")+"&postid="+postId;
      xhr.open("post", "assets/php/updatelike.php", true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send(params);
    }
  }
  else{
    toggleSignUp('loginBox','all','id01');
    // document.getElementById(postId+"like").style.display = "none";
  }
}

function likeGetter(value, data){
  if(value == "1"){
    var likeTemplate =   "<div class= itemoverlay id="+data["id"]+"like style= display:none  onclick= likePost("+data["id"]+"); ><i class= heart ></i>"+data["likes"]+"<p class='overlaytextPosts' > LIKES</p></div>"+
    "<div class= itemoverlay id="+data["id"]+"likefill    onclick= likePost("+data["id"]+"); ><i class= filledheart ></i>"+data["likes"]+"<p class='overlaytextPosts' > LIKES</p></div>";
    // return likeTemplate;
  }
  else if(value == "0"){
    var likeTemplate =   "<div class= itemoverlay id="+data["id"]+"like  onclick= likePost("+data["id"]+"); ><i class= heart ></i>"+data["likes"]+"<p class='overlaytextPosts' > LIKES</p></div>"+
    "<div class= itemoverlay id="+data["id"]+"likefill  style= display:none  onclick= likePost("+data["id"]+"); ><i class= filledheart ></i>"+data["likes"]+"<p class='overlaytextPosts' > LIKES</p></div>";
  }
  else{
    var likeTemplate =   "<div class= itemoverlay id="+data["id"]+"like  onclick= likePost("+data["id"]+"); ><i class= heart ></i>"+data["likes"]+"<p class='overlaytextPosts' > LIKES</p></div>"+
    "<div class= itemoverlay id="+data["id"]+"likefill  style= display:none  onclick= likePost("+data["id"]+"); ><i class= filledheart ></i>"+data["likes"]+"<p class='overlaytextPosts' > LIKES</p></div>";
  }
  return likeTemplate;
  
}

//To handle forgot password condition
function forgotPassword(){
  var data = [];
  data[0] =  document.getElementById("forgotContact").value;//get value from input box
  data[1] = getCookie("emId=");//get emId
  myObj = {"phone":data[0],"emId":data[1]};
  globeCopy = myObj;//Store value in gobal variable ! important for latter function verfiyForgotOTPPassword()
  sendOTPForgot();//send OTP 
}

//To handle sending of OTP
function sendOTPForgot(){
  OTP = generateOTP();
  myObj = globeCopy;
  if(OTPcount>0){
      var message = "Your OTP is "+ OTP;//message send through SMS
      var number = myObj.phone;
      var params = "number="+number+"&message="+message+"&OTP="+OTP;//parameter to pass to php
      //send otp to mobile
      xhr =  new XMLHttpRequest();
      this.responseType = 'text';
      xhr.onreadystatechange  =  function() {
          if (this.readyState == 4 && this.status == 200) {
              if(xhr.responseText != '0'){
              	  toggleSignUp("otpBoxForgot","all","id07");//open OTP box
                  var OTPObj = JSON.parse(xhr.responseText);
                  alert("OTP send!");
                  OTPsuccess = OTPObj.type;
                  OTPcount += -1;
              }
          else if(xhr.responseText == '0'){
				 alert('Sorry this phone number is not registerd in our Database.');
          		 // document.getElementById('id07').style.display='none';
          }
          else {
                  alert("Verification Failed! Try again!");
              }
          }
      };
      xhr.open("POST", "assets/php/test1.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(params);
  } else {
      document.getElementById("otpBoxForgot").style.display = "none";//Close Model box when OTP send limit is reached;
      alert('OTP send Limit has been reached. Please Try again Later');
      // document.getElementById("limitDisplay").style.display = "block";
  }
}

//To verify OTP
function verfiyForgotOTP(){
  var OTPNew =  document.getElementById('otpForgot').value;
  if(OTPNew == OTP){//Checking given OTP to Generated OTP
    document.getElementById('id07').style.display='none';
    toggleSignUp("forgotPasswordBox","all","id08");//Open Password change box
    OTPcount = 3;
  }
  else{
    alert("OTP Don't Match");
  }
}

//To match password and update database
function verfiyForgotOTPPassword(){
  if(document.getElementById('forgotNewPassword').value == document.getElementById('forgotNewPassword1').value){//checking if password match
     var params = "number="+globeCopy.phone+"&password="+document.getElementById('forgotNewPassword').value;//get phone number from global to get via php
     xhr =  new XMLHttpRequest();
     this.responseType = 'text';
     xhr.onreadystatechange  =  function() {
         if (this.readyState == 4 && this.status == 200) {
             if(xhr.responseText == '1'){
                alert("Password Updated. Please Login!");
                document.getElementById('id08').style.display='none';
                toggleSignUp('loginBox','all','id01');
             } else {
                 alert("Oho! Server Issue Try again later.");
             }
         }
     };
     xhr.open("POST", "assets/php/changePword.php", true);
     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xhr.send(params);
  }
  else{
      alert("Passwords Don't Match");
  }
}

//To get autocomplete data from Elastic
function autocompleteGetter(){
  var searchWord = document.getElementById('search').value;
  var params = "search="+searchWord;//get phone number from global to get via php
  xhr =  new XMLHttpRequest();
  this.responseType = 'array';
  xhr.onreadystatechange  =  function() {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(xhr.responseText);
        countries = data;
        autocomplete(document.getElementById("search"), countries);
      }
  };
  xhr.open("POST", "assets/php/searchAuto.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(params);
}


function autocompleteGetterPro(){
  var searchWord = document.getElementById('search').value;
  var params = "search="+searchWord;//get phone number from global to get via php
  xhr =  new XMLHttpRequest();
  this.responseType = 'array';
  xhr.onreadystatechange  =  function() {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(xhr.responseText);
        // console.log(data);
        countries = data;
        autocompletePro(document.getElementById("search"), countries);
      }
  };
  xhr.open("POST", "assets/php/searchAuto.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(params);
}


function autocompletePro(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  var str = "",cat = "";
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false;}
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-itemspro");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        // var datase = arr[i].substr(0, val.length)
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        str = arr[i].substr(0, val.length);
        // b.innerHTML += arr[i].substr(val.length);
        str += arr[i].substr(val.length);
        var temp1 = str.split('~');
        b.innerHTML += temp1[0].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + temp1[0]+"~" + temp1[1] + "'>";
        // console.log(temp1[0]);
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
        /*insert the value for the autocomplete text field:*/
        str = str.split('[')[0];
        inp.value = str;
        // console.log(str);
        window.location = "profileList.html?cat_type="+cat+"&srch_key="+str+"&loc="+local;
        // console.log(cat+"in click "+str);
        /*close the list of autocompleted values,
        (or any other open lists of autocompleted values:*/
        closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
        else{
          window.location = "profileList.html?srch_key="+inp.value+"&loc="+local;
        }

      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    // console.log(currentFocus);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
    var str1 = x[currentFocus].childNodes[2].value;
    str1 = str1.split("~");
    str = str1[0];
    cat = str1[1];
    // console.log(x[currentFocus].childNodes[2].value);
    document.getElementById('search').value = str;
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-itemspro");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
      }
    }
    // document.getElementById('search').value = str;
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
} 