// movement variables
var moveUp = $('#move-up');
var moveLeft = $('#move-left');
var moveRight = $('#move-right');
var moveDown = $('#move-down');

var direction;
var playerPosition;


var upAttack = $('#upAttack');
var upDefense = $('#upDefense');
var upMaxhealth = $('#upMaxhealth');
var nbAttack = 0;
var nbDefense = 0;
var nbMaxhealth = 0;
var levelupCpt = 0;


$(document).keydown(function(ev) {
	console.log(ev.keyCode);
	switch(ev.keyCode) {
		/* * * * * * * * * * * */
		/* movements */
		case 37:
			direction = 'left';
			movePlayer(direction);
		break;
		case 38:
			direction = 'up';
			movePlayer(direction);
		break;
		case 39:
			direction = 'right';
			movePlayer(direction);
		break;
		case 40:
			direction = 'down';
			movePlayer(direction);
		break;
		/* * * * * * * * * * * */

		case 73:
			showInventory();
		break;


		/* * * * * * * * * * * */
		/* fightning */
		case 97:
			if(isFighting && canFight) {
				$('#action-attack').trigger('click');
			}
		break;
		case 98:
			if(isFighting && canFight) {
				$('#action-defend').trigger('click');
			}
		break;
		case 99:
			if(isFighting && canFight) {
				$('#action-run').trigger('click');
			}

		/* * * * * * * * * * * */
		break;



	}
	
});


$(moveUp)
.add(moveLeft)
.add(moveRight)
.add(moveDown)
.click(function() {
	direction = $(this).attr('direction');
 	movePlayer(direction);
});

function movePlayer(direction) {
	if(!canMove || isLevelingUp) {
		return false;	
	} 
	playerPosition = document.getElementsByClassName('isPlayer')[0].id;	
	var newPosition = checkMovement(playerPosition, direction); // position OR false	
	if(newPosition) {
		drawPlayerPosition(playerPosition, newPosition);
		enterNewRoom(newPosition);
	}
}

function emptyRoom() {
	createMessage('The room seems empty.');
}