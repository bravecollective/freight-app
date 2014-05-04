<?php

  $trusted = false;

  foreach (getallheaders() as $name => $value) {
    if ($name == "EVE_CHARID") {
      $trusted = true;
    }
  }

  if ($trusted) {
    header("HTTP/1.0 202 Accepted");
  }  else {
    header("HTTP/1.0 403 Forbidden");
  }

?>
