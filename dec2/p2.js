var input = require("./input");

module.exports = () => {
  var values = input.reduce(
    (acc, curr) => {
      switch (curr[0]) {
        case "forward":
          acc[0] += curr[1];
          acc[1] += acc[2] * curr[1];
          break;
        case "down":
          acc[2] += curr[1];
          break;
        case "up":
          acc[2] -= curr[1];
          break;
      }
      return acc;
    },
    [0, 0, 0] //horizonal, depth, aim
  );

  return values[0] * values[1];
};
