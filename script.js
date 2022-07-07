function computerPlay() {
  let result = "";

  // 0 - rock, 1 - paper, 2 - scissors
  const rand = Math.floor(Math.random() * 3);

  if (rand === 0) result = "rock";
  else if (rand === 1) result = "paper";
  else if (rand === 2) result = "scissors";

  return result;
}

function playRound(userSelection, computerSelection) {
  console.log(`--- playRound()`);
  console.log(`>>> playerSelection: ${userSelection}`);
  console.log(`>>> computerSelection: ${computerSelection}`);
  if (roundCounter >= 5) {
    let message = "";
    if (userScore > computerScore) {
      message = `You won the game! ${userScore} vs ${computerScore}`;
    } else if (computerScore > userScore) {
      message = `Computer won the game! ${userScore} vs ${computerScore}`;
    } else {
      message = `Draw! ${userScore} vs ${computerScore}`;
    }

    elRoundMessage.innerHTML = message;

    resetGame();
    return;
  }

  roundCounter++;

  if (userSelection === computerSelection) {
    console.log(`It's a draw!`);
    elSign.innerHTML = "=";
    elRoundMessage.innerHTML = "It's a draw!";
  } else if (userSelection === "rock" && computerSelection === "paper") {
    console.log("You lose! Paper beats Rock");
    elSign.innerHTML = "<";
    computerScore++;
    elRoundMessage.innerHTML = "You lose! Paper beats Rock";
  } else if (userSelection === "rock" && computerSelection === "scissors") {
    console.log("You won! Rock beats Scissors");
    elSign.innerHTML = ">";
    userScore++;
    elRoundMessage.innerHTML = "You won! Rock beats Scissors";
  } else if (userSelection === "paper" && computerSelection === "scissors") {
    console.log(`You lose! Scissors beats Paper`);
    elSign.innerHTML = "<";
    computerScore++;
    elRoundMessage.innerHTML = `You lose! Scissors beats Paper`;
  } else if (userSelection === "scissors" && computerSelection === "rock") {
    console.log(`You lose! Rock beats Scissors`);
    elSign.innerHTML = "<";
    computerScore++;
    elRoundMessage.innerHTML = `You lose! Rock beats Scissors`;
  } else if (userSelection === "scissors" && computerSelection === "paper") {
    console.log(`You won! Scissors beats Paper`);
    elSign.innerHTML = ">";
    userScore++;
    elRoundMessage.innerHTML = `You won! Scissors beats Paper`;
  } else if (userSelection === "paper" && computerSelection === "rock") {
    console.log(`You won! Paper beats Rock`);
    elSign.innerHTML = ">";
    userScore++;
    elRoundMessage.innerHTML = `You won! Paper beats Rock`;
  }

  drawRound(userSelection, computerSelection);
  updateScore();
}

function updateScore() {
  elUserScore.innerHTML = userScore;
  elComputerScore.innerHTML = computerScore;
}

function drawRound(user, computer) {
  elUserChose.innerHTML = getEmoji(user);
  elComputerChose.innerHTML = getEmoji(computer);
}

function getEmoji(str) {
  if (str === "rock") return "✊";
  if (str === "paper") return "✋";
  if (str === "scissors") return "✌";
}

function resetGame() {
  roundCounter = 0;
  userScore = 0;
  computerScore = 0;

  updateScore();
  drawRound(userScore, computerScore);
}

let userCliked = null;
let roundCounter = 0;
let userScore = 0;
let computerScore = 0;
const roundHistory = [{ userScore, roundCounter }];

const elUserScore = document.querySelector(".user-score");
const elComputerScore = document.querySelector(".computer-score");
const elUserChose = document.querySelector(".user-chose");
const elComputerChose = document.querySelector(".computer-chose");
const elSign = document.querySelector(".sign");
const elRoundMessage = document.querySelector(".round-message");

document.addEventListener("click", (event) => {
  userCliked = event.target.value;

  const buttons = ["rock", "paper", "scissors"];

  if (buttons.includes(userCliked)) {
    playRound(userCliked, computerPlay());
  }
  if (userCliked === "reset") {
    resetGame();
  }
});
