
var globeCopy = {}; //required global variable
var OTPcount = 3;
var OTP = "";
var OTPsuccess = "error";
var countkeypress = 0;
var filterdata ;
var countries = ["Afghanistan~1","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland~2","India~3","Indonesia~4","Iran~5","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
var imagedata ;
var postimage ;
var local =1;

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

function reDirect(loc){ //redirect to any page without storing as cache.. mainly used when logged in

    var page = window.location.protocol+"//"+window.location.hostname+"/helloMyWork/"+loc;
    window.location.replace(page);
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
    document.getElementById("myDropdown").style.display='none';
    
}

function signUp(selectBox){ //sign up form
    
    var data = [];
    var myObj = {};
    
    if(confirm("Confirm Sign Up?")){
        if(selectBox == 'premium'){
            data[0] =  document.getElementById("premiumName").value;
            data[1] =  document.getElementById("premiumPhone").value;
            myObj = {"newName":data[0],"newPhone":data[1],"userType":selectBox};
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
           
        var jSONObj = JSON.stringify(myObj);
        console.log("-> "+jSONObj);
        xhr =  new XMLHttpRequest();
        this.responseType = 'text';
           xhr.onreadystatechange  =  function() {
            var ourData = xhr.response;
            if (this.readyState == 4 && this.status == 200) {
                if(xhr.responseText == '1'){
                    alert("Successful!");
                    setCookie("userName",myObj.newName);
                    window.location.reload();
                } else {
                    alert("Update Failed! Try again!");
                }
            }
        };
        xhr.open("POST", "assets/php/signUp.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("jsonObj="+jSONObj);
    }
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
                    alert("OTP send!");
                    OTPsuccess = OTPObj.type;
                    OTPcount += -1;
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
            console.log("-> "+jSONObj);
            xhr =  new XMLHttpRequest();
            this.responseType = 'text';
              xhr.onreadystatechange  =  function() {
                var ourData = xhr.response;
                if (this.readyState == 4 && this.status == 200) {
                    if(xhr.responseText == '1'){
                        alert("OTP Verified!");
                        setCookie("userName",myObj.newName);
                        OTPcount = 3;
                        reDirect("premiumsignup.html");
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


function myFunction(popName) { //To create pop up bubble in buttons
    if(getCookie("userName=")=="null"){
        toggleSignUp('loginBox','all','id01');
    } else {
        document.getElementById(popName).style.display = 'block';
        var popup = document.getElementById(popName);
        popup.classList.toggle("show");
    }
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
    console.log(filter.length); 
  }
  else if(filter.length < 2){
    ul.style.display = "none";
    console.log(filter.length); 
  }

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
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
  skills = skills.substring(1);
  skills = skills.split(",");
  var newstr = skills;
  skills = "";
  for(i=0;i<newstr.length-1;i++){
    skills = skills+"," + newstr[i];
  }
  skills = skills.substring(1);
  
  
  // ||phone+password1+password2+category+role
  if(name ==""|| email==""||union == ""|| phone ==""||location==""|| pincode==""|| sublocation==""|| password1 ==""||address=="" || password2 =="" || category =="" || role =="" || country == "" || state=="" || type == "")
  {
    document.getElementById('vaildation').innerHTML= "Please fill all fields.";
    document.getElementById('vaildation').style.display = "block";
    // console.log('if');
    
  }
  else if(password1 != password2){
    document.getElementById('vaildation').innerHTML= "Password don't match!";
    document.getElementById('vaildation').style.display = "block";
  }
  else if(imagedata == null ){
    document.getElementById('vaildation').innerHTML= "Image is empty";
    document.getElementById('vaildation').style.display = "block";
  }
  else{
    document.getElementById('vaildation').style.display = "none";
    // console.log(name+"\n"+email+"\n"+phone+"\n"+password1+"\n"+password2+"\n category="+category+"\n"+role+"\n"+country+"\n type="+type+"\n"+address+"\n"+state+"\n"+location+"\n"+sublocation+"\n"+pincode+"\n union="+union+"\n"+whatsapp+"\n"+website+"\n"+phone2);
  
  
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
  var params = 'name='+name+"&email="+email+"&phone="+phone+"&password="+password1+"&category="+category+"&role="+role+"&country="+country+"&type="+type+"&address="+address+"&state="+state+"&location="+location+"&sublocation="+sublocation+"&pincode="+pincode+"&union="+union+"&whatsapp="+whatsapp+"&website="+website+"&image="+imagedata+"&phone2="+phone2+"&skills="+skills;
  xhr.open("post", "assets/php/postprofiledata.php", true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(params);

  }
  // console.log(name+"\n"+email+"\n"+phone+"\n"+password1+"\n"+password2+"\n"+category+"\n"+role+"\n"+country+"\n"+type);
  return false; 
}

//To handle skills field in signup page 
function getskillvalue(){
  var skils = document.getElementById("inputSkills").value;
  alert(skils);
  document.getElementById("inputSkills").value = "hello";
}

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
              unionlistload(myObj);
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
function unionlistload(array){
  var htmltemp ="";
  var template = "";
  for(i = 1; i<array.length; i++){
    var data = array[i];
    if(i < 15){
      htmltemp = htmltemp + templateunionlist(data, "<hr class= hr >");
      template = template + "<li><a href= "+data["link"]+" >"+data["name"]+"</a></li>";
    }
    else{
      htmltemp = htmltemp + templateunionlist(data, "");
      template = template + "<li><a href= "+data["link"]+" >"+data["name"]+"</a></li>";
      break;
    }
  }
  // console.log(htmltemp+"listunion");
  document.getElementById('unionlist').innerHTML = htmltemp; 
  document.getElementById('myUL').innerHTML = template; 
}
//load profile owl list
function homeprofileload(array){
  var htmltemp ="";
  for(i = 1; i<array.length; i++){
    if(array.length<=6){
      var data = array[i];
        htmltemp = htmltemp + templatehomeprofile(data);
    }
  }
  document.getElementById('owl-demo').innerHTML = htmltemp;  
}
//load category page
function homeUnionload(array){
  var htmltemp = "";
  var template = "<li class= item1&#32;active  onclick= filterunion('ALL') >ALL</li>";
  filterdata = array;
  for(i = 1; i<array.length; i++){
      var data = array[i];
        htmltemp = htmltemp + templatehomeunion(data);
        template = template + "<li class= item1  onclick= filterunion('"+data["tag"]+"')   >"+data["tag"]+"</li>";
  }
  // htmltemp = htmltemp + htmltemp + htmltemp + htmltemp + htmltemp;
  template = template + "<hr>";
  document.getElementById('union').innerHTML = htmltemp; 
  document.getElementById('menu').innerHTML = template; 
  // console.log(filterdata); 
}
//template union list
function templateunionlist(data, extra){
  var template = "";
  template += "<li class= item >"+
  "<a href= "+data["link"]+" >"
  +data['name']+
  " union</a>"+extra+"</li>";
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
              "<button class= carouselButton > View Offer</button>"+
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
      "<img class= profilepic  src= "+data["profile_image"]+" >"+
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
  var htmltemp ="";
  var flag = 0;
  for(i = 1; i<filterdata.length; i++){
    var data = filterdata[i];
    if(data['tag'] == tag){
      htmltemp = htmltemp + templatehomeunion(data);
      console.log("filterdata")
    }
    if(tag == "ALL"){
      htmltemp = htmltemp + templatehomeunion(data);
      console.log("hello")
    }  
    // else{
    //   flag = 1;
    // }
  }
  // htmltemp = htmltemp + htmltemp + htmltemp + htmltemp + htmltemp;
  document.getElementById('union').innerHTML = htmltemp; 
  // console.log(filterdata); 
}

//To show suggestions in main search box
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  var str = "";
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
          b.innerHTML += "<input type='hidden' value='" + temp1[0] + "'>";
          // console.log(temp1[0]);
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              
              
              window.location = "profileList.html?cat_type="+temp1[1]+"&srch_key="+str+"&loc="+local;
              // console.log("in click "+str);
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
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
    str = (x[currentFocus].childNodes[2].value);
    console.log(x[currentFocus].childNodes[2].value);
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
              break;
          case "profilepost":
              profilepostload(myObj);
              // var data = myObj[16];
              // console.log(data[0][1]);
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
  htmltemp = htmltemp + "<div class= col-sm-4 >"+
  "<img src= "+data["card"]+"  class= idprofile >"+
"</div>"+
"<div class= col-sm-8 >"+
"<div class= cardwhite >"+
"<div class= 'row padding' >"+
  "<div class= col-sm-5&#32;profilelist >"+
  "<ul>"+
      "<li><b>PERSON / COMPANY NAME:</b>"+data["name"]+"</li>"+
      "<li><b>JOB TITLE/ JOB ROLE:</b>"+data["role"]+"</li>"+
      "<li><b>LOCATION:</b>"+data["sublocation"]+", "+data["location"]+"</li>"+
      "<li><b>WHATSAPP NUMBER:</b>"+data["whatapp"]+"</li>"+
      "<li><b>LOCATION:</b>"+data["location"]+"</li>"+
      "<li><b>SKILLS:</b>"+data["skills"]+"</li>"+
  "</ul>"+
"</div>"+
"<div class= col-sm-5&#32;profilelist >"+
      "<ul>"+
          "<li><b>UNION:</b>"+data["union"]+"</li>"+
          "<li><b>WEBSITE:</b>"+data["website"]+"</li>"+
          "<li><b>CONTACT NUMBER:</b>"+data["phone"]+"</li>"+
          "<li><b>EMAIL:</b>"+data["email"]+"</li>"+
          "<li><b>ADDRESS:</b>"+data["address"]+"</li>"+
      "</ul>"+
"</div>"+
"<div class= col-sm-2 >"+
  "<div class= center >"+
  "<div class= popup1  onclick= myFunction(&quot;a&quot;)>"+
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

  document.getElementById('profilecard').innerHTML = htmltemp; 
}

//profile post load
function profilepostload(array){
  var htmltemp ="";
  for(i = 1; i<15; i++){
      var data = array[i];
      htmltemp = htmltemp + templateprofilepost(data, array);
  }
  // htmltemp = htmltemp + htmltemp + htmltemp + htmltemp + htmltemp;
  document.getElementById('postlist').innerHTML = htmltemp; 
//  console.log(array[16][0][1]["comment"]);
}

//Profile post template
function templateprofilepost(data, array){
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
              "<div class= itemoverlay ><i class= heart ></i>"+data["likes"]+" LIKES</div>"+
              "<div class= itemoverlay ><i class= commenticon ></i>"+data["comments"]+" COMMENTS</div>"+
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
          "<p onclick= viewMorePost('comments"+data["id"]+"'); >VIEW MORE</p>"+
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
function toggleSignUp(box1,box2,innerId){

  document.getElementById(box1).style.display='block';
  document.getElementById(innerId).style.display='block';
  if(box2 !== 'all'){
      document.getElementById('loginBox').style.display='none';
      document.getElementById(box2).style.display='none';
  } else {
      document.getElementById('premiumBox').style.display='none';
      document.getElementById('nonPremiumBox').style.display='none';
  }
  document.getElementById("myDropdown").style.display='none';
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
      // document.getElementById("b64").innerHTML = e.target.result;
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
  document.getElementById('tagpost').value = str;
  var myButtonClasses = document.getElementById(colorclass).classList;
  myButtonClasses.remove(colorclass);
  myButtonClasses.add(colorclass+"a");
  // console.log(document.getElementById('tagpost').value);
}

// to Push post to the database
function postpush(u_id){
    var image = postimage;
    var despost = document.getElementById('despost').value;
    var tag  = document.getElementById('tagpost').value;
    if(image == null){
        alert("Image field is Empty");
    }
    else if(despost == ""){
      alert("Comment field is Empty");
  }
  else if(tag == null){
    alert("Tag field is Empty");
  }
    else{
      var xhr =  new XMLHttpRequest();
    this.responseType = 'text';
    xhr.onreadystatechange  =  function() {
        
        var ourData = xhr.response;
        if (this.readyState == 4 && this.status == 200) {//if result successful
          // var myObj = JSON.parse(this.responseText);
          console.log('hell');
          image = "";
          despost = "";
          tag  = "";
          document.getElementById('despost').value = "";
          document.getElementById('tagpost').value = "";
          alert("Posted Successfully!");
           window.location = "profile.html";
          }
        
        
    };

    var params = 'image='+image +"&des="+despost+"&tag="+tag+"&u_id="+u_id;
    xhr.open("post", "assets/php/postpost.php", true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    
    

  
    // console.log(tag +despost +"\n\n\n"+image);
  }
  console.log('out');
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

          default:
            // homeload(myObj);
            break;
        }
      }
      
  };

  switch(caller){
    case "category":
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
  // console.log(htmltemp);
  document.getElementById('inputCategory').innerHTML = htmltemp; 
  document.getElementById('inputUnion').innerHTML = htmltemp; 
}
//Ctegory template
function  templatecategorylist(data){
  var template = "";
  template += "<option data-tokens= private >"+data["name"]+"</option>";

  return template;
}


function loadServices(caller, id){
  var xhr =  new XMLHttpRequest();
  this.responseType = 'text';
  xhr.onreadystatechange  =  function() {
      
      var ourData = xhr.response;
      if (this.readyState == 4 && this.status == 200) {//if result successful
        var myObj = JSON.parse(this.responseText);
        
        switch (caller){
          case "serviespost":
              servicepostload(myObj);
              break;
          default:
            // homeload(myObj);
            break;
        }
      }
      
  };

  switch(caller){
    case "serviespost":
            var params = 'id='+id;
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
              "<div class= itemoverlay ><i class= heart ></i>"+data["likes"]+" LIKES</div>"+
              "<div class= itemoverlay ><i class= commenticon ></i>"+data["comments"]+" COMMENTS</div>"+
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
          "<p>VIEW MORE</p>"+
      "</div>"+
      "<div class= comments >"+
          "<div class= firstcomment >NAME<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</span></div>"+
          "<div>NAME<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</span></div>"+
          "<div>NAME<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</span></div>"+
      "</div>"+
      "<input type= text  placeholder= Write a comment  class= commentinput >"+
  "</div>";

  return template;
}

function filterservicepage(tag, tag1){
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
  
 
}
//Ashish Changes Starts Here
function logOutProcess(){
  setCookie("userName",);
  setCookie("userId",);
  setCookie("isLogged",);
  setCookie("isEdit",);
  window.location.reload();
}

function loginManagement(){
  if(parseInt(getCookie("isLogged="))==1){
    // console.log("logged");
    setTimeout(function () {
        document.getElementById('loginHead').innerHTML = "<a class= nav-link  href= profile.html?"+getCookie("userId=")+" >"+getCookie("userName=")+"</a>";
        document.getElementById('signUpHead').innerHTML = "<a class= nav-link  href= javascript:logOutProcess() >Log Out</a>";
	  }, 1000);    
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
      this.responseType = 'text';
      xhr.onreadystatechange  =  function() {
          var ourData = xhr.response;
          if (this.readyState == 4 && this.status == 200) {
              if(xhr.responseText !== '0'){
                  var userObj = JSON.parse(xhr.responseText);
                  setCookie("userName",userObj.userName);
                  setCookie("userId",userObj.userId);
                  setCookie("isLogged",1);
                  window.location.reload();
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

  
  
  // ||phone+password1+password2+category+role
  if(name ==""|| email==""||union == ""|| phone ==""||location==""|| pincode==""|| sublocation==""|| password1 ==""||address=="" || password2 =="" || category =="" || role =="" || country == "" || state=="" || type == "")
  {
    document.getElementById('vaildation').innerHTML= "Please fill all fields.";
    document.getElementById('vaildation').style.display = "block";
    // console.log('if');
    
  }
  else if(password1 != password2){
    document.getElementById('vaildation').innerHTML= "Password don't match!";
    document.getElementById('vaildation').style.display = "block";
  }
  else if(imagedata == null ){
    document.getElementById('vaildation').innerHTML= "Image is empty";
    document.getElementById('vaildation').style.display = "block";
  }
  else{
    document.getElementById('vaildation').style.display = "none";
    // console.log(name+"\n"+email+"\n"+phone+"\n"+password1+"\n"+password2+"\n category="+category+"\n"+role+"\n"+country+"\n type="+type+"\n"+address+"\n"+state+"\n"+location+"\n"+sublocation+"\n"+pincode+"\n union="+union+"\n"+whatsapp+"\n"+website+"\n"+phone2);
  
  
  var xhr =  new XMLHttpRequest();
  this.responseType = 'text';
  xhr.onreadystatechange  =  function() {
      
      var ourData = xhr.response;
      if (this.readyState == 4 && this.status == 200) {//if result successful
        // var myObj = JSON.parse(this.responseText);
        if(this.responseText == "success "){
          window.location = "profile.html"
        }

      }
      
  };
  var id = getCookie("userId=");
  var params = 'name='+name+"&email="+email+"&phone="+phone+"&password="+password1+"&category="+category+"&role="+role+"&country="+country+"&type="+type+"&address="+address+"&state="+state+"&location="+location+"&sublocation="+sublocation+"&pincode="+pincode+"&union="+union+"&whatsapp="+whatsapp+"&website="+website+"&image="+imagedata+"&phone2="+phone2+"&skills="+skills+"&id="+id;
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
        document.getElementById('inputCategory').value = data["union"];
        document.getElementById('inputRoleInCompany').value = data["role"];
        document.getElementById('inputCountry').value = data["country"];
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
        spanPopulate1(document.getElementById("inputSkills").value);
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
    xhr.send(params);
  }
}

function spanPopulate(data){
  data = data + ",";
 
  var data1 = data.substr(1, data.length-2);
  // console.log(data1);
  data1 = data1.split(',');
  if(data1.length>10){
    alert("Skills execeds Limit ")
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
      str[i] = str[i].replace(deleteword,'');
      
    }
    // console.log(str[i]);
  }
  for(i=1;i<str.length;i++){
    if(str[i]!=""){
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
          htmltemp = htmltemp + "<div id= "+myObj[i]["id"]+" >"+myObj[i]["name"]+" <span>"+myObj[i]["comment"]+" </span><div class= report onclick= reportPost(&quot;"+myObj[i]["id"]+"&quot;); >Report?</div></div>"
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
      var htmltemp = "<div id= "+comments[0]["id"]+" >"+comments[0]["name"]+" <span>"+comments[0]["comment"]+" </span><div class= report onclick= reportPost(&quot;"+comments[0]["id"]+"&quot;); >Report?</div></div>";
      // console.log(htmltemp);
      return htmltemp;
    }
    else if(parseInt(comments.length)== 2){
      var htmltemp = "<div id= "+comments[0]["id"]+" >"+comments[0]["name"]+" <span>"+comments[0]["comment"]+" </span><div class= report onclick= reportPost(&quot;"+comments[0]["id"]+"&quot;); >Report?</div></div>"+
      "<div id= "+comments[1]["id"]+" >"+comments[1]["name"]+" <span>"+comments[1]["comment"]+" </span><div class= report onclick= reportPost(&quot;"+comments[1]["id"]+"&quot;); >Report?</div></div>";
      // console.log("hell2\n");
      return htmltemp;
    }
    else if(parseInt(comments.length)== 3){
      var htmltemp = "<div id= "+comments[0]["id"]+" >"+comments[0]["name"]+" <span>"+comments[0]["comment"]+" </span><div class= report onclick= reportPost(&quot;"+comments[0]["id"]+"&quot;); >Report?</div></div>"+
      "<div id= "+comments[1]["id"]+" >"+comments[1]["name"]+" <span>"+comments[1]["comment"]+" </span><div class= report onclick= reportPost(&quot;"+comments[1]["id"]+"&quot;); >Report?</div></div>"+
      "<div id= "+comments[2]["id"]+" >"+comments[2]["name"]+" <span>"+comments[2]["comment"]+" </span><div class= report onclick= reportPost(&quot;"+comments[2]["id"]+"&quot;); >Report?</div></div>";
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