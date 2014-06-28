<?php

function tpl_header($css, $active) {
    require("header.tpl");
}

function tpl_lead($headline, $teaser) {
    require("lead.tpl");
}

function tpl_news() {
		$expire = filemtime("./tpl/news.tpl");
    require("news.tpl");
}

function tpl_footer($scripts) {
    require("footer.tpl");
}

?>
