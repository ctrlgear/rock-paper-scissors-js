function computerPlay() {
  let result = "";

  // 0 - rock, 1 - paper, 2 - scrissors
  const rand = Math.floor(Math.random() * 3);

  if (rand === 0) result = "rock";
  else if (rand === 1) result = "paper";
  else if (rand === 2) result = "scissors";

  return result;
}

console.log(computerPlay());
