const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
let board = Array(9).fill("");
let currentPlayer = "X";

function renderBoard() {
  boardEl.innerHTML = "";
  board.forEach((val, i) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = val;
    cell.onclick = () => handleMove(i);
    boardEl.appendChild(cell);
  });
}

function handleMove(index) {
  if (board[index] !== "") return;
  board[index] = currentPlayer;
  fetch("http://localhost:3000/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board })
  })
    .then(res => res.json())
    .then(data => {
      renderBoard();
      if (data.winner === "none") {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusEl.textContent = currentPlayer + "'s Turn";
      } else if (data.winner === "draw") {
        statusEl.textContent = "It's a Draw!";
      } else {
        statusEl.textContent = data.winner + " Wins!";
        board = Array(9).fill("-");
      }
    });
}

renderBoard();
statusEl.textContent = currentPlayer + "'s Turn";