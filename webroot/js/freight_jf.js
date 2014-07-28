// ---------------------------------------------------------------

var feeHubPenalty = 5000000;
var feePerJump = 2000000;
var feePerLy = 4500000;

var maxCargo = 320000;
var pivotCargo = 320000;
var maxCollateral = 3000000000;
var pivotCollateral = 2000000000;
// var jumpRange = 10; // JDC4 ly
var jumpRange = 11.25; // JDC5 ly

var exportDiscount = 0.5;

var hubs = [
	'V-3YG7 VI',
	'GE-8JV VII',
	'HED-GP III',
	'GJ0-OJ IV',
	'QETZ-W I',
	'Mendori IX-9 IAF',
	'Rahadalon VIII-2 MABO',
	'Sendaya V CB'
];
hubs.sort();

var exports = [
	'Mendori IX-9 IAF'
];

var evedata;
$.ajax({
	async: false,
	url: 'stations.json',
	mimeType: "application/json",
	dataType: 'json',
	success: function(response){
		evedata = response;
  }
});

// ---------------------------------------------------------------

$(document).ready(function() {
	calcNow();
});

$('#calc-input-from-value').on('propertychange change keyup paste input', function(){
    calcNow();
});
$('#calc-input-to-value').on('propertychange change keyup paste input', function(){
    calcNow();
});

$('#calc-input-cargo-value').on('propertychange change keyup paste input', function(){
    calcNow();
});
$('#calc-input-cargo-value').on('focusout', function(){
	calcInputGetValue('cargo', maxCargo, true);
});

$('#calc-input-collateral-value').on('propertychange change keyup paste input', function(){
    calcNow();
});
$('#calc-input-collateral-value').on('focusout', function(){
	calcInputGetValue('collateral', maxCollateral, true);
});

// ---------------------------------------------------------------

$("#popstations").mouseleave(function() {
  $("#popstations").removeClass('hide');
  $("#popstations").addClass('hide');
});

function popStations(obj, list, dest) {
  var cnt = "";
	for (var s in list) {
		cnt += '<tr><td style="padding-left: 8px; padding-right: 8px;" class="text-info" onclick="$(\'#' + dest + '\').val(\'' + list[s] +'\').change();">' + list[s] + '</td></tr>\n';
	}

  $('#popstations-content').html(cnt); 
	popShow(obj, '#popstations');
}

// ---------------------------------------------------------------

var stationMatcher = function() {
	return function findMatches(q, cb) {
		var matches, substringRegex;
		matches = [];
		substrRegex = new RegExp("^" + q, 'i');
		$.each(evedata, function(i, str) {
			if (substrRegex.test(str.sname)) {
				matches.push({ sname: str.sname, region: str.rname, aname: str.aname });
			}
		});
		cb(matches);
	};
};

$('#calc-input-from-form .typeahead').typeahead({
	hint: false,
	highlight: true,
	minLength: 1
},
{
	name: 'states',
	displayKey: 'sname',
	source: stationMatcher(),
  templates: {
		suggestion: Handlebars.compile('<p class="text-right"><strong>{{sname}}</strong> <small>({{region}}) {{#if aname }}[{{ aname}}]{{/if}}</small></p>')
	}
}).on('typeahead:selected', function(obj, val){ $('#calc-input-from-value').val(val['sname']); calcNow(); });

$('#calc-input-to-form .typeahead').typeahead({
	hint: false,
	highlight: true,
	minLength: 1
},
{
	name: 'states',
	displayKey: 'sname',
	source: stationMatcher(),
  templates: {
		suggestion: Handlebars.compile('<p class="text-right"><strong>{{sname}}</strong> <small>({{region}}) {{#if aname }}[{{ aname}}]{{/if}}</small></p>')
	}
}).on('typeahead:selected', function(obj, val){ $('#calc-input-to-value').val(val['sname']); calcNow(); });

// ---------------------------------------------------------------

function findStation(name) {
	if (name == null || name.length == 0) {
		return false;
	}

	var	needle = name.toUpperCase();
	
	for (var stn in evedata) {
		if (evedata[stn]['sname'].toUpperCase() == needle) {
			return evedata[stn];
		}
	}

	return false;
}

