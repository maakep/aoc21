const input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");
module.exports = () => {
  const highestX = Math.max(...input.coords.map((c) => c.x));
  const highestY = Math.max(...input.coords.map((c) => c.y));

  let map = new Array(highestY + 1)
    .fill("")
    .map((_) => new Array(highestX + 1).fill("."));

  for (const y in map) {
    for (const x in map[y]) {
      if (input.coords.find((c) => c.x == x && c.y == y)) {
        map[y][x] = "#";
      }
    }
  }

  for (const fold of input.folds.slice(0, 1)) {
    const x_or_y = fold[0];
    const index = fold[1];

    if (x_or_y == "y") {
      const left = map.slice(0, index);
      const right = map.slice(index).reverse();

      for (const y in left) {
        for (const x in left[y]) {
          if (right[y][x] == "#") left[y][x] = "#";
        }
      }

      map = left;
    } else {
      for (const rowIndex in map) {
        const row = map[rowIndex];

        const left = row.slice(0, index);
        const right = row.slice(index).reverse();

        for (const y in left) {
          if (right[y] == "#") left[y] = "#";
        }

        map[rowIndex] = left;
      }
    }
  }

  return map.reduce(
    (a, row) => a + row.reduce((acc, c) => (c == "#" ? acc + 1 : acc), 0),
    0
  );
};
