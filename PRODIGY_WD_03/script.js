// script.js
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupCloseButton = document.getElementById('popup-close-btn');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');
const board = document.getElementById('board');
const status = document.getElementById('status');
const container = document.querySelector('.container');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let player1Name = '';
let player2Name = '';
let player1Wins = 0;
let player2Wins = 0;

function startGame() {
    player1Name = player1Input.value || 'Player 1';
    player2Name = player2Input.value || 'Player 2';
    status.textContent = `${player1Name}'s turn`;
    startButton.style.display = 'none';
    restartButton.style.display = 'inline-block';
    board.style.display = 'grid'; // Show the board
    container.style.display = 'block'; // Show other content
    render();
  }


function handleClick(index) {
  if (gameBoard[index] === '' && !isGameEnded()) {
    gameBoard[index] = currentPlayer;
    render();
    if (checkWinningMove(currentPlayer)) {
      if (currentPlayer === 'X') {
        player1Wins++;
        popupMessage.textContent = `player ${player1Name} wins!`;
      } else {
        player2Wins++;
        popupMessage.textContent = `player ${player2Name} wins!`;
      }
      updateScores();
      displayPopup();
      disableBoard();
    } else if (isBoardFull()) {
      popupMessage.textContent = "It's a draw!";
      displayPopup();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `player ${currentPlayer === 'X' ? player1Name : player2Name}'s turn`;
    }
  }
}

function render() {
  board.innerHTML = '';
  gameBoard.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => handleClick(index));
    board.appendChild(cellElement);
  });
}

function checkWinningMove(player) {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (let combo of winningCombos) {
    if (combo.every(index => gameBoard[index] === player)) {
      return true;
    }
  }
  return false;
}

function isBoardFull() {
  return gameBoard.every(cell => cell !== '');
}

function isGameEnded() {
  return checkWinningMove('X') || checkWinningMove('O') || isBoardFull();
}

function updateScores() {
  player1Score.textContent = player1Wins;
  player2Score.textContent = player2Wins;
}

function disableBoard() {
  board.querySelectorAll('.cell').forEach(cell => {
    cell.removeEventListener('click', handleClick);
    cell.style.cursor = 'not-allowed';
  });
}

function restartGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  status.textContent = `player ${player1Name}' turn`;
  startButton.style.display = 'inline-block';
  restartButton.style.display = 'none';
  render();
}

function displayPopup() {
  popup.style.display = 'flex';
}

function closePopup() {
  popup.style.display = 'none';
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
popupCloseButton.addEventListener('click', closePopup);

render();