// ---------------------------------------------------------------

function calcOutputClear() {
	$('#calc-output-distance-row').addClass('text-muted');
	$('#calc-output-distance-value').html('N/A');
	$('#calc-output-distance-info').html('');

	$('#calc-output-cyno-row').addClass('text-muted');
	$('#calc-output-cyno-value').html('N/A');
	$('#calc-output-cyno-info').html('');

	$('#calc-output-modifier-row').addClass('text-muted');
	$('#calc-output-modifier-value').html('N/A');
	$('#calc-output-modifier-info').html('');

	$('#calc-output-freight-row').addClass('text-muted');
	$('#calc-output-freight-value').html('N/A');

	$('#calc-output-nonhub-row').addClass('text-muted');
	$('#calc-output-nonhub-value').html('N/A');

	$('#calc-output-export-row').addClass('text-muted');
	$('#calc-output-export-value').html('N/A');

	$('#calc-output-reward-row').addClass('text-muted');
	$('#calc-output-reward-value').html('N/A');

	$('#calc-output-route-value').html('N/A');
}

function calcInputClear(objname) {
  $('#calc-input-' + objname + '-form').removeClass('has-error');
  $('#calc-input-' + objname + '-error').html('');
}

function calcInputError(objname, text) {
  $('#calc-input-' + objname + '-form').addClass('has-error');
  $('#calc-input-' + objname + '-error').html(text);
}

// ---------------------------------------------------------------

function calcInputGetStation(name) {
	calcInputClear(name);

	var input = $('#calc-input-' + name + '-value').val();

  if (input == null) {
		return false;
  }

	if (input.length == 0) {
		return false;
	}

	var station = findStation(input);
	if (station == false) {
		calcInputError(name, 'Unknown station!');
		return false;
	}

	return station;
}

function calcInputGetValue(name, max, format) {

	calcInputClear(name);

  var value = $('#calc-input-' + name + '-value').val();

  if (value == null || value.length == 0) {
    value = "0";
		return false;
  }

  idx = value.indexOf(fsep);
  if (idx != -1) {
    value = value.split(fsep).join('');  
//    $('#calc-input-' + name + '-value').val(value);
  }
  idx = value.indexOf(fdec);  
  if (idx != -1) {
    value = value.substr(0, idx);    
    $('#calc-input-' + name + '-value').val(value);
  }

	if (!isNumber(value)) {
    calcInputError(name, 'Numbers only my friend!');
		return false;
  }

	if (format) {
	 	$('#calc-input-' + name + '-value').val(formatISK(value));
	}

  if (value > max) {
    calcInputError(name, 'This is too damn high!');
		return false;
  }
  if (value < 0) {
    calcInputError(name, 'Negative? Impossible!');
		return false;
  }

	return value;
}

// ---------------------------------------------------------------

function calcDistance(stationFrom, stationTo) {
	var x1 = stationFrom.x;
	var y1 = stationFrom.y;
	var z1 = stationFrom.z;

	var x2 = stationTo.x;
	var y2 = stationTo.y;
	var z2 = stationTo.z;

	return Math.ceil(Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) + Math.pow((z1-z2), 2) ) / 9460730472580800);
}

function calcRoute(stationFrom, stationTo) {
	var route = [stationFrom];
	var distance = calcDistance(stationFrom, stationTo);
	var resultDistance = 0;
 
	if (!(stationFrom && stationTo)) {
		return; //check if set
 	}

	while (distance != 0) {
		route.push(null);
		evedata.forEach(function (station) {	
			if (calcDistance(station, route[route.length-2]) <= jumpRange) { // system is in jump range
				if (distance > (newdistance = calcDistance(station, stationTo))) { // system is closer than current midpoint
					if (station.sectype != 'null_other') {
						distance = newdistance;
						route[route.length-1] = station;
					}
				}
			}
		});
 
		if (route[route.length-1] == null) {
			return false; // unreachable
		}

		resultDistance += calcDistance(route[route.length-2], route[route.length-1]);

	}

	return [resultDistance, route];

}

