const input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");

module.exports = (steps = 10) => {
  let polymer = input.polymerTemplate;

  for (let step = 0; step < steps; step++) {
    const polymerExceptFirst = polymer.slice(1);
    for (let i = polymerExceptFirst.length; i > 0; i--) {
      const pair = polymer[i - 1] + polymer[i];
      const match = input.pairs[pair];

      if (match == undefined) continue;

      const left = polymer.substring(0, i);
      const middle = match;
      const right = polymer.substring(i);

      polymer = left + middle + right;
    }
  }

  const letterCount = {};

  for (const letter of polymer) {
    letterCount[letter] =
      letterCount[letter] != undefined ? letterCount[letter] + 1 : 1;
  }

  const counts = Object.values(letterCount);
  const highest = Math.max(...counts);
  const lowest = Math.min(...counts);

  console.log(letterCount);

  return highest - lowest;
};
