var { boards, drawNumbers } = require("./input");

module.exports = () => {
  for (const number of drawNumbers) {
    mark(number);
    const matchedBoard = hasVerticalAndHorizontalMatch();
    if (matchedBoard != null) {
      console.log(matchedBoard);
      const remainingSum = matchedBoard
        .flat()
        .reduce((acc, curr) => (curr != "X" ? acc + curr : acc), 0);
      return remainingSum * number;
    }
  }
};

function mark(number) {
  boards.forEach((board) => {
    board.forEach((row) => {
      row.forEach((value, i) => {
        if (value == number) {
          row[i] = "X";
        }
      });
    });
  });
}

function hasVerticalAndHorizontalMatch() {
  for (const board of boards) {
    for (const row of board) {
      const rowMatch = row.every((x) => x == "X");

      if (rowMatch) return board;

      for (var i = 0; i < row.length; i++) {
        const horizontals = board.map((row) => row[i]);
        const match = horizontals.every((x) => x == "X");
        if (match) return board;
      }
    }
  }
  return null;
}
