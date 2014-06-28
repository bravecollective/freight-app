// ---------------------------------------------------------------

function clearCookies() {
  $.removeCookie('bf-alert-igb');
  $.removeCookie('bf-alert-not-trusted');
  $.removeCookie('bf-numberformat');
  $.removeCookie('bf-alert-news');
}

// ---------------------------------------------------------------

$( document ).ready(function() {
	if ($.cookie('bf-alert-news') != $('#alert-news-expire').val()) {  
      $('#alert-news').removeClass('hide');
      $('#alert-news').addClass('in');
	}
});

// ---------------------------------------------------------------

var igbtrusted = false;

$( document ).ready(function() {
  if (!isIGB()) {
    if (!$.cookie('bf-alert-igb')) {  
      $('#alert-use-igb').removeClass('hide');
      $('#alert-use-igb').addClass('in');
    }
  } else {
    $.ajax( "trust.php" )
      .done(function() {
        igbtrusted = true;
      })
      .fail(function() {
        if (!$.cookie('bf-alert-not-trusted')) {    
          $('#alert-not-trusted').removeClass('hide');
          $('#alert-not-trusted').addClass('in');
        }
      });
  }
});

function isIGB() {
  return (typeof CCPEVE != 'undefined');
}

function isIGBTrusted() {
  if (!isIGB()) {
    return false;
  }
  
  return igbtrusted;
}

// ---------------------------------------------------------------

$("#popsys").mouseleave(function() {
  $("#popsys").removeClass('hide');
  $("#popsys").addClass('hide');
});

$("#popchar").mouseleave(function() {
  $("#popchar").removeClass('hide');
  $("#popchar").addClass('hide');
});

$("#popcorp").mouseleave(function() {
  $("#popcorp").removeClass('hide');
  $("#popcorp").addClass('hide');
});

function popShow(obj, overlay) {
  $(overlay).css({left: 0, top: 0, position:'absolute'});
  $(overlay).removeClass('hide');

  var x = $(obj).offset().left;
  var y = $(obj).offset().top;
  if (x + $(overlay).width() > $(document).width()) {
    x = (x + $(obj).width() - $(overlay).width());
  }
  if (y + $(overlay).height() > $(document).height()) {
    y = (y + $(obj).height() - $(overlay).height());
  }

 $(overlay).css({left: x, top: y, position:'absolute'});
}

function popChar(obj, charid, charname) {
  var cnt;
  
  $('#popchar-name').html(charname);
  $('#popchar-image').html('<img src="https://image.eveonline.com/Character/' + charid + '_64.jpg">');
      
  cnt = "";
  cnt += '<a href="http://evewho.com/pilot/' + charname + '" target="_blank">Eve Who</a>';
  cnt += '<br>';
  cnt += '<a href="http://eve-kill.net/?a=pilot_detail&plt_external_id=' + charid + '" target="_blank">EVE-Kill</a>';
  cnt += '<br>';
  cnt += '<a href="https://zkillboard.com/character/' + charid + '/" target="_blank">zKillboard</a>';  
  $('#popchar-content-1').html(cnt);
  
  cnt = "";
  if (isIGB()) {
    cnt += '<a href="#" class="eve-link" onclick="CCPEVE.showInfo(1377, ' + charid + ');">Show Info</a>';
  } else {
    cnt += '<span class="disabled">Show Info</span>';
  }
  cnt += '<br>';
  
  if (isIGBTrusted()) {
    cnt += '<a href="#" class="eve-link" onclick="CCPEVE.sendMail(' + charid + ', &quot;BRAVE Freight&quot;, &quot;Hi kiu,&quot;);">Send Message</a>';
    cnt += '<br>';
    cnt += '<a href="#" class="eve-link" onclick="CCPEVE.startConversation(' + charid + ');">Start Conversation</a>';
  } else {
    cnt += '<span class="disabled">Send Message</span>';
    cnt += '<br>';
    cnt += '<span class="disabled">Start Conversation</span>';
  }  
  $('#popchar-content-2').html(cnt);
  
  popShow(obj, '#popchar');
}

function popSys(obj, sysid, sysname, syssecurity, sysclass, stnid, stnname) {
  var cnt;
  
  $('#popsys-name').html('<span class="' + sysclass + '">' + stnname + ' [' + syssecurity + ']</span');
      
  cnt = "";
  cnt += '<a href="http://evemaps.dotlan.net/system/' + sysname + '" target="_blank">dotlan</a>';
  cnt += '<br>';
  cnt += '<a href=" https://wiki.eveonline.com/en/wiki/' + sysname + '_(System)" target="_blank">EVElopedia</a>';
  cnt += '<br>';
  if (isIGB()) {
    cnt += '<a href="#" class="eve-link" onclick="CCPEVE.showInfo(5, ' + sysid + ');">Show Info</a>';
  } else {
    cnt += '<span class="disabled">Show Info</span>';
  }
  $('#popsys-content-1').html(cnt);
    
  cnt = "";  
  if (isIGBTrusted()) {
    cnt += '<a href="#" class="eve-link" onclick="CCPEVE.showOnMap(' + sysid + ');">Show Map</a>';
    cnt += '<br>';
    cnt += '<a href="#" class="eve-link" onclick="CCPEVE.setDestination(' + stnid + ');">Set Destination</a>';
    cnt += '<br>';
    cnt += '<a href="#" class="eve-link" onclick="CCPEVE.addWaypoint(' + stnid + ');">Add Waypoint</a>';
  } else {
    cnt += '<span class="disabled">Show Map</span>';
    cnt += '<br>';
    cnt += '<span class="disabled">Set Destination</span>';
    cnt += '<br>';
    cnt += '<span class="disabled">Add Waypoint</span>';
  }  
  $('#popsys-content-2').html(cnt);
 
	popShow(obj, '#popsys');
}

