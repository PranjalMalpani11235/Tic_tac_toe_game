const express = require("express");
const { spawn } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/evaluate", (req, res) => {
  const board = req.body.board.join(",");
  const cpp = spawn("./tic_tac_toe", [board]);

  let output = "";
  cpp.stdout.on("data", data => (output += data));

  cpp.on("close", () => {
    res.json({ winner: output.trim() });
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));