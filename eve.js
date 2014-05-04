// ---------------------------------------------------------------

function clearCookies() {
  $.removeCookie('bf-alert-igb');
  $.removeCookie('bf-alert-not-trusted');
  $.removeCookie('bf-numberformat');
}

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

// ---------------------------------------------------------------

$( document ).ready(function() {
  updateCalcD();  
});

$('#calcd-input-cargo-value').on('input', function(){
    updateCalcD();
});

$('#calcd-input-collateral-value').on('input', function(){
    updateCalcD();
});

function isNumber(n) {
  return !isNaN(parseInt(n)) && isFinite(n);
}

function calcDError(objname, text) {
  $('#calcd-input-' + objname + '-form').addClass('has-error');
  $('#calcd-input-' + objname + '-error').html(text);
  
  $('#calcd-output-cargo-row').addClass('text-muted');
  $('#calcd-output-collateral-row').addClass('text-muted');

  $('#calcd-output-cargo-value').html('');
  $('#calcd-output-collateral-value').html('');
  $('#calcd-output-reward-value').html('');
}

function calcDClearError() {
  $('#calcd-input-cargo-form').removeClass('has-error');
  $('#calcd-input-cargo-error').html('');

  $('#calcd-input-collateral-form').removeClass('has-error');
  $('#calcd-input-collateral-error').html('');
}

function updateCalcD() {
  calcDClearError();

  var error = false;
  var idx = 0;
  
  var inCargo = $('#calcd-input-cargo-value').val();
  if (inCargo == null || inCargo.length == 0) {
    inCargo = "0";
  }
  idx = inCargo.indexOf(fsep);
  if (idx != -1) {
    inCargo = inCargo.split(fsep).join('');  
    $('#calcd-input-cargo-value').val(inCargo);
  }
  idx = inCargo.indexOf(fdec);  
  if (idx != -1) {
    inCargo = inCargo.substr(0, idx);    
    $('#calcd-input-cargo-value').val(inCargo);
  }
  if (!isNumber(inCargo)) {
    calcDError('cargo', 'Numbers only my friend!');
    error = true;
  }
  if (inCargo > 320000) {
    calcDError('cargo', 'This is too damn high!');
    error = true;
  }
  if (inCargo < 0) {
    calcDError('cargo', 'Negative? Impossible!');
    error = true;
  }

  var inCollateral = $('#calcd-input-collateral-value').val();
  if (inCollateral == null || inCollateral.length == 0) {
    inCollateral = "0";
  }
  idx = inCollateral.indexOf(fsep);
  if (idx != -1) {
    inCollateral = inCollateral.split(fsep).join('');  
    $('#calcd-input-collateral-value').val(inCargo);
  }
  idx = inCollateral.indexOf(fdec);  
  if (idx != -1) {
    inCollateral = inCollateral.slice(0,idx);
    $('#calcd-input-collateral-value').val(inCollateral);
  }
  if (!isNumber(inCollateral)) {
    calcDError('collateral', 'Numbers only my friend!');
    error = true;
  }
  if (inCollateral > 1000000000) {
    calcDError('collateral', 'This is too damn high!');
    error = true;
  }
  if (inCollateral < 0) {
    calcDError('collateral', 'Negative? Impossible!');
    error = true;
  }
 
  if (error) {
    return 0;
  }

  var cargoFee = Math.max(1, Math.ceil(inCargo / 20000)) * 3000000;
  var collateralFee = Math.max(1, Math.ceil(inCollateral / 62500000)) * 3000000;
  var reward = 1000000 + Math.max(cargoFee, collateralFee);
  
  if (cargoFee > collateralFee) {
    $('#calcd-output-cargo-row').removeClass('text-muted');
    $('#calcd-output-collateral-row').addClass('text-muted');
  }
  if (collateralFee > cargoFee) {
    $('#calcd-output-cargo-row').addClass('text-muted');
    $('#calcd-output-collateral-row').removeClass('text-muted');  
  }
  if (cargoFee == collateralFee) {    
    $('#calcd-output-cargo-row').removeClass('text-muted');
    $('#calcd-output-collateral-row').addClass('text-muted');
  } 
  
  $('#calcd-output-cargo-value').html(formatISK(cargoFee) + ' ISK');
  $('#calcd-output-collateral-value').html(formatISK(collateralFee) + ' ISK');
  $('#calcd-output-reward-value').html(formatISK(reward) + ' ISK');
  
  return reward;
}
// ---------------------------------------------------------------

