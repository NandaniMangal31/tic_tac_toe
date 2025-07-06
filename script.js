let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleClick(index));
});

function handleClick(index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if (checkWin()) {
    gameActive = false;
    message.textContent = `Player ${currentPlayer} wins!`;
  } else if (board.every(cell => cell !== "")) {
    gameActive = false;
    message.textContent = "It's a draw!";
  } else {
    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] === currentPlayer &&
           board[a] === board[b] &&
           board[a] === board[c];
  });
}

// STEP 5: Restart the game
restartBtn.addEventListener("click", restartGame);

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  message.textContent = "Player X's turn";
  cells.forEach(cell => cell.textContent = "");
}
