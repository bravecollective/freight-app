<!DOCTYPE html>
<html lang="en">     

  <head>         
    <meta charset="utf-8">         
    <meta http-equiv="X-UA-Compatible" content="IE=edge">         
    <meta name="viewport" content="width=device-width, initial-scale=1.0">         
    <meta name="description" content="BRAVE Freight">         
    <meta name="author" content="kiu Nakamura">         
    <link rel="shortcut icon" href="favicon.png">         
    <title>BRAVE Freight</title>         
    <link href="css/bootstrap.min.css" rel="stylesheet">         
    <link href="css/starter-template.css" rel="stylesheet">         
    <link href="css/freight.css" rel="stylesheet">
<?php
	foreach ($css as $file) {
		echo "    <link href='" . $file . "' rel='stylesheet'>\n";
	}
?>

  </head>     

  <body>

<!-- Navigation -->
     <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="index.html"><img style="margin-top: -7px;" src='img/brave.png'></a>
        </div>
        <div class="collapse navbar-collapse pull-right">
          <ul class="nav navbar-nav">
            <li <?php if ($active == "index") echo "class='active'"; ?>><a href="index.html">Overview</a></li>
            <li <?php if ($active == "jf") echo "class='active'"; ?>><a href="jf.html">Jump Freighter</a></li>
            <li <?php if ($active == "stats") echo "class='active'"; ?>><a href="stats.html">Stats</a></li>
            <li <?php if ($active == "faq") echo "class='active'"; ?>><a href="faq.html">FAQ</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src='img/settings.png'><b class="caret"></b></a>
              <ul class="dropdown-menu pull-right">
                <li class="dropdown-header">Helper functions</li>
                <li><a href="#" onclick="toggleNumberformat();">Toggle Numberformat</a></li>
                <li><a href="#" onclick="clearCookies();location.reload();">Clear all cookies</a></li>                
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
<!-- Navigation -->
  
<!-- Alerts -->
      <div class="alert alert-info hide fade" id="alert-use-igb">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true" onclick="$.cookie('bf-alert-igb', '1', {expires: 3650});">&times;</button>
        Tip: Using the <strong>in-game browser</strong> enables additional convenience features
      </div>

      <div class="alert alert-info hide fade" id="alert-not-trusted">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true" onclick="$.cookie('bf-alert-not-trusted', '1', {expires: 3650})">&times;</button>        
        <p>
          Tip: <strong>Trusting this site</strong> enables additional convenience features<br>        
          <small>Please reload this page once after granting trust</small>
        </p>
        <br>
        <button type="button" class="btn btn-danger" onclick="CCPEVE.requestTrust('http://freight.braveineve.com/*');">Trust this site</button>        
      </div>

      <div class="alert alert-danger fade in">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <b>WE ARE DEPLOYING \o/</b><br>
	<b>Read more about freighting options in regards to the deployment on the <a href="index.html">main</a> page.</b>
      </div>
<!-- Alerts -->

