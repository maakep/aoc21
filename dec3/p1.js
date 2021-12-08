const input = require("./input");

module.exports = () => {
  var gammaRate = "";

  for (i in input[0]) {
    var verticalValues = input.map((row) => row[i]);
    gammaRate += getMostCommonValue(verticalValues);
  }

  var epsilonRate = invertBinaryString(gammaRate);
  var resultDecimal = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);

  return resultDecimal;
};

function invertBinaryString(binaryString) {
  let output = "";

  for (index in binaryString) {
    output += binaryString[index] == "1" ? "0" : "1";
  }

  return output;
}

function getMostCommonValue(valueList) {
  return valueList
    .sort(
      (a, b) =>
        valueList.filter((v) => v === a).length -
        valueList.filter((v) => v === b).length
    )
    .pop();
}
