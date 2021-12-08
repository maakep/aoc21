var input = require("./input");

var prevSum = 0;
module.exports = () =>
  input.reduce((acc, curr, i) => {
    if (input[i - 3] == undefined) return acc;

    var currSum = input[i - 2] + input[i - 1] + curr;
    var prevSum = input[i - 3] + input[i - 2] + input[i - 1];
    return currSum > prevSum ? ++acc : acc;
  }, 0);
