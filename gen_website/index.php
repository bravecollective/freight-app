<?php

require("tpl/tpl.php");

tpl_header(array(), "index");

tpl_lead("Moving Stuff for Fun and Profit", "");

tpl_news();

require("cnt/index.tpl");

tpl_footer(array());

?>
