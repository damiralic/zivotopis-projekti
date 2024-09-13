<?php
	session_start();

	if (!isset($_SESSION['username'])) {
		$_SESSION['msg'] = "You must log in first";
		header('location: login.php');
	}
	if (isset($_GET['logout'])) {
		session_destroy();
		unset($_SESSION['username']);
		header("location: login.php");
	}
		//Role check in index
		$db = mysqli_connect("localhost","root","","songfinderDB");
		$currentUsername = $_SESSION['username'];
		$query = "SELECT * FROM users where username='$currentUsername'";
		$result = mysqli_query($db, $query);
		$user = mysqli_fetch_assoc($result);
		$_SESSION['role'] = $user['role'];
    $userId = $user['ID'];

		//Get all songs from DB
    $mood_query = "SELECT * FROM songs";
    $mood_query_run = mysqli_query($db, $mood_query);
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
                        <li><a href="index.php" class="active">Home</a></li>
                        <li><a href="favorited.php">Favorited</a></li>
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

          <!-- ***** Banner Start ***** -->
          <div class="main-banner">
            <div class="row">
              <div class="col-lg-7">
                <div class="header-text">
                  <h6>Welcome To Song Finder</h6>
                  <h4><em>Find</em> newest songs</h4>
                  <div class="main-button">
                    <a href="#browse-section">Browse Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- ***** Banner End ***** -->
          <!-- ***** Most Popular Start ***** -->
          <div class="most-popular">
            <div class="row">
              <div class="col-lg-12">
                <div class="heading-section">
                  <h4 id="browse-section"><em>Most Popular</em> Right Now</h4>

                  <form action="" method="GET">
    <!-- <button type="submit">search</button> -->
<?php
    if(mysqli_num_rows($mood_query_run) > 0){
      foreach($mood_query_run as $moodlist){
        $checked = [];
        if(isset($_GET['filter'])){
          $checked = $_GET['filter'];
        }
        ?>
        <div class="inlinePill">
        <input class="pillbutton moodText" type="submit" name="filter[]" value="<?= $moodlist['mood'];?>"
          <?php if(in_array($moodlist['mood'], $checked)){ echo "checked"; } ?>
          />
        </div>
        <?php
      }
    }

    ?>
    <button class="clearPillButton moodText" type="submit" name="" value="<?= "" ?>">Clear</button>
      <?php
?>
</form>
                </div>
                <div class="row">
				  <?php
          if(isset($_GET['filter'])){
            $filterschecked = [];
            $filterschecked = $_GET['filter'];
            foreach($filterschecked as $rowfilter){
              $getquery = "SELECT * FROM songs WHERE mood LIKE '$rowfilter'";
              $getresult = mysqli_query($db, $getquery);
              while($row = mysqli_fetch_assoc($getresult)){
                $json[] = $row;
               }


               if(mysqli_num_rows($getresult) > 0){
                foreach ($json as $song){
                  if(strlen($song['description'])<10){
                    $test_desc = $song['description'];
                  }else{
                    $test_desc = 'Read more';
                  }
                ?>
                          <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img src="uploads/<?php echo $song['filename'];?>" alt="">
                      <ul>
                      <form method="post">
                      <input type="submit" value="Like" name="<?php echo $song['ID']; ?>" class="btn btn-primary">
                      </form>
                      <?php
                          //Set favorites
                        if(isset($_POST[$song['ID']])) {
                        $songName = $song['name'];
                        $songId = $song['ID'];
                        $favquery = "INSERT INTO user_songs (user_id, song_id) VALUES ('$userId', '$songId')";
                        mysqli_query($db, $favquery);
                        }
                      ?>
                      </ul>
                      <h4 name="name"><?php echo $song['name'] ?>&nbsp;&nbsp;&nbsp;&nbsp;<h4 class="moodText" name="mood"><?php echo $song['mood'] ?></h4> <br><span name="description"><?php echo $song['description'] ?></span></h4>
                      <audio controls controlsList="nodownload noplaybackrate">
                    <source src="songUploads/<?=$song['songFilename']?>" type="audio/ogg">
                  Your browser does not support the audio element.
                  </audio>
                    </div>
                    </div>
                    <?php
              }
            }else{
              ?>
              <h4 class="noSongs">Currently there are no songs added!</h4>
              <?php
            }

            }
          }else{


            $getquery = "SELECT ID, name, description, filename, mood, songFilename FROM songs";
            $getresult = mysqli_query($db, $getquery);
            while($row = mysqli_fetch_assoc($getresult)){
              $json[] = $row;
             }


            if(mysqli_num_rows($getresult) > 0){
				  		foreach ($json as $song){
                if(strlen($song['description'])<10){
                  $test_desc = $song['description'];
                }else{
                  $test_desc = 'Read more';
                }
							?>
											  <div class="col-lg-3 col-sm-6">
									<div class="item">
									  <img src="uploads/<?php echo $song['filename'];?>" alt="">
                    <ul>
									  <form method="post">
									  <!-- <i class="likeIcons bi bi-heart-fill" onclick="addClass()"></i> -->
									  <input type="submit" value="Like" name="<?php echo $song['ID']; ?>" class="btn btn-primary">
									  </form>
									  <?php
									  		//Set favorites
											if(isset($_POST[$song['ID']])) {
                      $songName = $song['name'];
                      $songId = $song['ID'];
                      $favorited = 1;
                      $favquery = "INSERT INTO user_songs (user_id, song_id) VALUES ('$userId', '$songId')";
											mysqli_query($db, $favquery);
											}
									  ?>
									  </ul>
									  <h4 name="name"><?php echo $song['name'] ?>&nbsp;&nbsp;&nbsp;&nbsp;<h4 class="moodText" name="mood"><?php echo $song['mood'] ?></h4> <br><span name="description"><?php echo $song['description'] ?></span></h4>
                    <audio controls controlsList="nodownload noplaybackrate">
                    <source src="songUploads/<?=$song['songFilename']?>" type="audio/ogg">
                  Your browser does not support the audio element.
                  </audio>
									</div>
								  </div>
								  <?php
						}
					}else{
						?>
						<h4 class="noSongs">Currently there are no songs added!</h4>
						<?php
					}
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
