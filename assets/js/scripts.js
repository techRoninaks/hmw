var countkeypress = 0;
var filterdata ;
var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
var imagedata ;
var postimage ;


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

function replacetext(location){
  document.getElementById('dropdownMenuButton').innerHTML = " <i class= image-button ></i>"+location;
  return false;
}

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
  
  // ||phone+password1+password2+category+role
  if(name ==""|| email==""||union == ""|| phone ==""||location==""|| pincode==""|| sublocation==""|| password1 ==""||address=="" || password2 =="" || category =="" || role =="" || country == "" || state=="" || type == "")
  {
    document.getElementById('vaildation').innerHTML= "Please fill all fields.";
    document.getElementById('vaildation').style.display = "block";
    console.log('if');
    
  }
  else if(password1 != password2){
    document.getElementById('vaildation').innerHTML= "Password don't match!";
    document.getElementById('vaildation').style.display = "block";
  }
  else{
    document.getElementById('vaildation').style.display = "none";
    console.log(name+"\n"+email+"\n"+phone+"\n"+password1+"\n"+password2+"\n"+category+"\n"+role+"\n"+country+"\n"+type+"\n"+address+"\n"+state+"\n"+location+"\n"+sublocation+"\n"+pincode+"\n"+union+"\n"+whatsapp+"\n"+website+"\n"+phone2);
  }
  // console.log(name+"\n"+email+"\n"+phone+"\n"+password1+"\n"+password2+"\n"+category+"\n"+role+"\n"+country+"\n"+type);
  return false; 
}

function getskillvalue(){
  var skils = document.getElementById("inputSkills").value;
  alert(skils);
  document.getElementById("inputSkills").value = "hello";
}


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
          case "profilecard":
              homeprofileload(myObj);
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
    case "profilecard":
            xhr.open("GET", "assets/php/getprofile.php", true);
            xhr.setRequestHeader("Content-type", "text/plain");
            xhr.send();
            break;
    case "adver":
            xhr.open("GET", "assets/php/getad.php", true);
            xhr.setRequestHeader("Content-type", "text/plain");
            xhr.send();
            break;
    default:
            break;
  }
}


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


function unionlistload(array){
  var htmltemp ="";
  var template = "";
  for(i = 1; i<array.length; i++){
    var data = array[i];
    if(i < 15){
      htmltemp = htmltemp + templateunionlist(data, "<hr class= hr >");
      template = template + "<li><a href= # >"+data["name"]+"</a></li>";
    }
    else{
      htmltemp = htmltemp + templateunionlist(data, "");
      template = template + "<li><a href= # >"+data["name"]+"</a></li>";
      break;
    }
  }
  // console.log(array.length);
  document.getElementById('unionlist').innerHTML = htmltemp; 
  document.getElementById('myUL').innerHTML = template; 
}

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

function homeUnionload(array){
  var htmltemp = "";
  var template = "<li class= item1&#32;active  onclick= filterunion('ALL') >ALL</li>";
  filterdata = array;
  for(i = 1; i<array.length; i++){
      var data = array[i];
        htmltemp = htmltemp + templatehomeunion(data);
        template = template + "<li class= item1  onclick= filterunion('"+data["tag"]+"')   >"+data["tag"]+"</li>";
  }
  htmltemp = htmltemp + htmltemp + htmltemp + htmltemp + htmltemp;
  template = template + "<hr>";
  document.getElementById('union').innerHTML = htmltemp; 
  document.getElementById('menu').innerHTML = template; 
  // console.log(filterdata); 
}

function templateunionlist(data, extra){
  var template = "";
  template += "<li class= item >"+data["name"]+" union"+extra+"</li>";
    return template;
}


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

