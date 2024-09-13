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
        <a href="index.php"><span class="backIcon glyphicon glyphicon-menu-left"></span></a>
        <form class="loginForm" method="post" action="register.php">
		<?php include('errors.php') ?>
            <h1 style="text-align: center; font-family: 'Courier New', Courier, monospace" class="textColor">Register</h1>
            <!-- Username input -->
            <div class="form-outline mb-4">
                <input type="text" class="form-control" placeholder="Username" name="username" value="<?php echo $username; ?>"/>
                <label class="textColor form-label" for="username">Username</label>
              </div>
            <!-- Email input -->
            <div class="form-outline mb-4">
              <input type="email" class="form-control" placeholder="Email" name="email" value="<?php echo $email; ?>"/>
              <label class="textColor form-label" for="emailInput">Email address</label>
            </div>
          
            <!-- Password input -->
            <div class="form-outline mb-4">
              <input type="password" name="password_1" class="form-control" placeholder="Password"/>
              <label class="textColor form-label">Password</label>
            </div>

            <div class="form-outline mb-4">
                <input type="password" name="password_2" class="form-control" placeholder="Repeat password" />
                <label class="textColor form-label">Repeat password</label>
              </div>

			<div class="form-group">
			<select class="form-control form-outline mb-4" name="role" id="role">
				<option value="user">User</option>
				<option value="creator">Creator</option>
			</select>
			<label class="textColor form-label">Role</label>
			</div>
          
            <!-- Submit button -->
            <button type="submit" class="btn btn-primary btn-block mb-4" name="reg_user">Register</button>
          
            <!-- Register buttons -->
            <div class="text-center">
              <p class="textColor">Already a member? <a style="color: pink;" href="login.php">Log in</a></p>
            </div>
          </form>
    </body>
</html>