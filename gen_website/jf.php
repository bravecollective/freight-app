<?php

require("tpl/tpl.php");

$css = array("css/typeahead.css");
tpl_header($css, "jf");

tpl_lead("Jump Freighter Calculator", "Jump freighter rewards depend on the route, cargo size and chosen collateral<br>See rates below and checkout the <a href='faq.html'>FAQ</a>");

tpl_news();

require("cnt/jf.tpl");

$scripts = array("js/typeahead.bundle.js", "js/handlebars-v1.3.0.js", "js/freight_jf.js");
tpl_footer($scripts);

?>
