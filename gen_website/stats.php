<?php

require("tpl/tpl.php");

tpl_header(array(), "stats");

tpl_lead("Freighting Statistics", "Excel in space!");

tpl_news();

require("cnt/stats.tpl");

tpl_footer(array("js/chart.min.js", "js/freight_stats.js"));

?>
