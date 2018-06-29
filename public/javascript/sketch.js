var game;

function setup() {
  frameRate(30);
  createCanvas(800, 650);
  oValue = 0;     xValue = 10;      //integer values of X and O that will be used in the array
  offsetS = 105;  offsetL = 297;    //distance by which pieces are offset from center, S for small, L for large
  diameter = 120;                   //diameter of Os, width of Xs
  twoPlayer = false;
  // p1Turn = true;

  //these variables are used for x and y offsets
  //w and h refer to width and height
  //Min and Plu refer to minus and plus
  //OffS and OffL refer to offsetS and offsetL
  wMinOffS = width/2-offsetS;   wMinOffL = width/2-offsetL;
  hMinOffS = height/2-offsetS;  hMinOffL = height/2-offsetL;
  wPluOffS = width/2+offsetS;   wPluOffL = width/2+offsetL;
  hPluOffS = height/2+offsetS;  hPluOffL = height/2+offsetL;

  HORIZ = { LEFT :    {value: -2*offsetS, index: 0},
            CENTER :  {value: 0,          index: 1},
            RIGHT :   {value: 2*offsetS,  index: 2}};
  VERT =  { UPPER :   {value: -2*offsetS, index: 0},
            CENTER :  {value: 0,          index: 1},
            LOWER :   {value: 2*offsetS,  index: 2}};
  SHAPE = { X : {},
            O : {}};
  gameScreen = 0;
  time = 0;
}

function draw() {
  background(50, 100, 200);
  if      (this.gameScreen == 0)     {introScreen();}
  else if (this.gameScreen == 10)    {chooseCharacter();}
  else if (this.gameScreen == 20)    {chooseNumberOfPlayers();}
  else if (this.gameScreen == 30)    {printGame();}
  else if (this.gameScreen == 35)    {gameOverTransition();}
  else if (this.gameScreen == 40)    {gameOverScreen();}
}

// gameScreen == 0
function introScreen() {
  fill(255);
  textSize(100);
  textAlign(CENTER, CENTER);
  text("Tic Tac Toe", width/2, height/2);
  textSize(25);
  text("Click to Play", width/2, height/2 +90);
  darkenWhole();
}

// gameScreen == 10
function chooseCharacter() {
  noStroke();
  fill(50,200,100);
  rect(width/2, 0, width, height);
  strokeWeight(10);
  noFill();
  stroke(255);
  drawShape(SHAPE.O, VERT.CENTER, HORIZ.LEFT);
  drawShape(SHAPE.X, VERT.CENTER, HORIZ.RIGHT);
  darkenHalf();
}

// gameScreen == 20
function chooseNumberOfPlayers() {
  fill(50,200,100);
  noStroke();
  rect(0, 0, width/2, height);
  fill(255);
  textSize(50);
  text("1 Player", width/4, height/2);
  text("2 Player", 3*width/4, height/2);
  darkenHalf();
}

// gameScreen == 30
function printGame() {
  var car = game.player1sTurn;
  if (!this.twoPlayer && !game.player1sTurn) {
    game.play2();
    if (this.game.over()) {
      if (this.game.hasWinner()) {
        game.removeWinnerFromBoard();
      }
      this.gameScreen = 35;
    }
  }
  drawBoard();
  drawShapes(game.board, false);
}

// gameScreen == 35
function gameOverTransition() {
  this.time++;
  drawBoard();
  drawShapes(game.board, false);
  drawShapes(game.winningBoard, true);
  if (this.time > 30) {
    time = 0;
    this.gameScreen = 40;
  }
}

// gameScreen == 40
function gameOverScreen() {
  textSize(50);
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  text("Game Over", width/2, height/2);
  text(game.getWinner(), width/2, height/2 + 70);
}


function darkenHalf() {
  if (mouseX < width/2) {
    darken(0, 0, width/2, height);
  } else {
    darken(width/2, 0, width, height);
  }
}

function darkenWhole() {
  darken(0, 0, width, height)
}

function darken(x1, y1, x2, y2) {
  noStroke();
  if (mouseIsPressed) {
    fill(0, 30);
    rect(x1, y1, x2, y2);
  }
}


function mouseReleased() {
  if (this.gameScreen == 0) { //intro screen
    this.gameScreen = 10;
  } else if (this.gameScreen == 10) { //choose character
    this.game = new TicTacToe();
    game.player1Char = (mouseX < width/2) ? oValue : xValue;
    game.player2Char = (game.player1Char == 10) ? 0 : 10;
    this.gameScreen = 20;
    var car = game.board;
  } else if (this.gameScreen == 20) { //choose number of players
    this.twoPlayer = (mouseX < width/2) ? false : true;
    this.gameScreen = 30;
  } else if (this.gameScreen == 30) {
    if (this.twoPlayer || game.player1sTurn) {
      this.game.play(mouseCoordinates());
    }

    if (this.game.over()) {
      if (this.game.hasWinner()) {
        game.removeWinnerFromBoard();
      }
      this.gameScreen = 35;
    }
  } else if (this.gameScreen == 35) {
    this.gameScreen = 40;
  } else if (this.gameScreen == 40) {
    this.gameScreen = 10;
  }
}

// returns a Point object which indicates the mouse's position within the tictactoe grid
function mouseCoordinates() {
  if (mouseY > hMinOffL && mouseY < hMinOffS)       {y = 0;}  // top
  else if (mouseY > hMinOffS && mouseY < hPluOffS)  {y = 1;}  // center
  else if (mouseY > hPluOffS && mouseY < hPluOffL)  {y = 2;}  // bottom

  if (mouseX < wMinOffS && mouseX > wMinOffL)       {x = 0;}  // left
  else if (mouseX < wPluOffS && mouseX > wMinOffS)  {x = 1;}  // center
  else if (mouseX < wPluOffL && mouseX > wPluOffS)  {x = 2;}  // right

  return new Point(y, x);
}
