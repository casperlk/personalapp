//Draws the tic tac toe board
function drawBoard() {
  stroke(255);
  strokeWeight(10);
  noFill();
  line(wMinOffS, hPluOffL, wMinOffS, hMinOffL); //left
  line(wPluOffS, hPluOffL, wPluOffS, hMinOffL); //right
  line(wMinOffL, hPluOffS, wPluOffL, hPluOffS); //bottom
  line(wMinOffL, hMinOffS, wPluOffL, hMinOffS); //top
}

//this function draws all of the shapes of the given type that have been played
function drawShapes(board, isWinner) {
  noFill();
  strokeWeight(10);
  if (isWinner) {
    stroke(50, 200, 100);
  } else {
    stroke(255);
  }
  vertArray = [VERT.UPPER, VERT.CENTER, VERT.LOWER];
  horizArray = [HORIZ.LEFT, HORIZ.CENTER, HORIZ.RIGHT];
  for (var y2 = 0; y2 < 3; y2++) {
    for (var x2 = 0; x2 < 3; x2++) {
      if (board[y2][x2] == oValue) {drawShape(SHAPE.O, vertArray[y2], horizArray[x2]);}
      if (board[y2][x2] == xValue) {drawShape(SHAPE.X, vertArray[y2], horizArray[x2]);}
    }
  }
}

//Calls the correct draw function for the given shape
function drawShape(shape, vert, horiz) {
  if (shape == SHAPE.O) {
    drawO(horiz.value, vert.value);
  } else if (shape == SHAPE.X) {
    drawX(horiz.value, vert.value);
  }
}

//Draws an X, offset from the center by the given values offsetX and offsetY
function drawX(offsetX, offsetY) {
  line(width/2-diameter/2+offsetX, height/2-diameter/2+offsetY, width/2+diameter/2+offsetX, height/2+diameter/2+offsetY);
  line(width/2+diameter/2+offsetX, height/2-diameter/2+offsetY, width/2-diameter/2+offsetX, height/2+diameter/2+offsetY);
}

//Draws an O, offset from the center by the given values offsetX and offsetY
function drawO(offsetX, offsetY) {
  ellipse(width/2+offsetX, height/2+offsetY, diameter, diameter);
}
