const cells = document.querySelectorAll('.tictactoe-cell');
const winnerTag = document.querySelector('.winner-tag');
const restartBtn = document.querySelector('.restart-btn');
let board =Array(9).fill(null);
let clickCount = 0;
const winningCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];
function checkWinner() {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        const i = Array.from(cells).indexOf(cells[a]);
        const j = Array.from(cells).indexOf(cells[b]);
        const k = Array.from(cells).indexOf(cells[c]);
        cells[i].style.backgroundColor = 'green';
        cells[i].style.color = 'white';
        cells[j].style.backgroundColor = 'green';
        cells[j].style.color = 'white';
        cells[k].style.backgroundColor = 'green';
        cells[k].style.color = 'white';
        return board[a];
      }
    }
    return null;
}
function restart(){
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    cells.forEach(cell => cell.style.backgroundColor = 'white');
    winnerTag.textContent = '';
}
function handleClick(e){
    const i = Array.from(cells).indexOf(e.target);
    if(!board[i] && !checkWinner()){
        const player = (clickCount%2===0) ? 'X' : 'O';
        board[i] = player;
        if(player === 'X'){
            e.target.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        }else{
            e.target.innerHTML = `<i class="fa-regular fa-circle"></i>`;
        }
        clickCount++;
        const winner = checkWinner();   
        if(winner){
            winnerTag.textContent = `${winner} Won`;
        }else if(!board.includes(null)){
            winnerTag.textContent = 'Draw';
        }
    }
}
cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restart);