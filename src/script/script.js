// Round elements
let elRoundCounter;
let elCurrentRoundUserPick;
let elCurrentRoundComputerPick;
let elCurrentRoundCompareSign;

// Score elements
let elScoreUser;
let elScoreComputer;

// Hisory element
let elHistory;

// vars
let roundCounter;
let score;
let historyArr;

const emojiArray = ["✊", "✋", "✌️"];

newGame();

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
    ++roundCounter;

    const roundOutcome = evaluateRound(userPick, computerPick);

    updateScore(roundOutcome);

    updateHistory(userPick, computerPick, roundOutcome);

    renderRound(userPick, computerPick, roundOutcome);
}

function renderRound(userPick, computerPick, roundOutcome) {
    elRoundCounter.innerHTML = roundCounter;
    elCurrentRoundUserPick.innerHTML = emojiArray[userPick] || userPick;
    elCurrentRoundComputerPick.innerHTML =
        emojiArray[computerPick] || computerPick;
    elCurrentRoundCompareSign.innerHTML = roundOutcome;
}

function updateScore(roundOutcome) {
    if (roundOutcome === ">") score.user++;
    else if (roundOutcome === "<") score.computer++;

    renderScore();
}

function renderScore() {
    elScoreUser.innerHTML = score.user;
    elScoreComputer.innerHTML = score.computer;
}

function updateHistory(userPick, computerPick, roundOutcome) {
    historyArr.push({
        userPick,
        computerPick,
        roundOutcome,
        score: { ...score },
    });

    addRoundOutcome();
}

function addRoundOutcome() {
    // get last objet from history array
    const { userPick, computerPick, roundOutcome } =
        historyArr[historyArr.length - 1];

    const elListItem = document.createElement("li");

    elListItem.id = roundCounter;
    elListItem.className = "roundItem";

    elListItem.innerHTML = `${elListItem.id}. ${emojiArray[userPick]} ${roundOutcome} ${emojiArray[computerPick]}`;

    elHistory.appendChild(elListItem);

    elListItem.addEventListener("click", goBackInTime);
}

function goBackInTime(event) {
    console.log(event.target.id);
    const elListItem = document.getElementById(event.target.id);
    console.log(elListItem);

    historyArr = historyArr.slice(0, elListItem.id);

    score = { ...historyArr[historyArr.length - 1].score };
    renderScore();

    roundCounter = elListItem.id - 1;

    renderRound(
        historyArr[roundCounter].userPick,
        historyArr[roundCounter].computerPick,
        historyArr[roundCounter].roundOutcome
    );

    elHistory.querySelectorAll(".roundItem").forEach((item) => {
        if (item.id >= elListItem.id) {
            elHistory.removeChild(item);
        }
    });
}

function winCondition() {
    if (roundCounter < 5) return;

    const elRoundContainer = document.querySelector(".round-container");
    const elBtnContainer = document.querySelector(".btn-container");

    elRoundContainer.innerHTML = `
      <button class="btn--new-game" type="button">new game</button>
    `;

    let winString = "";

    if (score.user === score.computer) winString = `It's a draw! 🤷‍♀️`;
    if (score.user > score.computer) winString = `You won! 🏆`;
    if (score.user < score.computer) winString = `You lost! 🔥`;

    elBtnContainer.innerHTML = `
    <h1 class='congrats-banner'>${winString}</h1>
  `;

    document.querySelector(".btn--new-game").addEventListener("click", newGame);

    // Remove eventListener from history items
    document
        .querySelectorAll(".roundItem")
        .forEach((item) => item.removeEventListener("click", goBackInTime));
}

function newGame() {
    const elRoundContainer = document.querySelector(".round-container");
    const elUserControls = document.querySelector(".user-controls");

    elRoundContainer.innerHTML = `
    <h3>Round <span class="round-counter">0</span> of 5</h3>
    <div class="current-round">
      <div class="icon icon--user">🧑</div>
      <div class="user-pick">👋</div>
      <div class="compare-sign"></div>
      <div class="computer-pick">👋</div>
      <div class="icon icon--computer">💻</div>
    </div>
    <p class="round-message"></p>
  `;

    elUserControls.innerHTML = `
      <div class="btn-container">
      <button value="0" class="btn" type="button">✊</button>
      <button value="1" class="btn" type="button">✋</button>
      <button value="2" class="btn" type="button">✌️</button>
    </div>
  `;

    // Default state
    roundCounter = 0;
    score = { user: 0, computer: 0 };
    historyArr = [
        {
            userPick: "👋",
            computerPick: "👋",
            roundOutcome: "",
            score: { ...score },
        },
    ];

    // Round elements
    elRoundCounter = document.querySelector(".round-counter");
    elCurrentRoundUserPick = document.querySelector(".user-pick");
    elCurrentRoundComputerPick = document.querySelector(".computer-pick");
    elCurrentRoundCompareSign = document.querySelector(".compare-sign");

    // Score elements
    elScoreUser = document.querySelector(".user--score");
    elScoreComputer = document.querySelector(".computer--score");

    elHistory = document.querySelector(".round-history");

    elHistory.innerHTML = "";

    // Default State - Round Elements
    elRoundCounter.innerHTML = roundCounter;
    elCurrentRoundUserPick.innerHTML = historyArr[0].userPick;
    elCurrentRoundComputerPick.innerHTML = historyArr[0].computerPick;
    elCurrentRoundCompareSign.innerHTML = historyArr[0].roundOutcome;

    // Default State - Score Elements
    elScoreUser.innerHTML = 0;
    elScoreComputer.innerHTML = 0;

    document
        .querySelector(".btn-container")
        .addEventListener("click", (event) => {
            if (event.target.className !== "btn") return;

            playGame(event.target.value);
        });
}
