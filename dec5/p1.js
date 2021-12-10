var input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");

let highestX = 0;
let highestY = 0;

module.exports = () => {
  const straightLines = input.reduce((acc, curr) => {
    const { x1, x2, y1, y2 } = getCoordinates(curr);
    if (x1 == x2 || y1 == y2) acc.push(curr);
    return acc;
  }, []);

  const world = new Array(highestY + 1)
    .fill("")
    .map(() => new Array(highestX + 1).fill(0));

  console.log(world[0].length);

  for (const coord of straightLines) {
    fillBetween(world, coord);
  }

  return world.flat().filter((x) => x > 1).length;
};

function getCoordinates(entity) {
  const x1 = entity[0][0];
  const y1 = entity[0][1];
  const x2 = entity[1][0];
  const y2 = entity[1][1];

  if (x1 > highestX) highestX = x1;
  if (x2 > highestX) highestX = x2;
  if (y1 > highestY) highestY = y1;
  if (y2 > highestY) highestY = y2;

  return {
    x1,
    x2,
    y1,
    y2,
  };
}

function fillBetween(world, coordinates) {
  const { x1, x2, y1, y2 } = getCoordinates(coordinates);
  const first = { x: x1, y: y1 };
  const second = { x: x2, y: y2 };

  const axis = first.y == second.y ? "x" : "y";

  const tick = first[axis] > second[axis] ? second : first;
  const target = first[axis] > second[axis] ? first : second;

  while (tick[axis] <= target[axis]) {
    world[tick.y][tick.x]++;
    tick[axis]++;
  }
}
