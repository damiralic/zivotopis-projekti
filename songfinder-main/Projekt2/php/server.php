<?php 
session_start();

$username = "";
$email	  = "";
$errors   = array();

$db = mysqli_connect("localhost","root","","songfinderDB");

if (isset($_POST['reg_user'])) {

	$username   = mysqli_real_escape_string($db, $_POST['username']);
	$email	    = mysqli_real_escape_string($db, $_POST['email']);
	$password_1 = mysqli_real_escape_string($db, $_POST['password_1']);
	$password_2 = mysqli_real_escape_string($db, $_POST['password_2']);
	$role = mysqli_real_escape_string($db, $_POST['role']);

	// checking filled
	if (empty($username)) { 
		array_push($errors, "Username is required");
	}

	if (empty($email)) {
		array_push($errors, "Email is required");
	}

	if ($password_1 != $password_2) {
		array_push ($errors, "Password you typed doesn't match");
	} 

	if (empty($password_1)) {
		array_push($errors, "Password is required");
	}

	$user_check_query = "SELECT * FROM users WHERE username='$username' OR email='$email' LIMIT 1";
	$result = mysqli_query($db, $user_check_query);
	$user = mysqli_fetch_assoc($result);

	// Checking user in database
	if ($user) {
		if ($user['username'] === $username) {
			array_push($errors, "Username already exists");
		}

		if ($user['email'] === $email) {
			array_push($errors, "Email already exists");
		}
	}

	// Insert New Data
	if (count($errors) == 0) {
		$password = md5($password_1); //password hashing

		$query = "INSERT INTO users (username, email, password, role) VALUES ('$username', '$email', '$password', '$role')";
		mysqli_query($db, $query);
		$_SESSION['username'] = $username;
		$_SESSION['success']  = "You're now logged in";
		header('location: index.php');
	}

}

// Click Login
if (isset($_POST['login_user'])) {
	$username = mysqli_real_escape_string($db, $_POST['username']);
	$password = mysqli_real_escape_string($db, $_POST['password']);

	if (empty($username)) {
		array_push($errors, "Username is required");
	}

	if (empty($password)) {
		array_push($errors, "Password is required");
	}

	if (count($errors) == 0) {
		$password = md5($password); //get hashed password mora biti vise od 35 znakova

		$query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
		$results = mysqli_query($db, $query);
		if (mysqli_num_rows($results) == 1) {
			$_SESSION['username'] = $username;
			$_SESSION['success']  = "You are now logged in";
			header('location: index.php');
		} else {
			array_push($errors, "Wrong username/password combination");
		}
	}
}
?>