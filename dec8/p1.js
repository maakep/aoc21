const input =
  process.argv[3] == "t" ? require("./input-test") : require("./input");

// 1, 4, 7, 8:
const dict = [2, 4, 3, 7];

module.exports = () => {
  const outputs = input.map((i) => i.split("|")[1].split(" "));
  let matches = 0;

  for (const row of outputs) {
    for (var str of row) {
      if (dict.includes(str.length)) {
        matches++;
      }
    }
  }

  return matches;
};
