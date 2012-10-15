<?php
include("wewClass.php");

$wew = new wewAPI();

$callproto = $wew->get("xhtml_make_phone_call_string");
var_dump($callproto) ;
?>

<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title></title>
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<link rel="stylesheet" href="../css/style.css">
</head>
<body>
<div id="container">
	<header>
	<h1>Checking Capabilities</h1>
	</header>
	<div id="main" role="main">
	<h2>Click to call</h2>
	<p>Decide which protocol to use for click to call.</p>
	<p>
	<?php
		if ($callproto != "none") {
			echo '<a href="'.$callproto.'99999999">Call us now!</a>';
		}else{
			echo "Pick up your phone and call us at 99999999";
		} 
	?>
	</p>
</div>
	<footer>

	</footer>
</div> <!--! end of #container -->
</body>
</html>
