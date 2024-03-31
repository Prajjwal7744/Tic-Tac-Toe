const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let isGameOver = false;
let boardState = ['', '', '', '', '', '', '', '', ''];

function handleClick(index) {
    if (isGameOver || boardState[index] !== '') return;

    boardState[index] = currentPlayer;
    render();
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            message.textContent = `Player ${currentPlayer} wins!`;
            isGameOver = true;
            return;
        }
    }

    if (!boardState.includes('')) {
        message.textContent = 'It\'s a draw!';
        isGameOver = true;
    }
}

function restartGame() {
    currentPlayer = 'X';
    isGameOver = false;
    boardState = ['', '', '', '', '', '', '', '', ''];
    message.textContent = '';
    render();
}

function render() {
    board.innerHTML = '';
    boardState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleClick(index));
        board.appendChild(cellElement);
    });
}

render();
