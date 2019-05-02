var request;

function Desk(aId)
{
    this.ID = aId;
    this.size = [10, 10];
    this.cells = new Array();
	this.forage = [0, 0];
}

Desk.prototype.init = function(aXAmount, aYAmount) {
    this.size[0] = aXAmount;
    this.size[1] = aYAmount;
	this.updateForage();
}

Desk.prototype.show = function() {
    this.clear();
    var theTableEl = document.createElement("TABLE");
    var theTbodyEl = document.createElement("TBODY");
    this.cells = new Array(this.size[0]);
    for (var y=0; y<this.size[1]; y++) {
        this.cells[y] = new Array(this.size[0]);
        var theTrEl = document.createElement("TR");
        for (var x=0; x<this.size[0]; x++) {
            var theTdEl = document.createElement("TD");
            var theID = "w"+x+"h"+y;
            this.cells[y][x] = new Cell(theID);
            this.cells[y][x].createCell(theTdEl);
            theTrEl.appendChild(theTdEl);
        }
        theTbodyEl.appendChild(theTrEl);
    }
    theTableEl.appendChild(theTbodyEl);
    this.getDeskNode().appendChild(theTableEl);
}

Desk.prototype.clear = function() {
    while(this.getDeskNode().childNodes[0]){
        this.getDeskNode().removeChild(this.getDeskNode().childNodes[0]);
    }
    this.cells = new Array();
}

Desk.prototype.selectCell = function(aCoordinates) {
    var theCellEl = this.getCellElByCoordinates(aCoordinates);
    theCellEl.getCellNode().setAttribute("className", "selectedCell");
    theCellEl.getCellNode().setAttribute("class", "selectedCell");
}

Desk.prototype.deselectCell = function(aCoordinates) {
    var theCellEl = this.getCellElByCoordinates(aCoordinates);
    theCellEl.getCellNode().setAttribute("className", "cell");
    theCellEl.getCellNode().setAttribute("class", "cell");
}

Desk.prototype.validate = function(aCoordinates) {
	if(aCoordinates[0]<0 || aCoordinates[0]>=this.size[0] || aCoordinates[1]<0 || aCoordinates[1]>=this.size[1]) {
		return false;		
	}
	return true;
}

Desk.prototype.showForage = function() {
        if (this.forage == null)
		return;

    var theForageEl = document.getElementById("w"+this.forage[0]+"h"+this.forage[1]);
    theForageEl.setAttribute("className", "forage");
    theForageEl.setAttribute("class", "forage");
}

Desk.prototype.updateForage = function() {
	this.forage = [Math.floor(Math.random()*this.size[0]), Math.floor(Math.random()*this.size[1])];
        if (snake.isSection(this.forage)) {
             this.forageToTail();
             this.showForage();
         }
//	request = CreateRequest();
//	if(request==null) {
//		return;
//	}
//	var url = "forage.php" + "?x="+this.size[0]+"&y="+this.size[1]+"&sid=" + Math.random();
//	request.onreadystatechange = loadForage;
//	request.open("GET", url, true);
//	request.send(null);
}

Desk.prototype.forageToTail = function() {
    var theTail = snake.vector[snake.vector.length-1];
    var theNewForage = [theTail[0]-1,theTail[1]];
    if (!snake.isSection(theNewForage) && this.validate(theNewForage)) {
        this.forage = theNewForage;
        return;
    }
    theNewForage = [theTail[0]+1,theTail[1]];
    if (!snake.isSection(theNewForage) && this.validate(theNewForage)) {
        this.forage = theNewForage;
        return;
    }
    theNewForage = [theTail[0],theTail[1]+1];
    if (!snake.isSection(theNewForage) && this.validate(theNewForage)) {
        this.forage = theNewForage;
        return;
    }
    theNewForage = [theTail[0],theTail[1]-1];
    if (!snake.isSection(theNewForage) && this.validate(theNewForage)) {
        this.forage = theNewForage;
        return;
    }
    alert("You win");
    newGame();
    return;
}

function loadForage() {
	if (request.readyState == 4) {
		if (request.status == 200) {
			var theResponse = request.responseText;
//            alert(theResponse);
			desk.forage = theResponse.split(",");
            if (snake.isSection(desk.forage))
                desk.forageToTail();
            desk.showForage();
		}
	}
}

/******************************************************************************
 *  Getters and Setters
 ******************************************************************************/

Desk.prototype.getDeskNode = function() {
    return document.getElementById(this.ID);
}
Desk.prototype.getCellElByCoordinates = function(aCoordinates) {
    return this.cells[aCoordinates[1]][aCoordinates[0]];
}