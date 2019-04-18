var postimage = "";
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

function getQueryString(){
  var queryString = document.URL.split('?');
  var queryStrings = [];
  if(queryString.length > 1){
    queryStrings = queryString[1].split('&');
  }
  return queryStrings;
}

function reDirect(loc){ //redirect to any page without storing as cache.. mainly used when logged in

    // var page = window.location.protocol+"//"+window.location.hostname+"/helloMyWork/"+loc;
    var page = "../"+loc;
    window.location.replace(page);
}

function setCookie(cname, cvalue=null, exdays=1) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(cname) {
  var value = getCookie(cname);
  if (value === "null" || value === "" || value === "0") {
    return false;
  }
  return true;
}

function activateSideNav(){
    var loc = window.location.href;
    var activePage = "";
    // console.log("loc->"+loc.includes("dashboard.html"));
    if(getCookie("userManage") !=="0"){
        document.getElementById("employee").style.display = "inline";
    }
    if(getCookie("custManage") !== "0"){
        document.getElementById("customer").style.display = "inline";
    }
   if(getCookie("roleManage") !== "0"){
        document.getElementById("roles").style.display = "inline";
    }
    if(getCookie("catManage") !== "0"){
        document.getElementById("category").style.display = "inline";
    }
    if(getCookie("unionManage") !== "0"){
        document.getElementById("union").style.display = "inline";
    }
    if(getCookie("taskManage") !== "0"){
        document.getElementById("task").style.display = "inline";
    }
    if(getCookie("contestManage") !== "0"){
        document.getElementById("notifications").style.display = "inline";
    }
    if(getCookie("dataManage") !== "0"){
        document.getElementById("import").style.display = "inline";
    }
    if(getCookie("postManage") !== "0"){
        document.getElementById("posts").style.display = "inline";
    }
    //loading sideNav after role check
    if(loc.includes("dashboard.html")){
        activePage = "dashboard";
    }else if(loc.includes("customer.html")){
        activePage = "customer";
    } else if(loc.includes("employee.html")){
        activePage = "employee";
    } else if(loc.includes("roles.html")){
        activePage = "roles";
    } else if(loc.includes("category.html")){
        activePage = "category";
    } else if(loc.includes("union.html")){
        activePage = "union";
    } else if(loc.includes("task.html")){
        activePage = "task";
    } else if(loc.includes("notifications.html")){
        activePage = "notifications";
    } else if(loc.includes("table.html")){
        activePage = "table";
    } else if(loc.includes("import.html")){
        activePage = "import";
    } else if(loc.includes("posts.html")){
        activePage = "posts";
    } else if(loc.includes("leads.html")){
        activePage = "leads";
    }
    document.getElementById(activePage).className = "active";
}
function readFile() {

 if (this.files && this.files[0]) {

     var FR= new FileReader();

     FR.addEventListener("load", function(e) {
     postimage = e.target.result;
     
     });

     FR.readAsDataURL( this.files[0] );
  }
}
function loadProfile(){
    document.getElementById("acName").innerHTML = getCookie("empName");
}
function cancelFunc(val=0){
    setCookie("userOnEdit");
    setCookie("catOnEdit");
    setCookie("unionOnEdit");
    setCookie("roleOnEdit");
    setCookie("customerOnEdit");
    setCookie("taskOnEdit");
    setCookie("notifOnEdit");
    setCookie("leadsOnEdit");
    
    if(val !== 0){
        setCookie("emId");
        setCookie("empId");
        setCookie("empName");
        setCookie("isAdmin");
        setCookie("role");
        setCookie("userManage");
        setCookie("roleManage");
        setCookie("catManage");
        setCookie("unionManage");
        setCookie("dataManage");
        setCookie("custManage");
        setCookie("taskManage");
        setCookie("contestManage");
        setCookie("postManage");
        // var page = window.location.protocol+"//"+window.location.hostname+"/helloMyWork/admin/login/login.html";
        var page = "login/login.html";
        window.location.replace(page);
    } else {
        window.location.reload();
    }
    
}

