const cells = document.querySelectorAll('.cell');
const gameStatus = document.querySelector('.game-status');
const restartBtn = document.querySelector('.restart');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
  const cell = e.target;
  const index = parseInt(cell.getAttribute('data-index'));

  if (gameState[index] !== '' || !gameActive) {
    return;
  }

  gameState[index] = currentPlayer;
  cell.setAttribute('data-symbol', currentPlayer);
  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    gameStatus.textContent = `玩家 ${currentPlayer} 获胜！${currentPlayer} wins！`;
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    gameStatus.textContent = '平局! It\'s a draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
  return winningConditions.some(condition => {
    return (
      gameState[condition[0]] === player &&
      gameState[condition[1]] === player &&
      gameState[condition[2]] === player
    );
  });
}

function checkDraw() {
  return gameState.every(cell => cell !== '');
}

function restartGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  gameStatus.textContent = '';

  cells.forEach(cell => {
    cell.setAttribute('data-symbol', '');
    cell.textContent = '';
  });
}

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

restartBtn.addEventListener('click', restartGame);
