function computerPlay() {
  let result = "";

  // 0 - rock, 1 - paper, 2 - scrissors
  const rand = Math.floor(Math.random() * 3);

  if (rand === 0) result = "rock";
  else if (rand === 1) result = "paper";
  else if (rand === 2) result = "scissors";

  return result;
}

function playerPlay(playerSelection) {
  return playerSelection.toLowerCase();
}

function playRound(playerSelection, computerSelection) {
  console.log(`--- playRound()`);
  console.log(`>>> playerSelection: ${playerSelection}`);
  console.log(`>>> computerSelection: ${computerSelection}`);

  if (playerSelection === computerSelection) {
    console.log(`It's a draw!`);
  } else if (playerSelection === "rock" && computerSelection === "paper") {
    console.log("You lose! Paper beats Rock");
  } else if (playerSelection === "rock" && computerSelection === "scissors") {
    console.log("You won! Rock beats Scissors");
  } else if (playerSelection === "paper" && computerSelection === "scissors") {
    console.log(`You lose! Scissors beats Rock`);
  } else if (playerSelection === "scissors" && computerSelection === "rock") {
    console.log(`You lose! Rock beats Scissors`);
  } else if (playerSelection === "scissors" && computerSelection === "paper") {
    console.log(`You won! Scissors beats Paper`);
  }
}

function game() {
  for (let i = 0; i < 5; i++) {
    playRound(playerPlay(computerPlay()), computerPlay());
  }
}

game();
