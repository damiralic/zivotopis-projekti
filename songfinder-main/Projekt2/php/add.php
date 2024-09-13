<?php 
session_start();

$db = mysqli_connect("localhost","root","","songfinderDB");
$currentRole = $_SESSION['role'];
$user_check_query = "SELECT * FROM users WHERE role LIKE '$currentRole'";
$result = mysqli_query($db, $user_check_query);
$user = mysqli_fetch_assoc($result);

if($currentRole != 'creator'){
    header('location: index.php');
}

if (isset($_POST['add_song'])){

    $name = mysqli_real_escape_string($db, $_POST['name']);
	$description = mysqli_real_escape_string($db, $_POST['description']);
    $mood = mysqli_real_escape_string($db, $_POST['mood']);
    
    $file = $_FILES['file'];
    $fileError = $_FILES['file']['error'];
    $fileName = $_FILES['file']['name'];
    $fileSize = $_FILES['file']['size'];
    $fileTmpName = $_FILES['file']['tmp_name'];

    $fileExt = explode('.', $fileName);
    $allowed = array('jpg', 'jpeg', 'png');

    if($fileError === 0){
        if($fileSize < 1500000){
            $fileDestination = 'uploads/'.$fileName;
            move_uploaded_file($fileTmpName, $fileDestination);
        }else{
            ?>
            <div class="alert alert-danger" role="alert">
            <?php echo "Your file is too big" ?> 
            </div>
            <?php 
        }
    }else{
        ?>
        <div class="alert alert-danger" role="alert">
        <?php echo "There was an error uploading your file!" ?> 
        </div>
        <?php 
    }


    $song = $_FILES['song'];
    $songError = $_FILES['song']['error'];
    $songName = $_FILES['song']['name'];
    $songSize = $_FILES['song']['size'];
    $songTmpName = $_FILES['song']['tmp_name'];

    $songExt = explode('.', $songName);
    $allowedSong = array('mp3');

    if($songError === 0){
        if($songSize < 6000000){
            $songDestination = 'songUploads/'.$songName;
            move_uploaded_file($songTmpName, $songDestination);
        }else{
            ?>
            <div class="alert alert-danger" role="alert">
            <?php echo "Your song file is too big" ?> 
            </div>
            <?php 
        }
    }else{
        ?>
        <div class="alert alert-danger" role="alert">
        <?php echo "There was an error uploading your song file!" ?> 
        </div>
        <?php 
    }



    if($name && $description && $file && $song != null){
    $query = "INSERT INTO songs (name, description, filename, mood, songFilename) VALUES ('$name', '$description', '$fileName', '$mood', '$songName')";
	mysqli_query($db, $query);
    ?>
    <div class="alert alert-success" role="alert">
    <?php echo "Successfully added song!" ?> 
    </div>
    <?php
    }else{
        ?>
        <div class="alert alert-danger" role="alert">
        <?php echo "You can't add a blank song!" ?> 
        </div>
        <?php 
    }
}
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="login.css">
        <link rel="stylesheet" href="add.css">
    </head>
    <body>
        <img class="backgroundImage" alt="">
        <a href="index.php"><span class="backIcon glyphicon glyphicon-menu-left"></span></a>
        <form class="addForm" method="post" action="add.php" enctype="multipart/form-data">
            <h1 style="text-align: center; font-family: 'Courier New', Courier, monospace;" class="textColor">Add a song</h1>
            <!-- name input -->
            <div class="form-outline mb-4">
              <input type="text" class="form-control" placeholder="Name" name="name" maxlength="20"/>
              <label class="textColor form-label">Name</label>
            </div>
          
            <!-- description input -->
            <div class="form-outline mb-4">
              <input type="text" class="form-control" placeholder="Description" name="description" maxlength="20"/>
              <label class="textColor form-label">Description</label>
            </div>

            <!-- Song mood -->
            <select class="form-control" name="mood" id="mood">
				<option value="happy">Happy</option>
				<option value="sad">Sad</option>
				<option value="peaceful">Peaceful</option>
				<option value="epic">Epic</option>
				<option value="wierd">Wierd</option>
				<option value="dark">Dark</option>
			</select>
            <label class="textColor form-label">Mood</label>

            <!-- File select -->
            <div class="form-outline mb-4">
              <input type="file" class="form-control" name="file"/>
              <label class="textColor form-label">Cover image</label>
            </div>

              <!-- Song select -->
              <div class="form-outline mb-4">
              <input type="file" class="form-control" name="song"/>
              <label class="textColor form-label">Song</label>
            </div>
          
            <!-- Submit button -->
            <button type="submit" class="btn btn-primary btn-block mb-4" name="add_song">Add</button>
          </form>
    </body>
</html>