let input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");

const steps = Infinity;

module.exports = () => {
  input = input.map((x) => x.split("").map((y) => parseInt(y)));
  for (let i = 0; i < steps; i++) {
    const flashers = new Set();

    for (const rowIndex in input) {
      const row = input[rowIndex];

      for (const numIndex in row) {
        increment(parseInt(rowIndex), parseInt(numIndex), flashers);
      }
    }

    if (input.every((x) => x.every((y) => y == 0))) {
      return i + 1;
    }
  }

  return null;
};

function increment(ri, ni, flashers) {
  if (flashers.has(coord(ri, ni))) return;

  input[ri][ni] = input[ri][ni] + 1;
  const val = input[ri][ni];

  if (val > 9) {
    flashers.add(coord(ri, ni));
    input[ri][ni] = 0;

    for (const neighbour of getNeighbours(ri, ni)) {
      increment(neighbour.ri, neighbour.ni, flashers);
    }
  }
}

function getNeighbours(ri, ni) {
  const neighbours = [
    { ri: ri - 1, ni: ni - 1, val: input[ri - 1]?.[ni - 1] },
    { ri: ri - 1, ni: ni, val: input[ri - 1]?.[ni] },
    { ri: ri - 1, ni: ni + 1, val: input[ri - 1]?.[ni + 1] },

    { ri: ri, ni: ni - 1, val: input[ri]?.[ni - 1] },
    { ri: ri, ni: ni + 1, val: input[ri]?.[ni + 1] },

    { ri: ri + 1, ni: ni - 1, val: input[ri + 1]?.[ni - 1] },
    { ri: ri + 1, ni: ni, val: input[ri + 1]?.[ni] },
    { ri: ri + 1, ni: ni + 1, val: input[ri + 1]?.[ni + 1] },
  ];

  return neighbours.filter((x) => x.val != undefined);
}

const coord = (ri, ni) => `${ri}${ni}`;
