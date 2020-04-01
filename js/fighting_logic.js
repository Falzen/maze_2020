

/* ================================================================	*/
/*		Declarations												*/
/* ================================================================	*/
var NEXT_LEVEL_MULTIPLIER = 0.3;
var currentEnemiIndex = 0;
var currentEnemy;
var enemyStats = $('#enemyStats');

var playerHealthBar = $('#playerStats .health-bar-ins');
var playerManaBar = $('#playerStats .mana-bar-ins');
var playerExpBar = $('#playerStats .exp-bar-ins');
var enemyHealthBar = $('#enemyStats .health-bar-ins');
var enemyManaBar = $('#enemyStats .mana-bar-ins');



/* constants */
var WEAPONS = {
	none: '0',
	dagger: '20',
	sword: '40'
};

var ARMORS = {
	none: '0',
	small_shield: '15',
	great_shield: '30'
};

var icons = {
	playerAttack: '<img src="../img/icons/sword.png" alt="" />',
	playerDefend: '<img src="../img/icons/shield.png" alt="" />'
};




/* ================================================================	*/
/*		Interfaces													*/
/* ================================================================	*/
function Character_I (name, attack, defense, weapon, armor, health) {
	this.maxHealth = health;
	this.name = name;
	this.attack = attack;
	this.defense = defense;
	this.health = health;
	this.weapon = weapon;
	this.armor = armor;

	this.damage = this.attack * ( 1 + (WEAPONS[this.weapon] / 100) );
}





/* ================================================================	*/
/*		Objects														*/
/* ================================================================	*/
function Player (name, attack, defense, weapon, armor, health) {
	Character_I.call(this, name, attack, defense, weapon, armor, health);
	this.xpAmount = 0;
	this.level = 1;
	this.levelUpThreshold = 22;
	this.status = 'player';
	this.toString = function() {
		return this.name + ' : ' + this.attack + ' att, ' + this.defense + ' def, ' + this.health + ' hp.\n Weapon: ' + this.weapon + ' does ' + WEAPONS[this.weapon] + '.\n Armor: ' + this.armor + ' protects ' + ARMORS[this.armor] + '.';
	}
}

function Enemy(name, attack, defense, weapon, armor, health, img, xp) {
	Character_I.call(this, name, attack, defense, weapon, armor, health);
	this.status = 'enemy';
	this.xpGiven = xp;
	this.img = '<img src="../img/enemies/' + img + '" alt="' + this.name + '" />';



	this.damage = this.attack * (1 + (WEAPONS[this.weapon] / 100));

	this.toString = function() {
		return this.name + ' : ' + this.attack + ' att, ' + this.defense + ' def, ' + this.health + ' hp.';
	}
}




/* ================================================================	*/
/*		Instanciations												*/
/* ================================================================	*/

/* * * * * * * * * * * * * * * * * * *	*/
/* 		Enemies 						*/
/* * * * * * * * * * * * * * * * * * *	*/

/* 
@return : new Enemy(name, attack, defense, weapon, armor, health, img, xp); 
*/
function createStandardRabite() {return new Enemy('Rabite', 11, 4, 'none', 'none', 45, 'rabite.gif', 8);}
function createStandardZombie() {return new Enemy('Zombie', 12, 5, 'none', 'none', 55, 'zombie.gif', 7);}
function createStandardGoblin() {return new Enemy('Goblin', 13, 5, 'none', 'none', 65, 'goblin.gif', 9)};
function createStandardWerewolf() {return new Enemy('Werewolf', 14, 7, 'none', 'none', 80, 'werewolf.gif', 10)};

// encounter probabilities done with number of each monster's  instances in array.
var enemiesFirstFloor = [];
for (var i=0; i<6; i++) {
	enemiesFirstFloor.push(createStandardRabite());
}
for (var i=0; i<4; i++) {
	enemiesFirstFloor.push(createStandardZombie());
}
for (var i=0; i<2; i++) {
	enemiesFirstFloor.push(createStandardGoblin());
}
for (var i=0; i<1; i++) {
	enemiesFirstFloor.push(createStandardWerewolf());
}

// name, attack, defense, weapon, armor, health, img
var enemies = enemiesFirstFloor;


/* * * * * * * * * * * * * * * * * * *	*/
/* 		Player 							*/
/* * * * * * * * * * * * * * * * * * *	*/
// name, attack, defense, weapon, armor, health
var hero = new Player('hero', 30, 5, 'none', 'none', 100);


















/* ================================================================	*/
/*		Utils														*/
/* ================================================================	*/

function isEnemyInRoom(proba=0.75) {
	return Math.random() > proba;
	// return 1;
}

function getRandEnemyFromList() {
	// restaure previous enemy instance's health
	enemies[currentEnemiIndex].health = enemies[currentEnemiIndex].maxHealth;

	// get new enemy
	currentEnemiIndex = Math.floor(Math.random()*enemies.length);
	return enemies[currentEnemiIndex];
}

