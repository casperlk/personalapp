var player1sTurn;		//boolean indicating if it is player1's turn
var player1Char;    //char indicating player1's character
var player2Char;    //char indicating player2's character
var items; 					//number of items played on the board. If items == 9, game over
var defaultValue; //default value
var board;
var winningBoard;
var winner;

var TicTacToe = function() {
  this.items = 0;
  this.player1sTurn = true;
  defaultValue = -1;
  this.defaultValue = -1;
  this.player1Char;
  this.player2Char;
  this.board =        [[defaultValue, defaultValue, defaultValue],
                       [defaultValue, defaultValue, defaultValue],
                       [defaultValue, defaultValue, defaultValue]];
  this.winningBoard = [[defaultValue, defaultValue, defaultValue],
                       [defaultValue, defaultValue, defaultValue],
                       [defaultValue, defaultValue, defaultValue]];
  this.winner = defaultValue;

}

/**
* if the play is valid, make the move, return true
* else return false
*
*/
TicTacToe.prototype.play = function(point) {
  if (this.board[point.y][point.x] == defaultValue) {
    this.board[point.y][point.x] = this.player1sTurn ? this.player1Char : this.player2Char;
    this.items++;
    this.player1sTurn = !this.player1sTurn;
    return true;
  }
  return false;
}

TicTacToe.prototype.play2 = function() {

  move();
}

/**
 * tests whether the game is over
 * N0TE THAT THESE TESTS CANNOT BE REWRITTEN USING or OPERATOR because they all must run so that ALL winning coordinates are recorded
 * Note as well that these tests should not be written using ternary operator because we ONLY want to reassign gameOver in the case that the test is true
 * We could write gameOver = (test) ? true : gameOver;, but this wastes time reassigning gameOver to itself
*/
TicTacToe.prototype.over = function() {
  var gameOver = false;
  if (this.items == 9) gameOver = true;
  for (var i = 0; i <= 2; i++) {
    if (this.testWin(new Point(i, 0), new Point(i, 1), new Point(i, 2))) {gameOver = true;} //checks horizontals for a win
    if (this.testWin(new Point(0, i), new Point(1, i), new Point(2, i))) {gameOver = true;} //checks verticals for a win
  }
  if (this.testWin(new Point(0, 0), new Point(1, 1), new Point(2, 2))) {gameOver = true;}   //check diagonals for a win
  if (this.testWin(new Point(0, 2), new Point(1, 1), new Point(2, 0))) {gameOver = true;}
  return gameOver;
}

TicTacToe.prototype.testWin = function(p1, p2, p3) {
  if (this.board[p1.y][p1.x] != defaultValue) {
    if (this.board[p1.y][p1.x] == this.board[p2.y][p2.x] && this.board[p2.y][p2.x] == this.board[p3.y][p3.x]) {
      this.winner = this.board[p1.y][p1.x];
      this.winningBoard[p1.y][p1.x] = this.winner;
      this.winningBoard[p2.y][p2.x] = this.winner;
      this.winningBoard[p3.y][p3.x] = this.winner;
      return true;
    }
  }
  return false;
}

// only works if there is a winner
TicTacToe.prototype.removeWinnerFromBoard = function() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (this.winningBoard[i][j] == this.winner) {this.board[i][j] = this.defaultValue;}
    }
  }
}

TicTacToe.prototype.hasWinner = function() {
  return (this.winner != this.defaultValue);
}


TicTacToe.prototype.getWinner = function() {

  if (this.winner != this.defaultValue) {
    var winChar = (this.winner == 10) ? "X" : "O";
    return winChar + " wins";
  }
  return "Tie Game";
}









//decides on AI move and enters it in the 2D array
//The implemented strategy will complete a 2-in-a-row if possible and will otherwise block a user 2-in-a-row
function move() {
  if (game.board[1][1] == game.defaultValue) {
    game.play(new Point(1,1));
    return;
  }
  if (game.items == 3) {
    if (game.board[0][0] == game.player1Char && game.board[0][0] == game.board[2][2] || game.board[0][2] == game.player1Char && game.board[0][2] == game.board[2][0]) {
      var num = getRandomInt(4);
      if (num == 0) {game.play(new Point(0, 1));}
      else if (num == 1) {game.play(new Point(1, 0));}
      else if (num == 2) {game.play(new Point(1, 2));}
      else {game.play(new Point(2, 1));}
      return;
    }

    //if user played opposite corners
    //do not play corner
  }
  if(canComplete(game.player2Char, game.player2Char)) { //if can win, win
    return;
  }
  if(canComplete(game.player2Char, game.player1Char)) { //if can block, block
    return;
  }
  var a = getRandomInt(3);
  var b = getRandomInt(3);
  var i = 0;
  var j = 0;
  while(game.board[a][b] != game.defaultValue && i <= 2)
  {
    a = (a + 1)%3;
    i++;
    j = 0;
    while(game.board[a][b] != game.defaultValue && j <= 2)
    {
      j++;
      b = (b + 1)%3;
    }
  }
  game.play(new Point(a, b));
}


//from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


//character is the character of the AI. About to win is the character that this is testing for a win.
//If aboutToWin has two in a row, canComplete completes the row with char character
//returns true if it made a move, false otherwise
function canComplete(AI, aboutToWin) {
  for (var i = 0; i < 3; i++) {
    var iPlusOne = (i + 1)%3;
    var iPlusTwo = (i + 2)%3;
    for (var j = 0; j < 3; j++) {
      jPlusOne = (j + 1)%3;
      jPlusTwo = (j + 2)%3;
      //tests horizontal
      if (game.board[i][j] == game.board[i][jPlusOne] && game.board[i][jPlusTwo] == defaultValue && game.board[i][j] == aboutToWin) {
        // game.board[i][jPlusTwo] = AI;
        game.play(new Point(i, jPlusTwo));
        return true;
      }
      //tests vertical
      if (game.board[j][i] == game.board[jPlusOne][i] && game.board[jPlusTwo][i] == defaultValue && game.board[j][i] == aboutToWin) {
        // game.board[jPlusTwo][i] = AI;
        game.play(new Point(jPlusTwo, i));
        return true;
      }
    }

    //tests Diagonal 1
    if (game.board[i][i] == game.board[iPlusOne][iPlusOne] && game.board[iPlusTwo][iPlusTwo] == defaultValue && game.board[i][i] == aboutToWin) {
      // game.board[iPlusTwo][iPlusTwo] = AI;
      game.play(new Point(iPlusTwo, iPlusTwo));
      return true;
    }
    //Tests Diagonal 2
    if (game.board[i][2 - i] == game.board[iPlusOne][2 - iPlusOne] && game.board[iPlusTwo][2 - iPlusTwo] == defaultValue && game.board[i][2 - i] == aboutToWin) {
      // game.board[iPlusTwo][2 - iPlusTwo] = AI;
      game.play(new Point(iPlusTwo, 2-iPlusTwo));
      return true;
    }
  }
  return false;
}
