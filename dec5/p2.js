var input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");

let highestX = 0;
let highestY = 0;

module.exports = () => {
  const straightLines = input.reduce((acc, curr) => {
    const { from, to } = getCoordinates(curr);
    if (from.x == to.x || from.y == to.y) acc.push(curr);
    else if (Math.abs(from.x - to.x) == Math.abs(from.y - to.y)) acc.push(curr);
    return acc;
  }, []);

  const world = new Array(highestY + 1)
    .fill("")
    .map(() => new Array(highestX + 1).fill(0));

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

  const firstSum = x1 + y1;
  const secondSum = x2 + y2;

  const from = firstSum > secondSum ? { x: x2, y: y2 } : { x: x1, y: y1 };
  const to = firstSum > secondSum ? { x: x1, y: y1 } : { x: x2, y: y2 };

  return {
    from,
    to,
  };
}

function fillBetween(world, coordinates) {
  const { from, to } = getCoordinates(coordinates);

  const tick = { ...from };
  const target = to;

  console.log(tick, " -> ", target);

  if (tick.x < target.x || tick.y < target.y) console.log("+Marking", tick);

  while (tick.x < target.x || tick.y < target.y) {
    world[tick.y][tick.x]++;

    if (tick.x != target.x) {
      if (tick.x < target.x) tick.x++;
      else if (tick.x > target.x) tick.x--;
    }

    if (tick.y != target.y) {
      if (tick.y < target.y) tick.y++;
      if (tick.y > target.y) tick.y--;
    }
  }

  console.log("-Marking", tick);
  world[tick.y][tick.x]++;
}
