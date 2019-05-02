desk = new Desk("deskID");
snake = new Snake([[0,3],[0,2],[0,1],[0,0]]);
var intervalLoop = null;

function setPosition() {
    var theBody = document.getElementsByTagName("body");
    var theDeskEl = getDeskInstance();
    var theCommandPanelEl = document.getElementById("commandPanel");
    try {
        var theDeskLeftPosition = theBody[0].clientWidth/2  - theDeskEl.offsetWidth/2 - theCommandPanelEl.offsetWidth/2;
        theDeskEl.style.top = theBody[0].clientHeight/2  - theDeskEl.offsetHeight/2;
        theDeskEl.style.left = theDeskLeftPosition;
        theCommandPanelEl.style.top = theBody[0].clientHeight/2  - theCommandPanelEl.offsetHeight/2;
        theCommandPanelEl.style.left = theDeskLeftPosition + theDeskEl.offsetWidth + 10;
    } catch (err) {
        theDeskEl.style.top = 0;
        theDeskEl.style.left = 0;
        theCommandPanelEl.style.top = 0;
        theCommandPanelEl.style.left = theDeskEl.offsetWidth;
    }
}

function newGame() {
    clearInterval(intervalLoop);
    var theDeskWidthEl = document.getElementById("deskWidth");
    var theDeskHeightEl = document.getElementById("deskHeight");
    desk.init(
        theDeskWidthEl.options[theDeskWidthEl.options.selectedIndex].value,
        theDeskHeightEl.options[theDeskHeightEl.options.selectedIndex].value
    );
	desk.show();
	snake.init(document.getElementById("intersect").checked);
	snake.show();
    setPosition();
}

function moveSnake() {
	snake.move();
}

function start() {
           desk.showForage();
    var theLevelEl = getLevelEl();
	intervalLoop = setInterval(moveSnake, theLevelEl.options[theLevelEl.options.selectedIndex].value*100);
}

function pause() {
	clearInterval(intervalLoop);
	intervalLoop = null;
}

function setDirection(anEvent) {
	var theKeyNum = null;
	if(window.event) { // IE
		if (intervalLoop != null) {
			theKeyNum = anEvent.keyCode;
		}
	} else if(anEvent.which) { // Netscape/Firefox/Opera
		theKeyNum = anEvent.which
	}	
	snake.setDirection(theKeyNum);
}

function getDeskInstance() {
    return document.getElementById(desk.ID);
}
function getLevelEl() {
    return document.getElementById("level");
}