$( document ).ready(function() {
  updateCalc();  
});

$('#calc-input-cargo-value').on('input', function(){
    updateCalc();
});

$('#calc-input-collateral-value').on('input', function(){
    updateCalc();
});

function isNumber(n) {
  return !isNaN(parseInt(n)) && isFinite(n);
}

function calcError(objname, text) {
  $('#calc-input-' + objname + '-form').addClass('has-error');
  $('#calc-input-' + objname + '-error').html(text);
  
  $('#calc-output-cargo-row').addClass('text-muted');
  $('#calc-output-collateral-row').addClass('text-muted');

  $('#calc-output-cargo-value').html('');
  $('#calc-output-collateral-value').html('');
  $('#calc-output-reward-value').html('');
}

function calcClearError() {
  $('#calc-input-cargo-form').removeClass('has-error');
  $('#calc-input-cargo-error').html('');

  $('#calc-input-collateral-form').removeClass('has-error');
  $('#calc-input-collateral-error').html('');
}

function updateCalc() {
  calcClearError();

  var error = false;
  var idx = 0;
  
  var inCargo = $('#calc-input-cargo-value').val();
  if (inCargo == null || inCargo.length == 0) {
    inCargo = "0";
  }
  idx = inCargo.indexOf(fsep);
  if (idx != -1) {
    inCargo = inCargo.split(fsep).join('');  
    $('#calc-input-cargo-value').val(inCargo);
  }
  idx = inCargo.indexOf(fdec);  
  if (idx != -1) {
    inCargo = inCargo.substr(0, idx);    
    $('#calc-input-cargo-value').val(inCargo);
  }
  if (!isNumber(inCargo)) {
    calcError('cargo', 'Numbers only my friend!');
    error = true;
  }
  if (inCargo > 320000) {
    calcError('cargo', 'This is too damn high!');
    error = true;
  }
  if (inCargo < 0) {
    calcError('cargo', 'Negative? Impossible!');
    error = true;
  }

  var inCollateral = $('#calc-input-collateral-value').val();
  if (inCollateral == null || inCollateral.length == 0) {
    inCollateral = "0";
  }
  idx = inCollateral.indexOf(fsep);
  if (idx != -1) {
    inCollateral = inCollateral.split(fsep).join('');  
    $('#calc-input-collateral-value').val(inCargo);
  }
  idx = inCollateral.indexOf(fdec);  
  if (idx != -1) {
    inCollateral = inCollateral.slice(0,idx);
    $('#calc-input-collateral-value').val(inCollateral);
  }
  if (!isNumber(inCollateral)) {
    calcError('collateral', 'Numbers only my friend!');
    error = true;
  }
  if (inCollateral > 1000000000) {
    calcError('collateral', 'This is too damn high!');
    error = true;
  }
  if (inCollateral < 0) {
    calcError('collateral', 'Negative? Impossible!');
    error = true;
  }
 
  if (error) {
    return 0;
  }

  var cargoFee = Math.max(1, Math.ceil(inCargo / 20000)) * 1500000;
  var collateralFee = Math.max(1, Math.ceil(inCollateral / 62500000)) * 1500000;
  var reward = 1000000 + Math.max(cargoFee, collateralFee);
  
  if (cargoFee > collateralFee) {
    $('#calc-output-cargo-row').removeClass('text-muted');
    $('#calc-output-collateral-row').addClass('text-muted');
  }
  if (collateralFee > cargoFee) {
    $('#calc-output-cargo-row').addClass('text-muted');
    $('#calc-output-collateral-row').removeClass('text-muted');  
  }
  if (cargoFee == collateralFee) {    
    $('#calc-output-cargo-row').removeClass('text-muted');
    $('#calc-output-collateral-row').addClass('text-muted');
  } 
  
  $('#calc-output-cargo-value').html(formatISK(cargoFee) + ' ISK');
  $('#calc-output-collateral-value').html(formatISK(collateralFee) + ' ISK');
  $('#calc-output-reward-value').html(formatISK(reward) + ' ISK');
  
  return reward;
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
  
  updateCalc();
	updateCalcD();
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

  $('.popover-reward').popover();

// ---------------------------------------------------------------
