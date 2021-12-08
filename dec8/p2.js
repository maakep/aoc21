const input =
  process.argv[3] == "t" ? require("./input-test") : require("./input");

const NUMS = {
  ONE: 2,
  TWO_OR_THREE_OR_FIVE: 5,
  FOUR: 4,
  SIX_OR_NINE_OR_ZERO: 6,
  SEVEN: 3,
  EIGHT: 7,
};

module.exports = () => {
  let numbers = [];

  for (const row of input) {
    const decodes = row.split(" | ")[0].split(" ");
    const output = row.split(" | ")[1].split(" ");

    // Sorted letters -> number
    const numberMap = {};

    deduceAllNumbersIntoMap(decodes, numberMap);

    let numberString = "";
    for (const str of output) {
      numberString += numberMap[sortString(str)];
    }

    numbers.push(numberString);
  }

  return numbers.reduce((a, c) => a + parseInt(c), 0);
};

function sortString(str) {
  return [...str].sort().join("");
}

function deduceAllNumbersIntoMap(decodes, map) {
  const one = decodes.find((x) => x.length == NUMS.ONE);
  const four = decodes.find((x) => x.length == NUMS.FOUR);
  const seven = decodes.find((x) => x.length == NUMS.SEVEN);
  const eight = decodes.find((x) => x.length == NUMS.EIGHT);

  const sixNineZero = decodes.filter(
    (x) => x.length == NUMS.SIX_OR_NINE_OR_ZERO
  );

  const twoThreeFive = decodes.filter(
    (x) => x.length == NUMS.TWO_OR_THREE_OR_FIVE
  );

  const six = sixNineZero.find(
    (x) => [...one].filter((y) => [...x].includes(y)).length == 1
  );

  const zero = sixNineZero
    .filter((x) => [...one].filter((y) => [...x].includes(y)).length == 2)
    .find((x) => [...four].filter((y) => [...x].includes(y)).length == 3);

  const nine = sixNineZero
    .filter((x) => [...one].filter((y) => [...x].includes(y)).length == 2)
    .find((x) => [...four].filter((y) => [...x].includes(y)).length == 4);

  const two = twoThreeFive.find(
    (x) => [...four].filter((y) => [...x].includes(y)).length == 2
  );

  const three = twoThreeFive.find(
    (x) => [...seven].filter((y) => [...x].includes(y)).length == 3
  );

  const five = twoThreeFive.find(
    (x) => [...six].filter((y) => [...x].includes(y)).length == 5
  );

  map[sortString(zero)] = 0;
  map[sortString(one)] = 1;
  map[sortString(two)] = 2;
  map[sortString(three)] = 3;
  map[sortString(four)] = 4;
  map[sortString(five)] = 5;
  map[sortString(six)] = 6;
  map[sortString(seven)] = 7;
  map[sortString(eight)] = 8;
  map[sortString(nine)] = 9;
}

function intersect(str, list, num) {}
