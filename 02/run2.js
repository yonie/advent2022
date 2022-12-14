var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("02/input"),
  //input: require('fs').createReadStream('02/test')
});

let games = [];

lineReader.on("line", function (line) {
  games.push(line);
});

lineReader.on("close", function () {
  console.log("amount of games:", games.length);

  let totalScore = 0;

  games.forEach(function (game) {
    let opponent = game[0];
    // X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win.

    let result = game[2];
    let yours;

    if (opponent == "A" && result == "X") yours = "Z";
    if (opponent == "A" && result == "Y") yours = "X";
    if (opponent == "A" && result == "Z") yours = "Y";

    if (opponent == "B" && result == "X") yours = "X";
    if (opponent == "B" && result == "Y") yours = "Y";
    if (opponent == "B" && result == "Z") yours = "Z";

    if (opponent == "C" && result == "X") yours = "Y";
    if (opponent == "C" && result == "Y") yours = "Z";
    if (opponent == "C" && result == "Z") yours = "X";

    let score = playGame(opponent, yours);

    console.log("game / score:", opponent, yours, score);
    totalScore += score;
  });

  console.log("total score:", totalScore);
});

// 0 if you lost, 3 if the round was a draw, and 6 if you won
// 1 for Rock, 2 for Paper, and 3 for Scissors
function playGame(opponent, yours) {
  // 1 is you win, 0 is draw, -1 is you lose
  let outcome;
  let score = 0;

  if (opponent == "A" && yours == "X") outcome = 0;
  if (opponent == "A" && yours == "Y") outcome = 1;
  if (opponent == "A" && yours == "Z") outcome = -1;

  if (opponent == "B" && yours == "X") outcome = -1;
  if (opponent == "B" && yours == "Y") outcome = 0;
  if (opponent == "B" && yours == "Z") outcome = 1;

  if (opponent == "C" && yours == "X") outcome = 1;
  if (opponent == "C" && yours == "Y") outcome = -1;
  if (opponent == "C" && yours == "Z") outcome = 0;

  if (outcome == 1) score += 6;
  else if (outcome == 0) score += 3;
  else if (outcome == -1) score += 0;
  else console.log("parsing game failed.");

  // now we add the scores for chosen move
  if (yours == "X") score += 1;
  else if (yours == "Y") score += 2;
  else if (yours == "Z") score += 3;
  else "parsing game failed.";

  return score;
}
