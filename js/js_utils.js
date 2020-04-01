function victoryMessage() {
	createMessage('* * * * * * * * * * V I C T O R Y * * * * * * * * *', 'victory');
	createMessage(currentEnemy.img + '<br />' + currentEnemy.name + ' is dead. You receive '+ currentEnemy.xpGiven + ' experience points.', 'victory');
	$('li.victory:last-child img').css({
		opacity: 0,
		transform: 'translate(0, -30px)'
	});

	// item
	// TODO
	createMessage('* * * * * * * * * * * * * * * * * * * * * * * * * * *', 'victory');
}

function createMessage(content, msgClass = '') {
	
	var li = document.createElement('li');
	if (msgClass != '') {
		li.setAttribute("class", msgClass );
	}
    messagesList.append(li);
    li.innerHTML = content;

    // smooth scroll
    $(messagesBox).stop().animate({
		scrollTop: $(messagesBox)[0].scrollHeight
	}, 1000);
	
	// display message
    $(li).animate({
    	opacity: 1
    }, 800);
}

/*
	@param stat : number
	@return : oscillation from .8 to 1.2 of original value.
*/
function oscil(stat) {
	return Math.floor(Math.random() * (1.2*stat - 0.8*stat + 1)) + 0.8*stat;
}
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function roundTo1(nb) {
	return Math.round(nb*10) / 10;
}
function findSomething(proba = 0.7) {
	return Math.random() > proba;
}
function flashStatbar(bar, color) {
	// flash red;
	$(bar).css({
		backgroundColor: color,
		boxShadow: '0 0 5px 1px '+color
	});
	// initial
	setTimeout(function() {
		$(bar).css({
			backgroundColor: 'brown',
			boxShadow: '0 0 0 1px brown'
		});
	}, 200);
}
function restaureHealth(who, howMany) {
	flashStatbar(hero, 'green');
	who.health += howMany;
	if (who.health > who.maxHealth) {
		who.health = who.maxHealth;
	}
}