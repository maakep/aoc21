var input = require("./input");

module.exports = () =>
  input.reduce((a, c, i) => (c > (input[i - 1] || c) ? ++a : a), 0);
