const input =
  process.argv.slice(3) == "t" ? require("./input-test") : require("./input");

module.exports = () => {
  const sorted = input.sort((a, b) => b - a);
  const target = sorted[Math.ceil(input.length / 2)];

  const fuel = input.reduce((acc, curr) => {
    return acc + Math.abs(curr - target);
  }, 0);

  return fuel;
};
