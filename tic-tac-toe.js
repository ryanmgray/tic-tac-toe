const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// initalize board and game
var Game = function() {
  this.board = [ [ '0,0', '0,1', '0,2'], ['1,0', '1,1', '1,2'], ['2,0', '2,1', '2,2'] ];
  this.round = 0;
  this.player1 = 'Player 1';
  this.player2 = 'Player 2';
  this.currentPlayer = this.player1;

  this.displayBoard();
  this.promptMove();
};

Game.prototype.promptMove = function() {
  rl.question(`${this.currentPlayer}, make your move by entering a number pairing: `, (input) => {
    var row = parseInt(input[0]);
    var col = parseInt(input[2]);
    // check if valid move
    if (!this.board[row] || !this.board[row][col] || this.board[row][col] === ' X ' || this.board[row][col] === ' O ') {
      console.log('invalid input, please try again');
      // recurisvely call promptMove();
      this.promptMove();
    } else {
      // mark X or O on the board depending on the currentPlayer
      this.board[row][col] = this.currentPlayer === this.player1 ? ' X ' : ' O ';
      // check if game has been won
      if (this.detectWin(row, col)) {
        this.displayBoard();
        console.log(`Congratulations ${this.currentPlayer}, you have won the game!`);
        rl.close();
      } else {
        // check if draw
        if (this.round === 8) {
          this.displayBoard();
          console.log("It's a draw, better luck next time!");
          rl.close();
        } else {
          // switch current player value after turn
          this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
          // increase round after turn
          this.round ++;
          // display current game state
          this.displayBoard();
          // call promptMove
          this.promptMove();
        }
      }
    }
  });
};

Game.prototype.displayBoard = function () {
  console.log(`
    Round: ${this.round}

    ${this.board[0][0]} | ${this.board[0][1]} | ${this.board[0][2]}
    ---------------
    ${this.board[1][0]} | ${this.board[1][1]} | ${this.board[1][2]}
    ---------------
    ${this.board[2][0]} | ${this.board[2][1]} | ${this.board[2][2]}
    `);
};

Game.prototype.detectWin = function (row, col) {
  // check same row
  if (this.board[row][0] === this.board[row][1] && this.board[row][1] === this.board[row][2]) {
    return true;
  }
  // check same column
  if (this.board[0][col] === this.board[1][col] && this.board[1][col] === this.board[2][col]) {
    return true;
  }
  // check diagonal
  if (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2] || this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
    return true;
  }
  return false;
};

// run game
var game = new Game();
