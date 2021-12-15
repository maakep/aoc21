const input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");

const p1 = require("./p1");

module.exports = () => {
  const p2Input = input.map((y) => {
    const newRow = [...y];
    for (let i = 1; i <= 4; i++) {
      y.forEach((x) => {
        let nextValue = x + i;
        if (nextValue > 9) nextValue = 1 + (nextValue - 10);
        newRow.push(nextValue);
      });
    }
    return newRow;
  });

  const rowsToAdd = [];
  for (let i = 1; i <= 4; i++) {
    p2Input.forEach((y) => {
      rowsToAdd.push(
        y.map((x) => {
          let nextValue = x + i;
          if (nextValue > 9) nextValue = 1 + (nextValue - 10);
          return nextValue;
        })
      );
    });
  }
  p2Input.push(...rowsToAdd);

  console.log(input[0].length, input[0].join(""));
  console.log(p2Input[0].length, p2Input[0].join(""));
  console.log(p2Input.length);
  return p1(p2Input);
};
