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
      $contact = json_decode($_POST["contact"], false) ;
      $city = json_decode($_POST["city"], false) ;
      $message = json_decode($_POST["message"], false) ;

      if (!empty($name) && !empty($email) && !empty($contact) && !empty($city) && !empty($message))
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
      
        $sql = "INSERT INTO franchise (Name, Email, Contact, City, Message)
        VALUES ('$name', '$email', '$contact', '$city', '$message') ;" ;
      
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