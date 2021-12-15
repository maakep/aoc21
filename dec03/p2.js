const input = require("./input");

module.exports = () => {
  const oxygen = getListsUntilOneLeft(1);
  const co2scrubber = getListsUntilOneLeft(0);

  const decimalOxygen = parseInt(oxygen[0], 2);
  const decimalCo2 = parseInt(co2scrubber[0], 2);

  return decimalCo2 * decimalOxygen;
};

function getListsUntilOneLeft(value) {
  let list = input;
  let i = 0;

  while (list.length > 1) {
    const verticalValues = list.map((x) => x[i]);
    const commonValue = getMostCommonValue(verticalValues, !Boolean(value));
    list = getAllInputsWithValueOnIndex(list, commonValue, i);
    i++;
  }

  return list;
}

function getAllInputsWithValueOnIndex(list, value, index) {
  return list.filter((x) => x[index] == value);
}

function getMostCommonValue(valueList, equalToZero) {
  const sum = valueList.reduce((acc, curr) => (acc += parseInt(curr)), 0);
  let average = sum / valueList.length;
  let rounded = Math.round(average);

  if (equalToZero) rounded = rounded == 1 ? 0 : 1;

  return rounded;
}
