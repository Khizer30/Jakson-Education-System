 function sendAdopt()
{
  var name = document.getElementById("name3").value ;
  var email = document.getElementById("email3").value ;
  var contact = document.getElementById("contact3").value  ;
  var number = document.getElementById("number3").value  ;
  var message = document.getElementById("message3").value  ;

  name = JSON.stringify(name) ;
  email = JSON.stringify(email) ;
  contact = JSON.stringify(contact) ;
  number = JSON.stringify(number) ;
  message = JSON.stringify(message) ;

  const xhttp = new XMLHttpRequest() ;
  xhttp.open("POST", "adoptEntry.php") ;
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded") ;

  xhttp.send("name=" + name + "&email=" + email + "&contact=" + contact + "&number=" + number + "&message=" + message) ;

  xhttp.onload = function()
  {
    var result = this.responseText ;
    document.getElementById("error3").innerHTML = result ;
  }
}

function sendRefer()
{
  var name = document.getElementById("name").value ;
  var email = document.getElementById("email").value ;
  var contact = document.getElementById("contact").value ;
  var childName = document.getElementById("childName").value ;
  var childAge = document.getElementById("childAge").value ;
  var message = document.getElementById("message").value ;

  name = JSON.stringify(name) ;
  email = JSON.stringify(email) ;
  contact = JSON.stringify(contact) ;
  childName = JSON.stringify(childName) ;
  childAge = JSON.stringify(childAge) ;
  message = JSON.stringify(message) ;

  const xhttp = new XMLHttpRequest() ;
  xhttp.open("POST", "referEntry.php") ;
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded") ;

  xhttp.send("name=" + name + "&email=" + email + "&contact=" + contact + "&childName=" + childName + "&childAge=" + childAge + "&message=" + message) ;

  xhttp.onload = function()
  {
    var result = this.responseText ;
    document.getElementById("error").innerHTML = result ;
  }
}

function sendFranchise()
{
  var name = document.getElementById("name").value ;
  var email = document.getElementById("email").value ;
  var contact = document.getElementById("contact").value ;
  var city = document.getElementById("city").value ;
  var message = document.getElementById("message").value ;

  name = JSON.stringify(name) ;
  email = JSON.stringify(email) ;
  contact = JSON.stringify(contact) ;
  city = JSON.stringify(city) ;
  message = JSON.stringify(message) ;

  const xhttp = new XMLHttpRequest() ;
  xhttp.open("POST", "applicationEntry.php") ;
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded") ;

  xhttp.send("name=" + name + "&email=" + email + "&contact=" + contact + "&city=" + city + "&message=" + message) ;

  xhttp.onload = function()
  {
    var result = this.responseText ;
    document.getElementById("error").innerHTML = result ;
  }

}