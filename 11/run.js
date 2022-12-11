var lineReader = require("readline").createInterface({
  //input: require("fs").createReadStream("11/test"),
  input: require("fs").createReadStream("11/input"),
});

let input = [];
// part 2
let worryReduction = false;
let rounds = 10000;
let lcd = 1;

let monkeys = [];
function Monkey(id, items, operation, test, targetA, targetB) {
  ((this.timesInspected = 0), (this.id = id)),
    (this.items = items), // 54, 55,33
    (this.operation = operation), // "new = old + 6"
    (this.test = test);
  this.targetA = targetA;
  this.targetB = targetB;
  this.inspect = function () {
    if (this.items.length < 1) return undefined;
    this.timesInspected++;
    // get next item
    let item = this.items.shift();
    // execute operation on item
    let exec = operation.substring(9).replace("old", item);
    item = eval(item + exec);
    // reduce worry (part 1)
    if (worryReduction) item = Math.floor(item / 3);
    // reduce item value (part 2)
    item = item % lcd;
    // determine target monkey
    let target;
    if (item % test == 0) target = this.targetA;
    else target = targetB;
    return { target: target, value: item };
  };
  this.catchItem = function (value) {
    this.items.push(value);
  };
}

lineReader.on("line", function (line) {
  input.push(line);
});

lineReader.on("close", function () {
  let n = 0;

  // construct monkeys from input
  while (input[7 * n] != undefined) {
    monkeys[n] = new Monkey(
      n,
      input[7 * n + 1].substring(18).split(", "),
      input[7 * n + 2].substring(13),
      input[7 * n + 3].substring(21),
      input[7 * n + 4].substring(29),
      input[7 * n + 5].substring(30)
    );
    // calculate lowest common denominator to help reduce size (part 2)
    lcd = lcd * monkeys[n].test;
    n = n + 1;
  }

  // game loop
  let nextItemToThrow;
  for (let round = 1; round <= rounds; round++) {
    monkeys.forEach((monkey) => {
      while ((nextItemToThrow = monkey.inspect()) != undefined) {
        monkeys[nextItemToThrow.target].catchItem(nextItemToThrow.value);
      }
    });

    // debug logging
    if (round == 1 || round == 20 || round % 1000 == 0) {
      console.log("end of round", round);
      monkeys.forEach((monkey) => {
        console.log(
          "monkey:",
          monkey.id,
          ", times inspected:",
          monkey.timesInspected
        );
      });
    }
  }

  let answer1 = [];

  console.log("rounds finished.")

  monkeys.forEach((monkey) => {
    console.log(
      "monkey:",
      monkey.id,
      ", times inspected:",
      monkey.timesInspected
    );
    answer1.push(monkey.timesInspected);
  });

  answer1.sort(function (a, b) {
    return b - a;
  });
  console.log("monkey business:", answer1[0] * answer1[1]);
});