function dataUpdate(pageName){
    var data = [];
    var myObj = {};
    var phpFile = "";
    var prevName = "";
    var image = "";
    var formData = new FormData();
    switch(pageName){
        case 'user': phpFile = "updateUser";
                    break;
        case 'category': phpFile = "updateCategory";
                    break;
        case 'union': phpFile = "updateUnion";
                    break;
        case 'role': phpFile = "updateRole";
                    break;
        case 'customer': phpFile = "updateCustomer";
                    break;
        case 'task': phpFile = "updateTask";
                    break;
        case 'notifications': phpFile = "updateNotifications";
                    break;
        case 'leads': phpFile = "updateLeads";
                    break;
    }
    if(confirm("Confirm Upload?")){
        if(pageName == 'user'){
            data[0] =  document.getElementById("fName").value;
            data[1] =  document.getElementById("lName").value;
            data[2] =  document.getElementById("eMail").value;
            data[3] =  document.getElementById("contact").value;
            data[4] =  document.getElementById("password").value;
            data[5] =  document.getElementById("roleName").value;
            prevName = getCookie("userOnEdit");
            myObj = {"fName":data[0],"lName":data[1],"eMail":data[2],"contact":data[3],"password":data[4],"roleName":data[5],"cookieName":prevName};
        } else if(pageName == 'category'){
            data[0] =  document.getElementById("catName").value;
            data[1] =  document.getElementById("labelName").value;
            data[2] =  document.getElementById("unionName").value;
            prevName = getCookie("catOnEdit");
            
            myObj = {"catName":data[0],"labelName":data[1],"unionName":data[2],"cookieName":prevName,"image":postimage};
        } else if(pageName == 'union'){
            data[0] =  document.getElementById("unionName").value;
            prevName = getCookie("unionOnEdit");
            myObj = {"unionName":data[0],"cookieName":prevName};
        } else if(pageName == 'role'){
            data[0] = document.getElementById("roleName").value;
            data[1] = document.getElementById("userManage").checked;
            data[2] = document.getElementById("roleManage").checked;
            data[3] = document.getElementById("catManage").checked;
            data[4] = document.getElementById("dataManage").checked;
            data[5] = document.getElementById("unionManage").checked;
            data[6] = document.getElementById("custManage").checked;
            data[7] = document.getElementById("taskManage").checked;
            data[8] = document.getElementById("contestManage").checked;
            data[9] = document.getElementById("postManage").checked;
            prevName = getCookie("roleOnEdit");
            for(i = 1;i<=9;i++){
                if(data[i] === false){
                    data[i] = 0;
                }
            }
            myObj = {"roleName":data[0],"userManage":data[1],"roleManage":data[2],"catManage":data[3],"dataManage":data[4],"unionManage":data[5],"custManage":data[6],"taskManage":data[7],"contestManage":data[8],"postManage":data[9],"cookieName":prevName};
        } else if(pageName == 'customer'){
            data[0] = document.getElementById("custName").value;
            data[1] = document.getElementById("typeName").value;
            data[2] = document.getElementById("roleName").value;
            data[3] = document.getElementById("catName").value;
            data[4] = document.getElementById("unionName").value;
            data[5] = document.getElementById("addName").value;
            data[6] = document.getElementById("locName").value;
            data[7] = document.getElementById("subLocName").value;
            data[8] = document.getElementById("stateName").value;
            data[9] = document.getElementById("countryName").value;
            data[10] = document.getElementById("pincode").value;
            data[11] = document.getElementById("primaryPhone").value;
            data[12] = document.getElementById("secondaryPhone").value;
            data[13] = document.getElementById("whatsappPhone").value;
            data[14] = document.getElementById("eMail").value;
            data[15] = document.getElementById("webSite").value;
            data[16] = document.getElementById("skillName").value;
            data[17] = document.getElementById("password").value;
            prevName = getCookie("customerOnEdit");
            if(data[4] == ""){
                data[4] = null;
            }
            
            myObj = {"custName":data[0],"typeName":data[1],"roleName":data[2],"catName":data[3],"unionName":data[4],"addName":data[5],"locName":data[6],"subLocName":data[7],"stateName":data[8],"countryName":data[9],"pincode":data[10],"primaryPhone":data[11],"secondaryPhone":data[12],"whatsappPhone":data[13],"eMail":data[14],"webSite":data[15],"skillName":data[16],"password":data[17],"cookieName":prevName,"image":postimage};
            // console.log("->>>"+myObj);
        } else if(pageName == 'task'){
            data[0] = document.getElementById("userName").value;
            data[1] = document.getElementById("targetPros").value;
            data[2] = document.getElementById("targetLeads").value;
            data[3] = document.getElementById("startDate").value;
            data[4] = document.getElementById("endDate").value;
            data[5] = document.getElementById("userId").value;
            data[6] = document.getElementById("ConvLeads").value;
            data[7] = document.getElementById("notes").value;
            prevId = getCookie("taskOnEdit");
            myObj = {"userName":data[0],"targetPros":data[1],"targetLeads":data[2],"startDate":data[3],"endDate":data[4],"mainUserId":data[5],"ConvLeads":data[6],"notes":data[7],"cookieUserId":prevId};
        } else if(pageName == 'notifications'){
            data[0] = document.getElementById("notifHead").value;
            data[1] = document.getElementById("notifContent").value;
            prevId = getCookie("notifOnEdit");
            myObj = {"headline":data[0],"content":data[1],"cookieId":prevId};
        } else if(pageName == 'leads'){
            data[0] = document.getElementById("custName").value;
            data[1] = document.getElementById("typeName").value;
            data[2] = document.getElementById("roleName").value;
            data[3] = document.getElementById("catName").value;
            data[4] = document.getElementById("unionName").value;
            data[5] = document.getElementById("addName").value;
            data[6] = document.getElementById("locName").value;
            data[7] = document.getElementById("subLocName").value;
            data[8] = document.getElementById("stateName").value;
            data[9] = document.getElementById("countryName").value;
            data[10] = document.getElementById("pincode").value;
            data[11] = document.getElementById("primaryPhone").value;
            data[12] = document.getElementById("secondaryPhone").value;
            data[13] = document.getElementById("whatsappPhone").value;
            data[14] = document.getElementById("eMail").value;
            data[15] = document.getElementById("webSite").value;
            data[16] = document.getElementById("skillName").value;
            // data[17] = document.getElementById("password").value;
            userId = getCookie("empId");
            leadId = getCookie("leadsOnEdit");
            if(data[4] == ""){
                data[4] = null;
            }
            
            myObj = {"custName":data[0],"typeName":data[1],"roleName":data[2],"catName":data[3],"unionName":data[4],"addName":data[5],"locName":data[6],"subLocName":data[7],"stateName":data[8],"countryName":data[9],"pincode":data[10],"primaryPhone":data[11],"secondaryPhone":data[12],"whatsappPhone":data[13],"eMail":data[14],"webSite":data[15],"skillName":data[16],"userId":userId,"leadId":leadId};
        }
        var jSONObj = JSON.stringify(myObj);
        
        // console.log("-> "+jSONObj);
        xhr =  new XMLHttpRequest();
        this.responseType = 'text';
           xhr.onreadystatechange  =  function() {
            var ourData = xhr.response;
            if (this.readyState == 4 && this.status == 200) {
                if(xhr.responseText == '1'){
                    alert("Successful!");
                    postimage = "";
                    cancelFunc();
                } else if(parseInt(xhr.responseText)<0 && pageName == "task"){
                    if(confirm("Task already assigned! Switch to editing?")){
                        fetchData(Math.abs(parseInt(xhr.responseText)),"task");
                    } else {
                        cancelFunc();
                    }
                } else {
                    alert("Update Failed! Try again!");
                }
            }
        };
        xhr.open("POST", "assets/php/"+phpFile+".php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("jsonObj="+jSONObj);
    } else {
        return;
    }
}

function fetchData(id,pageName){
    var phpFile = "";
    switch(pageName){
        case 'user': phpFile = "fetchUser";
                    break;
        case 'category': phpFile = "fetchCategory";
                    break;
        case 'union': phpFile = "fetchUnion";
                    break;
        case 'role': phpFile = "fetchRole";
                    break;
        case 'customer': phpFile = "fetchCustomer";
                    break;
        case 'task': phpFile = "fetchTask";
                    break;
        case 'notifications': phpFile = "fetchNotifications";
                    break;
        case 'leads': phpFile = "fetchCustomer";
                    break;
        case 'posts': phpFile = "restorePosts";
                    break;
    }
    var params = 'id='+id;
    
    var xhr =  new XMLHttpRequest();
    xhr.onreadystatechange  =  function() {
            if (this.readyState == 4 && this.status == 200) {//if result successful
                    var myObj = JSON.parse(xhr.responseText);
                    if(xhr.responseText !== "0"){
                        if(pageName == "user"){
                        document.getElementById("fName").value = myObj.fName;
                        document.getElementById("lName").value = myObj.lName;
                        document.getElementById("eMail").value = myObj.eMail;
                        document.getElementById("contact").value = myObj.contact;
                        document.getElementById("password").value =  myObj.password;
                        document.getElementById("roleName").value = myObj.roleName;
                        setCookie("userOnEdit",myObj.userName);
                        } else if(pageName == "category"){
                            document.getElementById("catName").value = myObj.catName;
                            document.getElementById("labelName").value = myObj.labelName;
                            document.getElementById("unionName").value = myObj.unionName;
                            setCookie("catOnEdit",myObj.catName);
                        } else if(pageName == "union"){
                            document.getElementById("unionName").value = myObj.unionName;
                            setCookie("unionOnEdit",myObj.unionName);
                        } else if(pageName == "role"){
                            if(myObj.userManage == 0 || myObj.userManage == ""){
                                myObj.userManage = false;
                            }
                            if(myObj.roleManage == 0 || myObj.roleManage == ""){
                                myObj.roleManage = false;
                            }
                            if(myObj.catManage == 0 || myObj.catManage == ""){
                                myObj.catManage = false;
                            }
                            if(myObj.dataManage == 0 || myObj.dataManage == ""){
                                myObj.dataManage = false;
                            }
                            if(myObj.unionManage == 0 || myObj.unionManage == ""){
                                myObj.unionManage = false;
                            }
                            if(myObj.custManage == 0 || myObj.custManage == ""){
                                myObj.custManage = false;
                            }
                            if(myObj.taskManage == 0 || myObj.taskManage == ""){
                                myObj.taskManage = false;
                            }
                            if(myObj.contestManage == 0 || myObj.contestManage == ""){
                                myObj.contestManage = false;
                            }
                            if(myObj.postManage == 0 || myObj.postManage == ""){
                                myObj.postManage = false;
                            }
                            document.getElementById("roleName").value = myObj.roleName;
                            document.getElementById("userManage").checked = myObj.userManage;
                            document.getElementById("roleManage").checked = myObj.roleManage;
                            document.getElementById("catManage").checked = myObj.catManage;
                            document.getElementById("dataManage").checked = myObj.dataManage;
                            document.getElementById("unionManage").checked = myObj.unionManage;
                            document.getElementById("custManage").checked = myObj.custManage;
                            document.getElementById("taskManage").checked = myObj.taskManage;
                            document.getElementById("contestManage").checked = myObj.contestManage;
                            document.getElementById("postManage").checked = myObj.postManage;
                            setCookie("roleOnEdit",myObj.roleName);
                        } else if(pageName == "customer"){
                            document.getElementById("custName").value = myObj.custName;
                            document.getElementById("typeName").value = myObj.typeName;
                            document.getElementById("roleName").value = myObj.roleName;
                            document.getElementById("catName").value = myObj.catName;
                            document.getElementById("unionName").value = myObj.unionName;
                            document.getElementById("addName").value = myObj.addName;
                            document.getElementById("locName").value = myObj.locName;
                            document.getElementById("subLocName").value = myObj.subLocName;
                            document.getElementById("stateName").value = myObj.stateName;
                            document.getElementById("countryName").value = myObj.countryName;
                            document.getElementById("pincode").value = myObj.pincode;
                            document.getElementById("primaryPhone").value = myObj.primaryPhone;
                            document.getElementById("secondaryPhone").value = myObj.secondaryPhone;
                            document.getElementById("whatsappPhone").value = myObj.whatsappPhone;
                            document.getElementById("eMail").value = myObj.eMail;
                            document.getElementById("webSite").value = myObj.webSite;
                            document.getElementById("skillName").value = myObj.skillName;
                            document.getElementById("password").value = myObj.password;
                            setCookie("customerOnEdit",id);
                        } else if(pageName == "task"){
                            document.getElementById("userName").value = myObj.userName;
                            document.getElementById("userName").disabled = true;
                            document.getElementById("userId").value = myObj.userId;
                            document.getElementById("userId").disabled = true;
                            document.getElementById("targetPros").value = myObj.targetPros;
                            document.getElementById("targetLeads").value = myObj.targetLeads;
                            document.getElementById("ConvLeads").value = myObj.ConvLeads;
                            document.getElementById("notes").value = myObj.notes;
                            document.getElementById("startDate").value = myObj.startDate;
                            document.getElementById("endDate").value = myObj.endDate;
                            setCookie("taskOnEdit",myObj.userId);
                        } else if(pageName == "notifications"){
                            document.getElementById("notifHead").value = myObj.headline;
                            document.getElementById("notifContent").value = myObj.content;
                            setCookie("notifOnEdit",myObj.id);
                        } else if(pageName == "leads"){
                            document.getElementById("custName").value = myObj.custName;
                            document.getElementById("typeName").value = myObj.typeName;
                            document.getElementById("roleName").value = myObj.roleName;
                            document.getElementById("catName").value = myObj.catName;
                            document.getElementById("unionName").value = myObj.unionName;
                            document.getElementById("addName").value = myObj.addName;
                            document.getElementById("locName").value = myObj.locName;
                            document.getElementById("subLocName").value = myObj.subLocName;
                            document.getElementById("stateName").value = myObj.stateName;
                            document.getElementById("countryName").value = myObj.countryName;
                            document.getElementById("pincode").value = myObj.pincode;
                            document.getElementById("primaryPhone").value = myObj.primaryPhone;
                            document.getElementById("secondaryPhone").value = myObj.secondaryPhone;
                            document.getElementById("whatsappPhone").value = myObj.whatsappPhone;
                            document.getElementById("eMail").value = myObj.eMail;
                            document.getElementById("webSite").value = myObj.webSite;
                            document.getElementById("skillName").value = myObj.skillName;
                            // document.getElementById("password").value = myObj.password;
                            setCookie("leadsOnEdit",myObj.id);
                        } else if(pageName == "posts"){
                            console.log("comment");
                            alert("Comment restored!");
                            window.location.reload();
                        }
            } else {
                alert('Edit Failed!');
            }
        }
    };
    xhr.open("POST", "assets/php/"+phpFile+".php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
}

function deleteData(id,pageName){
    var confirmTxt = "Confirm deletion?";
    if(pageName == "posts"){
        confirmTxt = "Remove comment?";
    }
    if(confirm(confirmTxt)){
        var phpFile = "";
        switch(pageName){
            case 'user': phpFile = "deleteUser";
                        break;
            case 'category': phpFile = "deleteCategory";
                        break;
            case 'union': phpFile= "deleteUnion";
                        break;
            case 'role': phpFile = "deleteRole";
                        break;
            case 'customer': phpFile = "deleteCustomer";
                        break;
            case 'task': phpFile = "deleteTask";
                        break;
            case 'notifications': phpFile = "deleteNotifications";
                        break;
            case 'leads': phpFile = "deleteLeads";
                        break;
            case 'posts': phpFile = "removeRepComments";
                        break;
        }
        var xhr =  new XMLHttpRequest();
        var params = 'id='+id;
        xhr.onreadystatechange  =  function() {
                if (this.readyState == 4 && this.status == 200) {//if result successful
                    var message = 'Deletion successful!';
                    if(pageName == "posts"){
                            message = 'Removed successfully!';
                    }
                    if(xhr.responseText !== "0"){
                            alert(message);
                            window.location.reload();
                    } else {
                        alert('Deletion Failed!');
                    }
                }
        };
        xhr.open("POST", "assets/php/"+phpFile+".php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(params);
    } else {
        return;
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
