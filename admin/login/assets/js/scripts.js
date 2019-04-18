function hideShow(){
    var x = document.getElementById("forgot");
    if (x.style.display == "none") {
            x.style.display = "block";
          } else {
            x.style.display = "none";
          }
    var y = document.getElementById("login");
            if (y.style.display == "inline") {
            y.style.display = "none";
          } else {
            y.style.display = "inline";
          }
}

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

    var page = window.location.protocol+"//"+window.location.hostname+"/helloMyWork/admin/"+loc;
    window.location.replace(page);
}

function login(){ //login validation
  var data = [];
  var myObj = {};
  
  data[0] = document.getElementById("loginEmail").value;
  data[1] = document.getElementById("loginPassword").value;
  myObj = {"userEmail":data[0],"userPassword":data[1]};
  var jSONObj = JSON.stringify(myObj);
  
      xhr =  new XMLHttpRequest();
      this.responseType = 'text';
      xhr.onreadystatechange  =  function() {
          var ourData = xhr.response;
          if (this.readyState == 4 && this.status == 200) {
              if(xhr.responseText !== '0'){
                  var userObj = JSON.parse(xhr.responseText);
                  setCookie("empId",userObj.userId);
                  setCookie("emId",userObj.userId);
                  setCookie("empName",userObj.userName);
                  if((userObj.role).toLowerCase() == "admin"){
                        setCookie("isAdmin",1);   
                  }
                  setCookie("role",userObj.role);
                  setCookie("userManage",userObj.userManage);
                  setCookie("roleManage",userObj.roleManage);
                  setCookie("catManage",userObj.catManage);
                  setCookie("unionManage",userObj.unionManage);
                  setCookie("dataManage",userObj.dataManage);
                  setCookie("custManage",userObj.custManage);
                  setCookie("taskManage",userObj.taskManage);
                  setCookie("contestManage",userObj.contestManage);
                  setCookie("postManage",userObj.postManage);
                  reDirect("dashboard.html");
              } else {
                  document.getElementById("errorNote").style.display= "inline";
              }
          }
      };
      xhr.open("POST", "assets/php/login.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send("jsonObj="+jSONObj);
}

function setCookie(cname, cvalue=null, exdays=1) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
