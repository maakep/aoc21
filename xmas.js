var fs = require("fs");
var arg = process.argv[2];
var num1 = arg[0];
var num2 = arg[1];

if (num1 == "g") generate(num2);
else runSolution(num1, num2);

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
    `const input = process.argv.slice(3) == "t" ? require("./input-test") : require("./input");
module.exports = () => {}`
  );
  fs.writeFileSync(
    `./dec${num}/p2.js`,
    `const input = process.argv.slice(3) == "t" ? require("./input-test") : require("./input");
module.exports = () => {}`
  );
}
