function Cell(aId) {
    this.ID = aId;
    this.className = "cell";
}

Cell.prototype.createCell = function(aParentNode) {
    var theNewCell = document.createElement("DIV");
    theNewCell.setAttribute("id", this.ID);
    theNewCell.setAttribute("className", this.className);
    theNewCell.setAttribute("class", this.className);
    aParentNode.appendChild(theNewCell);
}
Cell.prototype.getCellNode = function() {
    return document.getElementById(this.ID);
}






