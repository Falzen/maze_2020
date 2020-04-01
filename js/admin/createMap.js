var tds;

var setExit;
var setStart;

var saveBtn;
var clearBtn;
var popupWallsArray, popupCross, newMapWallsCoordinates;
var isSettingExit = false;
var isSettingStart = false;

var currentMap = adminBlankMap;

var mapName, mapLevel;
var newMapInstationtionCode;

var mapNameDisplay = $('#popup-map-name');
var mapLevelDisplay = $('#popup-map-level');



function changeTdStatus(target) {
	if(isSettingExit || $(target).hasClass('isExit')) {
		$(target).toggleClass('isExit');
		$(setExit).removeClass('waiting');
		isSettingExit = false;
	}
	else if(isSettingStart  || $(target).hasClass('isStart')) {
		$(target).toggleClass('isStart');
		$(setStart).removeClass('waiting');
		isSettingStart = false;
	}
	else {
		$(target).toggleClass('isWall');
	}	
}

function clearTds() {
	console.log(tds);
	for (var i=0, len=tds.length; i<len; i++) {
		$(tds[i]).removeClass('isWall').removeClass('isStart').removeClass('isExit');
	}
	drawWalls(); 
	drawStartAndExitPositions();
}

function checkIfMultipleStarts() {
	var allStarts =document.getElementsByClassName('isStart');
	if(allStarts.length < 1) {
		console.log('Must have a starting point');
		return false;
	}
	else if(allStarts.length > 1) {
		console.log('Can not have more than one starting point');
		return false;
	}
	else {
		return true;
	}
}

function checkIfMultipleExits() {
	var allExits =document.getElementsByClassName('isExit');
	if(allExits.length < 1) {
		console.log('Must have an exit point');
		return false;
	}
	else if(allExits.length > 1) {
		console.log('Can not have more than one exit point');
		return false;
	}
	else {
		return true;
	}
}


function saveTds() {
	if (checkIfMultipleStarts() && checkIfMultipleExits()) {
		mapName = document.getElementById('map-name').value;
		mapLevel = document.getElementById('map-level').value;
		newMapInstationtionCode = $('#new-map-instantiation-code');

		displayWallsArray();
	}
	else {
		alert('KO save');
	}
}


function generateWallsArray() {
	var allWalls = document.getElementsByClassName('isWall');
	var display = '[';
	for(var i=0, len = allWalls.length; i<len; i++) {
		display += "'" + allWalls[i].id + "'";
		if (i<len-1) {
			display += ', ';
		}
	}
	display += ']';

	return display;
}

function manageMapName(name) {
	var res = '';
	var parts = name.split(' ');
	for (var i=0; i<parts.length; i++) {
		if (i>0) {
		parts[i] = parts[i].substr(0, 1).toUpperCase() + parts[i].substr(1).toLowerCase();	
		}
		res += parts[i];
	}
	return res;
}

function displayWallsArray() {
	// just the walls array
	newMapWallsCoordinates.text(generateWallsArray());

	// extra infos
	mapNameDisplay.text(mapName);
	mapLevelDisplay.text(mapLevel);

	// whole code to copy-paste
	var code = [];
	code.push('var ' + manageMapName(mapName) + ' = new MapTemplate();<br />');
	code.push('firstMap.name = \'' + mapName + '\';<br />');
	code.push('firstMap.level = ' + mapLevel + ';<br />');
	code.push('firstMap.height = ' + currentMap.height + ';<br />');
	code.push('firstMap.width = ' + currentMap.width + ';<br />');
	code.push('firstMap.startPosition = \'' + currentMap.startPosition + '\';<br />');
	code.push('firstMap.exitPosition = \'' + currentMap.exitPosition + '\';<br />');
	code.push('firstMap.walls = ' + newMapWallsCoordinates.text() + ';<br />');
	console.log(newMapWallsCoordinates);
		 newMapInstationtionCode.html(code);



	$(popupWallsArray).show();
}
function closeWallsArray() {
	newMapWallsCoordinates.text('');
	$(popupWallsArray).hide();
}

$(document).ready(function() {
	setExit = $('#setExit');
	setStart = $('#setStart');
	saveBtn = $('#save');
	clearBtn= $('#clear');
	popupWallsArray = $('#popup-walls-array');
	popupCross = $('#popup-cross');
	newMapWallsCoordinates = $('#new-map-walls-coordinates');

	drawMap();
	tds = document.getElementsByTagName('td');
	for (var i = 0, len = tds.length; i < len; i++) {
		tds[i].addEventListener('click', function(el) {
			changeTdStatus(el.target);
		});
	}


	$(clearBtn).on('click', clearTds);
	$(saveBtn).on('click', saveTds);

	$(setExit).click(function() {
		isSettingExit = true;
		$(setExit).addClass('waiting');
	});
	$(setStart).click(function() {
		isSettingStart = true;
		$(setStart).addClass('waiting');
	});
	$(popupCross).on('click', closeWallsArray);
});