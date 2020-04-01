function MapTemplate () {
	this.name = 'default map name';
	this.level = 1;
	this.height = 0;
	this.width = 0;
	this.startPosition = '0,0'; // coordinates y,x
	this.exitPosition = '0,0'; // coordinates y,x
	this.walls = [];
}


var adminBlankMap = new MapTemplate();
adminBlankMap.name = 'New room';
adminBlankMap.level = 1;
adminBlankMap.height = 13;
adminBlankMap.width = 11;
adminBlankMap.startPosition = '12,5';
adminBlankMap.exitPosition = '0,5';
//default walls around the map except start and exit 
adminBlankMap.walls = ['0,0', 
						'1,0', '2,0', '3,0', '4,0', '5,0', '6,0', '7,0', '8,0', '9,0', '10,0', '11,0', '12,0',
						'0,1', '0,2', '0,3', '0,4', /*'0,5', */'0,6', '0,7', '0,8', '0,9', '0,10', '0,10', '0,10',
						'0,10', '1,10', '2,10', '3,10', '4,10', '5,10', '6,10', '7,10', '8,10', '9,10', '10,10', '11,10', 
						'12,0', '12,1', '12,2', '12,3', '12,4', /*'12,5', */'12,6', '12,7', '12,8', '12,9', '12,10', '12,10', 
						'12,10'];


var firstMap = new MapTemplate();
firstMap.name = 'Welcome room';
firstMap.level = 1;
firstMap.height = 13;
firstMap.width = 11;
firstMap.startPosition = '12,5';
firstMap.exitPosition = '0,5';
firstMap.walls = ['0,0', '1,0', '2,0', '3,0', '4,0', '5,0', '6,0', '7,0', '8,0', '9,0', '10,0', '11,0', '12,0'];


var map01 = new MapTemplate();
map01.name = 'map01';
map01.level = 1;
map01.height = 13;
map01.width = 11;
map01.startPosition = '12,5';
map01.exitPosition = '0,5';
map01.walls = ['0,0', '0,1', '0,2', '0,3', '0,4', '0,6', '0,7', '0,8', '0,9', '0,10', '1,0', '1,3', '1,4', '1,6', '1,7', '1,10', '2,0', '2,2', '2,7', '2,10', '3,0', '3,2', '3,4', '3,5', '3,6', '3,7', '3,8', '3,10', '4,0', '4,2', '4,8', '4,10', '5,0', '5,2', '5,4', '5,5', '5,6', '5,8', '5,10', '6,0', '6,2', '6,3', '6,4', '6,8', '6,10', '7,0', '7,3', '7,6', '7,8', '7,10', '8,0', '8,3', '8,5', '8,6', '8,8', '8,10', '9,0', '9,3', '9,6', '9,8', '9,9', '9,10', '10,0', '10,4', '10,6', '10,7', '10,8', '10,9', '10,10', '11,0', '11,4', '11,6', '11,10', '12,0', '12,1', '12,2', '12,3', '12,4', '12,6', '12,7', '12,8', '12,9', '12,10'];