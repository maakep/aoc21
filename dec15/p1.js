const input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");

const dj = require("dijkstrajs");

let _map = undefined;
module.exports = (map = input) => {
  _map = map;

  const goal = {
    val: map[map.length - 1][map[0].length - 1],
    x: map.length - 1,
    y: map[0].length - 1,
  };

  const nodeGraph = {};
  for (const y in map) {
    for (const x in map[y]) {
      const neighbours = getNeighbours(x, y);
      nodeGraph[`${x}_${y}`] = { ...neighbours };
    }
  }

  const path = dj.find_path(nodeGraph, "0_0", `${goal.x}_${goal.y}`);

  const sum = path
    .map((node) => {
      const split = node.split("_");
      const x = split[0];
      const y = split[1];

      return map[y][x];
    })
    .reduce((a, c) => a + c, 0);

  paintPath(
    path.map((node) => {
      const split = node.split("_");
      return { x: split[0], y: split[1] };
    })
  );
  return sum - map[0][0];
};

function getNeighbours(thisX, thisY) {
  thisX = parseInt(thisX);
  thisY = parseInt(thisY);

  const neighbours = {
    ...coord(thisY + 1, thisX),
    ...coord(thisY, thisX + 1),
    ...coord(thisY, thisX - 1),
    ...coord(thisY - 1, thisX),
  };
  return neighbours;
}

function coord(y, x) {
  if (x < 0 || x > _map[0].length - 1 || y < 0 || y > _map.length - 1)
    return undefined;
  return { [`${x}_${y}`]: _map[y]?.[x] };
}

function paintPath(currentPath) {
  console.log("");
  console.log("");
  for (const y in _map) {
    const transformedRow = _map[y].map((x, i) =>
      currentPath.find((x) => x.x == i && x.y == y) != undefined ? " " : x
    );
    console.log(transformedRow.join(""));
    // for (const x in input[y]) {
    //   if (currentPath.some((pathNode) => pathNode.x == x && pathNode.y == y)) {
    //     process.stdout.write(".");
    //   } else {
    //     process.stdout.write("" + input[y][x]);
    //   }
    // }
  }
}
