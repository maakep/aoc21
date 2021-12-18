const input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");
module.exports = () => {
  const result = findSuccess();
  console.log(result);
  return Math.max(...result.positions.map((r) => r.y));
};

function findSuccess() {
  const vel = {
    x: 999,
    y: 999,
  };

  while (true) {
    const res = shoot(vel);
    if (res.success) return res;

    const lastPos = res.positions.pop();
    const x = missedByX(lastPos);
    const y = missedByY(lastPos);
    const margin = getErrorMargin(lastPos);

    if (x) {
      console.log(`Missed X by ${margin.x}`);
      vel.x = vel.x - 1;
    }
    if (y) {
      console.log(`Missed Y by ${margin.y}`);
      vel.y = vel.y - 1;
    }
  }
}

function shoot(vel) {
  const pos = { x: 0, y: 0 };
  const velocity = { ...vel };
  const tickPositions = [];
  do {
    pos.x += velocity.x;
    pos.y += velocity.y;

    tickPositions.push({ ...pos });

    velocity.x = velocity.x == 0 ? 0 : velocity.x - 1;
    velocity.y = velocity.y - 1;
  } while (!isWithin(pos) && !missed(pos));

  if (isWithin(pos)) {
    return { success: true, velocity: vel, positions: tickPositions };
  }
  if (missed(pos)) {
    return {
      success: false,
      margin: getErrorMargin(pos),
      positions: tickPositions,
    };
  }

  return "Neither hit nor missed";
}

function isWithin(coord) {
  return (
    coord.x >= input.x1 &&
    coord.x <= input.x2 &&
    coord.y <= input.y1 &&
    coord.y >= input.y2
  );
}

function missed(coord) {
  return missedByX(coord) || missedByY(coord);
}

function missedByX(coord) {
  return coord.x > input.x2;
}

function missedByY(coord) {
  return coord.y < input.y2;
}

function getErrorMargin(coord) {
  return { x: coord.x - input.x2, y: coord.y - input.y2 };
}
