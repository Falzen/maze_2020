
var actionsFight = $('#fighting');
var actionsIdle = $('#idle');

var isFighting = false;
var canFight = true;
var canMove = true;
var isLevelingUp = false;


//exploration
var actionSearch = $('#action-search');
var actionInventory = $('#action-inventory');

// fighting
var actionAttack = $('#action-attack');
var actionDefend = $('#action-defend');
var actionRun = $('#action-defend');


var messagesBox = $('#message-content');
var messagesList = $('#messages');

var inventory = $('#inventory-container');
var inventoryCross = $('#inventory-cross');
var levelupPopup = $('#popup-levelup');
var levelupCross = $('#popup-cross');

var attackStat = $('#attack-stat');
var defenseStat = $('#defense-stat');
var healthStat = $('#health-stat');

var currentMap = map01;
var searchedRooms = [];

var restaureHealthAfterBattle = true;

var allMovements = document.getElementsByClassName('movement');
function refreshActions() {
	if (!isFighting) {
		$(actionsFight).hide();
		$(actionsIdle).css('display', 'flex');
		$(allMovements).show();
	}
	else {
		$(actionsFight).css('display', 'flex');
		$(actionsIdle).hide();
		$(allMovements).hide();
	}
}

function toggleFight() {
	isFighting = isFighting == false ? true : false;

	refreshActions();
}


function showInventory() {
	inventory.show();
}
function closeInventory() {
	inventory.hide();
}

function showLevelupPopup() {	
	isLevelingUp = true;
	$(levelupPopup).show();	
	refreshStats();
}
function closeLevelupPopup() {
	$(levelupPopup).hide();
	isLevelingUp = false;
}


$(document).ready(function() {
	refreshActions();
	// start and stop a fight

	$(actionAttack).click(function() {
		if (canFight) {
			playerAttacks();	
		}
	});

	$(actionDefend).click(function() {
		if (canFight) {	
		}
	});

	$(actionSearch).click(function() {
		searchRoom();
	});

	$(actionInventory).click(function() {
		showInventory();
	});

	$(inventoryCross).click(function() {
		closeInventory();
	});

	/* $(levelupCross).click(function() {
		closeLevelupPopup();
	}); */


$('#level-up-buttons button').click(function() {
	var whichStat = $(this).attr('whichStat');
	applyLevelupPoint(whichStat);
});






function applyLevelupPoint(chosenStat) {
	switch(chosenStat) {
		case 'attack':
			hero.attack += 1;
			hero.damage = hero.attack * ( 1 + (WEAPONS[hero.weapon] / 100) );
		break;

		case 'defense':
			hero.defense += 1;
		break;

		case 'health':
			hero.maxHealth += 10;
		break;
	}
	levelupCpt++;
	refreshStats();

	if(isLevelupDone()) {

		// quick timeout to make sure the last point is DISPLAYED before closing the popup.
		setTimeout(endLevelUp, 10);
	}
}
function isLevelupDone() {
	if (levelupCpt == 10) {
		$(upAttack).attr('disabled', true);
		$(upDefense).attr('disabled', true);
		$(upMaxhealth).attr('disabled', true);
		levelupCpt = 0;
		return true;
	}
	return false;
}
function endLevelUp() {
	createMessage('Level up! You feel better.', 'level-up');
	//alert('done');
	closeLevelupPopup();
}


function searchRoom() {
	if($.inArray(playerPosition, searchedRooms) != -1) {
		createMessage('Already searched.');
		return false;
	}

	searchedRooms.push(playerPosition);
	if (findSomething()) {
		createMessage(' - - - > You found something!', 'search-find');
		return true;
	}
	createMessage(' - - - > You don\'t find anything.', 'search-empty');

}




	drawMap(currentMap);
	createMessage('Welcome...', 'welcome');
	createMessage('Ready to move?');


});