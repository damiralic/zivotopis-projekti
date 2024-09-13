<?php include('server.php') ?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="login.css">
    </head>
    <body>
        <img class="backgroundImage" alt="">
        <a href="index.php"><span class="backIcon glyphicon glyphicon-menu-left"></span></a>
        <form class="loginForm" method="post" action="login.php">
		<?php include('errors.php') ?>
            <h1 style="text-align: center; font-family: 'Courier New', Courier, monospace;" class="textColor">Login</h1>
            <!-- Email input -->
            <div class="form-outline mb-4">
              <input type="text" class="form-control" placeholder="Username" name="username"/>
              <label class="textColor form-label">Username</label>
            </div>
          
            <!-- Password input -->
            <div class="form-outline mb-4">
              <input type="password" class="form-control" placeholder="Password" name="password"/>
              <label class="textColor form-label">Password</label>
            </div>
          
            <!-- 2 column grid layout for inline styling -->
            <div class="row mb-4">
              <div class="col d-flex justify-content-center">
                <!-- Checkbox -->
              </div>
            </div>
          
            <!-- Submit button -->
            <button type="submit" class="btn btn-primary btn-block mb-4" name="login_user">Sign in</button>
          
            <!-- Register buttons -->
            <div class="text-center">
              <p class="textColor">Not a member? <a style="color: pink;" href="register.php">Register</a></p>
            </div>
          </form>
    </body>
</html>