const choices = ["rock", "paper", "scissors"];

const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const winCount = document.querySelector(".win");
const loseCount = document.querySelector(".lose");

let win = 0;
let lose = 0;
function playGame(playerChoice) {
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  let result = "";
  if (playerChoice === computerChoice) {
    result = "IT'S A TIE!";
    resultDisplay.classList = "blackText";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "YOU WIN!";
    win++;
    resultDisplay.classList = "greenText";
  } else {
    result = "YOU LOSE!";
    lose++;
    resultDisplay.classList = "redText";
  }
  // Display the results on screen
  playerDisplay.textContent = `Your choice: ${playerChoice}`;
  computerDisplay.textContent = `Computer choice: ${computerChoice}`;
  resultDisplay.textContent = result;
  winCount.textContent = `Wins: ${win}`;
  loseCount.textContent = `loses: ${lose}`;
}
