var { boards, drawNumbers } =
  process.argv[4] == "t" ? require("./input-test") : require("./input");

module.exports = () => {
  for (const number of drawNumbers) {
    mark(number);
    const matchedBoard = hasVerticalOrHorizontalMatch();

    if (winners.length == boards.length && matchedBoard != null) {
      const remainingSum = matchedBoard
        .flat()
        .reduce((acc, curr) => (curr != "X" ? acc + curr : acc), 0);

      return remainingSum * number;
    }
  }
};

function mark(number) {
  boards.forEach((board, i) => {
    if (winners.includes(i)) {
      return;
    }
    board.forEach((row) => {
      row.forEach((value, i) => {
        if (value == number) {
          row[i] = "X";
        }
      });
    });
  });
}

const winners = [];

function hasVerticalOrHorizontalMatch() {
  for (const boardIndex in boards) {
    if (winners.includes(parseInt(boardIndex))) continue;
    const board = boards[boardIndex];

    for (const row of board) {
      const matchRow = row.every((x) => x == "X");
      const matchCol = iterateRows(row, board);

      if (matchCol || matchRow) {
        markBoardAsWinner(boardIndex);

        if (winners.length == boards.length) {
          return board;
        }

        break;
      }
    }
  }
  return null;
}

function iterateRows(row, board) {
  for (var i = 0; i < row.length; i++) {
    const cols = board.map((row) => row[i]);
    const matchCol = cols.every((x) => x == "X");
    if (matchCol) {
      return true;
    }
  }
  return false;
}

function markBoardAsWinner(i) {
  winners.push(parseInt(i));
}
