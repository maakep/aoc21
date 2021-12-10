const input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");

module.exports = () => {
  const inputSum = input.reduce((a, c) => a + c, 0);
  const target = Math.round(inputSum / input.length);
  realTarget = target - Math.floor(target / 2);

  let lowestFuel = Infinity;

  for (var t = realTarget; t < target + Math.ceil(target / 2); t++) {
    const fuel = input.reduce((acc, curr) => {
      const distance = Math.abs(curr - t);
      let cost = 0;

      for (var i = 1; i <= distance; i++) {
        cost += i;
      }

      return acc + cost;
    }, 0);

    console.log(t, fuel);
    if (lowestFuel > fuel) {
      lowestFuel = fuel;
    }
  }

  return lowestFuel;
};
