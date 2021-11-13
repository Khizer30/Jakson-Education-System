<html lang="en-PK">
  <head>
  <meta charset="UTF-8">
  <title> Data Entry </title>
  </head>

  <body>

    <?php 
      header("Content-Type: application/json; charset=UTF-8") ;

      $name = json_decode($_POST["name"], false) ;
      $email = json_decode($_POST["email"], false) ;
      $phone = json_decode($_POST["phone"], false) ;
      $childName = json_decode($_POST["childName"], false) ;
      $message = json_decode($_POST["message"], false) ;

      if (!empty($name) && !empty($email) && !empty($phone) && !empty($childName) && !empty($message))
      {
        $servername = "localhost" ;
        $username = "root" ;
        $password = "" ;
        $dbName = "school" ;

        $conn = mysqli_connect($servername, $username, $password, $dbName) ;
        if (!$conn)
        {
          die("Connection Failed: " . mysqli_connect_error()) ;
        }
      
        $sql = "INSERT INTO refer (Name, Email, Phone, ChildName, Message) 
        VALUES ('$name', '$email', '$phone', '$childName', '$message') ;" ;
      
        if (mysqli_query($conn, $sql))
        {
	        echo ("We have recived your message <br> We will contact you shortly") ;
        }
        else
        {
	        echo ("Error: " . mysqli_error($conn)) ;
        }
  
        mysqli_close($conn) ;
      }
      else
      {
        echo "Invalid Input!" ;
      }
    
    ?>

</body>

</html>