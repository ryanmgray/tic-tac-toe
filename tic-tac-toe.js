const prompt = require('prompt');

// initalize board and game
var Game = function() {
  this.board = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, ];
  this.round = 0;
  this.player1 = 'Player 1';
  this.player2 = 'Player 2';
  this.currentPlayer = this.player1;
};

Game.prototype.submitMove = function(input) {
  // add user prompt code here
  if (this.board.indexOf(input) === -1) {
    console.log('invalid input, please try again');
    // recurisvely call submitMove();
  } else {
    // mark X or O on the board depending on the currentPlayer
    this.board[this.board.indexOf(input)] = this.currentPlayer === this.player1 ? 'X' : 'O';
    // check if game has been won
    if (this.detectWin(input)) {
      console.log(`Congratulations ${this.currentPlayer} has won the game!`);
    }
    // switch current player value after turn
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    // increase round after turn
    this.round ++;
    // display current game state
    this.display();
  }
};

Game.prototype.display = function () {
  console.log(`
    Round: ${this.round}
    Current Turn: ${this.currentPlayer}

    | ${this.board[0]} | ${this.board[1]} | ${this.board[2]} |
    | ${this.board[3]} | ${this.board[4]} | ${this.board[5]} |
    | ${this.board[6]} | ${this.board[7]} | ${this.board[8]} |
    `);
};

Game.prototype.detectWin = function (input, row, col) {
  // check horizontals
  if (this.board[0] && this.board[1] && this.board[2] === 'X' || this.board[0] && this.board[1] && this.board[2] === 'O') {
    return true;
  }
  if (this.board[3] && this.board[4] && this.board[5] === 'X' || this.board[3] && this.board[4] && this.board[5] === 'O') {
    return true;
  }
  if (this.board[6] && this.board[1] && this.board[2] === 'X' || this.board[0] && this.board[1] && this.board[2] === 'O') {
    return true;
  }
  return false;
};

// PROMPT PLAYERS FOR input
// if (!player1) {
//   prompt.start();
//   console.log('Welcome to Tic-Tac-Toe! Please enter your names.');
//   prompt.get(['player1', 'player2'], function (err, result) {
//     console.log('Player 1: ' + result.player1);
//     console.log('Player 2: ' + result.player2);
//     //store player names
//     player1 = result.player1;
//     player2 = result.player2;
//   });
// }
//
// if (player1) {
//   prompt.start();
//   console.log(display);
//   console.log(`It's your turn ${currentPlayer}, enter a number shown on the board above to select that`);
//   prompt.get(['selection'], function (err, result) {
//     console.log('Selection: ' + result.selection);
//   });
// }


// Test data
var game = new Game();
game.display();
game.submitMove(5);
game.submitMove(5);
game.submitMove(2);
game.submitMove('k');
