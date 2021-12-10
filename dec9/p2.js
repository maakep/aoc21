const input =
  process.argv.slice(3) == "t" ? require("./input-test") : require("./input");
module.exports = () => {
  const basinRoots = [];

  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    const row = input[rowIndex];

    for (let charIndex = 0; charIndex < row.length; charIndex++) {
      const value = parseInt(row[charIndex]);

      const [above, below, left, right] = getSurroundingValues(
        rowIndex,
        charIndex
      );

      if (
        value < above.val &&
        value < below.val &&
        value < left.val &&
        value < right.val
      ) {
        basinRoots.push({ row: rowIndex, char: charIndex });
      }
    }
  }

  const basinSizes = [];

  for (const root of basinRoots) {
    const coords = new Set();
    coords.add(getCoordinateString(root.row, root.char));
    findEntireBasin(root.row, root.char, coords);
    basinSizes.push(coords.size);
  }

  const sortedBasins = basinSizes.sort((a, b) => b - a);
  const top3 = sortedBasins.slice(0, 3);
  return top3.reduce((a, c) => a * c, 1);
};

function findEntireBasin(ri, ci, coordSet) {
  const currentValue = parseInt(input[ri][ci]);
  for (const neighbour of getSurroundingValues(ri, ci)) {
    if (
      neighbour.val > currentValue &&
      neighbour.val != 9 &&
      !coordSet.has(getCoordinateString(neighbour.row, neighbour.char))
    ) {
      coordSet.add(getCoordinateString(neighbour.row, neighbour.char));
      findEntireBasin(neighbour.row, neighbour.char, coordSet);
    }
  }
}

function getSurroundingValues(rowIndex, charIndex) {
  const above = input[rowIndex - 1]?.[charIndex] || 9;
  const below = input[rowIndex + 1]?.[charIndex] || 9;

  const left = input[rowIndex][charIndex - 1] || 9;
  const right = input[rowIndex][charIndex + 1] || 9;

  return [
    { val: parseInt(above), row: rowIndex - 1, char: charIndex },
    { val: parseInt(below), row: rowIndex + 1, char: charIndex },
    { val: parseInt(left), row: rowIndex, char: charIndex - 1 },
    { val: parseInt(right), row: rowIndex, char: charIndex + 1 },
  ];
}

const getCoordinateString = (ri, ci) => `${ri}${ci}`;
