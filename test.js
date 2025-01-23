
const cells = document.querySelectorAll('.tictactoe-cell');
const winnerTag = document.querySelector('.winner-tag');
const restartBtn = document.querySelector('.restart-btn');
let board = Array(9).fill(null);
let currentPlayer = 'X';
const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function handleClick(e) {
    const idx = [...cells].indexOf(e.target);
    if (!board[idx] && !checkWinner()) {
      board[idx] = currentPlayer;
      if (currentPlayer === 'X') {
        e.target.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
      } else {
        e.target.innerHTML = `<i class="fa-regular fa-circle"></i>`;
      }
      const winner = checkWinner();
      if (winner) {
        winnerTag.textContent = `${winner} Won`;
      } else if (!board.includes(null)) {
        winnerTag.textContent = 'Draw';
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

function restart() {
  board.fill(null);
  currentPlayer = 'X';
  cells.forEach(cell => cell.textContent = '');
  winnerTag.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restart);