function calcNow() {

	calcOutputClear();

	var stationFrom = calcInputGetStation('from');
	var stationTo = calcInputGetStation('to');

	var volume = calcInputGetValue('cargo', maxCargo, false);
	var collateral = calcInputGetValue('collateral', maxCollateral, false);

	if (stationFrom === false) {
		return false;
	}
	if (stationTo === false) {
		return false;
	}
	if (volume === false) {
		return false;
	}
	if (collateral === false) {
		return false;
	}

	if (stationFrom == stationTo) {
		return false;
	}

	// -----------------

	// var distance = calcDistance(stationFrom, stationTo);
	// var jumps = Math.ceil (distance / jumpRange);

	var route = calcRoute(stationFrom, stationTo);
	if (route == false) {
		return false;
	}

	var distance = route[0];
	var jumps = route[1].length-1;

	if (jumps > 0) {
		var hops = "";
		for (var stn in route[1]) {
			hops += route[1][stn].sname + "<br>";
		}
		$('#calc-output-route-value').html(hops);
	}

	// -----------------
	var nonHubs = 0;
	nonHubs += $.inArray(stationFrom.sname, hubs) == -1 ? 1 : 0;
	nonHubs += $.inArray(stationTo.sname, hubs) == -1 ? 1 : 0;

	var modifierVolume = volume / pivotCargo;
	var modifierCollateral = collateral / pivotCollateral;
        var modifierHub = 0;
	if (nonHubs != 0) {
		modifierHub = 1;
	}
//	var modifier = Math.max(modifierVolume, modifierCollateral);

	var modifierReason = "";
	var modifier = 0;
	if (modifierVolume > modifier) {
	    modifierReason = "Cargo Size";
	    modifier = modifierVolume;
	}
	if (modifierCollateral > modifier) {
	    modifierReason = "Collateral";
	    modifier = modifierCollateral;
	}
	if (modifierHub > modifier) {
	    modifierReason = "Not a Hub";
	    modifier = modifierHub;
	}
	modifier = Math.ceil(modifier * 100);
	
	// -----------------
	var modifierExport = $.inArray(stationTo.sname, exports) != -1 && $.inArray(stationFrom.sname, hubs) != -1 ? exportDiscount : 1;
	// -----------------
	var feeDistance = Math.ceil(feePerLy * distance);
	var feeCyno = Math.ceil(feePerJump * jumps);
	var feeFreight = Math.ceil((feeDistance  + feeCyno) * (modifier / 100));
	var feeHub = feeHubPenalty * nonHubs;
	var reward = Math.ceil((feeFreight + feeHub) * modifierExport);
	// -----------------

	$('#calc-output-distance-row').removeClass('text-muted');
	$('#calc-output-distance-value').html(formatISK(feeDistance) + ' ISK');
	$('#calc-output-distance-info').html(distance + ' ly ');

	$('#calc-output-cyno-row').removeClass('text-muted');
	$('#calc-output-cyno-value').html(formatISK(feeCyno) + ' ISK');
	$('#calc-output-cyno-info').html(jumps + ' jump(s) ');

	$('#calc-output-modifier-row').removeClass('text-muted');
	$('#calc-output-modifier-value').html(modifier + '%');
	$('#calc-output-modifier-info').html("Pivotal: " + modifierReason + ' ');

	$('#calc-output-freight-row').removeClass('text-muted');
	$('#calc-output-freight-value').html(formatISK(feeFreight) + ' ISK');

	if (nonHubs > 0) {
		$('#calc-output-nonhub-row').removeClass('text-muted');
	}
	$('#calc-output-nonhub-value').html(formatISK(feeHub) + ' ISK');

	if (modifierExport != 1) {
		$('#calc-output-export-row').removeClass('text-muted');
	}
	$('#calc-output-export-value').html(( (1 - modifierExport) * 100) + '%');

	$('#calc-output-reward-row').removeClass('text-muted');
	$('#calc-output-reward-value').html(formatISK(reward) + ' ISK');

	return reward;
}

// ---------------------------------------------------------------

$('.popover-reward').popover();

// ---------------------------------------------------------------

