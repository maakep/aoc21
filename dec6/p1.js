var input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");
const fishes = new Array(9).fill(0);

module.exports = () => {
  fishes.forEach((_, i) => {
    fishes[i] = input.filter((x) => x == i).length;
  });
  for (let i = 1; i <= 80; i++) {
    let zeros = 0;
    for (const age in fishes) {
      const ount = fishes[age];
      if (age == 0) {
        zeros = ount;
        fishes[age] = 0;
      } else fishes[age - 1] = ount;
    }
    fishes[8] = zeros;
    fishes[6] += zeros;
  }
  const sum = fishes.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return sum;
};
