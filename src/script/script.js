// Round elements
const elRoundCounter = document.querySelector(".round-counter");
const elCurrentRoundUserPick = document.querySelector(".user-pick");
const elCurrentRoundComputerPick = document.querySelector(".computer-pick");
const elCurrentRoundCompareSign = document.querySelector(".compare-sign");

// Score elements
const elScoreUser = document.querySelector(".user--score");
const elScoreComputer = document.querySelector(".computer--score");

const elHistory = document.querySelector(".round-history");

elHistory.innerHTML = "";

// vars
// const emojiArray = ["🧱", "📄", "✂"];
const emojiArray = ["✊", "✋", "✌"];
let roundCounter = 0;
const totalScore = { user: 0, computer: 0 };
const historyArr = [];

// Default State - Round Elements
elRoundCounter.innerHTML = "0";
elCurrentRoundUserPick.innerHTML = "👋";
elCurrentRoundComputerPick.innerHTML = "👋";
elCurrentRoundCompareSign.innerHTML = "";

// Default State - Score Elements
elScoreUser.innerHTML = 0;
elScoreComputer.innerHTML = 0;

document.querySelector(".btn-container").addEventListener("click", (event) => {
  if (event.target.className !== "btn") return;

  playGame(event.target.value);
});

function computerSelection() {
  return Math.round(Math.random() * 2);
}

// 0 - rock, 1 - paper, 2 - scissors
function evaluateRound(userSelection, computerSelection) {
  if (userSelection == computerSelection) {
    return "=";
  }
  if (
    (userSelection == 0 && computerSelection == 1) ||
    (userSelection == 1 && computerSelection == 2) ||
    (userSelection == 2 && computerSelection == 0)
  ) {
    return "<";
  }
  if (
    (userSelection == 0 && computerSelection == 2) ||
    (userSelection == 1 && computerSelection == 0) ||
    (userSelection == 2 && computerSelection == 1)
  ) {
    return ">";
  }
}

function playGame(btnValue) {
  const userPick = btnValue;
  const computerPick = computerSelection();

  playRound(userPick, computerPick);
  winCondition();
}

function playRound(userPick, computerPick) {
  roundCounter++;

  const roundOutcome = evaluateRound(userPick, computerPick);

  updateScore(roundOutcome);

  renderScore();

  updateHistory(userPick, computerPick, roundOutcome);

  renderHistory();

  renderRound(userPick, computerPick, roundOutcome);
}

function renderRound(userPick, computerPick, roundOutcome) {
  elRoundCounter.innerHTML = roundCounter;
  elCurrentRoundUserPick.innerHTML = emojiArray[userPick];
  elCurrentRoundComputerPick.innerHTML = emojiArray[computerPick];
  elCurrentRoundCompareSign.innerHTML = roundOutcome;
}

function renderScore() {
  elScoreUser.innerHTML = totalScore.user;
  elScoreComputer.innerHTML = totalScore.computer;
}

function updateScore(roundOutcome) {
  if (roundOutcome === ">") totalScore.user++;
  if (roundOutcome === "<") totalScore.computer++;
}

function updateHistory(userPick, computerPick, roundOutcome) {
  historyArr.push({
    user: userPick,
    computer: computerPick,
    outcome: roundOutcome,
  });
}

function renderHistory() {
  // get last objet from history array
  const { user, computer, outcome } = historyArr[historyArr.length - 1];

  const listItem = document.createElement("li");

  listItem.innerHTML = `${emojiArray[user]} <span class="round-outcome">${outcome}</span> ${emojiArray[computer]}`;

  elHistory.appendChild(listItem);
}

function winCondition() {
  if (roundCounter < 5) return;

  const elBtnContainer = document.querySelector(".btn-container");

  elBtnContainer.innerHTML = `
      <button class="btn--new-game" type="button">new game</button>
    `;

  elBtnContainer.addEventListener("click", () => location.reload());

  let winString = "";

  if (totalScore.user === totalScore.computer)
    winString = `It's a draw! 🤷‍♀️🤷‍♀️🤷‍♀️`;
  if (totalScore.user > totalScore.computer) winString = `You won! 🏆🏆🏆`;
  if (totalScore.user < totalScore.computer) winString = `You lost! 🔥🔥🔥`;

  const elRoundContainer = document.querySelector(".round-container");

  elRoundContainer.innerHTML = `
    <h1 class='congrats-banner'>${winString}</h1>
  `;
}