function playerLevelUp() {
	hero.health = hero.maxHealth;	// set enemy health bar

	showLevelupPopup();
	$(playerHealthBar).css({
		width: (hero.health*100)/hero.maxHealth+'%'
	});
}

function gainExperience() {
	console.log('hero.xpAmount before : ' + hero.xpAmount);
	hero.xpAmount += currentEnemy.xpGiven;
	drawExperienceBar();
	console.log('hero.xpAmount after : ' + hero.xpAmount);
	if (hero.xpAmount >= hero.levelUpThreshold) {
		playerLevelUp();
		hero.levelUpThreshold += Math.round(hero.levelUpThreshold * NEXT_LEVEL_MULTIPLIER);
		hero.xpAmount = 0;
		drawExperienceBar();
	}
}

function drawExperienceBar() {
	$(playerExpBar).css({
		width: (hero.xpAmount*100)/hero.levelUpThreshold+'%'
	});
}

function toggleFightningActions() {
	canFight = canFight == true ? false : true;
	console.log('canFight : ' + canFight);
}

function showEnemyStats() {
	$(enemyStats).css({
		opacity: 1
	});
}

function hideEnemyStats() {
	$(enemyStats).css({
		opacity: 0
	});
}

function refreshStats() {
	attackStat.text(hero.attack);
	defenseStat.text(hero.defense);
	healthStat.text(hero.maxHealth);
}
/* ================================================================	*/
/* ================================================================	*/












/* ================================================================	*/
/*		Events														*/
/* ================================================================	*/

function encounter() {
	currentEnemy = getRandEnemyFromList();
	canMove = false;

	// set enemy health bar
	$(enemyHealthBar).css({
		width: (currentEnemy.health*100)/currentEnemy.maxHealth+'%'
	});


	createMessage('An enemy is in there! ' + currentEnemy.img, 'enemyAppears');
	createMessage('It\'s a ' + currentEnemy.name + '. It seems to have ' + currentEnemy.health + 'hp.');
	createMessage('What to do?', 'promptForAction');
	showEnemyStats();
	toggleFight();
}




function playerAttacks() {

	toggleFightningActions();

	flashStatbar(enemyHealthBar, 'tomato');
	

	// oscillation 0.8 to 1.2, rounded to 1 decimal
	var dmgDealt = roundTo1(oscil(hero.damage));
	var enemyDef = roundTo1(oscil(currentEnemy.defense));

	// display attack damages and enemy's defense
	var dmgReceived = dmgDealt - enemyDef;
	if (dmgReceived <= 0) {
		dmgReceived = 0;	
	}
	else {
		currentEnemy.health -= dmgReceived;
	}


	// so as not to fuck the life bar up with negative width in percentage
	if (currentEnemy.health < 0) currentEnemy.health = 0;

	createMessage('Attack! '+ icons.playerAttack + ' Strike for ' + dmgDealt + 
					', enemy defends for ' + enemyDef + '.');

	// set enemy health bar
	$(enemyHealthBar).css({
		width: (currentEnemy.health*100)/currentEnemy.maxHealth+'%'
	});

	// if NOT dead
	if (currentEnemy.health > 0) {
		// TODO enemy's turn
		setTimeout(enemyTurn, 1000);
	}
	else {
		// announce the death
		victoryMessage(currentEnemy);
		setTimeout(function() {
			// 50% chances of getting half your remaining life back.
			if(restaureHealthAfterBattle && Math.random()>0.5) {
				restaureHealth(hero, hero.health/2);
				createMessage('You get some health back!');	
				$(playerHealthBar).css({
					width: (hero.health*100)/hero.maxHealth+'%'
				});
			}
			gainExperience();
			hideEnemyStats();
			toggleFightningActions();
			toggleFight();
			canMove = true;
		}, 1000);
	}


	// enemy takes dmg

} /* end playerAttacks() */


function enemyTurn() {
	var dmgDealt = roundTo1(oscil(currentEnemy.damage));
	var heroDef = roundTo1(oscil(hero.defense));

	createMessage(currentEnemy.name + ' attacks! ' + currentEnemy.img);

	if (dmgDealt > heroDef) {
		createMessage(currentEnemy.name + ' strikes for ' + dmgDealt + ', you defend for ' + heroDef + '.');

		flashStatbar(playerHealthBar, 'tomato');

		var dmgReceived = dmgDealt - heroDef;
		hero.health -= dmgReceived;
		hero.health = roundTo1(hero.health);
		$(playerHealthBar).css({
			width: (hero.health*100)/hero.maxHealth + '%'
		});

		// TODO take care of dying :)
		if (hero.health < 0) {
			hero.health = 0;
			alert('You\'re dead...');
		}

		createMessage('You have ' + hero.health + 'hp left.');
	}
	else {
		createMessage(currentEnemy.name + ' strikes for ' + dmgDealt + ', you defend for ' + heroDef + '.');
		flashStatbar(playerHealthBar, 'white');
		createMessage('You defended yourself perfectly.', 'noDamageTaken');
	}

	toggleFightningActions();
}

/* ================================================================	*/
/* ================================================================	*/
