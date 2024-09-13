<?php 
session_start();

$db = mysqli_connect("localhost","root","","songfinderDB");

//Role
$currentUsername = $_SESSION['username'];
$query = "SELECT * FROM users where username='$currentUsername'";
$result = mysqli_query($db, $query);
$user = mysqli_fetch_assoc($result);
$_SESSION['role'] = $user['role'];
$userId = $user['ID'];


//Songs
//$query = "SELECT ID, name, description, filename, mood, songFilename FROM songs WHERE favorited LIKE '1'";
$query = "SELECT songs.* FROM user_songs JOIN songs ON user_songs.song_id = songs.id WHERE user_songs.user_id LIKE $userId";
$result = mysqli_query($db, $query);
while($row = mysqli_fetch_assoc($result)){
    $json[] = $row;
}
?>

<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <title>Song Finder</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
	<link rel="stylesheet" href="home-page.css">
  </head>

<body>
  <header class="header-area header-sticky">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <nav class="main-nav">
					<p class="roleText"><?php echo $_SESSION['role']?></p>
                    <a href="index.php" class="logo">
                        <i class="iconLogo bi bi-music-note-list"></i>
                    </a>
                    <ul class="nav">
						<?php if ($_SESSION['role'] == "creator"){ ?>
					<li><a href="add.php">Add</a></li>
					<?php }?>
                        <li><a href="index.php">Home</a></li>
                        <li><a href="favorited.php" class="active">Favorited</a></li>
                        <li><a href="index.php?logout='1'">Logout</a></li>
                    </ul>   
                    <a class='menu-trigger'>
                        <span>Menu</span>
                    </a>
                    <!-- ***** Menu End ***** -->
                </nav>
            </div>
        </div>
    </div>
  </header>
  <!-- ***** Header Area End ***** -->

  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="page-content">

          <!-- ***** Most Popular Start ***** -->
          <div class="most-popular">
            <div class="row">
              <div class="col-lg-12">
                <div class="heading-section">
                  <h4 id="browse-section"><em>YOUR</em> FAVORITES</h4>
                </div>
                <div class="row">
				  <?php
				  	if(mysqli_num_rows($result) > 0){
				  		foreach ($json as $song){
							?>
									<div class="col-lg-3 col-sm-6">
									<div class="item">
									  <img src="uploads/<?php echo $song['filename'];?>" alt="">
                    <ul>
									  <!-- <i id="like" class="likeIcons bi bi-heart-fill"></i> -->

                    <form method="post">
									  <!-- <i class="likeIcons bi bi-heart-fill" onclick="addClass()"></i> -->
                    <input type="submit" value="Unlike" name="<?php echo $song['ID']; ?>" class="btn btn-primary">
									  </form>
									  <?php
									  		//Set un-favorites
											if(isset($_POST[$song['ID']])) {
                      $songName = $song['name'];
                      $songId = $song['ID'];
											//$favquery = "UPDATE songs SET favorited='0' WHERE name LIKE '$songName'";
                      $favquery = "DELETE FROM user_songs WHERE user_id = '$userId' AND song_id = '$songId'";
											mysqli_query($db, $favquery);
                      echo "<meta http-equiv='refresh' content='0'>";
											}
									  ?>
									  </ul>
									  <h4 name="name"><?php echo $song['name'] ?>&nbsp;&nbsp;&nbsp;&nbsp;<h4 class="moodText" name="mood"><?php echo $song['mood'] ?></h4> <br><span name="description"><?php echo $song['description'] ?></span></h4>
                    <audio controls>
                    <source src="songUploads/<?=$song['songFilename']?>" type="audio/ogg">
                  Your browser does not support the audio element.
                  </audio>
									</div>
								  </div>
								  <?php
						}
					}else{
						?>
						<h4 class="noSongs">Currently there are no favorited songs!</h4>
						<?php
					}
						?>






                  </div>
                  <!-- this is the end of added songs -->
                </div>
              </div>
            </div>
          </div>
          <!-- ***** Most Popular End ***** -->
        </div>
      </div>
    </div>
  </div>


  </body>

</html>