function templatehomeprofile(data){
  var template = "";
  template += "<div class= item2 >"+
  "<a class= porlink  href= "+data["profile_link"]+" >"+
      "<img class= profilepic  src= "+data["profile_image"]+" >"+
  "</a>"+
  "<a class= porlink  href= 21 >"+
      "<h7 class= profilename >"+data["name"]+"</h7>"+
      "<h8 class= profileocupation >"+data["role"]+"</h8>"+
  "</a>"+
  "<a class= porlink  href= 11 >"+
      "<div class= temp >"+
          "<img src= assets/img/icon/star-black.png  class= ratingicon >"+data["rating"]+"  "+
      "</div>"+
  "</a>"+
"</div>";

  return template;
}

function templatehomeunion(data){
  var template = "";
  template += "<div class= col-sm-2 >"+
  "<a href= "+data["link"]+" >"+
      "<div class= "+data["color"]+"&#32;box&#32;shadow >"+
              "<img class= imagescate  src= "+data["image"]+" >"+
          "<p class= imagetextcate >"+data["name"]+"</p>"+
      "</div>"+
  "</a>"+
  "</div>";
  return template;
  
}

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
  htmltemp = htmltemp + htmltemp + htmltemp + htmltemp + htmltemp;
  document.getElementById('union').innerHTML = htmltemp; 
  console.log(filterdata); 
}


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
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          str = arr[i].substr(0, val.length);
          b.innerHTML += arr[i].substr(val.length);
          str += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              window.location = "./profile.html/"+str;
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
            xhr.open("GET", "assets/php/getprofilepost.php", true);
            xhr.setRequestHeader("Content-type", "text/plain");
            xhr.send();
            break;
    default:
            break;
  }
}


function uprofilecardload(array){
  var htmltemp ="";
  var data = array[1];
  htmltemp = htmltemp + "<div class= col-sm-4 >"+
  "<img src= "+data["card"]+"  class= idprofile >"+
"</div>"+
"<div class= col-sm-8 >"+
"<div class= cardwhite >"+
"<div class= row&#32;padding >"+
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
      "<a href= # >"+
              "<img src= assets/img/icon/ic_whatsapp_profile_page-min.png class= profileicons >"+
          "</a>"+
      "<a href= # >"+
          "<img src= assets/img/icon/ic_phone_profile_page-min.png  class= profileicons >"+
      "</a>"+
      "<a href= # >"+
          "<img src= assets/img/icon/ic_email_profile_page-min.png  class= profileicons >"+
      "</a>"+
      "<button class= profileedit >EDIT</button>"
  "</div>"+
"</div></div></div></div>";

  document.getElementById('profilecard').innerHTML = htmltemp; 
}

function profilepostload(array){
  var htmltemp ="";
  for(i = 1; i<array.length; i++){
      var data = array[i];
      htmltemp = htmltemp + templateprofilepost(data);
  }
  //htmltemp = htmltemp + htmltemp + htmltemp + htmltemp + htmltemp;
  document.getElementById('postlist').innerHTML = htmltemp; 
//  console.log(htmltemp);
}


function templateprofilepost(data){
  var template = "";
  template += "<div class= postelement >"+
  "<div class= line1 >"+
          "ARJUN"+
          "<p>LOCATION</p>"+
      "</div>"+
      "<div class= line2 >"+
          "CARPENTER"+
          "<p>12-03-2019</p>"+
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




function toggleSignUp(box1,box2,innerId){

  document.getElementById(box1).style.display='block';
  document.getElementById(innerId).style.display='block';
  if(box2 !== 'all'){
      document.getElementById('loginBox1').style.display='none';
      document.getElementById(box2).style.display='none';
  } else {
      document.getElementById('premiumBox').style.display='none';
      document.getElementById('nonPremiumBox').style.display='none';
  }
  document.getElementById("myDropdown").style.display='none';

}

function cropToImage(data){
  imagedata = data;
  console.log(imagedata);
  toggle();
}

function toggle(){
  document.getElementById("loginBox").style.display='none';
}

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
  
  // console.log(postimage); 
  // toggle();
  }

  function insertvalue(str){
    document.getElementById('tagpost').value = str;
    // console.log(document.getElementById('tagpost').value);
  }


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