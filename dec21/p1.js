const input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");
module.exports = () => {
  const p1 = {
    position: input[0],
    score: 0,
  };

  const p2 = {
    position: input[1],
    score: 0,
  };

  const players = [p1, p2];

  playGame(players);

  console.log(players, dieRollCount);
  return players.find((x) => x.score < 1000).score * dieRollCount;
};

let die = 0;
let dieRollCount = 0;
function rollDieForSum(times = 3) {
  dieRollCount += times;
  let sum = 0;
  for (let i = 0; i < times; i++) {
    die += 1;
    if (die > 100) {
      die = die - 100;
    }
    sum += die;
  }
  return sum;
}

function playGame(players) {
  while (true) {
    for (const player of players) {
      const winner = playTurn(player);
      if (winner) return;
    }
  }
}

function playTurn(player) {
  const dieSum = rollDieForSum();
  let newPos = player.position + dieSum;
  newPos = newPos > 10 ? newPos % 10 : newPos;

  player.score += newPos;
  player.position = newPos;

  return player.score >= 1000;
}
