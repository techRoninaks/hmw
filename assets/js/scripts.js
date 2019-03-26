var globeCopy = {}; //required global variable
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


function otpVerify(){ //otp verification
    var data = document.getElementById("otp").value;
    console.log("OTP->"+data);
    myObj = globeCopy;
    
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
                    reDirect("premiumsignup.html");
                } else {
                    alert("Verification Failed! Try again!");
                }
            }
        };
        xhr.open("POST", "assets/php/signUp.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("jsonObj="+jSONObj);
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

