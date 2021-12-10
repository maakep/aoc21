const input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");

const scoreValues = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
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

  let incompleteRows = [];

  for (const row of input) {
    try {
      findMyClosingCharacter(row, 0);
      incompleteRows.push(row);
    } catch (e) {
      errors.push(e);
    }
  }

  const autoCompleteRows = [];

  for (const row of incompleteRows) {
    const autoCompleteRow = [];

    for (const char of row) {
      if (isOpener(char)) {
        autoCompleteRow.push(char);
      } else {
        autoCompleteRow.pop();
      }
    }

    const reversed = autoCompleteRow.map((x) => closers[x]);
    autoCompleteRows.push(reversed.reverse());
  }

  const scores = autoCompleteRows.map((row) => {
    return row.reduce((acc, curr) => {
      let newScore = acc * 5;
      newScore += scoreValues[curr];
      return newScore;
    }, 0);
  });
  const sortedScores = scores.sort((a, b) => b - a);
  const mean = sortedScores[Math.floor(scores.length / 2)];
  console.log(sortedScores);
  return mean;
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