function popCorp(obj, corpid, corpname) {
  var cnt;
  
  $('#popcorp-name').html(corpname);
  $('#popcorp-image').html('<img src="https://image.eveonline.com/Corporation/' + corpid + '_64.png">');

  cnt = "";
  cnt += '<a href="http://evewho.com/corp/' + corpname + '" target="_blank">Eve Who</a>';
  cnt += '<br>';
  cnt += '<a href="http://eve-kill.net/?a=corp_detail&crp_external_id=' + corpid + '" target="_blank">EVE-Kill</a>';
  cnt += '<br>';
  cnt += '<a href="https://zkillboard.com/corporation/' + corpid + '/" target="_blank">zKillboard</a>';  
  $('#popcorp-content-1').html(cnt);
  
  cnt = "";
  if (isIGB()) {
    cnt += '<a href="#" class="eve-link" onclick="CCPEVE.showInfo(2, ' + corpid + ');">Show Info</a>';
  } else {
    cnt += '<span class="disabled">Show Info</span>';
  }
  cnt += '<br>';

  if (isIGBTrusted()) {
    cnt += '<a href="#" class="eve-link" onclick="CCPEVE.addCorpContact(' + corpid + ');">Add Contact</a>';
    cnt += '<br>';
    cnt += '<a href="#" class="eve-link" onclick="CCPEVE.showContracts(' + corpid + ');">Show Contracts</a>';
  } else {
    cnt += '<span class="disabled">Add Contact</span>';
    cnt += '<br>';
    cnt += '<span class="disabled">Show Contracts</span>';
  }  
  $('#popcorp-content-2').html(cnt);
  
  popShow(obj, '#popcorp');
}
// ---------------------------------------------------------------

function isNumber(n) {
  return !isNaN(parseInt(n)) && isFinite(n);
}

// ---------------------------------------------------------------

// <span id="fsep"></span>
// <span id="fdec"></span>

var fMain = true;
var fsep = ' ';
var fdec = ' ';

$(document).ready(function() {
  updateNumberformat();
});

function updateNumberformat() {

  var lang_with_comma = "az_AZ be_BY bg_BG bs_BA ca_ES crh_UA cs_CZ da_DK de_AT de_BE de_DE de_LU el_CY el_GR es_AR es_BO es_CL es_CO es_CR es_EC es_ES es_PY es_UY es_VE et_EE eu_ES eu_ES@euro ff_SN fi_FI fr_BE fr_CA fr_FR fr_LU gl_ES hr_HR ht_HT hu_HU id_ID is_IS it_IT ka_GE kk_KZ ky_KG lt_LT lv_LV mg_MG mk_MK mn_MN nb_NO nl_AW nl_NL nn_NO pap_AN pl_PL pt_BR pt_PT ro_RO ru_RU ru_UA rw_RW se_NO sk_SK sl_SI sq_AL sq_MK sr_ME sr_RS sr_RS@latin sv_SE tg_TJ tr_TR tt_RU@iqtelif uk_UA vi_VN wo_SN";
  var lang = (window.navigator.systemLanguage || window.navigator.userLanguage || window.navigator.browserLanguage || window.navigator.language || "en_US");
  fMain = (lang_with_comma.indexOf(lang) == -1);
    
  var cookie = $.cookie('bf-numberformat');
  if (cookie == "main") {
    fMain = true;    
  }
  if (cookie == "alt") {
    fMain = false;    
  }

  if (fMain) {
    fsep = ",";
    fdec = ".";
  } else {
    fsep = ".";
    fdec = ",";
  }

  $("span").each(function( index, element ) {
    if ($(element).is( "#fsep")) {
      $(element).text(fsep);
    }
    if ($(element).is( "#fdec")) {
      $(element).text(fdec);
    }
  });
  
	try {
	  calcNow();
	} catch (err) {
	}

}

function toggleNumberformat() {
  if (fMain) {
    $.cookie('bf-numberformat', 'alt', {expires: 3650});
  } else {
    $.cookie('bf-numberformat', 'main', {expires: 3650});
  }

  updateNumberformat();
}

  
function formatISK(input) {
  var isk = input.toString();
  var res = "";
  
  for (i = 0 ; i <= isk.length; i++) {
    res += isk.charAt(i);
    if ((isk.length -1 - i) % 3 == 0 && i != isk.length -1) {
      res += fsep;
    }
  }

  return res;
}

// ---------------------------------------------------------------

function fillLink(obj, text, nonigb, igb, trust) {
  if (trust != null && isIGBTrusted()) {
    $(obj).html(trust);
    return;
  }
  if (igb != null && isIGB()) {
    $(obj).html(igb);
    return;
  }
  if (nonigb != null) {
    $(obj).html(nonigb);
    return;
  }
  
  $(obj).html("<em>"+text+"</em>");
}

// ---------------------------------------------------------------

function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

// ---------------------------------------------------------------

