const input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");

const scoreValues = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const closers = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const isOpener = (c) => Object.keys(closers).includes(c);

module.exports = () => {
  const errors = [];

  for (const row of input) {
    try {
      findMyClosingCharacter(row, 0);
    } catch (e) {
      errors.push(e);
    }
  }

  return errors.reduce((a, c) => a + c, 0);
};

function findMyClosingCharacter(row, index) {
  const myCloser = closers[row[index]];

  for (let i = index + 1; i < row.length; i++) {
    const char = row[i];
    if (isOpener(char)) {
      const continueAt = findMyClosingCharacter(row, i);
      i = continueAt;
      continue;
    } else {
      if (char != myCloser) {
        throw syntaxError(char);
      }
      return i;
    }
  }
}

function syntaxError(c) {
  return scoreValues[c];
}
