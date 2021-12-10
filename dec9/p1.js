const input =
  process.argv.slice(3) == "t" ? require("./input-test") : require("./input");
module.exports = () => {
  const lowPoints = [];

  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    const row = input[rowIndex];

    for (let charIndex = 0; charIndex < row.length; charIndex++) {
      const value = parseInt(row[charIndex]);

      const above = input[rowIndex - 1]?.[charIndex] || 9;
      const below = input[rowIndex + 1]?.[charIndex] || 9;

      const left = input[rowIndex][charIndex - 1] || 9;
      const right = input[rowIndex][charIndex + 1] || 9;

      if (value < above && value < below && value < left && value < right) {
        lowPoints.push(value);
      }
    }
  }

  return lowPoints.reduce((a, c) => a + (c + 1), 0);
};
