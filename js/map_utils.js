// NB : currentMap is defined in gamescreen.js

var theMap = $('#the-map');
var visitedRooms = [];
var allRooms = theMap[0].getElementsByClassName('');

function drawMap() {
	var theMapHtml = '';
	// as many <tr>
	for (var i=0; i<currentMap.height; i++) {
		theMapHtml += '<tr id="r' + i + '">';
		for (var j=0; j<currentMap.width; j++) {
			theMapHtml += '<td id="' + i + ',' + j + '"></td>';
		}
		theMapHtml += '</tr>';
	}
	$(theMap).html(theMapHtml);
	drawWalls(currentMap);
	drawStartAndExitPositions(currentMap);
}

function drawWalls() {
	for (var i = 0; i < currentMap.walls.length; i++) {
		var elem = document.getElementById(currentMap.walls[i]);
		$(elem).addClass('isWall');
	}
}

function drawStartAndExitPositions() {
	drawStartPosition(currentMap);
	drawPlayerPosition(currentMap.startPosition);
	drawExitPosition(currentMap);

	// adds starting room to the visited ones.
	visitedRooms.push(currentMap.startPosition);
}

function drawStartPosition() {
	var startElem = document.getElementById(currentMap.startPosition);
	$(startElem).addClass('isStart');
}

function drawExitPosition() {
	var exitElem = document.getElementById(currentMap.exitPosition);
	$(exitElem).addClass('isExit');
}

function drawPlayerPosition(oldPosition, newPosition) {
	$(document.getElementById(oldPosition)).toggleClass('isPlayer');
	$(document.getElementById(newPosition)).toggleClass('isPlayer');
}
/*
@param currentPosition : the id of player's previous position
@param direction : the keyword from clicked button ('up', 'down', etc.)
@return : nextPosition || false)
*/
function checkMovement(currentPosition, direction) {
	var tempDirs = currentPosition.split(',');	

	tempDirs[0] *= 1;  // into integer
	tempDirs[1] *= 1;  // into integer

	// deduce newtposition
	switch(direction) {
		case 'up':
			; // into integer
			tempDirs[0] -= 1; 
		break;

		case 'left':
			tempDirs[1] -= 1; 
		break;

		case 'right':
			tempDirs[1] += 1; 

		break;

		case 'down':
			tempDirs[0] += 1; 

		break;
	}

	// check if moving out of map
	if (tempDirs[0] > currentMap.height-1
		|| tempDirs[0] < 0
		|| tempDirs[1] > currentMap.width-1
		|| tempDirs[1] < 0) {
		
		return false;
	}


	tempDirs[0] += ''; // back into string
	tempDirs[1] += ''; // back into string
	nextPosition = tempDirs.join(); // adds a comma automatically

	// check if miving into wall
	if ($.inArray(nextPosition, currentMap.walls) !== -1) {
		
	}
	// all clear
	else {		
		$(document.getElementById(nextPosition)).addClass('isVisited');		
		return nextPosition;
	}
}


function enterNewRoom(thisRoomPosition) {
	// check if room already visited (no enemy)
	if ($.inArray(thisRoomPosition, visitedRooms) != -1 &&
		currentMap.exitPosition != thisRoomPosition &&
		currentMap.startPosition != thisRoomPosition) {
			return false;
	}
	// Exit position
	else if(currentMap.exitPosition == thisRoomPosition) {
		var content = '"Next floor" feature coming soon !\n'+
		'In the meantime, try going back to the entrance...\n'+
		'But be careful, monsters came back.';
		alert(content);

		//refreshing map and starting from the end
		drawMap();
		drawPlayerPosition(currentMap.startPosition, currentMap.exitPosition);
		visitedRooms = [currentMap.exitPosition];
		$('.isVisited').removeClass('isVisited');
	}
	// Start position
	else if(currentMap.startPosition == thisRoomPosition) {
		alert('The stairs collapsed...');

	}
	
	
	visitedRooms.push(thisRoomPosition);
	if (isEnemyInRoom()) {	
		encounter();
	}
	else {

		emptyRoom();
	}


}