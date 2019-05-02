function Snake(aVector)
{
    this.direction = "s";
	this.vector = aVector;
    this.isNotIntersect = true;
}

Snake.prototype.init = function(aNotIntersect) {
	this.direction = "s";
	this.vector = [[0,3],[0,2],[0,1],[0,0]];
    this.isNotIntersect = aNotIntersect;
}
Snake.prototype.isSection = function(anObj) {
    for(var i=0; i<this.vector.length; i++) {
        if (this.vector[i][0] == anObj[0] && this.vector[i][1] == anObj[1])
            return true;
    }
    return false;
}
Snake.prototype.move = function() {
	switch (this.direction) {
		case "s":
			this.moveTo("s");
			break;
		case "n":
			this.moveTo("n");			
			break;
		case "w":
			this.moveTo("w");	
			break;
		case "e":
			this.moveTo("e");	
			break;
		default:
			break;
	}
}

Snake.prototype.moveTo = function(aDirection) {
	var theVectorLength = this.vector.length;
	var theNewValue = null;
	if (aDirection=="s" || aDirection=="n") {
		theNewValue = this.vector[0][1];
		if (aDirection=="s")
			theNewValue++;
		else
			theNewValue--;
	} else {
		theNewValue = this.vector[0][0];
		if (aDirection=="e")
			theNewValue++;
		else
			theNewValue--;
	}
	var theNewCoordinates = null;
	if (aDirection=="s" || aDirection=="n")
		theNewCoordinates = [this.vector[0][0], theNewValue];
	else
		theNewCoordinates = [theNewValue, this.vector[0][1]];
	if (!desk.validate(theNewCoordinates)) {
		alert("You loss");
        newGame();
		return;
	}
    if (this.isNotIntersect && this.isSection(theNewCoordinates)) {
 		alert("You loss");
        newGame();
		return;
    }
	if (!(desk.forage[0]==theNewCoordinates[0] && desk.forage[1]==theNewCoordinates[1])) {
		desk.deselectCell(this.vector[theVectorLength-1]);
		this.vector.pop();
	} else {
		desk.updateForage();
		desk.showForage();
	}
	this.vector.unshift(theNewCoordinates);
	desk.selectCell(this.vector[0]);
}

Snake.prototype.show = function() {
	var theVectorLength = this.vector.length;
	for (var i=0; i<theVectorLength; i++) {
		desk.selectCell(this.vector[i]);
	}
}

Snake.prototype.setDirection = function(aKeyNum) {
	switch (aKeyNum) {
		case 40:
			if (this.direction != "n")
				this.direction = "s";
			break;
		case 38:
			if (this.direction != "s")
				this.direction = "n";
			break;
		case 39:
			if (this.direction != "w")
				this.direction = "e";
			break;
		case 37:
			if (this.direction != "e")
				this.direction = "w";
			break;
		default:
			break;
	}

}