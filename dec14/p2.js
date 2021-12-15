const input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");

module.exports = (steps = 40) => {
  const polymers = input.polymerTemplate;

  let pairCount = {};

  for (let letter in polymers) {
    letter = parseInt(letter);
    if (letter == polymers.length - 1) continue;

    const pair = polymers[letter] + polymers[letter + 1];

    pairCount[pair] = pairCount[pair] != undefined ? pairCount[pair] + 1 : 1;
  }

  for (let i = 0; i < steps; i++) {
    const copy = { ...pairCount };

    for (const pair in pairCount) {
      const count = pairCount[pair];
      if (count < 1) continue;

      copy[pair] -= count;
      const newPairs = newPairsFrom(pair);

      if (copy[newPairs[0]] == undefined) copy[newPairs[0]] = 0;
      if (copy[newPairs[1]] == undefined) copy[newPairs[1]] = 0;

      copy[newPairs[0]] = copy[newPairs[0]] + count;
      copy[newPairs[1]] = copy[newPairs[1]] + count;
    }
    for (const pair in pairCount) {
      if (copy[pair] < 1) delete copy[pair];
    }

    pairCount = { ...copy };
  }

  const letterCount = {};

  for (const pair in pairCount) {
    const count = pairCount[pair];

    if (letterCount[pair[0]] == undefined) letterCount[pair[0]] = 0;
    if (letterCount[pair[1]] == undefined) letterCount[pair[1]] = 0;

    letterCount[pair[0]] = letterCount[pair[0]] + count;
    letterCount[pair[1]] = letterCount[pair[1]] + count;
  }

  console.log(pairCount);
  console.log(letterCount);

  const counts = Object.values(letterCount);
  const highest = Math.max(...counts);
  const lowest = Math.min(...counts);

  return [
    (highest - lowest + 1) / 2,
    (highest - lowest + 1) / 2 - 2188189693529,
  ];
};

function newPairsFrom(pair) {
  const middleLetter = input.pairs[pair];
  return [pair[0] + middleLetter, middleLetter + pair[1]];
}
