var fs = require("fs");
var arg1 = process.argv[2];
var arg2 = process.argv[3];

if (arg1 == "g") generate(arg2);
else runSolution(arg1, arg2);

function runSolution(num1, num2) {
  var solution = undefined;

  try {
    solution = require(`./dec${num1}/p${num2}`);
  } catch (e) {
    console.log(e);
    return console.log(
      `\r\nNo solution found for ./dec${num1}/p${num2} \r\n(ex: 'node xmas 12' for december 1 part 2)\r\n`
    );
  }

  var res = solution();
  console.log(
    `${new Date().toTimeString().substr(0, 8)} - dec${num1}/p${num2}.js result:`
  );
  console.log(res);
}

function generate(num) {
  fs.mkdirSync(`./dec${num}`);
  fs.writeFileSync(`./dec${num}/input-test.js`, `module.exports = [];`);
  fs.writeFileSync(`./dec${num}/input.js`, `module.exports = [];`);
  fs.writeFileSync(
    `./dec${num}/p1.js`,
    `const input = process.argv[4] == "t" ? require("./input-test") : require("./input");
module.exports = () => {}`
  );
  fs.writeFileSync(
    `./dec${num}/p2.js`,
    `const input = process.argv[4] == "t" ? require("./input-test") : require("./input");
module.exports = () => {}`
  );
}
