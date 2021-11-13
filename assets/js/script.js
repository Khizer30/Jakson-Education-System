 function sendAdopt()
{
  var name = document.getElementById("name").value ;
  var email = document.getElementById("email").value ;
  var phone = document.getElementById("phone").value  ;
  var number = document.getElementById("number").value  ;
  var message = document.getElementById("message").value  ;
  
  if(!checkName(name) || !checkEmail(email) || !checkPhone(phone) || !checkNumber(number) || !checkMessage(message))
  {
    document.getElementById("error").className = "alert alert-danger d-block" ;
  }
  else
  {
    document.getElementById("error").innerHTML = "We have recived your message <br> We will contact you shortly" ;
    document.getElementById("error").className = "alert alert-success d-block" ;
  }
  /*
  else
  {
    name = JSON.stringify(name) ;
    email = JSON.stringify(email) ;
    phone = JSON.stringify(phone) ;
    number = JSON.stringify(number) ;
    message = JSON.stringify(message) ;

    const xhttp = new XMLHttpRequest() ;
    xhttp.open("POST", "adoptEntry.php") ;
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded") ;

    xhttp.send("name=" + name + "&email=" + email + "&phone=" + phone + "&number=" + number + "&message=" + message) ;

    xhttp.onload = function()
    {
      var result = this.responseText ;

      document.getElementById("error").innerHTML = result ;
      document.getElementById("error").className = "alert alert-success d-block" ;
    }
  } 
  */
}

function sendRefer()
{
  var name = document.getElementById("name").value ;
  var email = document.getElementById("email").value ;
  var phone = document.getElementById("phone").value ;
  var childName = document.getElementById("childName").value ;
  var message = document.getElementById("message").value ;

  if(!checkName(name) || !checkEmail(email) || !checkPhone(phone) || !checkName(childName) || !checkMessage(message))
  {
    document.getElementById("error").className = "alert alert-danger d-block" ;
  }
  else
  {
    document.getElementById("error").innerHTML = "We have recived your message <br> We will contact you shortly" ;
    document.getElementById("error").className = "alert alert-success d-block" ;
  }
  /*
  else
  {
    name = JSON.stringify(name) ;
    email = JSON.stringify(email) ;
    phone = JSON.stringify(phone) ;
    childName = JSON.stringify(childName) ;
    message = JSON.stringify(message) ;
  
    const xhttp = new XMLHttpRequest() ;
    xhttp.open("POST", "referEntry.php") ;
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded") ;
  
    xhttp.send("name=" + name + "&email=" + email + "&phone=" + phone + "&childName=" + childName + "&message=" + message) ;
  
    xhttp.onload = function()
    {
      var result = this.responseText ;
  
      document.getElementById("error").innerHTML = result ;
      document.getElementById("error").className = "alert alert-success d-block" ;
    } 
  }
  */
}

function sendFranchise()
{
  var name = document.getElementById("name").value ;
  var email = document.getElementById("email").value ;
  var phone = document.getElementById("phone").value ;
  var city = document.getElementById("city").value ;
  var message = document.getElementById("message").value ;

  if(!checkName(name) || !checkEmail(email) || !checkPhone(phone) || !checkName(city) || !checkMessage(message))
  {
    document.getElementById("error").style = "font-family: ABeeZee;width: 50%;margin-left: 25%;" ;
    document.getElementById("error").className = "alert alert-danger d-block" ;
  }
  else
  {
    document.getElementById("error").innerHTML = "We have recived your message <br> We will contact you shortly" ;
    document.getElementById("error").className = "alert alert-success d-block" ;
  }
  /*
  else
  {
    name = JSON.stringify(name) ;
    email = JSON.stringify(email) ;
    phone = JSON.stringify(phone) ;
    city = JSON.stringify(city) ;
    message = JSON.stringify(message) ;

    const xhttp = new XMLHttpRequest() ;
    xhttp.open("POST", "applicationEntry.php") ;
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded") ;

    xhttp.send("name=" + name + "&email=" + email + "&phone=" + phone + "&city=" + city + "&message=" + message) ;

    xhttp.onload = function()
    {
      var result = this.responseText ;

      document.getElementById("error").innerHTML = result ;
      document.getElementById("error").className = "alert alert-success d-block" ;
    }
  }
  */
}

function checkEmail(email)
{
  var pattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|info)\\b") ;

  if (email !== "")
  {
    if (pattern.test(email))
    {
      if (email.length <= 50)
      {
        return true ;
      }
      else
      {
        document.getElementById("error").innerHTML = "Email is Too Long" ;
        return false ;
      }
    }
    else
    {
      document.getElementById("error").innerHTML = "Email is Invalid" ;
      return false ;
    }
  }
  else
  {
    document.getElementById("error").innerHTML = "Enter Your Email" ;
    return false ;
  }
}

function checkName(name)
{
  var pattern = new RegExp("^[a-zA-z]+([\\s][a-zA-Z]+)*$") ;

  if (name !== "")
  {
    if (pattern.test(name))
    {
      if (name.length <= 30)
      {
        return true ;
      }
      else
      {
        document.getElementById("error").innerHTML = "Name is Too Long" ;
        return false ;
      }
    }
    else
    {
      document.getElementById("error").innerHTML = "Name is Invalid" ;
      return false ;
    }
  }
  else
  {
    document.getElementById("error").innerHTML = "Enter Your Name" ;
    return false ;
  }
}

function checkPhone(phone)
{
  var pattern = new RegExp("[0-9]{4}-[0-9]{7}") ;

  if (phone !== "")
  {
    if (pattern.test(phone))
    {
      if (phone.length === 12)
      {
        return true ;
      }
      else
      {
        document.getElementById("error").innerHTML = "Contact No. Must Be 12-Digits" ;
        return false ;
      }
    }
    else
    {
      document.getElementById("error").innerHTML = "Contact No. is Invalid" ;
      return false ;
    }
  }
  else
  {
    document.getElementById("error").innerHTML = "Enter Your Contact No." ;
    return false ;
  }
}

function checkNumber(number)
{
  var pattern = new RegExp("^[0-9]+$") ;

  if (number !== "")
  {
    if (pattern.test(number))
    {
      if (number <= 15)
      {
        return true ;
      }
      else
      {
        document.getElementById("error").innerHTML = "Can't Adopt More Than 15 Children At Once" ;
        return false ;
      }
    }
    else
    {
      document.getElementById("error").innerHTML = "Number is Invalid" ;
      return false ;
    }
  }
  else
  {
    document.getElementById("error").innerHTML = "Enter a Number" ;
    return false ;
  }
}

function checkMessage(message)
{
  if (message !== "")
  {
      if (message.length <= 500)
      {
        return true ;
      }
      else
      {
        document.getElementById("error").innerHTML = "Message is Too Long" ;
        return false ;
      }
  }
  else
  {
    document.getElementById("error").innerHTML = "Enter a Message" ;
    return false ;
  }
}