<?php

require("tpl/tpl.php");

tpl_header(array(), "faq");

tpl_lead("Frequently Asked Questions", "Freighting is soo confusing!");

tpl_news();

require("cnt/faq.tpl");

tpl_footer(array());

?>
