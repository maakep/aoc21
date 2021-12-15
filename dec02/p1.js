var input = require("./input");

module.exports = () => {
  const coordinates = input.reduce(
    (a, c) => {
      a[0] += getHorizontalInc(c);
      a[1] += getDepthInc(c);
      return a;
    },
    [0, 0]
  );

  return coordinates[0] * coordinates[1];
};

var getHorizontalInc = (c) => {
  if (c[0] == "forward") return c[1];
  return 0;
};
var getDepthInc = (c) => {
  if (c[0] == "down") return c[1];
  if (c[0] == "up") return -c[1];
  return 0;
};
