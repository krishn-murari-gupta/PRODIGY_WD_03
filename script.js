const board = document.getElementById("board");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let gameActive = true;
let cells = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.dataset.index = index;
    cellDiv.addEventListener("click", handleCellClick);
    board.appendChild(cellDiv);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (cells[index] === "" && gameActive) {
    cells[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (checkWinner()) {
      statusText.textContent = `${currentPlayer} wins!`;
      gameActive = false;
    } else if (!cells.includes("")) {
      statusText.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function resetGame() {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `${currentPlayer}'s turn`;
  createBoard();
}

createBoard();
statusText.textContent = `${currentPlayer}'s turn`;
